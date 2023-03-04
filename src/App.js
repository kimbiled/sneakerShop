import './index.scss';
import Header from './components/Header';
import Home from './components/pages/Home';
import Bin from './components/Bin/Bin';
import axios from 'axios';
import {useState} from 'react';
import React from 'react';
import {Routes,Route} from 'react-router-dom';
import Favourites from './components/pages/Favoutires';
import Orders from './components/pages/Orders'
export const AppContext = React.createContext({});

function App() {
  //states
  const [cartOpened, SetCartOpened]=useState(false);
  const [CartItems,SetCartItems]= useState([]);
  const [items,SetItems]= useState([]);
  const [besties,SetBesties]= useState([]);
  const [searchValue, SetSearchValue] = useState('');
  const [isLoading, SetIsLoading] = useState(true);


  //render and catching gets
  React.useEffect(()=>{
    async function fetchData(){
      const itemsResponse = await axios.get('https://62f1f834b1098f150808368c.mockapi.io/SneakersArray');
      const cartResponse = await axios.get('https://62f1f834b1098f150808368c.mockapi.io/cart');
      const bestiesResponse = await axios.get('https://62f1f834b1098f150808368c.mockapi.io/besties');
      SetIsLoading(false);

      SetItems(itemsResponse.data);
      SetCartItems(cartResponse.data);
      SetBesties(bestiesResponse.data)
    }

    fetchData(); //useeffect - work correctly
  }, []);

  const onAddToCart = async (obj) =>{
    try {
      const findItem = CartItems.find((item)=>Number(item.parentId)===Number(obj.id));
      if(findItem){
        SetCartItems(prev=>prev.filter(item=>Number(item.parentId)!==Number(obj.id)));
        await axios.delete(`https://62f1f834b1098f150808368c.mockapi.io/cart/${findItem.id}`);
      }
      else {
        SetCartItems((prev)=>[...prev,obj]);
        const {data} = await axios.post('https://62f1f834b1098f150808368c.mockapi.io/cart',obj);
        SetCartItems((prev)=>prev.map(item=>{
          if(item.parentId===data.parentId){
            return {
              ...item,
              id: data.id
            };
          }
          return item;
        }));
      }
    } catch (error) {
      alert('Не удалось добавить в корзину')
    }
  }

  const onRemoveItem=(id)=>{
    axios.delete(`https://62f1f834b1098f150808368c.mockapi.io/cart/${id}`);
    SetCartItems((prev)=>prev.filter((item)=>Number(item.id) !== Number(id)));
  }
  
  const onAddToBesties = async (obj) =>{ 
    try {
      if(besties.find((main_obj)=>main_obj.id===obj.id)){
        axios.delete(`https://62f1f834b1098f150808368c.mockapi.io/besties/${obj.id}`)
        SetBesties((prev)=>prev.filter((item)=>Number(item.id) !== Number(obj.id)));
      }
      else {
      const {data} = await axios.post('https://62f1f834b1098f150808368c.mockapi.io/besties',obj);
      SetBesties(prev=>[...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в избранные') 
    }
  };

  const onChangeSearch=(e)=>{
    SetSearchValue(e.target.value);
  };

  const isItemAdded=(id)=>{
    return CartItems.some((obj)=>Number(obj.parentId)===Number(id));
  };

  return (
    <AppContext.Provider value={{ CartItems, besties, items, isItemAdded, onAddToBesties, SetCartOpened, SetCartItems, onAddToCart}}>
    <div className='wrapper clear'>

     <Bin items={CartItems} onClickClose={()=>SetCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened}/>
     <Header onClickOpen={()=>SetCartOpened(true)}/>

      <Routes> 
        <Route path="/" element={
        <Home 
          items={items} 
          CartItems={CartItems}
          searchValue={searchValue} 
          SetSearchValue={SetSearchValue}
          onChangeSearch={onChangeSearch}
          onAddToBesties={onAddToBesties}
          onAddToCart={onAddToCart}
          isLoading={isLoading}
        />}
        />
        <Route path="/favourites" element={<Favourites onAddToCart={onAddToCart} />}/> 
        <Route path="/orders" element={<Orders/>}/> 
      </Routes>
    </div>
    </AppContext.Provider>
  );
}

export default App;
