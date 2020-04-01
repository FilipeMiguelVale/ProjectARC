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
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";

class AdminNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <link
              classname="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandtext}
            </link>
            <form classname="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <formgroup classname="mb-0">
                <inputgroup classname="input-group-alternative">
                  <inputgroupaddon addontype="prepend">
                    <inputgrouptext>
                      <i classname="fas fa-search" />
                    </inputgrouptext>
                  </inputgroupaddon>
                  <input placeholder="search" type="text" />
                </inputgroup>
              </formgroup>
            </form>
            <nav classname="align-items-center d-none d-md-flex" navbar>
              <uncontrolleddropdown nav>
                <dropdowntoggle classname="pr-0" nav>
                  <media classname="align-items-center">
                    <span classname="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("../../assets/img/theme/team-4-800x800.jpg")}
                      />
                    </span>
                    <media classname="ml-2 d-none d-lg-block">
                      <span classname="mb-0 text-sm font-weight-bold">
                        jessica jones
                      </span>
                    </media>
                  </media>
                </dropdowntoggle>
                <dropdownmenu classname="dropdown-menu-arrow" right>
                  <dropdownitem classname="noti-title" header tag="div">
                    <h6 classname="text-overflow m-0">welcome!</h6>
                  </dropdownitem>
                  {/* eslint-disable-next-line no-undef */}
                  <dropdownitem to="/admin/user-profile" tag={link}>
                    <i classname="ni ni-single-02" />
                    <span>my profile</span>
                  </dropdownitem>
                  {/* eslint-disable-next-line no-undef */}
                  <dropdownitem to="/admin/user-profile" tag={link}>
                    <i classname="ni ni-settings-gear-65" />
                    <span>settings</span>
                  </dropdownitem>
                  {/* eslint-disable-next-line no-undef */}
                  <dropdownitem to="/admin/user-profile" tag={link}>
                    <i classname="ni ni-calendar-grid-58" />
                    <span>activity</span>
                  </dropdownitem>
                  {/* eslint-disable-next-line no-undef */}
                  <dropdownitem to="/admin/user-profile" tag={link}>
                    <i classname="ni ni-support-16" />
                    <span>support</span>
                  </dropdownitem>
                  <dropdownitem divider />
                  <dropdownitem href="" onclick={e => e.preventdefault()}>
                    <i classname="ni ni-user-run" />
                    <span>logout</span>
                  </dropdownitem>
                </dropdownmenu>
              </uncontrolleddropdown>
            </nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
