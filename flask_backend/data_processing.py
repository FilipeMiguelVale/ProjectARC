from geopy import distance,exc
from geopy.geocoders import Nominatim

import os
from datetime import datetime, timedelta

#conversor de video
def convert_avi_to_mp4(avi_file_path):
    print(avi_file_path)
    os.popen("ffmpeg -i '{input}'.avi -ac 2 -b:v 2000k -c:a aac -c:v libx264 -b:a 160k -vprofile high -bf 0 -strict experimental -f mp4 '{input}.mp4'".format(input = avi_file_path))
    return True

#Comparar timestamps
def same_timestamp(timestamp):
    current_time = datetime.now()
    delta = timedelta(minutes=2)

    if current_time - delta > timestamp:
        return False
    
    return True

#Comparar distancia 
def isClose(point1,point2):

    dist = distance.vincenty(point1,point2).km # obter distancia entre as duas localizações

    if dist * 1000 > 20:
        return False
    
    return True

# obter endereço da localização
def get_location_address(lat,lng):

    geolocator = Nominatim(user_agent="my-application") # obter geocoder

    try:
        # obter dados da localização
        location_object = geolocator.reverse(
            (lat,lng), exactly_one=True, language="en-US", addressdetails=True, timeout=3)
    except KeyError == exc.GeocoderTimedOut:
        return "ERRO DETECTING THE ADDRESS"
        
    if location_object is None or location_object.address is None: # retornar erro em caso de dados inexistentes
        return "ADDRESS NOT FOUND"
    
    # retornar endereço

    if "address" in list(location_object.raw):
        if "city" in list(location_object.raw["address"]):
            if "road" in list(location_object.raw["address"]):
                return location_object.raw["address"]["road"] + ", " + location_object.raw["address"]["city"]
            else:
                return location_object.raw["address"]["city"]

    return location_object.address