from flask import Flask,render_template,url_for
from flask_sqlalchemy import SQLAlchemy

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///store.db'
db = SQLAlchemy(app)


class Product(db.Model):
  id = db.Column(db.Integer, primary_key =True)
  name = db.Column(db.String(120), nullable=False)
  price = db.Column(db.Integer, nullable=False)
  image = db.Column(db.String(200), nullable=False)
  category = db.Column(db.String(50),nullable=False)
  description =db.Column(db.String(300))

@app.route('/')
@app.route('/index')
def index():
  return render_template('index.html')

@app.route('/shirts')
def shirts():
  products = Product.query.filter_by(category='shirts').all()
  return render_template('shirts.html', products=products)

@app.route('/collections')
def collections():
  return render_template('collections.html')

@app.route('/pant')
def pant():
  products = Product.query.filter_by(category='pant').all()
  return render_template('pant.html',products=products)

@app.route('/nightpant')
def nightpant():
  products = Product.query.filter_by(category='nightpant').all()
  return render_template('nightpant.html',products=products)



if __name__ == "__main__":
  app.run(debug=True)