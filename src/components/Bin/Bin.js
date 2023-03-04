import React from 'react'
import axios from 'axios';

import {Info} from '../Info'
import { AppContext } from '../../App';

import styles from './Bin.module.scss';

const delay = (ms) => new Promise ((resolve)=>setTimeout(resolve, ms))

function Bin({onClickClose, items=[],onRemove, opened}) {

  const {CartItems, SetCartItems} = React.useContext(AppContext)
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const totalPrice = CartItems.reduce((sum, obj)=>obj.price + sum ,0);

  const onClickOrder= async ()=>{
    try{
      setIsLoading(true);
      const {data} = await axios.post('https://63dc6e7c2308e3e319e78c50.mockapi.io/orders',{
      items:CartItems,
    });
    setOrderId(data.id);
    setIsOrderComplete(true);
    SetCartItems([]);

    //deleting items from cart, because mockAPI doesnt include delete all items
    for (let i = 0; i < CartItems.length; i++) {
      const item = CartItems[i];
      await axios.delete('https://62f1f834b1098f150808368c.mockapi.io/cart/'+item.id);
      await delay(1000);
    }
    }
    catch (error){
      alert("Не удалось создать заказ :(")
    }
    setIsLoading(false);
  }


    return(
      <div className={`${styles.overlay} ${opened? styles.overlayVisible : ''}`} >
        <div className={styles.aside}>

          <h2 className="mb-30 d-flex justify-between">Корзина
          <img src="/img/remove.svg" alt="arrow" className="cu-p" onClick={onClickClose}/>
          </h2>

          {
            items.length > 0 ?
            (
            <>
            <div className={styles.items}>
        {
          items.map((val)=>(
            <div key={val.id} className="cardItem d-flex align-center mb-20">
              <div 
                style={{backgroundImage:`url(${val.src})`}} 
                  className="cardItemImg">
              </div>

            <div className="mr-20 flex">
              <p className="mb-5">{val.name}</p>
              <b>{val.price} руб.</b>
            </div>
            <img onClick={()=>onRemove(val.id)} className="removeButton" src="/img/remove.svg" alt="remove"/>
          </div>
          ))}
        </div>

          <div className="cardBlock">
          <ul className="mb-30">
            <li className="d-flex align-end mb-20">
              <span>Итого: </span>
              <div></div>  
              <b>{totalPrice} руб.</b>
            </li>

            <li className="d-flex align-end mb-20">
              <span>Налог 5%: </span>
              <div></div>  
              <b>{parseInt(totalPrice*0.05)} руб.</b>
            </li>
          </ul>
          <button disabled={isLoading} className="mainButton" onClick={onClickOrder}>Оформить заказ<img src="/img/arrow.svg" alt="arrow"/></button>
          </div>
            </>) 
            : 
          (
            <Info 
            title={isOrderComplete? "Заказ оформлен!" : "Корзина пустая"} 
            description={isOrderComplete? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."} 
            image={isOrderComplete? "/img/ordered.svg":"/img/box.png"} /> 
          )}
        </div>
        </div>
        );
}
export default Bin;