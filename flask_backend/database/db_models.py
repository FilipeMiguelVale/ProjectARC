from flask_backend import db
from datetime import datetime


class Accident(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.JSON, nullable=False)
    n_people = db.Column(db.Integer, nullable=False, default=0)
    n_cars_involved = db.Column(db.Integer, nullable=False, default=0)
    damage = db.Column(db.Float, default=0.0)
    n_people_injured = db.Column(db.Integer, default=0)
    video_location = db.Column(db.String, nullable=True)
    video_id = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, default=datetime.now)

    cars = db.relationship('Car', backref='car', lazy=True)

    def __init__(self, location,video_id,n_people=0,n_cars_involved=0,n_people_injured=0,damage=0.0):
        self.location = location
        self.video_id = video_id
        self.n_people = n_people
        self.n_cars_involved = n_cars_involved
        self.n_people_injured = n_people_injured
        self.damage = damage


class Car(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    velocity = db.Column(db.Float, default=0.0)
    n_people = db.Column(db.Integer, default=0)
    temperature = db.Column(db.Float, default=0.0)
    airbag = db.Column(db.Boolean)
    ABS = db.Column(db.Boolean)  # , nullable=False)
    overturned = db.Column(db.Boolean)  # , nullable=False)
    damage = db.Column(db.Float, default=0.0)

    accident_id = db.Column(db.Integer, db.ForeignKey('accident.id'), nullable=False)

    def __init__(self, velocity, n_people, temperature,airbag, ABS, overturned, damage):
        self.velocity = velocity
        self.n_people = n_people
        self.temperature = temperature
        self.airbag = airbag
        self.ABS = ABS
        self.overturned = overturned
        self.damage = damage
