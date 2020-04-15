from geopy import distance
from geopy.geocoders import Nominatim
import os

#Comparar distancia 
def isClose(point1,point2):

    dist = distance.vincenty(point1,point2).km

    if dist * 1000 > 20:
        return False
    
    return True

def convert_avi_to_mp4(avi_file_path):
    os.popen("ffmpeg -i '{input}'.avi -ac 2 -b:v 2000k -c:a aac -c:v libx264 -b:a 160k -vprofile high -bf 0 -strict experimental -f mp4 '{input}.mp4'".format(input = avi_file_path))
    return True



def get_location_address(lat,lng):

    geolocator = Nominatim(user_agent="my-application")
    # coordenates = str(lat) + "," + str(lng)
    location_object = geolocator.reverse((lat,lng),exactly_one=True,language="en-US",addressdetails=True)
    
    if location_object is None or location_object.address is None:
        return "ADDRESS NOT FOUND"
    
    if "address" in list(location_object.raw):
        if "city" in list(location_object.raw["address"]):
            if "road" in list(location_object.raw["address"]):
                return location_object.raw["address"]["road"] + ", " + location_object.raw["address"]["city"]
            else:
                return location_object.raw["address"]["city"]


    return location_object.address