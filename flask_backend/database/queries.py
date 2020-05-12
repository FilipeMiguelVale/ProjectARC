
from flask_backend.database.db_schemas import *
from flask_backend.database.db_models import *
from flask import jsonify
from flask_backend.data_processing import isClose, same_timestamp
from flask_backend import db, login_manager


def add_video_to_database(id,url):

    accident = get_accident_by(id,filter="video_id")
       
    accident.video_location = url

    db.session.commit()

    return accident_schema.jsonify(accident)

def add_accident_to_database(accident,car):

    db.session.add(accident)
    db.session.commit()
    car.accident_id = accident.id
    db.session.add(car)
    db.session.commit()
    print(car.accident_id)

def get_accident_by(value,**options):

    filter = options.get("filter")

    if filter == "belongs":
        location = (float(value["lat"]),float(value["lng"]))
        accidents = Accident.query.all()
        result = accidents_schema.dump(accidents)
        for accident in list(accidents):
            lat = float(accident.location["lat"])
            lng = float(accident.location["lng"])
            timestamp = accident.date
            loc = isClose(location,(lat,lng))
            tim = same_timestamp(timestamp)
            if loc and tim:
                return accident

        return None

    if filter == "video_id":
        accident = Accident.query.filter_by(video_id=value).first()

        if not accident:
            return None
        
        return accident

    if filter == "all":
        all_accidents = Accident.query.all()
        result = accidents_schema.dump(all_accidents)
        return jsonify(result)
        
    if filter == "id":
        accident = Accident.query.get(value)
        return accident_schema.jsonify(accident)

    if filter == "between":
        accident = Accident.query.all()
        result = accidents_schema.dump(accident)
        v = result[-value[1]:len(result)-value[0]]
        return jsonify(v[::-1])
#Login queries

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
