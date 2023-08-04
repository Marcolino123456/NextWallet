'use client'

import { allCoinsProps } from "@/app/interfaces/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";

const CoinListHome = () => {

  const [allCoins, setAllCoins] = useState<allCoinsProps[]>([])
  const [search, setSearch] = useState<string>("")

  const searchCoins = allCoins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const apiCoin = async () => {
      const { data } = await axios.get('/api/coinGeckoApi')
      const resp = await data.data
      setAllCoins(resp)
    }
    apiCoin()

    const interval = setInterval(async () => {
      const { data } = await axios.get('/api/coinGeckoApi')
      const resp = await data.data
      setAllCoins(resp)
    }, 65000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col bg-[#040D1F] p-3 overflow-y-auto h-[618px] rounded-xl">
      <div className="flex flex-row items-center p-2 justify-between my-3">
        <p className="font-semibold text-lg ml-6">Cryptocurrency</p>
        <input className="mr-6 h-8 rounded-lg border border-[#2773EB] hover:border-blue-500 bg-[#0E1155] "
          type="text"
          placeholder=" Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-row w-full h-16 items-center border-b border-blue-800 font-semibold text-lg">
        <div className="w-1/4 h-16  flex flex-row items-center gap-7">
          <a className="ml-4 w-7">#</a>
          <a className="ml-16">Name</a>
        </div>
        <div className="w-1/12 h-16 flex justify-end items-center">
          <a>Price</a>
        </div>
        <div className="w-2/12 h-16 flex justify-end items-center">
          <a>24h%</a>
        </div>
        <div className="w-[14%] h-16 flex justify-end items-center">
          <a>High 24h</a>
        </div>
        <div className="w-[14%] h-16 flex justify-end items-center">
          <a>Low 24h</a>
        </div>
        <div className="w-1/5 h-16 flex justify-end items-center">
          <a>Market Cap</a>
        </div>
      </div>
      {searchCoins.map((coin) => (
        <div key={coin.id} className="w-full h-20 flex flex-row items-center border-b border-blue-900 font-semibold text-lg hover:bg-blue-900 rounded-lg">
          <div className="w-1/4 h-20  flex flex-row items-center gap-7">
            <a className="ml-3 w-7">#{coin.market_cap_rank}</a>
            <img src={coin.image} alt="symbol" width={25} height={25} />
            <a className="ml-4">{coin.name}</a>
            <a>{coin.symbol.toUpperCase()}</a>
          </div>
          <div className="w-1/12 h-20 flex justify-end items-center">
            <a>${coin.current_price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</a>
          </div>
          <div className="w-2/12 h-20 flex justify-end items-center">
            <a className={`${coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}`}>{coin.price_change_percentage_24h}%</a>
          </div>
          <div className="w-[14%] h-20 flex justify-end items-center">
            <a>${coin.high_24h?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</a>
          </div>
          <div className="w-[14%] h-20 flex justify-end items-center">
            <a>${coin.low_24h?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</a>
          </div>
          <div className="w-1/5 h-20 flex justify-end items-center">
            <a>${coin.market_cap?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CoinListHome;