import Cart from '../Card/Cart'
import React from 'react';
import { AppContext }  from '../../App';

function Favourites() {
  const {besties,onAddToBesties} = React.useContext(AppContext);
  
    return(
    <div className='content p-40 '>
    <div className="d-flex align-center justify-between mb-40">
      <h1>Избранные</h1>
    </div>

    <div className="d-flex flex-wrap">
    {
        besties.map((val,index)=>(
          <Cart 
          key={index}
          id={val.id}
          name={val.name} 
          price={val.price} 
          src={val.src}
          onClickFavourite={onAddToBesties}
          // onClickPlus={(obj)=>onAddToCart(obj)}
          bestie={true}/>
        ))
        }
    </div>
  </div>
    )
}

export default Favourites;
