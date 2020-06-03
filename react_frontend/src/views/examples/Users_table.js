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
import {Redirect} from "react-router-dom";
import "../../assets/css/custom.css"

// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    Media,
    Table,
    Container,
    Row,
    Button, Col, Progress, DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown,
} from "reactstrap";
// core components
import Header from "../../components/Headers/Header.js";
import Maps from "./Maps_Component.js"


function fix_date(st) {
  let date = st.split('T');
  let year = date[0];
  let time  = date[1].split('.')[0];
  return [year,time];
}

class Users_table extends React.Component {

  constructor(props) {
    super(props);

    this.timer = null

    this.toggleDrop1 = this.toggleDrop1.bind(this);
    this.changeValueDrop1 = this.changeValueDrop1.bind(this);


    this.state = {
      table_data : [],
      table_buttons:[],
      curent_page:1,
      num_accidents:0,
      num_to_show:10,
      dropDown1Value: "Date/Hour",
      dropdownIndex:"between",
      dropDown1Open: false,
      error:false
    }
  }

  redirect_to_details = (index) => {
    return <Redirect to={`/admin/accident_details/${index}`}/>
  }

  getData = async () => {
      console.log(this.state)
      try {
           /*const response = await fetch(
              `/num_accidents?quantity=${this.state.dropdownIndex2}`
          );

          const result = await response.json();
          this.setState(
              prevState => (
                  {
                      num_accidents: result
                  }
              )
          );*/
          const response1 = await fetch(
              `/all_users`
          );

          const result1 = await response1.json();
         if(result1.length===0)
              this.setState(
             prevState => (
                 {
                     error: "No users to Show"
                 }
             )
         );
          else
              this.setState(
                  prevState => (
                      {
                          table_data: result1,
                          error: false
                      }
                  )
              );
      }
    catch(e){
         this.setState(
             prevState => (
                 {
                     error: "No users to Show"
                 }
             )
         );
     }
  }

  renderArray = (value,index) => {
      console.log(this.state["table_data"])
    return(
      <tr key={index} >
        <th>
          <span className="mb-0 text-sm">
            {value["id"]}
          </span>
        </th>
        <th>
          <span className="mb-0 text-sm">
            {value["Username"]}
          </span>
        </th>
        <th>
          <span className="mb-0 text-sm">
            {value["email"]}
          </span>
        </th>
        <th>
          <span className="mb-0 text-sm">
            {value["role"]}
          </span>
        </th>
        <th>
          <span className="mb-0 text-sm">
            {value["role_type"]}
          </span>
        </th>
        <th>
           <div className="icon icon-shape bg-transparent rounded-circle">
             <i className="fas fa-trash"/>
           </div>
        </th>
      </tr>
    )
  }

  renderButtons(){
     if(this.state.num_accidents > this.state.num_to_show){
      const Buttons = []
      if(this.state.curent_page >1)
        Buttons.push(
            <li className="page-item">
                <a className="page-link" onClick={(e)=>this.handleClick(e,this.state.curent_page-1)}>
                    <i className="fas fa-angle-left"/>
                </a>
            </li>
        )
      for (let i = 1; i < Math.ceil(this.state.num_accidents/this.state.num_to_show)+1; i++) {
        if(i==this.state.curent_page){
          Buttons.push(<li className="page-item active"><a className="page-link" onClick={(e)=>this.handleClick(e,`${i}`)}>{i}</a></li>)
        }
        else{
          Buttons.push(<li className="page-item"><a className="page-link" onClick={(e)=>this.handleClick(e,`${i}`)}>{i}</a></li>)
        }
      }
      if(this.state.curent_page < Math.ceil(this.state.num_accidents/this.state.num_to_show) )
        Buttons.push(
            <li className="page-item">
                <a className="page-link" onClick={(e)=>this.handleClick(e,parseInt(this.state.curent_page)+1)}>
                    <i className="fas fa-angle-right"/>
                </a>
            </li>
        )

      return(
              <div className="row justify-content-center">
                 <nav aria-label="Page navigation example">
                     <ul className="pagination">
                        {Buttons}
                     </ul>
                 </nav>
              </div>
      )}
      else{
          return
      }
  }

  componentDidMount() {
    //this.getData(this.state.curent_page);
    this.getData();
    this.timer = setInterval(() => this.getData(), 10000)
  }

  componentWillUnmount(){
    clearInterval(this.timer)
    this.timer = null
  }

  handleClick = (e,id) => {
    e.preventDefault();
    this.state.curent_page=id
    this.getData();
  };

 /* DropDown functions */
  toggleDrop1() {
    this.setState({dropDown1Open: !this.state.dropDown1Open});
  }

  changeValueDrop1(e,id) {

      const a = ["","between","cars","people","injured","severity","status"]
      this.state.dropDown1Value= e.currentTarget.textContent
      this.state.dropdownIndex= `${a[id]}`
      this.getData(id)
  }


  /**************************/

  render() {
      if(this.state.error ){
        return (
         <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Dark table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="shadow">
                <CardHeader className="bg-transparent border-0">
                  <Row >
                    <Col>
                      <div className="row ml">
                        <h1 className="mb-0" style={{ paddingLeft: 20}} >Users</h1>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <h1 className="text-danger mb-0" style={{textAlign:"center"}}> {this.state.error}</h1>
                  <br/>
              </Card>
            </div>
          </Row>
        </Container>
      </>);
    }else{
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Dark table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="shadow">
                <CardHeader className="bg-transparent border-0">
                  <Row >
                    <Col>
                      <div className="row ml">
                        <h1 className="mb-0" style={{ paddingLeft: 20}} >Users</h1>
                      </div>
                    </Col>
                    <Col >
                      {this.renderButtons()}
                    </Col>
                  </Row>
                </CardHeader>
                <Table bordered
                  className="align-items-center table-flush"
                  hover
                >
                  <thead className="thead-light">
                    <tr >
                      <th scope="col " style={{textAlign:"center"}}>ID</th>
                      <th scope="col"  style={{textAlign:"center"}}>Username</th>
                      <th scope="col" style={{textAlign:"center"}}>Email</th>
                      <th scope="col" style={{textAlign:"center"}}>Role</th>
                      <th scope="col" style={{textAlign:"center"}}>Role ID</th>
                      <th scope="col" style={{textAlign:"center"}}   />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state["table_data"].map(this.renderArray)}
                  </tbody>
                </Table>
                <CardHeader className="bg-transparent border-0">
                  <Row >
                    <Col className="row justify-content-center">
                      {this.renderButtons()}
                    </Col>
                  </Row>
                </CardHeader>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }}
}

export default Users_table;
