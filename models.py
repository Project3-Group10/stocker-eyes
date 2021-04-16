from app import DB

#Many to many relationship table 
#association_table = DB.Table('association_table',
 #   DB.Column('id', DB.Integer, primary_key=True), 
   # DB.Column('user_id', DB.Integer, DB.ForeignKey('user.id')),
   # DB.Column('stock_id', DB.Integer, DB.ForeignKey('stock.id'))
  #  )

#User table 
class User(DB.Model):
   # __tablename__ = 'user'
    id = DB.Column(DB.Integer, primary_key=True)
    email = DB.Column(DB.String(100), unique=True, nullable=False)
    name = DB.Column(DB.String(100), nullable=True)
    avatar = DB.Column(DB.String(200))
    status = DB.Column(DB.Boolean, default=False)
   
    #tokens = DB.Column(DB.Text)
    #stocks = DB.relationship('Stock', secondary=association_table, backref='User')
  
    def __repr__(self):
        return '<User %r>' % self.name

#Stock Table 
class Stock(DB.Model):
    __tablename__ = "stock"
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.String(100), nullable=True)
   # users = DB.relationship('User', secondary=association_table, backref='Stock')
    
    def __repr__(self):
        return '<Stock %r>' % self.name 

#Crypto Table do the relationship TODO 
class Crypto(DB.Model):
    __tablename__ = "crypto"
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.String(100), nullable=True)
    
    def __repr__(self):
        return '<Crypto %r>' % self.name 

