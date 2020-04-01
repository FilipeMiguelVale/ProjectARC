from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

import os

app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))
bddir = os.path.join(basedir, 'database')

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(bddir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# init db

db = SQLAlchemy(app)

# init ma

ma = Marshmallow(app)

from flask_backend import routes




