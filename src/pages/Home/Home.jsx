import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {
  const {allCoin,currency}=useContext(CoinContext);
  const [displayCoin,setdisplayCoin]=useState([]);
  const [input,setInput]=useState('');

  const inputHandler=(e)=>{
    setInput(e.target.value);
    if(e.target.value===""){
      setdisplayCoin(allCoin);
    }
  }

  const searchHandler=async(e)=>{
     e.preventDefault();
    const coins= await allCoin.filter((item)=>{
       return item.name.toLowerCase().includes(input.toLowerCase());
     })
     //coin named called bitcoin so if i type bit then it display all the with bit
     setdisplayCoin(coins);
  }

  useEffect(()=>{
    setdisplayCoin(allCoin);
  },[allCoin])


  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest <br/>Crypto MarketPlace</h1>
        <p>"Step into the world’s largest crypto marketplace! Sign up today to discover, trade, and learn all about cryptocurrencies."
        </p>
        <form onSubmit={searchHandler}>
          <input onChange={inputHandler} list='coinlist'value={input} type="text" placeholder='Search Crypto' required/>
          
          <datalist id='coinlist'>
           {allCoin.map((item,index)=>(<option key={index} value={item.name}/>))}
          </datalist>




          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign:"center"}}>24h Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        {
          displayCoin.slice(0,10).map((item,index)=>(
            <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="images"/>
                <p>{item.name +"-"+ item.symbol}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              <p className={item.price_change_percentage_24h>0?"green":"red"}>{Math.floor(item.price_change_percentage_24h*100)/100}</p>
              <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home
