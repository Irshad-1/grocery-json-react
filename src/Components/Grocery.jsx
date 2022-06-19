import React from "react";
import GroceryInput from "./GroceryInput";
import { v4 as uuid } from "uuid";
import GroceryList from "./GroceryList";

const Grocery = () => {
  const [data, setData] = React.useState([]);

  const [page, setPage] = React.useState(1);

  const deleteElement = (id) => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:3004/grocerys/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        await res.json();
        return getData();
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const getData = async (page = 1) => {
    const res = await fetch(
      `http://localhost:3004/grocerys?_page=${page}&_limit=2`
    );
    const result = await res.json();
    setData(result);
  };
  React.useEffect(() => {
    getData(page);
  }, [page]);
  const addData = (title, setTitle) => {
    const payload = {
      title,
      id: uuid(),
    };

    (async () => {
      try {
        const res = await fetch("http://localhost:3004/grocerys", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        await res.json();

        return getData();
      } catch (error) {
        console.log(error);
      }
    })();

    setTitle("");
  };
  return (
    <>
      <GroceryInput addData={addData} />
      <GroceryList data={data} deleteElement={deleteElement} />
      <h4> Page : {page}</h4>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        PREV
      </button>

      <button
        disabled={data.length < 2}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        NEXT
      </button>
    </>
  );
};

export default Grocery;
