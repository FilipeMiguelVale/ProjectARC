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
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";

class Tables extends React.Component {
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Dark table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">Accidents</h3>
                </CardHeader>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">
                       <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("../../assets/img/theme/DateHour.jpg")}
                            />
                          </a>
                      </Media>
                       Date/Hour
                      </th>
                      <th scope="col">
                       <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("../../assets/img/theme/pinout.jpg")}
                            />
                          </a>
                        </Media>
                       Local
                      </th>
                      <th scope="col">
                       <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("../../assets/img/theme/car.jpg")}
                            />
                          </a>
                        </Media>
                       Number of cars
                      </th>
                      <th scope="col">
                       <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("../../assets/img/theme/people.jpg")}
                            />
                          </a>
                        </Media> 
                       Number of people
                      </th>
                      <th scope="col">
                       <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("../../assets/img/theme/injured.jpg")}
                            />
                          </a>
                       </Media>
                       Number of injured
                      </th>
                      <th scope="col">Severity</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir data e hora)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir local)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <th scope = "row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir número de carros)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <th scope = "row">
                       <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir número de pessoas)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <th scope = "row">
                       <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir número de feridos)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          VERY SERIOUS
                        </Badge>
                      </td>  
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir data e hora)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir local)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <th scope = "row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir número de carros)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <th scope = "row">
                       <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir número de pessoas)
                            </span>
                          </Media>
                        </Media>
                      </th>
                       
                      <th scope = "row">
                       <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir número de feridos)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                        </Badge>
                      </td>  
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir data e hora)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir local)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <th scope = "row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir número de carros)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <th scope = "row">
                       <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir número de pessoas)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <th scope = "row">
                       <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir número de feridos)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                        </Badge>
                      </td>  
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir data e hora)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir local)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <th scope = "row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir número de carros)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <th scope = "row">
                       <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir número de pessoas)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <th scope = "row">
                       <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir número de feridos)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                        </Badge>
                      </td>  
                    </tr>
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir data e hora)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir local)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <th scope = "row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir número de carros)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <th scope = "row">
                       <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir número de pessoas)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <th scope = "row">
                       <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                              (Inserir número de feridos)
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <th scope = "row">
                       <Media className="align-items-center">
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                        </Badge>
                       </Media>
                      </th>  
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;
