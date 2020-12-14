import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, Dropdown, Card, Button, Badge, List } from "antd";
import {
  DownOutlined,
  LogoutOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import avatar from "../../assets/avatar.jpg";
import "../../layouts/index.css";
import UsersServices from '../../api/UsersServices'
import decodeToken from '../../helper/decodeToken'
const { Meta } = Card;

export default function HeaderNav() {

  const [data, setData] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const adminID = localStorage.getItem("id")
  const decode = decodeToken(token)
  const loadData = (id) => {
    UsersServices.getDetailUser(id)
      .then((res) => {
        setData(res[0].data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    loadData(adminID);
  }, []);

  const loginData = [
    {
      title: "Notification",
    },
  ];

  const logOut = () => {
    localStorage.clear();
  };
  const profileOverlay = (
    <div>
      <Card style={{ width: 300, height: "auto", borderWidth: 1 }}>
        <Meta
          avatar={<Avatar src={data ? data.image : avatar} />}
          title={data ? data.name : "WTF????"}
          description="Administrator"
        />
        <div style={{ textAlign: "center", margin: 25, padding: 10 }}>
          <p>{`Hello ${data.name}, Welcome to Administrator site!`}</p>

          <Link to="/login" target="_top" style={{ color: "white" }}>
            <Button
              type="primary"
              shape="round"
              icon={<LogoutOutlined />}
              size="medium"
              onClick={logOut}
            >
              Log Out
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
  const notificationsList = (item) => {
    return (
      <List.Item>
        <List.Item.Meta title={item.title} description="Login Successfully" />
      </List.Item>
    );
  };
  const notificationOverLay = (
    <div style={{ minWidth: "500px", backgroundColor: "white" }}>
      <List
        bordered={true}
        itemLayout="horizontal"
        dataSource={loginData}
        renderItem={notificationsList}
      />
    </div>
  );
  return (
    <div className="header-layout">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <div
          style={{
            margin: "0 30px",
            padding: "0 30px",
            borderBottom: 0,
          }}
        >
          <Dropdown overlay={notificationOverLay}>
            <Badge
              count={loginData.length}
              size="small"
              style={{ fontSize: "14px" }}
            >
              <NotificationOutlined
                style={{ fontSize: "20px", color: "#08c" }}
              />
            </Badge>
          </Dropdown>
        </div>
        <div style={{ margin: "0 5px" }}>
          <Dropdown overlay={profileOverlay}>
            <div style={{ cursor: "pointer" }}>
              <Avatar src={data ? data.image : avatar} />
              <span style={{ margin: "10px 10px 10px 20px" }} >{`${data.name}`}</span>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                to="/"
                onClick={(e) => e.preventDefault()}
              >
                <DownOutlined />
              </Link>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
