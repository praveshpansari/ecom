import datetime
import os
import bcrypt
import jwt

from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()


class Product(db.Model):
    __tablename__ = 'product'

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String())
    name = db.Column(db.String(200))
    brand_id = db.Column(db.Integer, db.ForeignKey('brand.id'), nullable=False)
    description = db.Column(db.Text())
    price = db.Column(db.Float)
    quantity = db.Column(db.Integer)

    def __init__(self, name, brand, description, price, qty):
        self.name = name
        self.brand = brand
        self.description = description
        self.price = price
        self.qty = qty

    def __repr__(self):
        return '<id {}>'.format(self.id)


class Brand(db.Model):
    __tablename__ = 'brand'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<id {}>'.format(self.id)


class Cart(db.Model):
    __tablename__ = 'cart'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.id'), nullable=False, unique=True)

    def __init__(self, user_id):
        self.user_id = user_id

    def __repr__(self):
        return '<id {}>'.format(self.id)


class CartItem(db.Model):
    __tablename__ = 'cart_item'

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey('cart.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        'product.id'), nullable=False)
    quantity = db.Column(db.Integer)

    def __init__(self, cart_id, product_id, quantity):
        self.cart_id = cart_id
        self.product_id = product_id
        self.quantity = quantity

    def __repr__(self):
        return '<id {}>'.format(self.id)


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    address = db.Column(db.String())
    phone = db.Column(db.String(20))
    password = db.Column(db.String(128), nullable=False)

    def __init__(self, email, password, address, phone):
        self.email = email
        self.password = bcrypt.hashpw(
            password.encode('utf-8'), bcrypt.gensalt()).decode()
        self.address = address
        self.phone = phone

    def encode_auth_token(self, user_id):
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
                'iat': datetime.datetime.utcnow(),
                'sub': user_id
            }
            return jwt.encode(
                payload,
                os.environ.get('SECRET'),
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        try:
            payload = jwt.decode(auth_token, os.environ.get(
                'SECRET'), algorithms=["HS256"])
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'

    def __repr__(self):
        return '<id {}>'.format(self.id)
