from flask_backend import db
from datetime import datetime


class Accident(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.JSON, nullable=False)
    n_people = db.Column(db.Integer, nullable=False)
    n_cars_involved = db.Column(db.Integer, nullable=False)
    damage = db.Column(db.Float, default=0.0)
    n_people_injured = db.Column(db.Integer, default=0)
    images_folder = db.Column(db.String, unique=True)
    date = db.Column(db.DateTime, default=datetime.utcnow)

    cars = db.relationship('Car', backref='car', lazy=True)

    def __init__(self, location, n_cars_involved):
        self.location = location
        self.n_cars_involved = n_cars_involved


class Car(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    velocity = db.Column(db.Float, default=0.0)
    n_people = db.Column(db.Integer, default=0)
    temperature = db.Column(db.Float, default=0.0)
    ABS = db.Column(db.Boolean)  # , nullable=False)
    overturned = db.Column(db.Boolean)  # , nullable=False)
    damage = db.Column(db.Float, default=0.0)

    accident_id = db.Column(db.Integer, db.ForeignKey('accident.id'), nullable=False)

    def __init__(self, velocity, n_people, temperature, ABS, overturned, damage):
        self.velocity = velocity
        self.n_people = n_people
        self.temperature = temperature
        self.ABS = ABS
        self.overturned = overturned
        self.damage = damage
