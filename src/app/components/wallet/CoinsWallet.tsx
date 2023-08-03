'use client'

import { useEffect, useState } from "react";
import { snapshotDocHome } from "../../firebase/snapshot/snapshotDocHome";
import { allCoinsHomeProps, allCoinsProps, coinsWalletProps } from "../../interfaces/interfaces";
import { snapshotOnlyCoin } from "../../firebase/snapshot/snapshotOnlyCoin";
import OnlyCoin from "./OnlyCoin";
import { DocumentData } from "firebase/firestore";
import { updateDocHome } from "../../firebase/updateDocs/updateDocHome";
import { deleteCoinWallet } from "../../firebase/delete/deleteCoinWallet";
import { TiDeleteOutline } from "react-icons/ti"
import { HiArrowSmUp, HiArrowSmDown } from "react-icons/hi"
import axios from "axios";
import CoinListModal from "../modals/CoinListModal";

const CoinsWallet = ({ coins }: allCoinsHomeProps) => {

  const [coinsWallet, setCoinsWallet] = useState<coinsWalletProps[]>([])
  const [onlyCoin, setOnlyCoin] = useState<DocumentData>({})
  const [allCoins, setAllCoins] = useState<allCoinsProps[]>([])

  const [isOpenCoinList, setIsOpenCoinList] = useState<boolean>(false)

  useEffect(() => {
    snapshotDocHome(setCoinsWallet)
  }, [])

  useEffect(() => {
    setAllCoins(coins)
    const interval = setInterval(async () => {
      const { data } = await axios.get('http://localhost:3000/api/coinGeckoApi')
      const resp = await data.data
      setAllCoins(resp)
    }, 65000)
    return () => clearInterval(interval)
  }, [coins])

  useEffect(() => {
    if (allCoins[0] != undefined) {
      for (let i = 0; i < coinsWallet.length; i++) {
        for (let j = 0; j < allCoins.length; j++) {
          if (coinsWallet[i].name === allCoins[j].name) {
            updateDocHome({
              id: allCoins[j].id,
              price: allCoins[j].current_price,
              hightHistorical: allCoins[j].ath
            })
            break
          }
        }
      }
    }
  }, [allCoins, coinsWallet])

  const uniqueCoin = (id: string) => {
    snapshotOnlyCoin({ id, setOnlyCoin })
  }

  useEffect(() => {
    if (coinsWallet[0] && onlyCoin.id === undefined) {
      snapshotOnlyCoin({ id: coinsWallet[0].id, setOnlyCoin: setOnlyCoin })
    }
  }, [onlyCoin, coinsWallet])

  const openCoinListModal = () => {
    setIsOpenCoinList(prev => !prev)
  }

  const orderBalanceCoin = coinsWallet.sort((a, b) => (b.Cryptos * b.priceUsd) - (a.Cryptos * a.priceUsd))

  return (
    <div className=" flex flex-col w-[99%] h-auto">
      <div className="-mt-[70px] w-28 h-10 bg-indigo-600 ml-[690px] flex justify-center items-center cursor-pointer rounded-xl hover:bg-indigo-500"
        onClick={openCoinListModal}>
        <a className="font-semibold text-lg">Add Coin</a>
      </div>
      <div className="flex w-full px-2 overflow-y-auto h-32 flex-wrap gap-4 font-semibold mb-4 mt-6">
        {orderBalanceCoin.map((coin) => (
          <div key={coin.id} className="w-[19%] h-32 bg-[#040D1F] cursor-pointer hover:bg-indigo-950 flex flex-col px-4 rounded-lg" onClick={() => uniqueCoin(coin.id)}>
            <div className="w-full h-12 flex flex-row justify-center items-center gap-5 p-2 border-b border-gray-600">
              <img className="w-8 h-8" src={coin.imageSmall} alt="coin symbol" />
              <p className="font-bold w-32 flex items-center justify-center text-[#0084FF]">{coin.symbol.toUpperCase()}</p>
              <button className="bg-red-600 hover:bg-red-500 border-0 rounded-full ml-auto" onClick={() => deleteCoinWallet(coin.id)}><TiDeleteOutline size={25} /></button>
            </div>
            <div className="flex flex-row w-full h-12 mt-2">
              <a className="text-4xl mt-2">{coin.Cryptos ? <>${(coin.Cryptos * coin.priceUsd).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</> : <>0,00</>}</a>
              {coin.Cryptos ?
                <>
                  {((((coin.Cryptos * coin.priceUsd) * 100) / (coin.Cryptos * coin.AvaregePrice)) - 100) > 0 ?
                    <a className="ml-auto mt-6 flex text-green-500">
                      <HiArrowSmUp size={20} className="mt-0.5" />
                      {((((coin.Cryptos * coin.priceUsd) * 100) / (coin.Cryptos * coin.AvaregePrice)) - 100).toFixed(2)} %
                    </a> :
                    <a className="ml-auto mt-6 flex text-red-500">
                      <HiArrowSmDown size={20} className="mt-0.5" />
                      {((((coin.Cryptos * coin.priceUsd) * 100) / (coin.Cryptos * coin.AvaregePrice)) - 100).toFixed(2)} %
                    </a>
                  }
                </> :
                <a className="ml-auto mt-6">0,00</a>}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full h-auto">
        <OnlyCoin id={onlyCoin.id} name={onlyCoin.name} priceUsd={onlyCoin.priceUsd}
          imageSmall={onlyCoin.imageSmall} historicalValue={onlyCoin.historicalValue} imageLarge={onlyCoin.imageLarge} />
      </div>
      {isOpenCoinList && <CoinListModal coins={coins} openCoinListModal={openCoinListModal} />}
    </div>
  );
}

export default CoinsWallet;