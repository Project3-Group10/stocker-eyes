""" SERVER APP.PY  """
import os
from flask import Flask, send_from_directory, json, redirect, request, url_for, redirect, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from functions import searchStock, fetchAPI
from dotenv import load_dotenv, find_dotenv
from datetime import timedelta
from google.oauth2 import id_token
from google.auth.transport import requests
import models
from datetime import datetime, date
from pytz import timezone
from flask_caching import Cache

cache = Cache()

load_dotenv(find_dotenv())

APP = Flask(__name__, static_folder='./build/static')
APP.config['CACHE_TYPE'] = 'simple'
cache.init_app(APP)

APP.secret_key = os.getenv("APP_SECRET_KEY")
APP.config['SESSION_COOKIE_NAME'] = 'google-login-session'
APP.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=5)

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)

APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_SQL_URL')
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
APP.config['pool_size'] = 20
APP.config['max_overflow'] = 0

DB = SQLAlchemy(APP)
DB.create_all()

CORSAPP = CORS(APP, resources={r"/*": {"origins": "*"}})
SOCKETIO = SocketIO(APP,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)

# Get Date
today_long = datetime.now(timezone('US/Eastern'))
today = str(date.fromtimestamp(datetime.now(timezone('US/Eastern')).timestamp()))
yesterday = str(date.fromtimestamp(datetime.now(timezone('US/Eastern')).timestamp()) - timedelta(1))


# print(today)
# print(yesterday)

# DB Funtion section
def addNewUserDB(user_data):
    # Addding the user to the db when login
    newUser = models.UserG(user_id=user_data['sub'], email=user_data['email'], name=user_data['name'],
                          avatar=user_data['picture'])
    DB.session.add(newUser)
    DB.session.commit()
    DB.session.remove()
    users_dic_return = getUserDB()
    return users_dic_return
    
   


def addStockDB(stock_data, name1, key):
    openP = stock_data['1. open']
    highP = stock_data['2. high']
    lowP = stock_data['3. low']
    closeP = stock_data['4. close']
    adjustedClaseP = stock_data['5. adjusted close']
    volumeP = stock_data['6. volume']
    newStock = models.Stock(name=name1, dateDB=key, open_price=openP, high_price=highP, low_price=lowP,
                            close_price=closeP, adjusted_clase_price=adjustedClaseP, volume_price=volumeP)
    DB.session.add(newStock)
    DB.session.commit()
    DB.session.remove()

# GET from DB
def getUserDB():
    allUsers = models.UserG.query.all()
    users = {}
    for person in allUsers:
        users[person.user_id] = [person.email, person.name, person.avatar]
    # print(users)
    return users


def getStocksDB():
    allStocks = models.Stock.query.all()
    stocksDic = {}
    for stock in allStocks:
        stocksDic[stock.stock_id] = [stock.name, stock.dateDB, stock.open_price, stock.high_price, stock.low_price,
                               stock.close_price, stock.adjusted_clase_price, stock.volume_price]
    return stocksDic

#to get the high_price since the first day of any stock. This method is important for test_case
def getBestPriceSDic(stocksDic): 
    name_closepriceDic = {}
    for k,v in stocksDic.items():
        name_closepriceDic[k] = float(v[5])
    
    sortDic =  dict(
        sorted(name_closepriceDic.items(), key=lambda item: item[1], reverse=True))
    #print(sortDic)
    return sortDic

def getCloseLowStockDic(stocksDic):  
    name_closepriceDic = {}
    for k,v in stocksDic.items():
        name_closepriceDic[k] = [v[0], v[1], float(v[5])]
        
    sortDic =  dict(
        sorted(name_closepriceDic.items(), key=lambda item: item[1][2], reverse=False))
    return sortDic
    
#getCloseLowStockDic({1: ['OVV', '04-18-2021', '4.2', '6.8', '3.5', '5', '3.1', '5000'],2: ['OVV', '04-17-2021', '4.2', '6.8', '3.5', '4.1', '3.1', '5000'],3: ['OVV', '04-16-2021', '4.2', '6.8', '3.5', '5.6', '3.1', '5000'],4: ['OVV', '04-15-2021', '4.2', '6.8', '3.5', '6.8', '3.1', '5000'],5: ['OVV', '04-14-2021', '4.2', '6.8', '3.5', '5.3', '3.1', '5000']})    

@SOCKETIO.on('connect')
def on_connect():
    print('User connected!')
    # print(data)
    print('GOOGLE SIGNED IN!')
    SOCKETIO.emit('stock_data', returnedData, broadcast=True, include_self=True)
    # print(api_data['Time Series (Daily)'][yesterday]['1. open'])
    name1 = 'OVV'
    for key in api_data['Time Series (Daily)']:
        x = models.Stock.query.filter_by(name=name1, dateDB=key).first()
        # print(x)
        if x is None:
            addStockDB(api_data['Time Series (Daily)'][key], name1, key)
        else:
            continue


@SOCKETIO.on('root')
def hello_world():
    email = dict(session)['profile']['email']
    SOCKETIO.emit('email', email, broadcast=True, include_self=True)

@SOCKETIO.on('isLoggedIn')
def isLoggedIn(data):    
    print("HELLO PLESE CHECK THIS")
    print(data)

@SOCKETIO.on('Login')
def token_validation(data):
    print('Begin token validation')
    token = data['id_token']
    try:
        # Specify the CLIENT_ID of the app that accesses the backend:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)

        # ID token is valid. Get the user's Google Account ID from the decoded token.
        userid = idinfo['sub']
        print('Login successful')
        x = models.UserG.query.filter_by(name=idinfo['name'], email=idinfo['email']).first()
        if x is None:
            addNewUserDB(idinfo)
        else:
            print(x)
    except ValueError:
        # Invalid token
        print('Login failed')
        pass


@SOCKETIO.on('logged_in')
def login(data):
    # print(data)
    # print(data['Qs'])
    # print(data['Qs']['oT'])
    data_dictionary = {
        'name': data['Qs']['oT'],  # + data['Qs']['kR'],
        'imageUri': data['Qs']['EI'],
        'emailAddress': data['Qs']['zt'],
        'status': True
    }
    SOCKETIO.emit('logged_in', data_dictionary, broadcast=True, include_self=True)
    x = models.UserG.query.filter_by(name=data_dictionary['name']).first()
    if x is None:
        addNewUserDB(data_dictionary)

    else:
        pass
        # print(x)


@SOCKETIO.on('searchStock')
def searchStockFromAPI(data):
    response = searchStock(data['searchText'])
    #print(response)
    SOCKETIO.emit('searchQuerySocket', response, broadcast=True, include_self=True)

@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    """ index function """
    return send_from_directory('./build', filename)



def fetchStockInfo():
    teslaData = searchStock('WMT')
    ovvData = searchStock('OVV')
    amznData = searchStock('AAPL')
    return {'teslaData': teslaData,'ovvData': ovvData,'amznData': amznData }

if __name__ == "__main__":
    import functions
    from functions import searchStock, fetchAPI
    returnedData = fetchStockInfo()
    api_data = returnedData['ovvData']

    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
