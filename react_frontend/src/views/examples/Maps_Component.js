import React from "react";
// react plugin used to create google maps
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
// reactstrap components
import {Card} from "reactstrap";
// core components


const MapWrapper = withScriptjs(
    withGoogleMap(props => <GoogleMap
            center = {{lat: props.center.lat, lng: props.center.lng}}
            defaultZoom={18}
            defaultOptions={{
              scrollwheel: false,
              styles: [
                {
                  featureType: "administrative",
                  elementType: "labels.text.fill",
                  stylers: [{color: "#444444"}]
                },
                {
                  featureType: "landscape",
                  elementType: "all",
                  stylers: [{color: "#f2f2f2"}]
                },
                {
                  featureType: "poi",
                  elementType: "all",
                  stylers: [{visibility: "off"}]
                },
                {
                  featureType: "road",
                  elementType: "all",
                  stylers: [{saturation: -100}, {lightness: 45}]
                },
                {
                  featureType: "road.highway",
                  elementType: "all",
                  stylers: [{visibility: "simplified"}]
                },
                {
                  featureType: "road.arterial",
                  elementType: "labels.icon",
                  stylers: [{visibility: "off"}]
                },
                {
                  featureType: "transit",
                  elementType: "all",
                  stylers: [{visibility: "on"}]
                },
                {
                  featureType: "water",
                  elementType: "all",
                  stylers: [{color: "#5e72e4"}, {visibility: "on"}]
                }
              ]
            }}
        >
        <Marker position={{lat: props.Location.lat, lng: props.Location.lng}}/>
        </GoogleMap>
    ));


class Maps extends React.Component {

  constructor(props) {
    super(props);
    }

  render() 
  {
    console.log(this.children)
    return (
    <Card className="shadow border-0">
    <MapWrapper
        Location={this.props.Location}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4aWR3SBGaa1oB0CuDf2vptnJfSMSguZU"
        loadingElement={<div style={{ height: `100%` }} />}
        center = {this.props.center}
        containerElement={
        <div
            style={{ height: `600px` }}
            className="map-canvas"
            id="map-canvas"
        />
        }
        mapElement={
        <div style={{ height: `100%`, borderRadius: "inherit" }} />
        }
    />
    </Card>
    );
  }
}

export default Maps;
