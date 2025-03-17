import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CoffeeCard = ({coffee,coffees,setCoffees}) => {
    const {_id,name,chef,category,quantity,teste,details,photo} = coffee


    const handleDelete = _id =>{
        console.log(_id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
             
              fetch(`http://localhost:5000/coffee/${_id}`,{
                method:'DELETE'
              })
              .then(res=> res.json())
              .then(data=> {
                console.log(data)
               if(data.deletedCount>0){
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                });
                const remaining = coffees.filter(coffee => coffee._id !== _id)
                setCoffees(remaining)
               }
              })
            }
          });
    }
  return (
    <div>
      <div className="card card-side bg-base-100 shadow-sm">
        <figure>
          <img
            src={photo}
            alt="Movie"
          />
        </figure>
        <div className="card-body items-center justify-center">
          <h2 className="font-semibold">Name: {name}</h2>
          <h2 className="font-semibold">Chef: {chef}</h2>
          <h2 className="font-semibold">Quantity: {quantity}</h2>
        </div>
        <div className="card-actions flex flex-col justify-center">
            <button className="btn btn-primary">Watch</button>
            <Link to={`updateCoffee/${_id}`} className="btn btn-primary">UpdateCoffee</Link>
            <button onClick={()=>handleDelete(_id)} className="btn btn-error">X</button>
          </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
