import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

const Home = () => {

  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);

  const navigate=useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, [])
  
  const handleLogout=(e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    setTimeout(() => {
      navigate("/login");
    }, 1000);
    handleSuccess("User Loggedout");
  }

  const fetchProducts=async()=>{
    try {
      const url="https://auth-mern1-api-zeta.vercel.app/products";
      const headers={
        headers:{
          'Authorization' : localStorage.getItem('token')
        }
      }
      const response=await fetch(url,headers);
      const result=await response.json();
      setProducts(result);
    } catch (error) {
      handleError(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])
  

  return (
    <div>
      <h1>{loggedInUser}</h1> 
      <button onClick={handleLogout}>Logout</button>
      <div>
        {
          products.map((item,index)=>(
            <ul key={index}>
              <span>{item.name}: {item.price}</span>
            </ul>
          ))
        }
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Home
