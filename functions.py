import os
from dotenv import load_dotenv, find_dotenv
import requests
import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


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

def send_email_starttls():
    print("Send_Email_starttls")
    port = 587 # this is SSL
    smtp_server = SMTP_SERVER  # smtp server address 
    sender_email = "caballoscuba@gmail.com" # Enter your email
    password = EMAIL_PASSWORD 
    receiver_email = "osky.op@gmail.com" 
    #message = """\
    #Subject: Stocker Eyes
   # New Notification. A user just logged in"""
    message = MIMEMultipart("alternative")
    message["Subject"] = "multipart test"
    message["From"] = sender_email
    message["To"] = receiver_email
    # Create the plain-text and HTML version of your message
    text = """\
    Hi,
    This is new Notification 
    Stocker Eyes:
    A user just logged in"""
    html = """\
    <html>
      <body>
        <p>Hi,<br>
           This is new Notification<br>
           <a href="https://stocker-eyes-polish.herokuapp.com/">Stocker Eyes</a> 
           A user just logged in.
        </p>
      </body>
    </html>
    """
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
    