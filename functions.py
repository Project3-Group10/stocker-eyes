import os
from dotenv import load_dotenv, find_dotenv
import requests
import smtplib, ssl

load_dotenv(find_dotenv())
ALPHA_API_KEY = os.getenv('ALPHA_API_KEY')
NEWS_API = os.getenv('GET_NEWS_KEY')
EMAIL_PASSWORD = os.getenv('EMAIL_ACCOUNT_PASSWORD')
SMTP_SERVER = os.getenv('SMTP_SERVER')

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
    
def fetchNews(symbol):
    URL = 'https://newsapi.org/v2/everything?q=' + symbol + '&apiKey=' + NEWS_API
    r = requests.get(URL)
    r = r.json()
    return r
    
# this is to use in order to send emails notification 
def send_email_SSL():
    print("Send_Email_SSL")
    port = 587 # this is SSL
    smtp_server = SMTP_SERVER  # smtp server address 
    sender_email = "dev@activecentury.net" # Enter your email
    receiver_email = "osky.op@gmail" 
    password = EMAIL_PASSWORD
    message = """\
    Subject: Stocker Eyes
    New Notification. A user just logged in"""
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message)
        print("Send_Email_SSL2")

def send_email_starttls():
    print("Send_Email_starttls")
    port = 587 # this is SSL
    smtp_server = SMTP_SERVER  # smtp server address 
    sender_email = "dev@activecentury.net" # Enter your email
    password = EMAIL_PASSWORD 
    receiver_email = "osky.op@gmail" 
    message = """\
    Subject: Stocker Eyes
    New Notification. A user just logged in"""
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
        server.sendmail(sender_email, receiver_email, message)
    except Exception as e:
        print("ERROR1")
        print(e)
    finally:
        server.quit() 
    