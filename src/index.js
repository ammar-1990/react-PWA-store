import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
 
} from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import LayOut from './components/LayOut';
import Login from './pages/Login';
import Register from './pages/Register';

import Cart from './pages/Cart';
import { Provider } from 'react-redux';
import { store } from './store/app';
import ProductDetail from './pages/ProductDetail';
import AuthRequired from './components/AuthRequired';
import Admin from './pages/Admin';


import AddProduct from './pages/AddProduct';


const router = createBrowserRouter([

{
  path:'/',
  element:<LayOut />,
  children:[

    {
     index:true,
     element:<Home />

    },
    {
      path:'product/:id',
      element:<ProductDetail />
    },
    {
      path:'cart',
      element:<AuthRequired><Cart /></AuthRequired>
    }
  ]

}
,
{
  path:'/login',
  element:<Login />
},
{
  path:'/register',
  element:<Register />
},
{
path:'/admin',

children:[
{
  index:true,
  element:<Admin />
},

  {
    path:'add-product',
    element:<AddProduct />
  },
  {
    path:'edit-product/:id',
    element:<AddProduct />
  }
]

}

]

)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store = {store}>
  <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
