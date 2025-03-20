import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddCoffee from './components/AddCoffee.jsx';
import UpdateCoffee from './components/UpdateCoffee.jsx';
import HomeLayout from './components/HomeLayout.jsx';
import SignUp from './components/SignUp.jsx';
import Signin from './components/Signin.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import UserData from './components/UserData.jsx';
// import Home from './components/Home.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    element:<HomeLayout></HomeLayout>,
    children:[
      {
        path: "/",
        element: <App></App>,
        loader: ()=> fetch('https://projects38-mysterious-coffee-server-h86vjspxt.vercel.app/coffee')
      },
      {
        path:'/addCoffee',
        element:<AddCoffee></AddCoffee>
      },
      {
        path:'/updateCoffee/:id',
        element:<UpdateCoffee></UpdateCoffee>,
        loader:({params})=> fetch(`https://projects38-mysterious-coffee-server-h86vjspxt.vercel.app/coffee/${params.id}`)
      },
      {
        path:'signUp',
        element:<SignUp></SignUp>
      },
      {
        path:'signIn',
        element:<Signin></Signin>
      },
      {
        path:'/users',
        element:<UserData></UserData>,
        loader:()=> fetch('https://projects38-mysterious-coffee-server-h86vjspxt.vercel.app/users/')
      }
    ]
  }


]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
       <RouterProvider router={router} /> 
    </AuthProvider>
  </StrictMode>,
)
