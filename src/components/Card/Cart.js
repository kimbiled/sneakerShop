import styles from '../Card/Cart.module.scss';
import React, { useState } from 'react';
import ContentLoader from "react-content-loader" 
import { AppContext } from "../../App";

function Cart({ id, parentId, onClickFavourite, onClickPlus, name, src, price, bestie=false, loading=false}) {
  const [isFavourite,SetIsFavourite]= useState(bestie);
  const {isItemAdded} = React.useContext(AppContext);
  const obj = {id,parentId:id,name,src,price}

  const AddButton=()=>{
    onClickPlus(obj);
  }

  const FavouriteButton=()=>{
    onClickFavourite(obj)
    SetIsFavourite(!isFavourite);
  }

    return(
      <div className={styles.card}>
      {loading? 
      
    (
      <ContentLoader  
            speed={2} 
            width={165} 
            height={250} 
            viewBox="0 0 155 265" 
            backgroundColor="#f3f3f3" 
            foregroundColor="#ecebeb" 
          > 
        <rect x="0" y="0" rx="10" ry="10" width="155" height="155"/> 
        <rect x="0" y="167" rx="5" ry="5" width="155" height="15"/> 
        <rect x="0" y="187" rx="5" ry="5" width="100" height="15"/> 
        <rect x="0" y="234" rx="5" ry="5" width="80" height="25"/> 
        <rect x="124" y="230" rx="10" ry="10" width="32" height="32"/> 

      </ContentLoader>
  ) : (
          <>
         {onClickFavourite && 
            <div className="favourite" onClick={FavouriteButton}>
              <img src={isFavourite? '/img/like.svg' : '/img/dislike.svg' } alt="dislike"/>
            </div>
          }
              <img src={src} alt="sneaker" width="100%" height={135}/>
              <h5>{name}</h5>
              <div className="d-flex justify-between align-center">
                 <div className="d-flex flex-column">
                  <span>Цена: </span>
                  <b>{price} руб.</b>
                 </div>
                  {onClickPlus && <img className={styles.plus} onClick={AddButton} 
                  src={isItemAdded(id)? "/img/add.svg" : "/img/Vector.svg" } alt="plus"/>}
              </div>
            </>
  )}
        </div>
    )
}

export default Cart;