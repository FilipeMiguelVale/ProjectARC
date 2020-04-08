from flask import request, jsonify, render_template, flash, redirect # flask

from flask_backend import app, db   # app and database

# database objects and queries
from flask_backend.database.db_schemas import accident_schema, accidents_schema
from flask_backend.database.db_models import Accident, Car
from flask_backend.database.queries import *
from flask_backend.erros import *

# video adding 
from werkzeug.utils import secure_filename
import os

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif','avi'])


@app.route('/')
def home():
    return render_template("index.html")


# Add video
@app.route('/add_video', methods=['POST'])
def add_video():

    # if 'file' not in request.files:
    #     return jsonify(no_file)
    
    # if 'id' not in request.values:
    #     return jsonify(no_id_video)

    file = request.files['file']
    id = request.values["id"]
    
    # if file.filename == '':
    #     return jsonify(no_file_selected)

    # if not allowed_file(file.filename):
    #     return jsonify(type_not_allowed)

    filename = file.filename.split(".")
    name = filename[0] + "_" + id
    file_type = filename[1]
    filename = secure_filename(name+"."+file_type)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)
    return add_video_to_database(file_path,id)

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Create a Accident
@app.route('/add_accident', methods=['POST'])
def add_accident():
    location = request.json['location']
    video_id = int(request.json['video_id'])

    accident = get_accident_by_location(location)

    if not accident:
        accident = Accident(location,video_id)

    accident.n_cars_involved += 1

    n_people = request.json["n_people"]
    accident.n_people += request.json["n_people"] 

    velocity = request.json["velocity"]
    ABS = request.json["ABS"]
    temperature = request.json["temperature"]
    airbag = request.json["airbag"]
    overturned = request.json["overturned"]
    damage = request.json["damage"]
    accident.damage += damage
    
    car = Car(velocity,n_people,temperature,airbag,
    ABS,overturned,damage)

    add_accident_to_database(accident,car)
    
    return accident_schema.jsonify(accident)


# See Accident
@app.route('/accident/<id>', methods=['GET'])
def get_accident(id):
    accident = Accident.query.get(id)
    return accident_schema.jsonify(accident)


# See All Accident
@app.route('/list_accidents', methods=['GET'])
def get_accidents():
    all_accidents = Accident.query.all()
    result = accidents_schema.dump(all_accidents)
    return jsonify(result)
