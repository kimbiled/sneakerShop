function Bin({onClickClose, items=[],onRemove}) {
    return(
      <div className="aside-shadow" >
        <div className="aside">

          <h2 className="mb-30 d-flex justify-between">Корзина
          <img src="/img/remove.svg" alt="arrow" className="cu-p" onClick={onClickClose}/>
          </h2>

          {
            items.length>0 ?
            (
            <>
            <div className="items">
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
              <b>21 498 руб.</b>
            </li>

            <li className="d-flex align-end mb-20">
              <span>Налог 5%: </span>
              <div></div>  
              <b>1074 руб.</b>
            </li>
          </ul>
          <button className="mainButton">Оформить заказ <img src="/img/arrow.svg" alt="arrow"/></button>
          </div>
            </>) : 
          (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
          <img className="mb-20" width={120} height={120} src="/img/box.png" alt="box"/ >
          <h2>Корзина пустая</h2>
          <p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
          <button className="mainButton" onClick={onClickClose}>
            <img className="arrow" src="/img/arrow.svg" alt="arrow"/> 
            Вернуться назад
          </button>
        </div>)
          }

        </div>
        </div>
        );
}
export default Bin;