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

import Myproduct from './product/Myproduct';
import Addproduct from './product/Addproduct';


import PDFViewer from './Items/PDFViewer';

import Sport from './Items/Sách_Thể_Thao/Sport';
import Kid from './Items/Sách_Cho_Bé/Kid';
import Sport_detail from './Items/Sách_Thể_Thao/Sport_detail';

import Kid_detail from './Items/Sách_Cho_Bé/Kid_detail';

import Checkout from './product/Checkout';


import Search from './pages/Search';
import Profie_account from './members/Profie_account';
import AdminDashboard from './Admin/AdminDashboard';
import Comments from './Items/Sách_Trinh_Thám/Comments';
import Detective from './Items/Sách_Trinh_Thám/Detective';
import Detective_detail from './Items/Sách_Trinh_Thám/Detective_detail';
import Comment_Sport from './Items/Sách_Thể_Thao/Comment_Sport';
import Comments_Kid from './Items/Sách_Cho_Bé/Comments_Kid';
import ListComment_TT from './Items/Sách_Trinh_Thám/ListComment_TT';
import History from './Items/Sách_lịch_Sử/History';
import History_detail from './Items/Sách_lịch_Sử/History_detail';
import Comments_Ls from './Items/Sách_lịch_Sử/Comments_Ls';
import ListComment_Ls from './Items/Sách_lịch_Sử/ListComment_Ls';

import ListComment_Sp from './Items/Sách_Thể_Thao/ListComment_SP';

import Wishlist from './Items/Wishlist';
import Payment from './product/Payment';
import Cart from './product/Cart';
import Button_back from './Items/Button_back';
import Create_profile from './members/Create_profile';







const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
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
               <Route index path='/account' element={<Create_profile/>}/>
               <Route index path='/myaccount' element={<Myproduct/>}/>
               <Route index path='/productaccount' element={<Addproduct/>}/>
               <Route index path='/detective' element={<Detective/>}/>
               <Route index path='/detective/detail/:id' element={<Detective_detail/>}/>
               <Route index path='/sport/detail/:id' element={<Sport_detail/>}/>
               <Route index path='/sport' element={<Sport/>}/>
               <Route index path='/pdf/:id' element={<PDFViewer/>}/>
               <Route index path='/kid' element={<Kid/>}/>
               <Route index path='/kid/detail/:id' element={<Kid_detail/>}/>
               <Route path='/payment/:id' element={<Payment/>} />
               <Route index path='/checkout' element={<Checkout/>}/>
               <Route index path='/history' element={<History/>}/>
               <Route index path='/history/detail/:id' element={<History_detail/>}/>
               <Route index path='/search' element={<Search/>}/>
               <Route index path='/profie' element={<Profie_account/>}/>
               <Route index path='/dashboard' element={<AdminDashboard/>}/>
              
               <Route index path='/comments/:id' element={<Comments/>}/>
               <Route index path='/comments_sp/:id' element={<Comment_Sport/>}/>
               <Route index path='/comments_kid/:id' element={<Comments_Kid/>}/>
               <Route index path='/comments_ls/:id' element={<Comments_Ls/>}/>
               <Route index path='/listcommenttt' element={<ListComment_TT/>}/>
               <Route index path='/listcommentls' element={<ListComment_Ls/>}/>
               <Route index path='/listcommentsp' element={<ListComment_Sp/>}/>
               <Route index path='/wishlist' element={<Wishlist/>}/>
               <Route index path='/cart/:id' element={<Cart/>}/>   
               <Route index path='/button_back/:id' element={<Button_back/>}/>             
            </Routes>
        </App>
    </Router>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
