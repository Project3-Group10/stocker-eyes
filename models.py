from app import DB

#Many to many relationship table User and Stocks
user_identifie = DB.Table('user_identifie',
    DB.Column('stock_id', DB.Integer, DB.ForeignKey('stocks.stock_id')),
    DB.Column('user_id', DB.String(200), DB.ForeignKey('users.user_id'))
)
#User table 
class UserG(DB.Model):
    __tablename__ = 'users'
    user_id = DB.Column(DB.String(200), primary_key=True)
    email = DB.Column(DB.String(100), nullable=True)
    name = DB.Column(DB.String(100), nullable=True)
    avatar = DB.Column(DB.String(200))
    #status = DB.Column(DB.Boolean, default=False)
    #tokens = DB.Column(DB.Text)
    #stocks = DB.relationship('Stock', secondary=association_table, backref='User')
  
    def __repr__(self):
        return f"UserG('{self.user_id}', '{self.email}', '{self.name}', '{self.avatar}')"

#Stock Table 
class Stock(DB.Model):
    __tablename__ = "stocks"
    stock_id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.String(20), nullable=False)
    dateDB = DB.Column(DB.String(20), nullable=False)
    open_price = DB.Column(DB.String(100))
    high_price = DB.Column(DB.String(100))
    low_price = DB.Column(DB.String(100))
    close_price = DB.Column(DB.String(100))
    adjusted_clase_price = DB.Column(DB.String(100))
    volume_price = DB.Column(DB.String(100))
    users = DB.relationship("UserG",
                               secondary=user_identifie, 
                               backref=DB.backref('stocks', lazy='dynamic'))
    def __repr__(self):
        return f"Stock('{self.stock_id}', '{self.name}', '{self.dateDB}', '{self.open_price}','{self.high_price}', '{self.low_price}', '{self.close_price}', '{self.adjusted_clase_price}','{self.volume_price}')"

#Crypto Table do the relationship TODO 
class Crypto(DB.Model):
    #__tablename__ = "crypto"
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.String(100), primary_key=True)
    closeprice = DB.Column(DB.String(100), nullable=False)
    
    def __repr__(self):
        return f"Crypto('{self.name}', '{self.closeprice}')"

