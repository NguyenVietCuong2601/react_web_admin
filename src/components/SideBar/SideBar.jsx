import React, { useState } from "react";
import {
  DashboardOutlined,
  UserOutlined,
  FormOutlined,
  UnorderedListOutlined,
  // SnippetsOutlined,
  // BookOutlined,
  // TeamOutlined,
  // BellOutlined,
  BankOutlined,
  BarcodeOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import "../../layouts/index.css";
import logo from "../../assets/logo.png";
import { useLocation } from "react-router-dom";

const { SubMenu } = Menu;

export default function SideBar(props) {
  const location = useLocation();
  const path = location.pathname;

  const [selectedKey, setSelectedKey] = useState(
    path === "/home/dashboard"
      ? 1
      : path === "/home/users"
      ? 2
      : path === "/home/products"
      ? 3
      : path === "/home/warehouse" 
      && 4
  );
  console.log("key", selectedKey);
  const handleClick = (e) => {
    setSelectedKey(e.key);
  };
  return (
    <>
      {/* <div
        style={{
          height: "64px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#b3e5fc",
        }}
      >
        <Link to="/" target="_top">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <img src={logo} height="50px" width="50px" border="0" alt="" />
          </div>
        </Link>
      </div> */}

      <Menu
        style={{ marginTop: 60 }}
        className="sidebar-layout-content"
        mode="inline"
        onClick={handleClick}
        defaultSelectedKeys={[selectedKey + ""]}
        defaultOpenKeys={["sub1"]}
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/home/dashboard">Dashboard</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<UnorderedListOutlined />} title="Management">
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/home/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<BarcodeOutlined />}>
            <Link to="/home/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<BankOutlined />}>
            <Link to="/home/warehouse">Warehouse</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
}
