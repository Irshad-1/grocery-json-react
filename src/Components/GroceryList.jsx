import React from "react";

const GroceryList = (props) => {
  const { data, deleteElement } = props;

  return (
    <ul>
      {data.map((Grocery) => (
        <li key={Grocery.id}>
          {`${Grocery.title}`}
          <button
            onClick={() => {
              deleteElement(Grocery.id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
export default GroceryList;
