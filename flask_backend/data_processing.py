

#Comparar distancia 
def isClose(point1,point2):

    from geopy import distance

    dist = distance.vincenty(point1,point2).km

    if dist * 1000 > 20:
        return False
    
    return True
