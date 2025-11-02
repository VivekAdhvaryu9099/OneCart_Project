/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './authContext'
import axios from 'axios'
import { UserDataContext } from './userContext'



// eslint-disable-next-line react-refresh/only-export-components
export const shopDataContext = createContext()


const ShopContext = ({children}) => {

    let [product,setProduct] = useState([])

    let [search,setSearch] = useState('')

     // eslint-disable-next-line no-unused-vars
     let [loading,setLoading] = useState(false)

    let [showSearch,setShowSearch] = useState(false)

    let {serverUrl} = useContext(authDataContext)

    let {userData} = useContext(UserDataContext)

    let currency = '₹'

    let delhivery_fee=40

    let [cartItem,setCartItem] = useState({})

    const get_Product = async ()=>{
        try {
            let result = await axios.get(serverUrl+'/api/product/ListProduct')

            console.log(result.data);
            setProduct(result.data.product)

        } catch (error) {
            console.log(error);
        }
    }

    const addToCart = async (itemId,size)=>{
         
        if (!size) {
      console.log("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItem); // Clone the product

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
  
    setCartItem(cartData);
    console.log(cartData);


      if (userData) {
      setLoading(true)
      try {
      let result = await axios.post(serverUrl + "/api/cart/add" , {itemId,size} , {withCredentials: true})
      console.log(result.data)
      
      setLoading(false)


       
      }
      catch (error) {
        console.log(error)
        setLoading(false)
        
       
      }
     
    } 


    
    }



    const getUserCart = async () => {
      try {
        const result = await axios.post(serverUrl + '/api/cart/get',{},{ withCredentials: true })

      setCartItem(result.data)
    } catch (error) {
      console.log(error)
     


    }
      
    }


     const updateQuantity = async (itemId , size , quantity) => {
      let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity
    setCartItem(cartData)

    if (userData) {
      try {
        await axios.post(serverUrl + "/api/cart/update", { itemId, size, quantity }, { withCredentials: true })
      } catch (error) {
        console.log(error)
        
      }
    }
      
    }





      const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item]
          }
        } catch (error) {
            console.log(error);
            
        }
      }
    }
    return totalCount
  }

 const getCartAmount = () => {
  let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = product.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {
            console.log(error);

        }
      }
    }
    return totalAmount
    
  }




    useEffect(()=>{
        get_Product()
    },[])

    useEffect(()=>{
      getUserCart()
    },[])


    let value={
        product,currency,delhivery_fee,get_Product,search,setSearch,showSearch,setShowSearch,
        cartItem,addToCart,getCartCount,setCartItem,getCartAmount,updateQuantity
    }

  return (
    <div>
        <shopDataContext.Provider value={value}>
            {children}
        </shopDataContext.Provider>
    </div>
  )
}

export default ShopContext