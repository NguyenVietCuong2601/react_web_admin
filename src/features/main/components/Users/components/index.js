import React, { useEffect, useState } from "react";
import Details from "../../../../../pages/users/Details";
import { Link } from "react-router-dom";
import DeleteButton from "../../../../../components/DeleteButton";
import { Table, Space, Button, Tag, notification } from "antd";
import * as moment from "moment";
import {
  FolderViewOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import UsersServices from "../../../../../api/UsersServices";
import WarehouseServices from "../../../../../api/WarehouseServices";
import useDebounce from "../../../../../hooks/useDebounce";
function Users(props) {
  //local state
  const [selectedUser, setSelectedUser] = useState([]);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchTerm = props.searchTerm;
  const warehouseId = props.callfromWarehouse;
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const loadData = () => {
    UsersServices.getUsers()
      .then((res) => {
        setData(res[0]);
        setLoading(false);
        setResult(res[0]);
      })
      .catch((err) => {
        console.log("error", err);
        setLoading(false);
      });
  };
  const loadDataForWarehouse = (id) => {
    WarehouseServices.getUserWarehouse(id)
      .then((res) => {
        setData(res[0]);
        setLoading(false);
        setResult(res[0]);
        console.log(data)
      })
      .catch((err) => {
        console.log("error", err);
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    if (warehouseId) {
      loadDataForWarehouse(warehouseId);
    }
    else loadData();
    //loadData();

  }, []);
  useEffect(() => {
    if (debouncedSearchTerm) {
      const items = data.filter(
        (item) =>
          item.username.toLowerCase().includes(debouncedSearchTerm) ||
          item.email.toLowerCase().includes(debouncedSearchTerm)
      );
      return setResult(items);
    }
    return setResult(data);
  }, [debouncedSearchTerm, data]);

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      duration: 2,
    });
  };
  const onSelect = (item) => {
    setSelectedUser(item);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const onToggleStatus = (id, status) => {
    setLoading(true);
    UsersServices.changeStatus(id, status)
      .then((res) => {
        openNotificationWithIcon(
          "success",
          "Success!",
          `This user is now ${status}`
        );
        setLoading(false);
        loadData();
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };
  const onDelete = (id) => {
    setLoading(true);
    UsersServices.deleteUser(id)
      .then((res) => {
        setLoading(false);
        openNotificationWithIcon(
          "success",
          "Success!",
          "This user doesn't exist anymore !"
        );
        loadData();
      })
      .catch((err) => {
        setLoading(false);
        openNotificationWithIcon("error", "Error!", "Deleted failed");
        loadData();
      });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => `${id}`,
    },
    {
      title: "Username",
      dataIndex: "name",
      key: "name",
      sorter: {
        compare: (a, b) => a.name.length - b.name.length,
      },
      render: (name) => <div>{name}</div>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => `${email}`,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => `${phone ? phone : "None"}`,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address) => `${address ? address : "None"}`,
    },
    {
      title: "Role",
      dataIndex: "authority",
      key: "authority",
      render: (authority) => {
        let color = "green";
        const activeStatus =
          authority === "ROLE_ADMIN"
            ? "ADMIN"
            : authority === "ROLE_TUTOR"
              ? "TUTOR"
              : "STUDENT";
        if (activeStatus === "ADMIN") {
          color = "#f44336";
        } else if (activeStatus === "TUTOR") {
          color = "#0288d1";
        } else color = "#ffc400";
        return (
          <Tag color={color} key={activeStatus}>
            {activeStatus.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      responsive: ["lg"],
      render: (record) =>
        record.authority !== "ROLE_ADMIN" ? (
          <Space size="small">
            <Button
              icon={<FolderViewOutlined />}
              onClick={() => onSelect(record)}
            ></Button>
            <Link target="_top" to={`/home/users/${record.id}/edit`}>
              <Button type="primary" icon={<EditOutlined />} />
            </Link>
            <DeleteButton
              loading={loading}
              item={record}
              onSelected={(id) => {
                onDelete(id);
              }}
            />
          </Space>
        ) : (
            <Space size="small">
              <Button
                icon={<FolderViewOutlined />}
                onClick={() => onSelect(record)}
              />
              <Button disabled type="primary" icon={<EditOutlined />} />
              <Button danger disabled type="primary" icon={<DeleteOutlined />} />
            </Space>
          ),
    },
  ];
  return (
    <>
      <Table
        loading={loading}
        dataSource={result}
        columns={columns}
        size="small"
        rowKey={(record) => `${record.id}`}
      />
      <Details user={selectedUser} visible={visible} onClose={onClose} />
    </>
  );
}

export default Users;
