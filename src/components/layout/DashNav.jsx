import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/NavDash.css";

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

const DashNav = () => {
  return (
    <div>
      <div className="main-div">
        <CDBSidebar textColor="#fff" backgroundColor="rgb(3, 91, 117)">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              Job App
            </a>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink to="/">
                <CDBSidebarMenuItem>
                  {" "}
                  {/* icon="chart-line" */}
                  Dashboard
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/manage">
                <CDBSidebarMenuItem>
                  {/* icon="columns" */}
                  Manage Jobs
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div
              style={{
                padding: "20px 5px",
              }}
            >
              JobApp v1.
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>

      <Navbar
        bg="clear"
        expand="md"
        className=" d-flex justify-content-end"
      ></Navbar>
    </div>
  );
};

export default DashNav;
