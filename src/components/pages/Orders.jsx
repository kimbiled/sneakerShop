import Cart from '../Card/Cart'
import React from 'react';
import axios from 'axios';
import {useState} from 'react';

function Orders() {
    const [orders, setOrders] = React.useState([]);
    const [isLoading, SetIsLoading] = useState(true);

    React.useEffect(()=>{
       async function waitData () {
        try{
            const {data} = await axios.get('https://63dc6e7c2308e3e319e78c50.mockapi.io/orders');
            setOrders(data.reduce((prev, obj)=>[...prev, ...obj.items],[]));
            SetIsLoading(false)
        }
        catch (error){
            alert("Ошибка при запросе заказов!");
        }
    }
       waitData();
    },[]);
  
    return(
    <div className='content p-40 '>
    <div className="d-flex align-center justify-between mb-40">
      <h1>Мои заказы</h1>
    </div>

    <div className="d-flex flex-wrap">
    {
        (isLoading? [...Array(8)] : orders).map((val,index)=>(
          <Cart 
          key={index}
          bestie={true}
          loading={isLoading}
          {...val}
          />
        ))
        }
    </div>
  </div>
    )
}

export default Orders;
