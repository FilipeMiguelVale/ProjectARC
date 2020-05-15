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
import React, {useState,useEffect} from "react";
// react plugin used to create google maps
// reactstrap components
import {Card, Container, Row} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";
import Maps from "./Maps_Component.js";

const call_time = 2000;


const Maps_Page = () => {

  const [myposition, setMyposition] = useState(
    {
    lat: 0,
    lng: 0
    });
  
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    get_my_location().then((value) => {
     setMyposition(
        {
          lat: value.coords.latitude,
          lng: value.coords.longitude
        })}
    )},[]);

  useEffect(() => {

    const interval = setInterval(
      () => {
        getAllLocations().then((value) => {
          setMarkers(value)}
        )
      }, call_time);

      return () => clearInterval(interval)
    },[]
  )

  const  get_my_location = function () {
    if (navigator.geolocation) {
      return new Promise(
        (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
      )
    } else {
      return new Promise(
        resolve => resolve({})
      )
    }
  }

  const getAllLocations = async () => {
    let response = await fetch(
      `/list_accidents`);
    let result = await response.json();
    let all_locations = [];
    for (let i=0; i < result.length; i++){
      all_locations.push(
        {
          lat: result[i]["location"]["lat"],
          lng: result[i]["location"]["lng"],
          id: result[i]["id"]
        }
      )
    }
    return all_locations;
  }

  // componentDidMount() {

  //   Promise.all([this.get_my_location(),this.getAllLocations()]).then((
  //     (values => 
  //       {
  //         this.setState(prevState => (
  //           {
  //             markers: values[1],
  //             initial_position:{
  //               lat: values[0].coords.latitude,
  //               lng: values[0].coords.longitude
  //             }
  //           }))
  //       }
  //     )))
  // }


  return(
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow border-0">
                <Maps
                  markers={markers}
                  Location={myposition}
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4aWR3SBGaa1oB0CuDf2vptnJfSMSguZU"
                  loadingElement={<div style={{ height: `100%` }} />}
                  center = {myposition}
                  zoom = {10}
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

export default Maps_Page;
