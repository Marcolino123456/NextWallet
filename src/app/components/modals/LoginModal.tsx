'use client'

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast } from "react-hot-toast"
import { IoMdClose } from "react-icons/io"

interface LoginModalProps {
  openModalLogin: () => void,
  openModalRegister: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ openModalLogin, openModalRegister }) => {
  const router = useRouter()
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const loginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signIn('credentials', { ...data, redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error(callback.error)
        }
        if (callback?.ok && !callback?.error) {
          toast.success('Logged in Successfully')
          openModalLogin()
          router.push('/dashboard')
        }
      })
  }

  const handleClose = (e: any) => {
    if (e.target.id === 'wrapper') openModalLogin()
  }

  const RegisterUser = () => {
    openModalLogin()
    openModalRegister()
  }

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50
                           bg-neutral-800/70" id="wrapper" onClick={handleClose}>
      <div className="flex w-[30%] h-auto flex-col justify-center px-6 py-12  bg-[#040D1F] rounded-2xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-row">
          <p className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-50 ml-[150px]">
            Sign in
          </p>
          <button onClick={openModalLogin} className="p-1 border-0 hover:opacity-70 transition ml-auto">
            <IoMdClose size={25} />
          </button>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-9 text-lg">
          <form className="space-y-6" onSubmit={loginUser}>
            <div>
              <label htmlFor="email" className="font-medium leading-6 text-gray-50">
                Email address
              </label>
              <div className="mt-2 border-b-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
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
              <div className="mt-2">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold leading-6 text-white shadow-sm 
                    hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-gray-500">
            Not a member?{' '}
            <button className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={RegisterUser}>
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;