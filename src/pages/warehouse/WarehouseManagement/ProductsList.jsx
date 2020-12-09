import React from "react";
import Products from "../../../features/main/components/Products/components";

function ProductsList(props) {
  return (
    <div>
      <Products searchTerm={props.searchTerm} callfromWarehouse={props.id} />
    </div>
  );
}
export default ProductsList;
