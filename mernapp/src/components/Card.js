import React, { useEffect, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
import { useNavigate } from 'react-router-dom'

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();
  let navigate = useNavigate()
  const options = props.options;
  const priceOptions = Object.keys(options);
  let foodItem = props.foodItem;

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0]); // Initialize with the first available size
  const [finalPrice, setFinalPrice] = useState(0);

  const handleClick = () => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login")
    }
  }
  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


    // setBtnEnable(true)

  }
  useEffect(() => {
    // Calculate finalPrice whenever size or qty changes
    const parsedSizePrice = parseInt(options[size || '']);
    if (!isNaN(parsedSizePrice)) {
      setFinalPrice(qty * parsedSizePrice);
    } else {
      setFinalPrice(0); // Set to 0 or another default value when the price cannot be determined.
    }
  }, [size, qty, options]);

  return (
    <div>
      <div>
        <div className="card mt-3" style={{ width: '18rem', maxHeight: '360px' }}>
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: '120px', objectFit: 'fill' }} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="container w-100">
              <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(parseInt(e.target.value))}onClick={handleClick}>
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select className="m-2 h-100 bg-success rounded" onChange={(e) => setSize(e.target.value)}onClick={handleClick}>
                {priceOptions.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
              <div className="d-inline h-100 hs-5">{finalPrice}/-</div>
            </div>
            <hr />
            <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
