import Cart from "../Card/Cart"
import React from "react";
function Home({
    items,
    searchValue,
    SetSearchValue,
    onChangeSearch,
    onAddToBesties,
    onAddToCart,
    isLoading}) {


const renderItems = () =>{
  const filteredItems = items.filter((item)=>item.name.toLowerCase().includes(searchValue.toLowerCase()),);

  return(isLoading? [...Array(8)] : filteredItems).map((val,index)=>(
    <Cart 
      key={index}
      loading={isLoading}
      onClickFavourite={(obj)=>onAddToBesties(obj)}
      onClickPlus={(obj)=>onAddToCart(obj)}
      {...val}
      />
    ))
}

    return(
    <div className='content p-40 '>
    <div className="d-flex align-center justify-between mb-40">
      <h1>{searchValue?`Поиск по запросу: "${searchValue}"` : `Все кроссовки`}</h1>
      <div className="search-block d-flex">
        <img src="/img/loop.svg" alt="loop"/>
        {searchValue && <img onClick={()=>SetSearchValue('')}className="clear cu-p" src="/img/remove.svg" alt="remove"/>}
        <input placeholder="Поиск ..." onChange={(e)=>onChangeSearch(e)} value={searchValue} maxLength="33"/>
      </div>
    </div>

    <div className="d-flex flex-wrap">
        {
          renderItems()
        }
    </div>
  </div>
    )
}

export default Home;
