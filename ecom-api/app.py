from flask import Flask, request, make_response, jsonify
from dotenv import load_dotenv
from flask_migrate import Migrate
from flask_cors import CORS
import bcrypt
import os

from models import db, Product, Brand, User, Cart, CartItem

app = Flask(__name__)

load_dotenv()

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URI")

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)


@app.route("/products")
def handle_products():
    query = db.session.query(Product, Brand).join(Brand).all()
    results = [{"name": product.name, "brand": brand.name, "description": product.description, "image": product.image, "id": product.id, "quantity": product.quantity, "price": product.price}
               for product, brand in query]
    return make_response(jsonify({'status': 'success', "count": len(results), "products": results})), 200


@app.route("/brands")
def handle_brands():
    query = db.session.query(Brand).all()
    results = [{"id": brand.id, "name": brand.name} for brand in query]
    return make_response(jsonify({'status': 'success', "count": len(results), "brands": results})), 200


@app.route("/cart", methods=['GET', 'POST', 'DELETE', 'PUT'])
def handle_cart():
    auth_header = request.headers.get('Authorization')
    if auth_header:
        auth_token = auth_header.split(" ")[1]
        if auth_token:
            user_id = User.decode_auth_token(auth_token)
            if not isinstance(id, str):
                cart = Cart.query.filter_by(user_id=user_id).first()
                if request.method == 'GET':
                    if cart:
                        results = db.session.query(CartItem, Product, Brand).filter(CartItem.cart_id == cart.id).join(
                            Product, CartItem.product_id == Product.id).join(Brand, Product.brand_id == Brand.id).all()
                        total = 0
                        items = []
                        for item, product, brand in results:
                            total += item.quantity*product.price
                            items.append({"id": item.id, "product_id": product.id, "name": product.name, "price": product.price,
                                          "quantity": item.quantity, "image": product.image, "brand": brand.name})
                        response = {
                            'status': 'success',
                            'total': total,
                            "items": items
                        }
                    else:
                        response = {
                            'status': 'success',
                            'total': 0,
                            "items": []
                        }

                    return make_response(jsonify(response)), 200
                elif request.method == 'POST':
                    data = request.get_json()
                    oldItem = CartItem.query.filter_by(
                        cart_id=cart.id, product_id=data['product_id']).first()

                    if oldItem:
                        response = {
                            'status': 'fail',
                            'message': 'Item already exist in cart'
                        }
                        return make_response(jsonify(response)), 403
                    (product, brand) = db.session.query(Product, Brand).filter(
                        Product.id == data['product_id']).join(Brand).first()
                    item = CartItem(cart.id, data.get(
                        'product_id'), data.get('quantity'))
                    db.session.add(item)
                    db.session.commit()
                    result = {"id": item.id, "product_id": product.id, "name": product.name, "price": product.price,
                              "quantity": item.quantity, "image": product.image, "brand": brand.name}
                    return make_response(jsonify({'status': 'success', 'item': result})), 200
                elif request.method == 'DELETE':
                    args = request.args
                    cartItem = CartItem.query.filter_by(
                        id=args['cart_item_id']).first()
                    if cartItem:
                        db.session.delete(cartItem)
                        db.session.commit()
                    return make_response(jsonify({'status': 'success'})), 200
                elif request.method == 'PUT':
                    args = request.args
                    data = request.get_json()
                    cartItem = CartItem.query.filter_by(
                        id=args['cart_item_id']).first()
                    if cartItem:
                        cartItem.quantity = data['quantity']
                        db.session.commit()
                        return make_response(jsonify({'status': 'success'})), 200
                    response = {
                        'status': 'fail',
                        'message': 'Cannot update'
                    }
                    return make_response(jsonify(response)), 401
            response = {
                'status': 'fail',
                'message': user_id
            }
            return make_response(jsonify(response)), 401
    response = {
        'status': 'fail',
        'message': 'Authentication failed'
    }
    return make_response(jsonify(response)), 401


@app.route("/me", methods=['POST'])
def me():
    # get the auth token
    auth_header = request.headers.get('Authorization')
    if auth_header:
        auth_token = auth_header.split(" ")[1]
    else:
        auth_token = ''
    if auth_token:
        resp = User.decode_auth_token(auth_token)
        if not isinstance(resp, str):
            user = User.query.filter_by(id=resp).first()
            responseObject = {
                'status': 'success',
                'data': {
                    'id': user.id,
                    'email': user.email,
                    'phone': user.phone,
                    'address': user.address
                }
            }
            return make_response(jsonify(responseObject)), 200
        responseObject = {
            'status': 'fail',
            'message': resp
        }
        return make_response(jsonify(responseObject)), 401
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return make_response(jsonify(responseObject)), 401


@app.route("/register", methods=['POST'])
def register():
    data = request.get_json()
    if request.method == 'POST':
        email = data['email']
        password = data['password']
        address = data['address']
        phone = data['phone']

        if email == '' or password == '':
            response = {'status': 'fail',
                        "message": "Required feilds are missing"}
            return make_response(jsonify(response)), 400

        user = User.query.filter_by(email=email).first()
        if not user:
            try:
                user = User(email, password, address, phone)
                db.session.add(user)
                db.session.commit()
                cart = Cart(user.id)
                db.session.add(cart)
                db.session.commit()
                auth_token = user.encode_auth_token(user.id)
                response = {
                    'status': 'success',
                    'message': 'Successfully registered.',
                    'auth_token': auth_token
                }
                return make_response(jsonify(response)), 200
            except Exception as e:
                print(e)
                response = {
                    'status': 'fail',
                    'message': 'Some error occurred. Please try again.'
                }
                return make_response(jsonify(response)), 401

        else:
            response = {
                'status': 'fail',
                'message': 'User already exists. Please Log in.',
            }
            return make_response(jsonify(response)), 400


@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    try:
        # fetch the user data
        user = User.query.filter_by(
            email=data.get('email')
        ).first()
        if not user:
            response = {
                'status': 'fail',
                'message': 'User doesnt exist'
            }
            return make_response(jsonify(response)), 403
        auth_token = user.encode_auth_token(user.id)
        if bcrypt.checkpw(data.get('password').encode('utf-8'), user.password.encode('utf-8')):
            auth_token = user.encode_auth_token(user.id)
            if auth_token:
                responseObject = {
                    'status': 'success',
                    'message': 'Successfully logged in.',
                    'auth_token': auth_token
                }
                return make_response(jsonify(responseObject)), 200
        else:
            response = {
                'status': 'fail',
                'message': 'Incorrect email password combination'
            }
            return make_response(jsonify(response)), 404
    except Exception as e:
        response = {
            'status': 'fail',
            'message': 'Some error occured '+str(e)
        }
        return make_response(jsonify(response)), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
