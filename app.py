""" SERVER APP.PY  """
import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from functions import fetchAPI 



APP = Flask(__name__, static_folder='./build/static')


CORSAPP = CORS(APP, resources={r"/*": {"origins": "*"}})
SOCKETIO = SocketIO(APP,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)


@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')


def index(filename):
    """ index function """
    return send_from_directory('./build', filename)


@SOCKETIO.on('connect')
def on_connect():
    print('connected')
    print(fetchAPI())
    SOCKETIO.emit('stock_data', fetchAPI(), broadcast=True, include_self=True)
    
    

# if __name__ == "__main__":
    
    
SOCKETIO.run(
    APP,
    host=os.getenv('IP', '0.0.0.0'),
    debug=True,
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)
