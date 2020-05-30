
from flask_backend.database.db_schemas import *
from flask_backend.database.db_models import *
from flask import jsonify
from flask_backend.data_processing import isClose, same_timestamp
from flask_backend import db, login_manager


def change_accident_status(id,status):
    accident = get_accident_by(id, filter="id_only_accident")
    accident.status = status
    db.session.commit()
    return accident_schema.jsonify(accident)

def change_accident_injured(id,injured):
    accident = get_accident_by(id, filter="id_only_accident")
    accident.n_people_injured = injured
    db.session.commit()
    return accident_schema.jsonify(accident)

def add_video_to_database(id):

    accident = get_accident_by(id,filter="video_id")
       
    accident.video_total += 1

    db.session.commit()

    return accident_schema.jsonify(accident)

def add_accident_to_database(accident,car):

    db.session.add(accident)
    db.session.commit()
    car.accident_id = accident.id
    db.session.add(car)
    db.session.commit()
    print(car.accident_id)

def get_num_accidents():
    return Accident.query.count()

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

    if filter == "id_only_accident":
        accident = Accident.query.get(value)
        return accident

    if filter == "between":
        accident = Accident.query.all()
        result = accidents_schema.dump(accident)
        v = result[-value[1]:len(result)-value[0]]
        return jsonify(v[::-1])

    if filter == "cars":
        accident = Accident.query.all()
        result = accidents_schema.dump(accident)
        result.sort(key=lambda x: x.get('n_cars_involved'))
        v = result[-value[1]:len(result)-value[0]]
        return jsonify(v[::-1])

    if filter == "people":
        accident = Accident.query.all()
        result = accidents_schema.dump(accident)
        result.sort(key=lambda x: x.get('n_people'))
        v = result[-value[1]:len(result)-value[0]]
        return jsonify(v[::-1])

    if filter == "injured":
        accident = Accident.query.all()
        result = accidents_schema.dump(accident)
        result.sort(key=lambda x: x.get('n_people_injured'))
        v = result[-value[1]:len(result) - value[0]]
        return jsonify(v[::-1])

    if filter == "severity":
        accident = Accident.query.all()
        result = accidents_schema.dump(accident)
        result.sort(key=lambda x: x.get('damage'))
        v = result[-value[1]:len(result) - value[0]]
        return jsonify(v[::-1])

    if filter == "status":
        accident = Accident.query.all()
        result = accidents_schema.dump(accident)
        result.sort(key=lambda x: x.get('status'),reverse=True)
        v = result[-value[1]:len(result) - value[0]]
        return jsonify(v[::-1])
#Login queries

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

