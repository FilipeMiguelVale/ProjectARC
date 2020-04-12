/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin used to create google maps
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
// reactstrap components
import {Card, Container, Row} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";


const MapWrapper = withScriptjs(
    withGoogleMap(props => <GoogleMap
            center = {{lat: props.Location.lat, lng: props.Location.lng}}
            defaultZoom={18}
            //defaultCenter={{ lat: props.Location.lat, lng: props.Location.lng }}
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
        <Marker position={{ lat: props.Location.lat, lng: props.Location.lng }}/>
        </GoogleMap>
    ));


class Maps extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0
      }
  }

  getLocation = async () => {
    const response = await fetch(
        '/accident/1');
    const result = await response.json();
    this.setState(prevState => ({
      lat: result["location"]["lat"],
      lng: result["location"]["lng"]
    }))
  };

  componentWillMount(): void {
    this.getLocation();
  };

  render() 
  {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow border-0">
                <MapWrapper
                  Location={this.state}
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4aWR3SBGaa1oB0CuDf2vptnJfSMSguZU"
                  loadingElement={<div style={{ height: `100%` }} />}
                  center = {this.state}
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
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Maps;
