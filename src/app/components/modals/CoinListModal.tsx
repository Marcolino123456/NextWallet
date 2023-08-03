'use client'

import { useState, useEffect, useRef } from 'react'
import { allCoinsHomeProps, allCoinsProps, coinsWalletProps } from "@/app/interfaces/interfaces";
import { IoMdClose } from 'react-icons/io'
import { snapshotDocHome } from '@/app/firebase/snapshot/snapshotDocHome';
import { addDocHome } from '@/app/firebase/add/addDocHome';
import { toast } from 'react-hot-toast';

interface coinListModalProps extends allCoinsHomeProps {
  openCoinListModal: () => void
}

const CoinListModal = ({ coins, openCoinListModal }: coinListModalProps) => {

  const [coinsWallet, setCoinsWallet] = useState<coinsWalletProps[]>([])
  const [allCoins, setAllCoins] = useState<allCoinsProps[]>([])
  const [search, setSearch] = useState<string>("")

  const coinExistRef = useRef(false)

  useEffect(() => {
    snapshotDocHome(setCoinsWallet)
    setAllCoins(coins)
  }, [coins])

  const searchCoins = allCoins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  )

  const addCoin = async (id: string) => {
    for (let i = 0; i < coinsWallet.length; i++) {
      if (coinsWallet[i].id === id) {
        coinExistRef.current = true
        break
      } else {
        coinExistRef.current = false
      }
    }
    if (coinExistRef.current === true) {
      toast.error('Coin Already Exist')
    } else {
      await addDocHome(id)
      toast.success('Coin has been Registered')
      openCoinListModal()
    }
  }

  const handleClose = (e: any) => {
    if (e.target.id === 'wrapper') openCoinListModal()
  }

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0
    bg-neutral-800/70" id="wrapper" onClick={handleClose}>
      <div className="flex w-[30%] h-[600px] flex-col justify-center bg-[#040D1F] text-gray-200 rounded-2xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex flex-row gap-5 items-center w-full h-20">
            <div className='flex justify-center items-center w-28 h-10'>
              <h2 className="text-2xl font-bold">
                Coin List
              </h2>
            </div>
            <div className='flex flex-col w-32 h-16 gap-3 justify-end ml-auto -mt-9'>
              <button onClick={openCoinListModal} className="p-1 border-0 hover:opacity-70 transition ml-auto">
                <IoMdClose size={25} />
              </button>
              <input className="h-12 rounded-lg border border-[#2773EB] hover:border-blue-500 bg-[#0E1155] "
                type="text"
                placeholder=" Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-9 sm:mx-auto sm:w-full sm:max-w-sm overflow-y-auto h-[400px]">
          {searchCoins.map((coin) => (
            <div key={coin.id} className="w-full h-11 flex flex-row items-center border-b border-gray-600 font-semibold text-lg 
            hover:bg-blue-900 rounded-lg cursor-pointer"
              onClick={() => addCoin(coin.id)}>
              <div className="w-full h-10  flex flex-row items-center gap-4">
                <a className="ml-3 w-7">#{coin.market_cap_rank}</a>
                <img src={coin.image} alt="symbol" width={25} height={25} />
                <a className="ml-4">{coin.name}</a>
                <a>{coin.symbol.toUpperCase()}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoinListModal;