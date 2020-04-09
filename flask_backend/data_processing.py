from geopy import distance
from geopy.geocoders import Nominatim

#Comparar distancia 
def isClose(point1,point2):

    dist = distance.vincenty(point1,point2).km

    if dist * 1000 > 20:
        return False
    
    return True


def get_location_address(lat,lng):

    geolocator = Nominatim()
    coordenates = str(lat) + "," + str(lng)
    location = geolocator.reverse(coordenates)
    return location.address