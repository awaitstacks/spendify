import React, { useEffect, useState } from "react";
import "./List.css";
import { currency } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Error fetching food list");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // Refresh the list after removing an item
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Error removing food item");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list add flex-col">
      <p className="list-title">All items list</p>
      <div className="list-table">
        {list.length > 0 ? (
          <>
            <div className="list-table-format title">
              <b>Image</b>
              <b>Name</b>
              <b>Category</b>
              <b>Price</b>
              <b>Action</b>
            </div>
            {list.map((item, index) => (
              <div key={index} className="list-table-format">
                <img src={`${url}/images/` + item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>
                  {currency}
                  {item.price}
                </p>
                <p className="cursor" onClick={() => removeFood(item._id)}>
                  x
                </p>
              </div>
            ))}
          </>
        ) : (
          <p className="empty-list">
            "Admin, we're selling dreams, not empty shelves. Where are the dress
            items?🤔"
          </p>
        )}
      </div>
    </div>
  );
};

export default List;
