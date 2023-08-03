import { addDoc, collection } from "firebase/firestore";
import { db } from "../../libs/firebase";

interface buyTraderProps {
  id: string,
  date: string,
  priceCoin: string,
  contributed: string,
}

export async function addBuyCoinTrader(trader: buyTraderProps) {

  if (trader.id) {
    const cryptos = parseFloat(trader.contributed.replace(',', '')) / parseFloat(trader.priceCoin.replace(',', ''))
    const contributed = parseFloat(trader.contributed.replace(',', ''))
    const priceCoin = parseFloat(trader.priceCoin.replace(',', ''))

    const docRef = collection(db, `coins/${trader.id}/Traders`)
    const payload = {
      Status: 'buy',
      Date: trader.date,
      Contributed: contributed,
      PriceCoin: priceCoin,
      Cryptos: cryptos,
      Count: 1
    }

    await addDoc(docRef, payload)
  }

}