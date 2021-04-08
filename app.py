import os
from flask import Flask, send_from_directory, json, redirect, request, url_for, redirect, session
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
from datetime import timedelta
import requests
import models

load_dotenv(find_dotenv())  

app = Flask(__name__, static_folder='./build/static')

app.secret_key = os.getenv("APP_SECRET_KEY")
app.config['SESSION_COOKIE_NAME'] = 'google-login-session'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=5)

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", None)
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", None)
GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
    )
    
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
db.create_all()
cors = CORS(app, resources={r"/*": {"origins": "*"}})

socketio = SocketIO(app,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)

@socketio.on('connect')
def on_connect():
    print('User connected!')
    socketio.emit('googleInfo', {'googleId': GOOGLE_CLIENT_ID})
    


@socketio.on('root')
def hello_world():
    email = dict(session)['profile']['email']
    socketio.emit('email', email, broadcast = True, include_self = True)

@socketio.on('logged_in')
def login(data):
    print(data)
    print(data['Qs'])
    print(data['Qs']['oT'])
    data_dictionary = {
        'name' : data['Qs']['oT'], #+ data['Qs']['kR'],
        'imageUri' : data['Qs']['EI'],
        'emailAddress' : data['Qs']['zt'],
        'status' : True
    }
    socketio.emit('logged_in', data_dictionary, broadcast=True, include_self=True)
    
    
    




    
@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

# User session management setup
# https://flask-login.readthedocs.io/en/latest
#login_manager = LoginManager()
#login_manager.init_app(app)



if __name__ == '__main__':

    
    app.run(
    host=os.getenv('IP', '0.0.0.0'),
    debug = True,
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )