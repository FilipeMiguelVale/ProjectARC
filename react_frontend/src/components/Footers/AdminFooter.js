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
/*eslint-disable*/
import React from "react";
import "../../assets/css/custom.css"

// reactstrap components
import { Row, Col } from "reactstrap";


class Footer extends React.Component {
  
  render() {
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              2020{" "}
              <a
                className="font-weight-bold ml-1"
                href="https://projectarc.pt/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Project ARC
              </a>
            </div>
          </Col>
          <Col xl="2">
            <div className="copyright text-center  text-muted">
              <a href="https://www.bosch.pt/" target="_blank">
              <img
                id = "grayscale"
                alt="..."
                className="grayscale"
                 height={45}
                width={125}
                src={require("../../assets/img/brand/bosch.png")}
              />
              </a>
            </div>
          </Col>
          <Col xl="2" >
            <div className="copyright text-center  text-muted">
              <a href="https://www.it.pt" target="_blank">
              <img
                alt="..."
                className="grayscale"
                 height={45}
                width={125}
                src={require("../../assets/img/brand/IT.png")}
              />
              </a>
            </div>
          </Col>
          <Col xl="2">
            <div className="copyright text-center  text-muted">
              <a href="https://www.ua.pt" target="_blank">
              <img
                alt="..."
                className="grayscale"
                 height={45}
                width={125}
                src={require("../../assets/img/brand/UA.png")}
              />
              </a>
            </div>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
