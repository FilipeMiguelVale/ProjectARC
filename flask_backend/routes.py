from flask import request, jsonify, render_template, flash, redirect, send_from_directory # flask
from flask_login import login_user, login_required, logout_user, current_user
from flask_backend import app, db   # app and database

# database objects and queries
from flask_backend.database.db_schemas import accident_schema, accidents_schema
from flask_backend.database.db_models import Accident, Car
from flask_backend.database.queries import *
from flask_backend.erros import *


# data processing
from flask_backend.data_processing import get_location_address, severity_calc

#media
from flask_backend.media_processing import init_media,convert_avi_to_mp4

# video adding 
import os,re

ALLOWED_EXTENSIONS = set(['avi','mp4'])

@app.route('/login/request', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['passwd']
    print(email)
    print(password)
    if can_login(email,password):
        print(user_schema.dump(User.query.filter_by(email=email,password=password).first()))
        login_user(can_login(email,password))
        return jsonify({"response":"Done"})
    else:
        return jsonify({"error":"Invalid username or password"})

@app.route('/#admin')
@login_required
def web():
    return render_template("index.html")

@app.route('/')
def index():

    return render_template("index.html")

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return "you are logged out"

@app.route('/home')
@login_required
def home():
    return user_schema.dump(current_user)


# Add video
@app.route('/add_video', methods=['POST'])
def add_video():

    if "file" not in request.files:
        return jsonify(no_file)

    if "id" not in request.values:
        return jsonify(no_id_video)

    file = request.files['file'] # retira o file do request
    video_id = request.values["id"] # retira o video_id para pesquisa
    type = file.filename.split(".")[1]

    if  type not in ALLOWED_EXTENSIONS:
        return jsonify(video_type_not_allowed)

    accident = get_accident_by(video_id,filter="video_id") # devolve accident que contem o video_id

    if not accident:
        return jsonify(no_accident)

    accident_id = str(accident.id) # get id do accident
    video_number = str(accident.video_total + 1)

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], accident_id+"/video/" + video_number + "." + type) # create path for file
    file.save(file_path) # save temporary file on directory

    if type == "avi":
        convert_avi_to_mp4(os.path.join(app.config['UPLOAD_FOLDER'], accident_id+"/video/" + video_number)) # convert file to a mp4

    return add_video_to_database(video_id) # add path of file to database

# Create a Accident
@app.route('/add_accident', methods=['POST'])
def add_accident():
    location = request.json['location']
    video_id = int(request.json['video_id'])

    accident = get_accident_by(location, filter="belongs")

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
    hazard_ligths = request.json["hazard_ligths"]
    num_seatbelts = request.json["all_seatbelts"]

    severity = severity_calc(n_people,velocity, ABS, airbag, overturned, num_seatbelts)    

    if accident.n_cars_involved > 1:
        accident.damage = (((accident.damage) * (accident.n_cars_involved - 1)) + severity) / accident.n_cars_involved
    else :
        accident.damage = severity
    
    car = Car(velocity,n_people,temperature,airbag,ABS,hazard_ligths,overturned,severity)

    add_accident_to_database(accident,car)
    init_media(accident.id, (location["lat"], location["lng"]))
    return accident_schema.jsonify(accident)


# See Accident
@app.route('/accident/<id>', methods=['GET'])
def get_accident(id):
    return get_accident_by(id, filter="id")

@app.route('/accident_status/<id>',methods=['GET'])
def get_accident_status(id):
    return jsonify(get_accident_by(id, filter="id_only_accident").status)

@app.route('/set_accident_status/<id>',methods=['POST'])
def set_accident_status(id):
    status = int(request.json['status'])
    return change_accident_status(id,status)

@app.route('/set_accident_injured/<id>',methods=['POST'])
def set_accident_injured(id):
    status = int(request.json['injured'])
    print(status)
    return change_accident_injured(id,status)

@app.route('/accident_icon/<status>',methods=['GET'])
def get_accident_icon(status):
    if (int(status) == 1):
        return send_from_directory(app.config['UPLOAD_FOLDER'],"icon_map_yellow.png" , as_attachment=True)
    if(int(status) == 2):
        return send_from_directory(app.config['UPLOAD_FOLDER'],"icon_map_green.png" , as_attachment=True)
    else:
        return send_from_directory(app.config['UPLOAD_FOLDER'],"icon_map_red.png" , as_attachment=True)

# See All Accident
@app.route('/list_accidents', methods=['GET'])
def get_accidents():
    return get_accident_by(None, filter="all")

#Available filters:
# default = between -> show accidents by date
#cars,people,injured,severity,status
#usage "range_accidents?id=x&filter=X"
#
@app.route('/range_accidents', methods=['GET'])
def get_range_accidents():
    id = request.args.get('id', 1, type=int)
    filter = request.args.get('filter', "between", type=str)
    quantity=request.args.get('quantity',"All",type=str)
    order=request.args.get('order',"Ascending",type=str)
    return get_accident_by(((id - 1) * 10, id * 10), filter=filter,quantity=quantity,order=order)


@app.route('/num_accidents', methods=['GET'])
def get_number_accidents():
    quantity = request.args.get('quantity', "All", type=str)
    return str(get_num_accidents(quantity))

#accident media
@app.route('/media/<path:path_to_file>', methods=['GET'])
def get_media_photos_id(path_to_file):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename=path_to_file, as_attachment=True)

@app.route('/Nmedia/<path:path_to_file>')
def get_num_photos(path_to_file):
    txt_or_csv = [f for f in os.listdir(os.path.join(app.config['UPLOAD_FOLDER'],path_to_file)) if re.search(r'.*\.(jpeg)$', f)]
    return str(len(txt_or_csv))

