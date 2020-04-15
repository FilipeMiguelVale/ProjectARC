from flask import request, jsonify, render_template, flash, redirect, send_from_directory # flask

from flask_backend import app, db   # app and database

# database objects and queries
from flask_backend.database.db_schemas import accident_schema, accidents_schema
from flask_backend.database.db_models import Accident, Car
from flask_backend.database.queries import *
from flask_backend.erros import *
from flask_login import login_user, login_required, logout_user, current_user
# data processing
from flask_backend.data_processing import get_location_address, convert_avi_to_mp4

# video adding 
from werkzeug.utils import secure_filename
import os

ALLOWED_EXTENSIONS = set(['avi'])



@app.route('/login/request', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['passwd']
    print(email)
    print(password)
    if email == "admin@admin" and password == "admin" :
        return jsonify({"response":"Done"})
    else:
        return jsonify({"error":"Invalid username or password"})

@app.route('/admin')
@login_required
def web():
    return render_template("index.html")

@app.route('/')
def index():
    user = User.query.filter_by(username='admin').first()
    login_user(user)
    return render_template("index.html")

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return "you are logged out"

@app.route('/home')
@login_required
def home():
    return "The current user is " + current_user.username

#convert format

# Add video
@app.route('/add_video', methods=['POST'])
def add_video():

    file = request.files['file']
    id = request.values["id"]

    if  file.filename.split(".")[1] != "avi":
        return jsonify(video_type_not_allowed)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], id + ".avi") # create path for file
    file.save(file_path) # save file on directory
    convert_avi_to_mp4(id)
    return add_video_to_database(id + ".mp4",id) # add path of file to database


def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Get Video
@app.route('/video/<path:path_to_file>', methods=['GET'])
def get_video(path_to_file):
    return send_from_directory(app.config['UPLOAD_FOLDER'],filename=path_to_file, as_attachment=True)

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
