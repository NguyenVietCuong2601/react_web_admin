import React, { useEffect, useState } from "react";
import moment from "moment";
import { Form, Input, Button, Radio, DatePicker, notification } from "antd";
import { SendOutlined } from "@ant-design/icons";
//import ProductsServices from "../../../api/ProductsServices";
import { useHistory } from "react-router-dom";
import ProductsServices from "../../../api/ProductsServices";

function ProductsUpdate(props) {
  const dateFormat = "YYYY/MM/DD";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const _id = props.match.params.id;

  useEffect(() => {
    console.log("Update product")
    ProductsServices.getDetailProducts(_id)
      .then((res) => {
        setData(res[0].data);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  }, [_id]);

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      duration: 2,
    });
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not validate email!",
      number: "${label} is not a validate number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const onUpdate = (id, updatedProduct) => {
    setLoading(true);
    ProductsServices.updateUser(id, updatedProduct)
      .then((res) => {
        setLoading(false);
        openNotificationWithIcon("success", "Success!", "Update successfully");
        setTimeout(() => history.push("/home/products"), 2000);
      })
      .catch((err) => {
        openNotificationWithIcon("error", "Error!", "Update failed");
        setLoading(false);
      });
  };
  const onFinish = (values) => {
    const updatedProduct = {
      name: values.name,
      lastName: values.lastName,
      address: values.address,
      email: values.email,
      gender: values.gender === "male" ? 1 : 0,
      introduction: values.introduction,
      phoneNumber: values.phoneNumber,
      dateOfBirth: moment(values.dateOfBirth, "YYYY/M/D"),
    };
    onUpdate(data.id, updatedProduct);
  };
  if (data && data.authority === "ROLE_ADMIN") {
    return <div>Can't edit this user, try another one !</div>;
  }
  return (
    <div>
      {data && (
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
          validateMessages={validateMessages}
          initialValues={{
            name: data.name,
            //lastName: data.lastName,
            //email: data.email,
            //gender: data.gender ? "male" : "female",
            //dateOfBirth: moment(data.dateOfBirth, "MMM Do YY"),
            //phoneNumber: data.phoneNumber,
            //address: data.address,
            note: data.note,
            image: data.image
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="note"
            label="Note"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          {/* <Form.Item
            name="email"
            label="Email"
            rules={[{ type: "email", required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="dateOfBirth"
            label="Birthday"
            rules={[{ required: true }]}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone"
            rules={[
              { message: "Please input your phone number!", required: true },
            ]}
          >
            <Input addonBefore="(+84)" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="introduction" label="Introduction">
            <Input.TextArea />
          </Form.Item> */}
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={loading ? 1 : 0}
              loading={loading}
            >
              <SendOutlined />
              {loading ? "Saving..." : "Save"}
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
export default ProductsUpdate;
