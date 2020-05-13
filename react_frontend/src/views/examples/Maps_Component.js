import React from "react";
// react plugin used to create google maps
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
// core components

import {Redirect} from "react-router-dom";


const MapWrapper = withScriptjs(
    withGoogleMap(props => <GoogleMap
            center = {{lat: props.center.lat, lng: props.center.lng}}
            defaultZoom={props.zoom}

            defaultOptions={{
              scrollwheel: false,

            }}
        >
        {props.markers.map(props =>
          <Marker position={{lat: props.lat, lng: props.lng}}
           options={{icon:"http://maps.google.com/mapfiles/ms/icons/green.png"}}
           onClick={(() => 
            { if(props.id)
                {window.location.href =`/#admin/accident_details/${props.id}`}
              }
              )}
             />
        )}
        </GoogleMap>

    ));

class Maps extends React.Component {

  render() 
  {
    return (
    <MapWrapper
        Location={this.props.Location}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDcLG_2KgktdQJXLaeyQZHJzmvcSjNwoPM"
        loadingElement={<div style={{ height: `100%` }} />}
        center = {this.props.center}
        zoom = {this.props.zoom}
        markers = {this.props.markers}
        containerElement={
            <div
                className="map-canvas"
                id="map-canvas"
            />
        }
        mapElement={this.props.mapElement}
    />

    );
  }
}

export default Maps;
