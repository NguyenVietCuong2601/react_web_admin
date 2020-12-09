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
    path: "products",
    exact: true,
    component: "product/ProductsManagement/Products",
  },
  {
    path: "warehouse",
    exact: true,
    component: "warehouse/WarehouseManagement/Warehouse",
  }
  
];
export default routes;
