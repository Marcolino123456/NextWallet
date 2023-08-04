import { DocumentData } from "firebase/firestore"

export interface allCoinsProps {
  market_cap_rank: number,
  id: string,
  symbol: string,
  name: string,
  image: string,
  current_price: number,
  price_change_percentage_24h: number,
  market_cap: number,
  ath: number,
  high_24h: number,
  low_24h: number
}

export interface allCoinsHomeProps {
  coins: allCoinsProps[]
}

export interface coinsWalletProps {
  id: string,
  name: string,
  priceUsd: number,
  Cryptos: number,
  imageSmall: string,
  Balance: number,
  AvaregePrice: number,
  Contributed: number,
  symbol: string,
}

export interface onlyCoinProps {
  id: string,
  setOnlyCoin?: React.Dispatch<React.SetStateAction<DocumentData>>,
  setDataTrader?: React.Dispatch<React.SetStateAction<traderCoinProps[]>>
}

export interface uniqueCoinProps {
  id: string,
  name: string,
  priceUsd: number,
  imageSmall: string,
  imageLarge: string,
  historicalValue: number,
}

export interface traderCoinProps {
  id: string,
  Date: string,
  Contributed: number,
  Withdraw: number,
  PriceCoin: number,
  Cryptos: number,
  Status: string,
  Count: number,
}

export interface ModalProps {
  openBuyModal: () => void,
  openSellModal: () => void,
  id: string,
  name: string,
  priceUsd: number,
  imageSmall: string,
}

export interface TraderOnlyCoinProps {
  id: string,
  priceUsd: number,
  avaregePrice: number,
  trader: traderCoinProps[]
}

export interface dataOnlyCoinProps {
  priceUsd: number,
  cryptos: number,
  avaregePrice: number,
  contribution: number,
}
