
from flask_backend.database.db_schemas import accident_schema, accidents_schema, car_schemas, car_schema
from flask_backend.database.db_models import Accident, Car
from flask import jsonify
from flask_backend.data_processing import isClose

from flask_backend import db

def add_video_to_database(url,video_id):
    accident = Accident.query.get(video_id)
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


