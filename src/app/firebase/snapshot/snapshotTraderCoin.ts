import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { onlyCoinProps, traderCoinProps } from "../../interfaces/interfaces";
import { db } from "../../libs/firebase";

export async function snapshotTraderCoin({ id, setDataTrader }: onlyCoinProps) {

  const docRef = collection(db, `coins/${id}/Traders`)

  onSnapshot(query(docRef, orderBy('Date')), (snapshot) => {
    const dataCoins = snapshot.docs.map((doc) => ({ ...doc.data() as traderCoinProps, id: doc.id }))

    if (setDataTrader) {
      setDataTrader(dataCoins)
    }
  })
}