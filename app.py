""" SERVER APP.PY  """
import os
from flask import Flask, send_from_directory, json, redirect, request, url_for, redirect, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from functions import fetchAPI
from dotenv import load_dotenv, find_dotenv
from datetime import timedelta
from google.oauth2 import id_token
from google.auth.transport import requests
import models
from datetime import datetime, date
from pytz import timezone

load_dotenv(find_dotenv())

APP = Flask(__name__, static_folder='./build/static')

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
#print(today)
# print(yesterday)

# DB Funtion section
def addNewUserDB(user_data):
    # Addding the user to the db when login
    newUser = models.User(user_id = user_data['sub'], email=user_data['email'], name=user_data['name'], avatar=user_data['picture'])
    DB.session.add(newUser)
    DB.session.commit()
    # allUsers = models.Person.query.all()


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


# GET from DB
def getUserDB():
    allUsers = models.User.query.all()
    users = {}
    for person in allUsers:
        users[person.email] = [person.name, person.avatar, person.status]
    # print(users)
    return users


def getStocksDB():
    allStocks = models.Stock.query.all()
    stocksDic = {}
    for stock in allStocks:
        stocksDic[stock.id] = [stock.name, stock.dateDB, stock.open_price, stock.high_price, stock.low_price,
                               stock.close_price, stock.adjusted_clase_price, stock.volume_price]
    return stocksDic


@SOCKETIO.on('connect')
def on_connect():
    print('User connected!')
    # print(data)
    SOCKETIO.emit('stock_data', api_data, broadcast=True, include_self=True)
    # SOCKETIO.emit('stock_data', {'Meta Data': {'1. Information': 'Daily Time Series with Splits and Dividend Events', '2. Symbol': 'TSLA', '3. Last Refreshed': '2021-04-07', '4. Output Size': 'Compact', '5. Time Zone': 'US/Eastern'}, 'Time Series (Daily)': {'2021-04-07': {'1. open': '687.0', '2. high': '691.38', '3. low': '667.84', '4. close': '670.97', '5. adjusted close': '670.97', '6. volume': '26309433', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-04-06': {'1. open': '690.3', '2. high': '696.55', '3. low': '681.37', '4. close': '691.62', '5. adjusted close': '691.62', '6. volume': '28271839', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-04-05': {'1. open': '707.71', '2. high': '708.16', '3. low': '684.7', '4. close': '691.05', '5. adjusted close': '691.05', '6. volume': '41842767', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-04-01': {'1. open': '688.37', '2. high': '692.4203', '3. low': '659.42', '4. close': '661.75', '5. adjusted close': '661.75', '6. volume': '35298378', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-31': {'1. open': '646.62', '2. high': '672.0', '3. low': '641.11', '4. close': '667.93', '5. adjusted close': '667.93', '6. volume': '33337288', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-30': {'1. open': '601.75', '2. high': '637.66', '3. low': '591.01', '4. close': '635.62', '5. adjusted close': '635.62', '6. volume': '39432359', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-29': {'1. open': '615.64', '2. high': '616.48', '3. low': '596.02', '4. close': '611.29', '5. adjusted close': '611.29', '6. volume': '28636985', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-26': {'1. open': '641.87', '2. high': '643.82', '3. low': '599.89', '4. close': '618.71', '5. adjusted close': '618.71', '6. volume': '33852827', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-25': {'1. open': '613.0', '2. high': '645.5', '3. low': '609.5', '4. close': '640.39', '5. adjusted close': '640.39', '6. volume': '39224850', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-24': {'1. open': '667.91', '2. high': '668.02', '3. low': '630.11', '4. close': '630.27', '5. adjusted close': '630.27', '6. volume': '33795174', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-23': {'1. open': '675.77', '2. high': '677.8', '3. low': '657.51', '4. close': '662.16', '5. adjusted close': '662.16', '6. volume': '30491870', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-22': {'1. open': '684.59', '2. high': '699.62', '3. low': '668.75', '4. close': '670.0', '5. adjusted close': '670.0', '6. volume': '39512221', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-19': {'1. open': '646.6', '2. high': '657.23', '3. low': '624.6201', '4. close': '654.87', '5. adjusted close': '654.87', '6. volume': '42893978', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-18': {'1. open': '684.29', '2. high': '689.23', '3. low': '652.0', '4. close': '653.16', '5. adjusted close': '653.16', '6. volume': '33369022', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-17': {'1. open': '656.87', '2. high': '703.73', '3. low': '651.01', '4. close': '701.81', '5. adjusted close': '701.81', '6. volume': '40372453', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-16': {'1. open': '703.35', '2. high': '707.92', '3. low': '671.0', '4. close': '676.88', '5. adjusted close': '676.88', '6. volume': '32195672', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-15': {'1. open': '694.09', '2. high': '713.18', '3. low': '684.04', '4. close': '707.94', '5. adjusted close': '707.94', '6. volume': '29423479', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-12': {'1. open': '670.0', '2. high': '694.88', '3. low': '666.1394', '4. close': '693.73', '5. adjusted close': '693.73', '6. volume': '33583840', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-11': {'1. open': '699.4', '2. high': '702.5', '3. low': '677.18', '4. close': '699.6', '5. adjusted close': '699.6', '6. volume': '36253892', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-10': {'1. open': '700.3', '2. high': '717.85', '3. low': '655.06', '4. close': '668.06', '5. adjusted close': '668.06', '6. volume': '60605672', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-09': {'1. open': '608.18', '2. high': '678.09', '3. low': '595.21', '4. close': '673.58', '5. adjusted close': '673.58', '6. volume': '67523328', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-08': {'1. open': '600.55', '2. high': '620.125', '3. low': '558.79', '4. close': '563.0', '5. adjusted close': '563.0', '6. volume': '51786958', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-05': {'1. open': '626.06', '2. high': '627.8419', '3. low': '539.49', '4. close': '597.95', '5. adjusted close': '597.95', '6. volume': '89396459', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-04': {'1. open': '655.8', '2. high': '668.45', '3. low': '600.0', '4. close': '621.44', '5. adjusted close': '621.44', '6. volume': '64799898', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-03': {'1. open': '687.99', '2. high': '700.7', '3. low': '651.705', '4. close': '653.2', '5. adjusted close': '653.2', '6. volume': '30207960', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-02': {'1. open': '718.28', '2. high': '721.11', '3. low': '685.0', '4. close': '686.44', '5. adjusted close': '686.44', '6. volume': '23732158', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-03-01': {'1. open': '690.11', '2. high': '719.0', '3. low': '685.05', '4. close': '718.43', '5. adjusted close': '718.43', '6. volume': '27136239', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-02-26': {'1. open': '700.0', '2. high': '706.7', '3. low': '659.51', '4. close': '675.5', '5. adjusted close': '675.5', '6. volume': '39767316', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-02-25': {'1. open': '726.15', '2. high': '737.2066', '3. low': '670.58', '4. close': '682.22', '5. adjusted close': '682.22', '6. volume': '38126722', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-02-24': {'1. open': '711.85', '2. high': '745.0', '3. low': '694.17', '4. close': '742.02', '5. adjusted close': '742.02', '6. volume': '36766950', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-02-23': {'1. open': '662.13', '2. high': '713.6099', '3. low': '619.0', '4. close': '698.84', '5. adjusted close': '698.84', '6. volume': '66606882', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-02-22': {'1. open': '762.64', '2. high': '768.5', '3. low': '710.2', '4. close': '714.5', '5. adjusted close': '714.5', '6. volume': '36594555', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-02-19': {'1. open': '795.0', '2. high': '796.7899', '3. low': '777.37', '4. close': '781.3', '5. adjusted close': '781.3', '6. volume': '18958255', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-02-18': {'1. open': '780.9', '2. high': '794.69', '3. low': '776.27', '4. close': '787.38', '5. adjusted close': '787.38', '6. volume': '17957058', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-02-17': {'1. open': '779.09', '2. high': '799.84', '3. low': '762.01', '4. close': '798.15', '5. adjusted close': '798.15', '6. volume': '25878526', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-02-16': {'1. open': '818.0', '2. high': '821.0', '3. low': '792.44', '4. close': '796.22', '5. adjusted close': '796.22', '6. volume': '19802324', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-02-12': {'1. open': '801.26', '2. high': '817.33', '3. low': '785.3306', '4. close': '816.12', '5. adjusted close': '816.12', '6. volume': '23768313', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-02-11': {'1. open': '812.44', '2. high': '829.8799', '3. low': '801.725', '4. close': '811.66', '5. adjusted close': '811.66', '6. volume': '21622753', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-02-10': {'1. open': '843.635', '2. high': '844.82', '3. low': '800.02', '4. close': '804.82', '5. adjusted close': '804.82', '6. volume': '35723444', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-02-09': {'1. open': '855.12', '2. high': '859.8', '3. low': '841.75', '4. close': '849.46', '5. adjusted close': '849.46', '6. volume': '15027305', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-02-08': {'1. open': '869.67', '2. high': '877.77', '3. low': '854.75', '4. close': '863.42', '5. adjusted close': '863.42', '6. volume': '20161719', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-02-05': {'1. open': '845.0', '2. high': '864.77', '3. low': '838.97', '4. close': '852.23', '5. adjusted close': '852.23', '6. volume': '18566637', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-02-04': {'1. open': '855.0', '2. high': '856.5', '3. low': '833.42', '4. close': '849.99', '5. adjusted close': '849.99', '6. volume': '15812661', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-02-03': {'1. open': '877.02', '2. high': '878.08', '3. low': '853.0646', '4. close': '854.69', '5. adjusted close': '854.69', '6. volume': '18343510', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-02-02': {'1. open': '844.68', '2. high': '880.5', '3. low': '842.2006', '4. close': '872.79', '5. adjusted close': '872.79', '6. volume': '23998098', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-02-01': {'1. open': '814.29', '2. high': '842.0', '3. low': '795.5601', '4. close': '839.81', '5. adjusted close': '839.81', '6. volume': '25391385', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-01-29': {'1. open': '830.0003', '2. high': '842.41', '3. low': '780.1', '4. close': '793.53', '5. adjusted close': '793.53', '6. volume': '34990754', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-01-28': {'1. open': '820.0', '2. high': '848.0', '3. low': '801.0', '4. close': '835.43', '5. adjusted close': '835.43', '6. volume': '26378048', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-01-27': {'1. open': '870.35', '2. high': '891.5', '3. low': '858.66', '4. close': '864.16', '5. adjusted close': '864.16', '6. volume': '27333955', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-01-26': {'1. open': '891.38', '2. high': '895.9', '3. low': '871.6', '4. close': '883.09', '5. adjusted close': '883.09', '6. volume': '23131603', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-01-25': {'1. open': '855.0', '2. high': '900.4', '3. low': '838.8201', '4. close': '880.8', '5. adjusted close': '880.8', '6. volume': '41173397', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-01-22': {'1. open': '834.31', '2. high': '848.0', '3. low': '828.62', '4. close': '846.64', '5. adjusted close': '846.64', '6. volume': '20066497', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-01-21': {'1. open': '855.0', '2. high': '855.7199', '3. low': '841.4201', '4. close': '844.99', '5. adjusted close': '844.99', '6. volume': '20598133', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-01-20': {'1. open': '858.74', '2. high': '859.5', '3. low': '837.28', '4. close': '850.45', '5. adjusted close': '850.45', '6. volume': '25665883', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-01-19': {'1. open': '837.8', '2. high': '850.0', '3. low': '833.0', '4. close': '844.55', '5. adjusted close': '844.55', '6. volume': '25366980', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-01-15': {'1. open': '852.0', '2. high': '859.9', '3. low': '819.1', '4. close': '826.16', '5. adjusted close': '826.16', '6. volume': '38777596', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-01-14': {'1. open': '843.39', '2. high': '863.0', '3. low': '838.75', '4. close': '845.0', '5. adjusted close': '845.0', '6. volume': '31266327', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-01-13': {'1. open': '852.76', '2. high': '860.47', '3. low': '832.0', '4. close': '854.41', '5. adjusted close': '854.41', '6. volume': '33312496', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-01-12': {'1. open': '831.0', '2. high': '868.0', '3. low': '827.34', '4. close': '849.44', '5. adjusted close': '849.44', '6. volume': '45985569', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-01-11': {'1. open': '849.4', '2. high': '854.43', '3. low': '803.6222', '4. close': '811.19', '5. adjusted close': '811.19', '6. volume': '59554146', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-01-08': {'1. open': '856.0', '2. high': '884.49', '3. low': '838.39', '4. close': '880.02', '5. adjusted close': '880.02', '6. volume': '75055528', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-01-07': {'1. open': '777.63', '2. high': '816.99', '3. low': '775.2', '4. close': '816.04', '5. adjusted close': '816.04', '6. volume': '51498948', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-01-06': {'1. open': '758.49', '2. high': '774.0', '3. low': '749.1', '4. close': '755.98', '5. adjusted close': '755.98', '6. volume': '44699965', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-01-05': {'1. open': '723.66', '2. high': '740.84', '3. low': '719.2', '4. close': '735.11', '5. adjusted close': '735.11', '6. volume': '32245165', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2021-01-04': {'1. open': '719.46', '2. high': '744.4899', '3. low': '717.1895', '4. close': '729.77', '5. adjusted close': '729.77', '6. volume': '48638189', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-12-31': {'1. open': '699.99', '2. high': '718.72', '3. low': '691.12', '4. close': '705.67', '5. adjusted close': '705.67', '6. volume': '49649928', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-12-30': {'1. open': '672.0', '2. high': '696.6', '3. low': '668.3603', '4. close': '694.78', '5. adjusted close': '694.78', '6. volume': '42846021', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-12-29': {'1. open': '661.0', '2. high': '669.9', '3. low': '655.0', '4. close': '665.99', '5. adjusted close': '665.99', '6. volume': '22910811', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-12-28': {'1. open': '674.51', '2. high': '681.4', '3. low': '660.8', '4. close': '663.69', '5. adjusted close': '663.69', '6. volume': '31553561', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-12-24': {'1. open': '642.99', '2. high': '666.09', '3. low': '641.0', '4. close': '661.77', '5. adjusted close': '661.77', '6. volume': '22865568', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-12-23': {'1. open': '632.2', '2. high': '651.4999', '3. low': '622.5701', '4. close': '645.98', '5. adjusted close': '645.98', '6. volume': '33172972', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-12-22': {'1. open': '648.0', '2. high': '649.88', '3. low': '614.23', '4. close': '640.34', '5. adjusted close': '640.34', '6. volume': '51861644', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-12-21': {'1. open': '666.24', '2. high': '668.5', '3. low': '646.07', '4. close': '649.86', '5. adjusted close': '649.86', '6. volume': '58045264', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-12-18': {'1. open': '668.9', '2. high': '695.0', '3. low': '628.54', '4. close': '695.0', '5. adjusted close': '695.0', '6. volume': '222126194', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-12-17': {'1. open': '628.19', '2. high': '658.82', '3. low': '619.5', '4. close': '655.9', '5. adjusted close': '655.9', '6. volume': '56270144', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-12-16': {'1. open': '628.23', '2. high': '632.5', '3. low': '605.0', '4. close': '622.77', '5. adjusted close': '622.77', '6. volume': '42095813', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-12-15': {'1. open': '643.28', '2. high': '646.9', '3. low': '623.8', '4. close': '633.25', '5. adjusted close': '633.25', '6. volume': '45223559', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-12-14': {'1. open': '619.0', '2. high': '642.7499', '3. low': '610.2001', '4. close': '639.83', '5. adjusted close': '639.83', '6. volume': '52040649', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-12-11': {'1. open': '615.01', '2. high': '624.0', '3. low': '596.8', '4. close': '609.99', '5. adjusted close': '609.99', '6. volume': '46474974', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-12-10': {'1. open': '574.37', '2. high': '627.75', '3. low': '566.34', '4. close': '627.07', '5. adjusted close': '627.07', '6. volume': '67083153', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-12-09': {'1. open': '653.69', '2. high': '654.32', '3. low': '588.0', '4. close': '604.48', '5. adjusted close': '604.48', '6. volume': '71291190', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-12-08': {'1. open': '625.505', '2. high': '651.28', '3. low': '618.5', '4. close': '649.88', '5. adjusted close': '649.88', '6. volume': '64265029', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-12-07': {'1. open': '604.9197', '2. high': '648.7856', '3. low': '603.05', '4. close': '641.76', '5. adjusted close': '641.76', '6. volume': '56309709', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-12-04': {'1. open': '591.01', '2. high': '599.04', '3. low': '585.5', '4. close': '599.04', '5. adjusted close': '599.04', '6. volume': '29401314', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-12-03': {'1. open': '590.02', '2. high': '598.97', '3. low': '582.43', '4. close': '593.38', '5. adjusted close': '593.38', '6. volume': '42552003', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-12-02': {'1. open': '556.44', '2. high': '571.54', '3. low': '541.21', '4. close': '568.82', '5. adjusted close': '568.82', '6. volume': '47775653', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-12-01': {'1. open': '597.59', '2. high': '597.85', '3. low': '572.05', '4. close': '584.76', '5. adjusted close': '584.76', '6. volume': '39133346', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-11-30': {'1. open': '602.21', '2. high': '607.8', '3. low': '554.51', '4. close': '567.6', '5. adjusted close': '567.6', '6. volume': '63003052', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-11-27': {'1. open': '581.16', '2. high': '598.78', '3. low': '578.45', '4. close': '585.76', '5. adjusted close': '585.76', '6. volume': '37561078', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-11-25': {'1. open': '550.06', '2. high': '574.0', '3. low': '545.37', '4. close': '574.0', '5. adjusted close': '574.0', '6. volume': '48930162', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-11-24': {'1. open': '540.4', '2. high': '559.99', '3. low': '526.2', '4. close': '555.38', '5. adjusted close': '555.38', '6. volume': '52058771', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-11-23': {'1. open': '503.5', '2. high': '526.0', '3. low': '501.79', '4. close': '521.85', '5. adjusted close': '521.85', '6. volume': '50260304', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-11-20': {'1. open': '497.99', '2. high': '502.5', '3. low': '489.06', '4. close': '489.61', '5. adjusted close': '489.61', '6. volume': '32911922', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-11-19': {'1. open': '492.0', '2. high': '508.6112', '3. low': '487.57', '4. close': '499.27', '5. adjusted close': '499.27', '6. volume': '62475346', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-11-18': {'1. open': '448.35', '2. high': '496.0', '3. low': '443.5001', '4. close': '486.64', '5. adjusted close': '486.64', '6. volume': '78044024', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-11-17': {'1. open': '460.17', '2. high': '462.0', '3. low': '433.01', '4. close': '441.61', '5. adjusted close': '441.61', '6. volume': '61188281', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-11-16': {'1. open': '408.93', '2. high': '412.45', '3. low': '404.0868', '4. close': '408.09', '5. adjusted close': '408.09', '6. volume': '26838635', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-11-13': {'1. open': '410.85', '2. high': '412.5319', '3. low': '401.66', '4. close': '408.5', '5. adjusted close': '408.5', '6. volume': '19830351', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-11-12': {'1. open': '415.05', '2. high': '423.0', '3. low': '409.52', '4. close': '411.76', '5. adjusted close': '411.76', '6. volume': '19940500', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}, '2020-11-11': {'1. open': '416.45', '2. high': '418.695', '3. low': '410.58', '4. close': '417.13', '5. adjusted close': '417.13', '6. volume': '17357722', '7. dividend amount': '0.0000', '8. split coefficient': '1.0'}}}, broadcast=True, include_self=True)
    # print(api_data['Time Series (Daily)'][yesterday]['1. open'])
    name1 = 'OVV'
    for key in api_data['Time Series (Daily)']: 
        x = models.Stock.query.filter_by(name = name1, dateDB = key ).first()
        # print(x)
        if x is None: 
            addStockDB(api_data['Time Series (Daily)'][key], name1, key)
        else:
            continue


@SOCKETIO.on('root')
def hello_world():
    email = dict(session)['profile']['email']
    SOCKETIO.emit('email', email, broadcast=True, include_self=True)


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
        x = models.User.query.filter_by(name=idinfo['name'], email=idinfo['email']).first()
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
    x = models.User.query.filter_by(name=data_dictionary['name']).first()
    if x is None:
        addNewUserDB(data_dictionary)

    else:
        pass
        # print(x)


@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    """ index function """
    return send_from_directory('./build', filename)


# User session management setup
# https://flask-login.readthedocs.io/en/latest
# login_manager = LoginManager()
# login_manager.init_app(app)


if __name__ == "__main__":
    import functions
    from functions import fetchAPI

    api_data = fetchAPI()

    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        debug=True,
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
