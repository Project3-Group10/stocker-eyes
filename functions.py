import os
from dotenv import load_dotenv, find_dotenv
import requests

load_dotenv(find_dotenv())
ALPHA_API_KEY = os.getenv('ALPHA_API_KEY')

def fetchAPI():
    SYMBOL = 'OVV'
    URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + SYMBOL + '&outputsize&apikey=' + ALPHA_API_KEY
    r = requests.get(URL)
    r = r.json()
    return r

def searchStock(symbol):
    URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + symbol + '&outputsize&apikey=' + ALPHA_API_KEY
    r = requests.get(URL)
    r = r.json()
    return r