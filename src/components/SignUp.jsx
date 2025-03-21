import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";



const SignUp = () => {

  const userInfo = useContext(AuthContext)
  const {createUser}= userInfo

    const handleSignUp= event =>{
        event.preventDefault()
        const form = event.target
        const name = form.name.value 
        const email = form.email.value 
        const password = form.password.value 
        
        const submitedUser = {name,email}
        console.log( submitedUser)

        createUser(email,password)
        .then(result=>{
          console.log('data is creater frb',result.user)
          const creationTime = result.user.metadata.creationTime
          const newUser = {name,email,creationTime}

          //  send data to the server and mongoDB
          fetch('https://projects38-mysterious-coffee-server.vercel.app/users',{
            method:"POST",
            headers:{
              "content-type":'application/json'
            },
            body: JSON.stringify(newUser)
          })
          .then(res=> res.json())
          .then(data =>{
            console.log(data)
            if(data.insertedId){
              alert('user created successfully')
            }
          })
        })
        .catch(error=>{
          console.log('error',error)
        })
    }
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSignUp} className="card-body">
            <fieldset className="fieldset">
              <label className="fieldset-label">Name</label>
              <input type="text" className="input" name="name" placeholder="Name" />
              <label className="fieldset-label">Email</label>
              <input type="email" className="input" name="email" placeholder="Email" />
              <label className="fieldset-label">Password</label>
              <input type="password" className="input" name="password" placeholder="Password" />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
