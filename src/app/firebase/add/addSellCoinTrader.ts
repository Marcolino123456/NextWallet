import { addDoc, collection } from "firebase/firestore"
import { db } from "../../libs/firebase"

interface sellTraderProps {
  id: string,
  date: string,
  priceCoin: string,
  withdraw: string,
}

export async function addSellCoinTrader(trader: sellTraderProps) {

  if (trader.id) {
    const cryptos = parseFloat(trader.withdraw.replace(',', '')) / parseFloat(trader.priceCoin.replace(',', ''))
    const withdraw = parseFloat(trader.withdraw.replace(',', ''))
    const priceCoin = parseFloat(trader.priceCoin.replace(',', ''))

    const docRef = collection(db, `coins/${trader.id}/Traders`)
    const payload = {
      Status: 'sell',
      Date: trader.date,
      Withdraw: withdraw,
      PriceCoin: priceCoin,
      Cryptos: cryptos
    }

    await addDoc(docRef, payload)
  }
}