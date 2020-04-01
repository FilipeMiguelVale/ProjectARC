from flask import request, jsonify, render_template
from flask_backend import app, db
from flask_backend.database.db_schemas import accident_schema, accidents_schema
from flask_backend.database.db_models import Accident, Car


@app.route('/')
def home():
    return render_template("index.html")


# Add video
@app.route('/add_video', methods=['POST'])
def add_video():

    #add video to data-base

    return None


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
