import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateCoffee = () => {
    const coffee = useLoaderData()
    const {_id,name,chef,category,quantity,teste,details,photo} = coffee

    const handleUpdateCoffee = event=>{
        event.preventDefault()
        const form = event.target 
        const name = form.name.value
        const chef = form.chef.value
        const category = form.category.value
        const quantity = form.quantity.value
        const teste = form.teste.value
        const details = form.details.value
        const photo = form.photo.value
    
        const updatedCoffee = {name,chef,category,quantity,teste,details,photo}
        console.log(updatedCoffee)
        fetch(`http://localhost:5000/coffee/${_id}`, {
          method:"PUT",
          headers:{
            'content-type':'application/json'
          },
          body: JSON.stringify(updatedCoffee)
        })
        .then(res=> res.json())
        .then(data =>{
          console.log(data)
          if(data.modifiedCount){
            Swal.fire({
              title: 'Yahoo!',
              text: 'Coffee Orderd Successfully',
              icon: 'success',
              confirmButtonText: 'Thank You'
            })
          }
        })
    }

    return (
        <div className="w-10/12 mx-auto">
      <h1>Add a coffee</h1>
     

      <div className="card bg-base-100 w-full  shrink-0 shadow-2xl">
        <div className="card-body ">
          <form  onSubmit={handleUpdateCoffee} className="fieldset w-full">
            <div className="flex gap-10">
                <div  className="w-full ">
                  <label className="fieldset-label">Name</label>
                  <input type="text" name="name" defaultValue={name} className="input w-full" placeholder="Enter Coffee Name" />
                  <label className="fieldset-label">Chef</label>
                  <input type="text" name="chef" defaultValue={chef} className="input w-full" placeholder="Enter Coffee Name" />
                  <label className="fieldset-label">Category</label>
                  <input type="text" name="category" defaultValue={category} className="input w-full" placeholder="Enter Coffee Name" />
                </div>
                <div className="w-full">
                  <label className="fieldset-label">Quantity</label>
                  <input type="text" name="quantity" defaultValue={quantity} className="input w-full" placeholder="Enter Quantity" />
                  <label className="fieldset-label">Teste</label>
                  <input type="text" name="teste" defaultValue={teste} className="input w-full" placeholder="Enter Coffee Teste" />
                  <label className="fieldset-label">Details</label>
                  <input type="text" name="details" defaultValue={details} className="input w-full" placeholder="Enter Coffee Detail" />
                </div>
            </div>
            <div>
                <label className="fieldset-label">Photo</label>
                <input type="text" name="photo" defaultValue={photo} className="input w-full" placeholder="Enter Photo Url" />
            </div>
           
            <div>
                <input type="submit" className="btn w-full  mt-4 bg-[#d2b48c]" value="Add a Coffee" />
            </div>
          </form>
        </div>
      </div>
      
    </div>
    );
};

export default UpdateCoffee;