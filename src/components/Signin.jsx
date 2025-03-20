import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";


const Signin = () => {

  const {signInUser}= useContext(AuthContext)

  const handleSignIn = (event) => {
    event.preventDefault();
    const form = event.target;

    const email = form.email.value;
    const password = form.password.value;

    const submitedUser = { email, password };
    console.log(submitedUser);
    signInUser(email,password)
    .then(result =>{
        console.log(result.user)
        // update user last login time
        const lastSignInTime = result?.user?.metadata?.lastSignInTime
        const loginInfo = {email,lastSignInTime}

        fetch('https://projects38-mysterious-coffee-server-h86vjspxt.vercel.app/users',{
            method:'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(loginInfo)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log('sign in update in db', data)
        })
    })
    .catch(error =>{
        console.log(error)
    })

    
  };

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
          <form onSubmit={handleSignIn} className="card-body">
            <fieldset className="fieldset">
              <label className="fieldset-label">Email</label>
              <input
                type="email"
                className="input"
                name="email"
                placeholder="Email"
              />
              <label className="fieldset-label">Password</label>
              <input
                type="password"
                className="input"
                name="password"
                placeholder="Password"
              />
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

export default Signin;
