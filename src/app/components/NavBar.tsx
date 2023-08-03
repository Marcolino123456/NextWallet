'use client'

import { useState } from "react";
import LoginModal from "./modals/LoginModal";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import RegisterModal from "./modals/RegisterModal";
import { MdLogin } from "react-icons/md"
import { toast } from "react-hot-toast";

const NavBar = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const isAuthenticated = status === 'authenticated'

  const [isOpenLogin, setIsOpenLogin] = useState(false)
  const [isOpenRegister, setIsOpenRegister] = useState(false)
  const [dashboardPageRouter, setDashboardPageRouter] = useState(false)
  const [walletPageRouter, setWalletPageRouter] = useState(false)

  const openModalLogin = () => {
    setIsOpenLogin(prev => !prev)
  }

  const openModalRegister = () => {
    setIsOpenRegister(prev => !prev)
  }

  const dashboard = () => {
    !isAuthenticated ? (openModalLogin(), (toast.error('User not logged in'))) : (
      router.push('/dashboard'),
      setDashboardPageRouter(true),
      setWalletPageRouter(false)
    )
  }

  const walletPage = () => {
    !isAuthenticated ? (openModalLogin(), (toast.error('User not logged in'))) : (
      router.push('/wallet'),
      setWalletPageRouter(true),
      setDashboardPageRouter(false)
    )
  }

  return (
    <div className="flex h-14 w-full p-4 font-bold items-center bg-[#040D1F]">
      <a className="ml-2 w-[10%] flex items-center text-2xl h-14 italic text-[#0084FF]" href="/">CryptoNext</a>
      <a className={`hover:text-[#0084FF] ml-9 h-7 hover:border-b-4 border-[#0084FF] cursor-pointer mt-1
        ${dashboardPageRouter === true ? 'border-b-4 border-[#0084FF] text-[#0084FF]' : null}`} onClick={dashboard}>Dashboard</a>
      <a className={`hover:text-[#0084FF] ml-9 h-7 hover:border-b-4 border-[#0084FF] cursor-pointer mt-1
        ${walletPageRouter === true ? 'border-b-4 border-[#0084FF] text-[#0084FF]' : null}`} onClick={walletPage}>Wallet</a>
      <div className="flex w-18 h-auto ml-auto mr-5">
        <a className="mr-5">{session?.user?.name}</a>
        {isAuthenticated &&
          <div className="flex flex-row gap-2 h-7 hover:text-[#0084FF] hover:border-b-4 border-[#0084FF] cursor-pointer">
            <a className="flex h-6 items-center justify-center" onClick={() => signOut()}><MdLogin size={20} /></a>
            <button className="h-7 flex" onClick={() => signOut()}>Logout</button>
          </div>}
        {!isAuthenticated &&
          <div className="flex flex-row gap-2 h-7 hover:text-white hover:border-b-4 border-[#0084FF] cursor-pointer">
            <a className="flex h-6 justify-center items-center" onClick={openModalLogin}><MdLogin size={20} /></a>
            <button className="h-7 flex" onClick={openModalLogin}>Login</button>
          </div>}
        {isOpenLogin ? <LoginModal openModalLogin={openModalLogin} openModalRegister={openModalRegister} /> : null}
        {isOpenRegister ? <RegisterModal openModalRegister={openModalRegister} openModalLogin={openModalLogin} /> : null}
      </div>
    </div>
  );
}

export default NavBar;