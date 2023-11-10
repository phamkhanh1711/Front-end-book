import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import './index.css';
import App from './App';
import 'font-awesome/css/font-awesome.min.css';



import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import Blog from './Blogs/Blog';
import Blog_Detail from './Blogs/Blog_detail';
import Register from './members/Register';
import Login from './members/Login';
import Comment from './Blogs/Comment';
import Rate from './Blogs/Rate';
import Update from './members/Update';
import Myproduct from './product/Myproduct';
import Addproduct from './product/Addproduct';


import PDFViewer from './Items/PDFViewer';
import Detective from './Items/Detective';
import Detective_detail from './Items/Detective_detail';
import Sport from './Items/Sport';
import Kid from './Items/Kid';
import Sport_detail from './Items/Sport_detail';

import Kid_detail from './Items/Kid_detail';
import Cart from './product/Cart';
import Checkout from './product/Checkout';
import History from './Items/History';
import History_detail from './Items/History_detail';
import Search from './pages/Search';
import Profie_account from './members/Profie_account';
import AdminDashboard from './members/AdminDashboard';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <App>
            <Routes>
               <Route index path='/' element={<Home/>}/>
               <Route index path='/blog' element={<Blog/>}/>
               <Route index path='/blog/detail/:id' element={<Blog_Detail/>}/>
               <Route index path='/register' element={<Register/>}/>
               <Route index path='/login' element={<Login/>}/>
               <Route index path='/comment' element={<Comment/>}/>
               <Route index path='/rate' element={<Rate/>}/>
               <Route index path='/account' element={<Update/>}/>
               <Route index path='/myaccount' element={<Myproduct/>}/>
               <Route index path='/productaccount' element={<Addproduct/>}/>
               <Route index path='/detective' element={<Detective/>}/>
               <Route index path='/detective/detail/:id' element={<Detective_detail/>}/>
               <Route index path='/sport/detail/:id' element={<Sport_detail/>}/>
               <Route index path='/sport' element={<Sport/>}/>
               <Route index path='/pdf' element={<PDFViewer/>}/>
               <Route index path='/kid' element={<Kid/>}/>
               <Route index path='/kid/detail/:id' element={<Kid_detail/>}/>
               <Route index path='/cart' element={<Cart/>}/>
               <Route index path='/checkout' element={<Checkout/>}/>
               <Route index path='/history' element={<History/>}/>
               <Route index path='/history/detail/:id' element={<History_detail/>}/>
               <Route index path='/search' element={<Search/>}/>
               <Route index path='/profie' element={<Profie_account/>}/>
               <Route index path='/dashboard' element={<AdminDashboard/>}/>
            </Routes>
        </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
