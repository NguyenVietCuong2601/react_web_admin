import React, { useEffect, useState } from "react";
import Details from "../../../../../pages/product/Details";
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
import useDebounce from "../../../../../hooks/useDebounce";
//New Shit
import ProductsServices from "../../../../../api/ProductsServices"
import WarehouseServices from "../../../../../api/WarehouseServices";

function Products(props) {
    //local state
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([]);
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const searchTerm = props.searchTerm;
    const warehouseId = props.callfromWarehouse;
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const loadData = () => {
        ProductsServices.getProducts()//this shit is change.
            .then((res) => {
                setData(res[0]);
                setLoading(false);
                setResult(res[0]);
                //setSelectedProducts(res[1])
                console.log(selectedProducts)
            })
            .catch((err) => {
                console.log("error", err);
                setLoading(false);
            });
    };
    const loadDataForWarehouse = (id) => {
        WarehouseServices.getProductWarehouse(id)
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
    const loadProductDetailFromWarehouse = (id) => {
        ProductsServices.getDetailProducts(id)
        .then((res)=>{
            setSelectedProducts(res[0].data.data)
        })
        .catch((err) => {
            console.log("error", err);
            
        });
    }
    useEffect(() => {
        setLoading(true);
        if (warehouseId) {
            loadDataForWarehouse(warehouseId);
            console.log("lol")
        }
        else loadData();
    }, []);
    useEffect(() => {
        if (debouncedSearchTerm) {
            const items = data.filter(
                (item) =>
                    item.name.toLowerCase().includes(debouncedSearchTerm) 
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
       if(warehouseId){
        loadProductDetailFromWarehouse(item.id);
       }
       else {
        setSelectedProducts(item);
       }
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    //   const onToggleStatus = (id, status) => {
    //     setLoading(true);
    //     UsersServices.changeStatus(id, status)
    //       .then((res) => {
    //         openNotificationWithIcon(
    //           "success",
    //           "Success!",
    //           `This user is now ${status}`
    //         );
    //         setLoading(false);
    //         loadData();
    //       })
    //       .catch((e) => {
    //         console.log(e);
    //         setLoading(false);
    //       });
    //   };
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
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image) => <img src={image} style={{ width: "50px", height: "50px" }}></img>,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: {
                compare: (a, b) => a.name.length - b.name.length,
            },
            render: (name) => <div>{name}</div>,
        },
        {
            title: "Note",
            dataIndex: "note",
            key: "note",
            render: (note) => `${note}`,
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
                        <Link target="_top" to={`/home/products/${record.id}/edit`}>
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
            <Details products={selectedProducts} visible={visible} onClose={onClose} />
        </>
    );
}

export default Products;
