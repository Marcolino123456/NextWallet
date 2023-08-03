import CoinListHome from "./components/home/CoinListHome"

export const metadata = {
  title: 'CryptoCurrency'
}

export default async function Home() {

  return (
    <div className="w-full h-auto p-5">
      <CoinListHome />
    </div>
  )
}
