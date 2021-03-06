import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography, Image, notification } from "antd";

import { Redirect } from "react-router-dom";

import logo2 from "../../../assets/logo2.png";
import reactLogo from "../../../assets/react_ts.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGooglePlus,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
// import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import "./login.css";
import auth from "../../../api/auth";
import Progress from "../../../components/Progress/Progress";
import UserService from "../../../api/UsersServices"

const { Title, Paragraph } = Typography;
export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));
  //TODO : GUI Login
  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      duration: 2,
    });
  };
  const layout = {
    labelCol: { span: 0 },
    wrapperCol: {
      span: 24,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 2,
      span: 22,
    },
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    auth
      .login(values.username, values.password)
      .then((res) => {
        setLoading(false);
        setIsAuth(true);
        openNotificationWithIcon("success", "Success", "Login successfully !");
        // UserService.getDetailUser(localStorage.getItem("id"))
        // .then((res) => {
          
        //   localStorage.setItem("adminData", res[0].data)
        //   console.log(res[0]);
        //   console.log(res[0].data);
        // })
        // .catch((err) => {
        //   console.log("error", err);
        // });
      })
      .catch((err) => {
        setIsAuth(false);
        console.log({ err });
        setLoading(false);
        openNotificationWithIcon("error", "Error", err.message);
      });
  };
  if (isAuth) {
    return <Redirect to="/home/users" />;
  }
  return (
    <div className="root-login">
      <Progress isAnimating={loading} />
      <div className="main-page">
        <div className="main-page-content">
          <div className="image_page">
            <div className="layer"></div>
            <div className="about_us">
              <Title style={{ color: "white" }}> Welcome</Title>
              <div className="space-line"></div>
              <Paragraph style={{ color: "white" }}>
                {" "}
                Welcome to <strong>Warehouse Management</strong> administrator page.
              </Paragraph>
            </div>
            {/* <div className="footer">
              <div className="social-contact">
                <p style={{ color: "#424242" }}>
                  Telephone: (+84)123456789 / Hotline: 113
                </p>
              </div>
            </div> */}
          </div>

          <div className="form_content">
            <div className="logo">
              <Image src={logo2} width="100px" height="100px" />
              <h1 className="title">WAREHOUSE MANAGEMENT</h1>
            </div>
            <Form
              {...layout}
              name="basic"
              size="large"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item name="username">
                <Input placeholder="User Name" />
              </Form.Item>

              <Form.Item name="password">
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: "green" }}
                  loading={loading ? 1 : 0}
                  disabled={loading ? 1 : 0}
                  target="_top"
                >
                  {loading ? "Checking..." : "Sign In"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
