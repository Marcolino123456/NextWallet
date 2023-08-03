'use client'

import { traderCoinProps, uniqueCoinProps } from "../../interfaces/interfaces";
import { useEffect, useState, useRef } from 'react'
import BuyModal from "../modals/BuyModal";
import SellModal from "../modals/SellModal";
import { snapshotTraderCoin } from "../../firebase/snapshot/snapshotTraderCoin";
import { updateOnlyCoin } from "@/app/firebase/updateDocs/updateOnlyCoin";
import DataOnlyCoin from "./DataOnlyCoin";
import TraderOnlyCoin from "./TraderOnlyCoin";

const OnlyCoin: React.FC<uniqueCoinProps> = ({ id, name, imageSmall, imageLarge, priceUsd, historicalValue }) => {

  const [isOpenBuy, setIsOpenBuy] = useState(false)
  const [isOpenSell, setIsOpenSell] = useState(false)

  const [dataTrader, setDataTrader] = useState<traderCoinProps[]>([])

  const totalContributedRef = useRef(0)
  const avaregePriceRef = useRef(0)
  const cryptosRef = useRef(0)

  useEffect(() => {
    if (id) {
      snapshotTraderCoin({ id, setDataTrader })
    }
  }, [id])

  useEffect(() => {
    const cryptos = dataTrader.reduce((accumulator, value) => {
      if (value.Status === 'buy') {
        return accumulator + value.Cryptos
      } else if (value.Status === 'sell') {
        return accumulator - value.Cryptos
      }
      return accumulator
    }, 0)

    const totalContributed = dataTrader.reduce((accumulator, value) => {
      if (value.Status === 'buy') {
        return accumulator + value.Contributed
      }
      return accumulator
    }, 0)

    const avaregePrice = dataTrader.reduce((accumulator, value) => {
      if (value.Status === 'buy') {
        return accumulator + value.PriceCoin
      }
      return accumulator
    }, 0)

    const count = dataTrader.reduce((accumulator, value) => {
      if (value.Status === 'buy') {
        return accumulator + value.Count
      }
      return accumulator
    }, 0)

    totalContributedRef.current = totalContributed
    cryptosRef.current = cryptos

    let priceAvarege = 0

    if (count != 0) {
      avaregePriceRef.current = avaregePrice / count
      priceAvarege = avaregePrice / count
    } else {
      avaregePriceRef.current = 0
      priceAvarege = 0
    }

    updateOnlyCoin({ id, cryptos, priceAvarege })
  }, [dataTrader, id, priceUsd])

  const openBuyModal = () => {
    setIsOpenBuy(prev => !prev)
  }

  const openSellModal = () => {
    setIsOpenSell(prev => !prev)
  }

  return (
    <div className="flex w-full h-auto px-2 gap-4 border-t border-gray-600">
      <div className="flex flex-col w-[19%] h-[475px] bg-[#040E20] rounded-2xl items-center mt-3">
        <a className="text-3xl font-bold mt-4">{name}</a>
        <div className="flex justify-center items-center gap-7 w-full h-14 mt-4">
          <button className="w-20 h-8 rounded-lg bg-green-700 text-white hover:bg-green-500 font-semibold" onClick={openBuyModal}>BUY</button>
          <button className="w-20 h-8 rounded-lg bg-red-700 text-white hover:bg-red-500 font-semibold" onClick={openSellModal}>SELL</button>
          {isOpenBuy ? <BuyModal openBuyModal={openBuyModal} openSellModal={openSellModal} id={id} name={name} priceUsd={priceUsd} imageSmall={imageSmall} /> : null}
          {isOpenSell ? <SellModal openSellModal={openSellModal} openBuyModal={openBuyModal} id={id} name={name} priceUsd={priceUsd} imageSmall={imageSmall} /> : null}
        </div>
        <img src={imageLarge} alt="symbol" width={170} height={170} className="mt-7 mb-12" />
        <a className="flex text-base font-semibold">Historical Price: {historicalValue?.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $USD</a>
        <a className="flex text-base font-semibold">Current Price: {priceUsd?.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $USD</a>
      </div>
      <div className="w-4/5 h-[475px]">

        <DataOnlyCoin priceUsd={priceUsd} cryptos={cryptosRef.current} avaregePrice={avaregePriceRef.current}
          contribution={totalContributedRef.current} />

        <TraderOnlyCoin id={id} priceUsd={priceUsd} avaregePrice={avaregePriceRef.current} trader={dataTrader} />

      </div>
    </div>
  );
}

export default OnlyCoin;