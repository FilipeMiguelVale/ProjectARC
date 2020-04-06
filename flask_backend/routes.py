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

    if 'file' not in request.files:
        return jsonify(no_file)
    
    if 'id' not in request.values:
        return jsonify(no_id_video)

    file = request.files['file']
    id = request.values["id"]
    
    if file.filename == '':
        return jsonify(no_file_selected)

    if not allowed_file(file.filename):
        return jsonify(type_not_allowed)

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
    number_cars = request.json['n_cars']

    location = request.json['location']

    new_accident = Accident(location, number_cars)

    n_total_people = 0

    # cars
    cars = []
    for car_id in [1, number_cars]:
        n_people = request.json['car'][str(car_id)]['n_people']
        car = Car(0.0, n_people, 0.0, False, False, 0.0)
        car.n_people = n_people
        n_total_people += n_people
        cars.append(car)

    new_accident.n_people = n_total_people

    db.session.add(new_accident)

    db.session.commit()

    for car_cl in cars:
        car_cl.accident_id = new_accident.id
        db.session.add(car_cl)

    db.session.commit()

    return accident_schema.jsonify(new_accident)


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
