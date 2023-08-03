'use client'

import { deleteTrader } from "@/app/firebase/delete/deleteTrader";
import { TraderOnlyCoinProps } from "@/app/interfaces/interfaces";
import { TiDeleteOutline } from "react-icons/ti"

const TraderOnlyCoin = ({ id, priceUsd, avaregePrice, trader }: TraderOnlyCoinProps) => {

  const orderByDataTrader = trader.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())

  return (
    <div className="flex flex-col font-semibold">
      <div className="flex flex-row w-full h-11 bg-[#040E20] mt-3 px-2 rounded-t-2xl border-b-2 border-gray-400">
        <div className="w-1/12 h-10 flex justify-center items-center">
          <a className="ml-2">Status</a>
        </div>
        <div className="w-2/12 h-10 flex justify-center items-center">
          <a>Data</a>
        </div>
        <div className="w-1/5 h-10 flex justify-center items-center">
          <a>Contributed/withdraw</a>
        </div>
        <div className="w-1/5 h-10 flex justify-center items-center">
          <a>Purchase/sale price</a>
        </div>
        <div className="w-2/12 h-10 flex justify-center items-center">
          <a className="mr-2">Cryptos</a>
        </div>
        <div className="w-2/12 h-10 flex justify-center items-center">
          <a className="mr-3">Profit</a>
        </div>
        <div className="w-2/12 h-10 flex justify-center items-center">
          <a className="mr-4">Profit %</a>
        </div>
        <div className="w-2/12 h-10 flex justify-center items-center">
          <a className="mr-10">Balance</a>
        </div>
      </div>
      <div className="flex flex-col w-full overflow-y-auto h-[310px] bg-[#040E20] rounded-b-2xl px-3 pb-3">
        {orderByDataTrader.map((e) => (
          <div key={e.id}>
            {e.Status === 'buy' && (
              <div className="flex flex-row w-full h-12 border-b border-gray-400 hover:bg-indigo-950 mb-[3px]">
                <div className="w-1/12 h-12 flex justify-center items-center">
                  <a className="text-green-500 font-bold">BUY</a>
                </div>
                <div className="w-2/12 h-12 flex justify-center items-center">
                  <a className="">{new Date(e.Date).toLocaleDateString()}</a>
                </div>
                <div className="w-1/5 h-12 flex justify-center items-center">
                  <a className="">${e.Contributed.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</a>
                </div>
                <div className="w-1/5 h-12 flex justify-center items-center">
                  <a className="">${(e.PriceCoin.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))}</a>
                </div>
                <div className="w-2/12 h-12 flex justify-center items-center">
                  <a className="">{(e.Cryptos.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 6 }))}</a>
                </div>
                <div className={`w-2/12 h-12 flex justify-center items-center ${(e.Cryptos * priceUsd) - e.Contributed > 0 ? 'text-green-500' : 'text-red-500 mr-[2px]'}`}>
                  <a>${((e.Cryptos * priceUsd) - e.Contributed).toFixed(2)}</a>
                </div>
                <div className={`w-2/12 h-12 flex justify-center items-center ${((((e.Cryptos * priceUsd) / (e.Contributed)) - 1) * 100) > 0 ? 'text-green-500' : 'text-red-500 mr-[2px]'}`}>
                  <a>{((((e.Cryptos * priceUsd) / (e.Contributed)) - 1) * 100).toFixed(2)}%</a>
                </div>
                <div className="w-2/12 h-12 flex justify-center items-center">
                  <a className="ml-9">${(e.Cryptos * priceUsd).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</a>
                  <button onClick={() => deleteTrader({ idPri: id, idSec: e.id })} className="bg-red-600 hover:bg-red-500 border-0 rounded-full ml-auto mr-2">
                    <TiDeleteOutline size={25} />
                  </button>
                </div>
              </div>
            )}
            {e.Status === 'sell' && (
              <div className="flex flex-row w-full h-12 border-b border-gray-400 hover:bg-indigo-950 mb-[3px]">
                <div className="w-1/12 h-12 flex justify-center items-center">
                  <a className="text-red-500 font-bold">SELL</a>
                </div>
                <div className="w-2/12 h-12 flex justify-center items-center">
                  <a className="">{new Date(e.Date).toLocaleDateString()}</a>
                </div>
                <div className="w-1/5 h-12 flex justify-center items-center">
                  <a className="">${e.Withdraw.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</a>
                </div>
                <div className="w-1/5 h-12 flex justify-center items-center">
                  <a className="">${(e.PriceCoin.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))}</a>
                </div>
                <div className="w-2/12 h-12 flex justify-center items-center">
                  <a className="">{(e.Cryptos.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 6 }))}</a>
                </div>
                <div className={`w-2/12 h-12 flex justify-center items-center ${(e.Withdraw - (e.Cryptos * avaregePrice)) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  <a>${(e.Withdraw - (e.Cryptos * avaregePrice)).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</a>
                </div>
                <div className="w-2/12 h-12 flex justify-center items-center">

                </div>
                <div className="w-2/12 h-12 flex justify-center items-center">
                  <button onClick={() => deleteTrader({ idPri: id, idSec: e.id })} className="bg-red-600 hover:bg-red-500 border-0 rounded-full ml-auto mr-2">
                    <TiDeleteOutline size={25} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TraderOnlyCoin;