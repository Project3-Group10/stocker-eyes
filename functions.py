import os
from dotenv import load_dotenv, find_dotenv
import requests
import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import requests_cache


load_dotenv(find_dotenv())
ALPHA_API_KEY = os.getenv('ALPHA_API_KEY')
NEWS_API = os.getenv('GET_NEWS_KEY')
EMAIL_PASSWORD = os.getenv('EMAIL_ACCOUNT_PASSWORD')
SMTP_SERVER = os.getenv('SMTP_SERVER')

def myStockInfo(StockSymbol_1, StockSymbol_2, StockSymbol_3): 
    URL_1 = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + StockSymbol_1 + '&apikey=' + ALPHA_API_KEY
    URL_2 = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + StockSymbol_2 + '&apikey=' + ALPHA_API_KEY
    URL_3 = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + StockSymbol_3 + '&apikey=' + ALPHA_API_KEY
    
    requests_cache.install_cache('myStock1', expire_after=86400)
    response_1 = requests.get(URL_1)

    requests_cache.install_cache('myStock2', expire_after=86400)
    response_2 = requests.get(URL_2)

    requests_cache.install_cache('myStock3', expire_after=86400)
    response_3 = requests.get(URL_3)
    
    response_1 = response_1.json()
    response_2 = response_2.json()
    response_3 = response_3.json()

    return [response_1, response_2, response_3]
	
def myStockNewsInfo (StockSymbol_1, StockSymbol_2, StockSymbol_3):
    URL_1 = 'https://newsapi.org/v2/everything?q=' + StockSymbol_1 + '&apiKey=' + NEWS_API
    URL_2 = 'https://newsapi.org/v2/everything?q=' + StockSymbol_2 + '&apiKey=' + NEWS_API
    URL_3 = 'https://newsapi.org/v2/everything?q=' + StockSymbol_3 + '&apiKey=' + NEWS_API
    
    requests_cache.install_cache('myStockNews1', expire_after=86400)
    response_1 = requests.get(URL_1)
    
    requests_cache.install_cache('myStockNews2', expire_after=86400)
    response_2 = requests.get(URL_2)

    requests_cache.install_cache('myStockNews3', expire_after=86400)
    response_3 = requests.get(URL_3)
    
    response_1 = response_1.json()
    response_2 = response_2.json()
    response_3 = response_3.json()

    return {StockSymbol_1: response_1, StockSymbol_2: response_2, StockSymbol_3: response_3}

def searchStock(symbol):
    URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + symbol + '&apikey=' + ALPHA_API_KEY
    cacheName = "{}StockDataFromSearch".format(symbol)
    requests_cache.install_cache(cacheName, expire_after=86400)
    response = requests.get(URL)
    response = response.json()
    return response
    
def fetchNews(symbol):
    URL = 'https://newsapi.org/v2/everything?q=' + symbol + '&apiKey=' + NEWS_API
    cacheName = "{}NewsData".format(symbol)
    requests_cache.install_cache(cacheName, expire_after=86400)
    r = requests.get(URL)
    r = r.json()
    return r
    
# this is to use in order to send emails notification 
def send_email_SSL():
    print("Send_Email_SSL")
    port = 465 # this is SSL
    smtp_server = SMTP_SERVER  # smtp server address 
    sender_email = "caballoscuba@gmail.com" # Enter your email
    receiver_email = "osky.op@gmail.com" 
    password = EMAIL_PASSWORD
    message = """\
    Subject: Stocker Eyes
    
    New Notification. A user just logged in"""
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message)
        print("Send_Email_SSL2")

def send_email_starttls(email, textEmail, html1):
    print("Send_Email_starttls")
    port = 587 # this is SSL
    smtp_server = SMTP_SERVER  # smtp server address 
    sender_email = "caballoscuba@gmail.com" # Enter your email
    password = EMAIL_PASSWORD 
    receiver_email = email 
    #message = """\
    #Subject: Stocker Eyes
   # New Notification. A user just logged in"""
    message = MIMEMultipart("alternative")
    message["Subject"] = "Stocker-Eyes Notification"
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Cc"] = "oo89@njit.edu"
    # Create the plain-text and HTML version of your message
    text = textEmail
    html = html1
    # Turn these into plain/html MIMEText objects
    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")
    
    # Add HTML/plain-text parts to MIMEMultipart message
    # The email client will try to render the last part first
    message.attach(part1)
    message.attach(part2)
    
    # Create a secure SSL context
    context = ssl.create_default_context()
    
    # Try to log in to server and send email
    try:
        print("Send_Email_starttls2")
        server = smtplib.SMTP(smtp_server,port)
        server.ehlo() # Can be omitted
        server.starttls(context=context) # Secure the connection
        server.ehlo() # Can be omitted
        server.login(sender_email, password)
        
        #Send email here
        server.sendmail(sender_email, receiver_email, message.as_string())
    except Exception as e:
        print("ERROR1")
        print(e)
    finally:
        server.quit() 
    