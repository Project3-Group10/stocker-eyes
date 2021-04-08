import os
from dotenv import load_dotenv, find_dotenv
import requests

load_dotenv(find_dotenv())
def fetchAPI():
    ALPHA_API_KEY = os.getenv('Alpha_Vantage_Key')
    SYMBOL = 'TSLA'
    URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + SYMBOL + '&outputsize=compact&apikey=' + ALPHA_API_KEY
    r = requests.get(URL)
    r = r.json()
    print('returned r')
    return r