from flask import request, jsonify, render_template, flash, redirect # flask

from flask_backend import app, db   # app and database

# database objects and queries
from flask_backend.database.db_schemas import accident_schema, accidents_schema
from flask_backend.database.db_models import Accident, Car
from flask_backend.database.queries import *
from flask_backend.erros import *

# data processing
from flask_backend.data_processing import get_location_address

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


    file = request.files['file']
    id = int(request.values["id"])
    
    filename = file.filename.split(".")
    name = filename[0] + "_" + id # get file name
    file_type = filename[1] #get file type
    filename = secure_filename(name+"."+file_type) 
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename) # create path for file
    file.save(file_path) # save file on directory

    return add_video_to_database(file_path,id) # add path of file to database

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Create a Accident
@app.route('/add_accident', methods=['POST'])
def add_accident():
    location = request.json['location']
    video_id = int(request.json['video_id'])

    accident = get_accident_by_location(location)

    if not accident:
        location["address"] = get_location_address(location["lat"],location["lng"])
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
    return get_accident_by_id(id)


# See All Accident
@app.route('/list_accidents', methods=['GET'])
def get_accidents():
    return get_all_accidents()
