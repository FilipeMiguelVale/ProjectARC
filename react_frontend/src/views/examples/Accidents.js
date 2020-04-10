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
  Media,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";


function fix_date(st) {
  let date = st.split('T');
  let year = date[0];
  let time  = date[1].split('.')[0];
  return year + " " + time;
}

class Tables extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      table_data : []
    }
  }

  getData = async () => {
    const response = await fetch(
      '/list_accidents'
    );

    const result = await response.json();
    this.setState(
      prevState => (
        {
          table_data : result
        }
      )
    );
  }

  renderArray = (value,index) => {
    return(
      <tr key={index}>
        <th scope="row">
          <Media className="align-items-center">
            <Media>
              <span className="mb-0 text-sm">
                {fix_date(value["date"])}
              </span>
            </Media>
          </Media>
        </th>
        <th scope="row">
          <Media className="align-items-center">
            <Media>
              <span className="mb-0 text-sm">
                {value["location"]["address"]}
              </span>
            </Media>
          </Media>
        </th>
        <th scope = "row">
          <Media className="align-items-center">
            <Media>
              <span className="mb-0 text-sm">
                {value["n_cars_involved"]}
              </span>
            </Media>
          </Media>
        </th>
        <th scope = "row">
          <Media className="align-items-center">
            <Media>
              <span className="mb-0 text-sm">
                {value["n_people"]}
              </span>
            </Media>
          </Media>
        </th>
        <th scope = "row">
          <Media className="align-items-center">
            <Media>
              <span className="mb-0 text-sm">
                {value["n_people_injured"]}
              </span>
            </Media>
          </Media>
        </th>
        <td>
          <Badge color="" className="badge-dot mr-4">
            <i className="bg-warning" />
            {value["damage"]}
          </Badge>
        </td>  
      </tr>
    )
  }

  componentDidMount(): void {
    this.getData();
  }

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
                  className="align-items-center table-dark table-responsive"
                  hover
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
                    {this.state["table_data"].map(this.renderArray)}
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
