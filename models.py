from app import DB

#check this.
subs = DB.Table('subs', 
    DB.Column('user_id', DB.Integer, DB.ForeignKey('user.id')),
    DB.Column('stock_id', DB.Integer, DB.ForeignKey('stock.id'))
    )

class User(DB.Model):
    __tablename__ = "users"
    id = DB.Column(DB.Integer, primary_key=True)
    email = DB.Column(DB.String(100), unique=True, nullable=False)
    name = DB.Column(DB.String(100), nullable=True)
    avatar = DB.Column(DB.String(200))
    active = DB.Column(DB.Boolean, default=False)
    tokens = DB.Column(DB.Text)
    #created_at = DB.Column(DB.DateTime, default=datetime.datetime.utcnow())


    def __repr__(self):
        return '<User %r>' % self.name


class Stock(DB.Model):
    __tablename__ = "stock"
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.String(100), nullable=True)
    
    def __repr__(self):
        return '<User %r>' % self.name 

class Crypto(DB.Model):
    __tablename__ = "crypto"
    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.String(100), nullable=True)
    
    def __repr__(self):
        return '<User %r>' % self.name 

