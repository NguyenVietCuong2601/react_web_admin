const routes = [
  {
    path: "dashboard",
    exact: true,
    component: "dashboard",
  },
  {
    path: "users",
    exact: true,
    component: "users/UsersManagement/Users",
  },
  {
    path: "users/:id/edit",
    exact: true,
    component: "users/UsersManagement/UsersUpdate",
  },
  {
    path: "users/:id/history",
    exact: true,
    component: "users/UsersManagement/HistoryList",
  },
  {
    path: "products",
    exact: true,
    component: "product/ProductsManagement/Products",
  },
  {
    path: "warehouse",
    exact: true,
    component: "warehouse/WarehouseManagement/Warehouse",
  },
  {
    path: "warehouse/:id/detail",
    exact: true,
    component: "warehouse/Details",
  },
  
];
export default routes;
