'use client'

import { snapshotDocHome } from "@/app/firebase/snapshot/snapshotDocHome";
import { updateDocHome } from "@/app/firebase/updateDocs/updateDocHome";
import { allCoinsHomeProps, allCoinsProps, coinsWalletProps } from "@/app/interfaces/interfaces";
import axios from "axios";
import { useState, useEffect } from "react";
import { HiArrowSmUp, HiArrowSmDown } from "react-icons/hi"
import { IoWallet } from "react-icons/io5"

const UserData = ({ coins }: allCoinsHomeProps) => {

  const [coinsWallet, setCoinsWallet] = useState<coinsWalletProps[]>([])
  const [allCoins, setAllCoins] = useState<allCoinsProps[]>([])

  const [totalBalance, setTotalBalance] = useState(0)
  const [totalPerformance, setTotalPerformance] = useState(0)
  const [totalContributed, setTotalContributed] = useState(0)
  const [totalCoins, setTotalCoins] = useState(0)

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

  useEffect(() => {
    const balance = coinsWallet.reduce((accumulator, value) => {
      return accumulator + (value.Cryptos * value.priceUsd)
    }, 0)

    const contributed = coinsWallet.reduce((accumulator, value) => {
      return accumulator + value.Contributed
    }, 0)

    const coins = coinsWallet.reduce((accumulated) => {
      return accumulated + 1
    }, 0)

    if (balance != 0) {
      const performance = ((balance * 100) / contributed) - 100
      setTotalPerformance(performance)
    } else {
      setTotalPerformance(0)
    }

    setTotalBalance(balance)
    setTotalContributed(contributed)
    setTotalCoins(coins)
  }, [coinsWallet])

  return (
    <>
      <div className="w-60 h-36 bg-[#040D1F] flex flex-col gap-2 p-5 rounded-xl">
        <a className="font-semibold text-[#2773EB] text-lg">BALANCE</a>
        <div className="flex flex-row gap-1 mb-2">
          <a className="font-bold text-2xl">$ {totalBalance.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</a>
          <a className="mt-2 text-gray-500 font-semibold">USD</a>
        </div>
        <div>
          {totalPerformance > 0 ?
            <div className="flex flex-row text-green-500 items-center w-24 h-auto bg-[#0B1F3D] rounded-xl">
              <a><HiArrowSmUp size={20} /></a>
              <a className="text-lg">{totalPerformance.toFixed(2)} %</a>
            </div>
            :
            <div className="flex flex-row text-red-500 items-center w-24 h-auto bg-[#0B1F3D] rounded-xl">
              <a><HiArrowSmDown size={20} /></a>
              <a className="text-lg">{totalPerformance.toFixed(2)} %</a>
            </div>}
        </div>
      </div>
      <div className="w-60 h-36 bg-[#040D1F] flex flex-col gap-2 p-5 rounded-xl">
        <a className="font-semibold text-[#2773EB] text-lg">CONTRIBUTED</a>
        <div className="flex flex-row gap-1 mb-2">
          <a className="font-bold text-2xl">$ {totalContributed.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</a>
          <a className="mt-2 text-gray-500 font-semibold">USD</a>
        </div>
        <div>
          {(totalBalance - totalContributed) > 0 ?
            <div className="flex flex-row text-green-500 items-center w-[105px] h-auto bg-[#0B1F3D] rounded-xl gap-1">
              <a><HiArrowSmUp size={20} /></a>
              <a className="text-lg">{(totalBalance - totalContributed).toFixed(2)} $</a>
            </div>
            :
            <div className="flex flex-row text-red-500 items-center w-[105px] h-auto bg-[#0B1F3D] rounded-xl gap-1">
              <a><HiArrowSmDown size={20} /></a>
              <a className="text-lg">{(totalBalance - totalContributed).toFixed(2)} $</a>
            </div>}
        </div>
      </div>
      <div className="w-60 h-36 bg-[#040D1F] flex flex-col gap-2 p-5 rounded-xl">
        <a className="font-semibold text-[#2773EB] text-lg">COINS IN WALLET</a>
        <a className="font-bold text-2xl mb-2">{totalCoins} coins</a>
        <a><IoWallet size={25} /></a>
      </div>
    </>
  );
}

export default UserData;