from flask_backend.database.db_schemas import accident_schema, accidents_schema
from flask_backend.database.db_models import Accident, Car
from flask import jsonify

from flask_backend import db

def add_video_to_database(url,video_id):
    accident = Accident.query.get(video_id)
    if not accident:
        return jsonify({"Error": "NO_ACCIDENT_IN_DATABASE"})
    
    accident.video_location = url

    db.session.commit()

    return accident_schema.jsonify(accident)