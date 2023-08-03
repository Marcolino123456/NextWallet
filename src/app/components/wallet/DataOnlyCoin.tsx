'use client'

import { dataOnlyCoinProps } from "@/app/interfaces/interfaces"
import { HiArrowSmUp, HiArrowSmDown } from "react-icons/hi"

const DataOnlyCoin = ({ priceUsd, cryptos, avaregePrice, contribution }: dataOnlyCoinProps) => {

  const AvaregeContribution = (cryptos * avaregePrice).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const AvaregePrice = avaregePrice.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const Cryptos = cryptos.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 6 })
  const Profit = ((cryptos * priceUsd) - (cryptos * avaregePrice)).toFixed(2)
  const TotalContribution = contribution.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="flex flex-row gap-7 w-full h-28 mt-3">
      <div className="flex flex-col gap-3 font-semibold w-1/5 h-28 justify-center items-center text-xl bg-[#040E20] rounded-2xl">
        <a className="text-[#0084FF]">Avarege Contribution</a>
        <a>US$ {AvaregeContribution}</a>
      </div>
      <div className="flex flex-col gap-3 font-semibold w-1/5 h-28 justify-center items-center text-xl bg-[#040E20] rounded-2xl">
        <a className="text-[#0084FF]">Avarege Price</a>
        <a>US$ {AvaregePrice}</a>
      </div>
      <div className="flex flex-col gap-3 font-semibold w-1/5 h-28 justify-center items-center text-xl bg-[#040E20] rounded-2xl">
        <a className="text-[#0084FF]">Current Cryptos</a>
        <a>{Cryptos}</a>
      </div>
      <div className="flex flex-col gap-3 font-semibold w-1/5 h-28 justify-center items-center text-xl bg-[#040E20] rounded-2xl">
        <a className="text-[#0084FF]">Current Profit</a>
        {parseFloat(Profit) > 0 ? (
          <a className="text-green-500 flex flex-row">
            <HiArrowSmUp size={20} className="mt-1" />US$ {Profit}
          </a>
        ) : (
          <a className="text-red-500 flex flex-row">
            <HiArrowSmDown size={20} className="mt-1" />US$ {Profit}
          </a>
        )}
      </div>
      <div className="flex flex-col gap-3 font-semibold w-1/5 h-28 justify-center items-center text-xl bg-[#040E20] rounded-2xl">
        <a className="text-[#0084FF]">Total Contribution</a>
        <a>US$ {TotalContribution}</a>
      </div>
    </div>
  );
}

export default DataOnlyCoin;