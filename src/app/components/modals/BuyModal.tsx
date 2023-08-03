'use client'

import { addBuyCoinTrader } from '@/app/firebase/add/addBuyCoinTrader'
import { ModalProps } from '@/app/interfaces/interfaces'
import { currencyTask } from '@/app/libs/task'
import { useState, FormEvent, ChangeEvent } from 'react'
import { toast } from 'react-hot-toast'
import { IoMdClose } from 'react-icons/io'

const BuyModal: React.FC<ModalProps> = ({ openBuyModal, id, name, priceUsd, imageSmall }) => {
  const [trader, setTrader] = useState({
    id: id,
    date: '',
    priceCoin: priceUsd.toString(),
    contributed: '',
  })

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTrader({ ...trader, [e.target.name]: e.target.value })
  }

  const buyCrypto = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await addBuyCoinTrader(trader)
    toast.success('Successful Purchase')
    openBuyModal()
  }

  const handleClose = (e: any) => {
    if (e.target.id === 'wrapper') openBuyModal()
  }

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50
                           bg-neutral-800/70" id="wrapper" onClick={handleClose}>
      <div className="flex w-[30%] h-[600px] flex-col justify-center px-6 py-12  bg-[#040D1F] text-gray-100 rounded-2xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex flex-row gap-5 p-5 items-center">
            <img
              className="w-10 h-10"
              src={imageSmall}
              alt="Coin Symbol"
            />
            <div className='flex justify-center items-center w-20 h-auto ml-10'>
              <h2 className="text-2xl font-bold ml-12">
                {name}
              </h2>
            </div>
            <button onClick={openBuyModal} className="p-1 border-0 hover:opacity-70 transition ml-auto">
              <IoMdClose size={25} />
            </button>
          </div>
        </div>
        <div className="mt-9 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={buyCrypto}>
            <div>
              <label htmlFor="Date" className="block text-lg font-medium leading-6">
                Date of Contribution
              </label>
              <div className="mt-2 border-b-2">
                <input
                  type="Date"
                  autoFocus
                  autoComplete="xx/xx/xx"
                  required
                  defaultValue={trader.date}
                  onChange={e => setTrader({ ...trader, date: e.target.value })}
                  className="w-full border-none outline-none py-1.5 shadow-sm bg-transparent text-gray-100 sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="number" className="block text-lg font-medium leading-6">
                  Coin Price
                </label>
              </div>
              <div className="mt-2 border-b-2">
                <input
                  type="text"
                  name="priceCoin"
                  required
                  defaultValue={trader.priceCoin}
                  onChange={(e) => handlerChange(currencyTask(e))}
                  className="w-full border-none outline-none py-1.5 shadow-sm bg-transparent text-gray-100 sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="number" className="block text-lg font-medium leading-6">
                  Amount Contributed
                </label>

              </div>
              <div className="mt-2 border-b-2">
                <input
                  type="text"
                  name="contributed"
                  required
                  onChange={(e) => handlerChange(currencyTask(e))}
                  className="w-full border-none outline-none py-1.5 shadow-sm bg-transparent text-gray-100 sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="number" className="block text-lg font-medium leading-6">
                  Amount of Coins
                </label>
              </div>
              <div className="mt-2">
                {trader.contributed ? <a>{parseFloat(trader.contributed.replace(',', '')) / parseFloat(trader.priceCoin.replace(',', ''))}</a> : 0}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-lg font-semibold leading-6 text-white 
                  shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                BUY {name.toUpperCase()}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BuyModal;