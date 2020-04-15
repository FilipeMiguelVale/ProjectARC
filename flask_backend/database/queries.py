
from flask_backend.database.db_schemas import *
from flask_backend.database.db_models import *
from flask import jsonify
from flask_backend.data_processing import isClose
from flask_backend import db, login_manager


def add_video_to_database(url,id=3):
    accident = Accident.query.filter_by(video_id=id).first()

    if not accident:
     return jsonify({"Error": "NO_ACCIDENT_IN_DATABASE"})
    
    accident.video_location = url

    db.session.commit()

    return accident_schema.jsonify(accident)

def add_accident_to_database(accident,car):

    db.session.add(accident)
    db.session.commit()
    car.accident_id = accident.id
    db.session.add(car)
    db.session.commit()
    

def get_accident_by_location(location):

    location = (float(location["lat"]),float(location["lng"]))

    accidents = Accident.query.all()
    result = accidents_schema.dump(accidents)
    for accident in result:
        lat = float(accident["location"]["lat"])
        lng = float(accident["location"]["lng"])
        if isClose(location,(lat,lng)):
            return Accident.query.get(accident["id"])
    
    return None


def get_accident_by_id(id):
    accident = Accident.query.get(id)
    
    return accident_schema.jsonify(accident)


def get_all_accidents():
    all_accidents = Accident.query.all()
    result = accidents_schema.dump(all_accidents)
    return jsonify(result)


#Login queries

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
