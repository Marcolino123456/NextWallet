import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../libs/firebase";
import { coinsWalletProps } from "../../interfaces/interfaces";

export function snapshotDocHome(setCoinsWallet: React.Dispatch<React.SetStateAction<coinsWalletProps[]>>) {
  const ref = collection(db, 'coins')

  onSnapshot(query(ref, orderBy('marketCapRank')), (snapshot) => {
    const dataCoins = snapshot.docs.map((doc) => ({ ...doc.data() as coinsWalletProps }))
    setCoinsWallet(dataCoins)
  })
}

export function snapshotApexChartsDonut(setCoinsWallet: React.Dispatch<React.SetStateAction<coinsWalletProps[]>>) {
  const ref = collection(db, 'coins')

  onSnapshot(query(ref, orderBy('marketCapRank')), (snapshot) => {
    const dataCoins = snapshot.docs.map((doc) => ({ ...doc.data() as coinsWalletProps }))
    setCoinsWallet(dataCoins)
  })
}

export function snapshotApexChartsBar(setCoinsWallet: React.Dispatch<React.SetStateAction<coinsWalletProps[]>>) {
  const ref = collection(db, 'coins')

  onSnapshot(query(ref, orderBy('Contributed')), (snapshot) => {
    const dataCoins = snapshot.docs.map((doc) => ({ ...doc.data() as coinsWalletProps }))
    setCoinsWallet(dataCoins)
  })
}