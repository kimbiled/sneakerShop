import React from 'react'
import { AppContext } from '../App'

export const Info = ({image,title, description})=>{
const {SetCartOpened} = React.useContext(AppContext)

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
          <img className="mb-20" width={120} src={image} alt="box"/ >
          <h2>{title}</h2>
          <p className="opacity-6">{description}</p>
          <button onClick={()=>SetCartOpened(false)} className="mainButton">
            <img className="arrow" src="/img/arrow.svg" alt="arrow"/> 
            Вернуться назад
          </button>
        </div>
    )
}