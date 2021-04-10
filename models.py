from app import db

#check this.
subs = db.Table('subs', 
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('stock_id', db.Integer, db.ForeignKey('stock.id'))
    )

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=True)
    avatar = db.Column(db.String(200))
    active = db.Column(db.Boolean, default=False)
    tokens = db.Column(db.Text)
    #created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow())


    def __repr__(self):
        return '<User %r>' % self.name


class Stock(db.Model):
    __tablename__ = "stock"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=True)
    
    def __repr__(self):
        return '<User %r>' % self.name 

class Crypto(db.Model):
    __tablename__ = "crypto"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=True)
    
    def __repr__(self):
        return '<User %r>' % self.name 

