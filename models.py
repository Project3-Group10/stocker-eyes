from app import db


class Person(db.Model):
    username = db.Column(db.String(80), primary_key=True)
    score = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<Person %r>' % self.username
