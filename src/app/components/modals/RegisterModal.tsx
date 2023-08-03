'use client'

import { FormEvent, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { IoMdClose } from "react-icons/io"

interface RegisterModalProps {
  openModalRegister: () => void,
  openModalLogin: () => void
}

const RegisterModal: React.FC<RegisterModalProps> = ({ openModalRegister, openModalLogin }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const registerUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/api/register/', data)
        .then(() => toast.success('User has been registered'))
      openModalRegister()
      openModalLogin()
    } catch (error) {
      toast.error('Email Already Exist')
    }
  }

  const handleClose = (e: any) => {
    if (e.target.id === 'wrapper') openModalRegister()
  }

  const loginUser = () => {
    openModalRegister()
    openModalLogin()
  }

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50
                           bg-neutral-800/70" id="wrapper" onClick={handleClose}>
      <div className="flex w-[30%] h-auto flex-col justify-center px-6 py-12  bg-[#040D1F] rounded-2xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-row">
          <p className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-50 ml-24">
            Register account
          </p>
          <button onClick={openModalRegister} className="p-1 border-0 hover:opacity-70 relative transition ml-auto">
            <IoMdClose size={25} />
          </button>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-lg">
          <form className="space-y-6" onSubmit={registerUser}>
            <div>
              <label htmlFor="name" className="block font-medium leading-6 text-gray-50">
                Name
              </label>
              <div className="mt-2 border-b-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoFocus
                  required
                  value={data.name}
                  onChange={e => setData({ ...data, name: e.target.value })}
                  className="w-full border-none outline-none py-1.5 shadow-sm bg-transparent text-gray-100 sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block font-medium leading-6 text-gray-50">
                Email address
              </label>
              <div className="mt-2 border-b-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={data.email}
                  onChange={e => setData({ ...data, email: e.target.value })}
                  className="w-full border-none outline-none py-1.5 shadow-sm bg-transparent text-gray-100 sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block font-medium leading-6 text-gray-50">
                  Password
                </label>
              </div>
              <div className="mt-2 border-b-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={data.password}
                  onChange={e => setData({ ...data, password: e.target.value })}
                  className="w-full border-none outline-none py-1.5 shadow-sm bg-transparent text-gray-100 sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm
                   hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-gray-500">
            Is Already a member?{' '}
            <button className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={loginUser}>
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterModal