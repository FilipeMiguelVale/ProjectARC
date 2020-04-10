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

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip, CardTitle, Button, UncontrolledCollapse
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";

class AccidentDetails extends React.Component {

  render() {
    return (
      <>
        <Header />

        <Container className=" mt--7" fluid>
          <Row>
            <div className=" col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <h3 className=" mb-0">Accident Details</h3>
                </CardHeader>
                <CardBody>
					<Row>
                     <Col lg="6" xl="3">
                        <Card className="card-stats mb-4 mb-xl-0">
                          <CardBody className="border rounded border-info">
                              <Row>
                                <div className="col">
                                  <CardTitle
                                    tag="h5"
                                    className="text-uppercase text-muted mb-0"
                                  >
                                    Nº of cars involved
                                  </CardTitle>
                                  <span className="h2 font-weight-bold mb-0">1</span>
                                </div>
                                  <Col className="col-auto">
                                    <Button className="avatar icon-shape rounded-circle mr-3 bg-success" id="toggler">
                                      <img
                                        alt="..."
                                        src={require("../../assets/img/theme/car.jpg")}
                                      />
                                    </Button>
                                  </Col>
                              </Row>
                          </CardBody>
                        </Card>
                        <UncontrolledCollapse toggler="#toggler">
                          <Card>
                            <CardBody>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt magni, voluptas debitis
                              similique porro a molestias consequuntur earum odio officiis natus, amet hic, iste sed
                              dignissimos esse fuga! Minus, alias.
                            </CardBody>
                          </Card>
                        </UncontrolledCollapse>
                      </Col>
                      <Col lg="6" xl="3">
                        <Card className="card-stats mb-4 mb-xl-0">
                          <CardBody className="border rounded border-info">

                              <Row>
                                <div className="col">
                                  <CardTitle
                                    tag="h5"
                                    className="text-uppercase text-muted mb-0"
                                  >
                                    Nº of persons involved
                                  </CardTitle>
                                  <span className="h2 font-weight-bold mb-0">2</span>
                                </div>
                                <Col className="col-auto">
                                  <a className="avatar icon-shape rounded-circle mr-3 bg-info">
                                    <img
                                      alt="..."
                                      src={require("../../assets/img/theme/people.jpg")}
                                    />
                                  </a>
                                </Col>
                              </Row>

                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg="6" xl="3">
                        <Card className="card-stats mb-4 mb-xl-0">
                          <CardBody className="border rounded border-info">
                            <Row>
                              <div className="col">
                                <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                                >
                                  Nº of persons injured
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0">0</span>
                              </div>
                              <Col className="col-auto">
                                <a className="avatar icon-shape rounded-circle mr-3 bg-danger">
                                  <img
                                    alt="..."
                                    src={require("../../assets/img/theme/injured.jpg")}
                                  />
                                </a>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg="6" xl="3">
                        <Card className="card-stats mb-4 mb-xl-0">
                          <CardBody className="border rounded border-info">
                            <Row>
                              <div className="col">
                                <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                                >
                                  Severity of the accident
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0 text-success">NOT VERY SERIOUS</span>
                              </div>
                              <Col className="col-auto">
                                <a className="avatar icon-shape rounded-circle mr-3 bg-yellow">
                                  <img
                                    alt="..."
                                    src={require("../../assets/img/theme/severity.png")}
                                  />
                                </a>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default AccidentDetails;
