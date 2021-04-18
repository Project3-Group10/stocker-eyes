""" SERVER APP.PY  """
import os
from flask import Flask, send_from_directory, json, redirect, request, url_for, redirect, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from functions import fetchAPI
from dotenv import load_dotenv, find_dotenv
from datetime import timedelta
import requests
import models

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

APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

DB = SQLAlchemy(APP)
DB.create_all()

CORSAPP = CORS(APP, resources={r"/*": {"origins": "*"}})
SOCKETIO = SocketIO(APP,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)


@SOCKETIO.on('connect')
def on_connect():
    print('User connected!')
    SOCKETIO.emit('googleInfo', {'googleId': GOOGLE_CLIENT_ID})
    # print(data)
    print('GOOGLE SIGNED IN!')
    SOCKETIO.emit('stock_data', api_data, broadcast=True, include_self=True)
    

@SOCKETIO.on('root')
def hello_world():
    email = dict(session)['profile']['email']
    SOCKETIO.emit('email', email, broadcast=True, include_self=True)

@SOCKETIO.on('isLoggedIn')
def isLoggedIn(data):    
    print("HELLO PLESE CHECK THIS")
    print(data)

@SOCKETIO.on('logged_in')
def login(data):
    print(data)
    print(data['Qs'])
    print(data['Qs']['oT'])
    data_dictionary = {
        'name': data['Qs']['oT'],  # + data['Qs']['kR'],
        'imageUri': data['Qs']['EI'],
        'emailAddress': data['Qs']['zt'],
        'status': True
    }
    SOCKETIO.emit('logged_in', data_dictionary, broadcast=True, include_self=True)


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