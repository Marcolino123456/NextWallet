import { db } from "@/app/libs/firebase";
import { doc, updateDoc } from "firebase/firestore";

interface updateOnlyCoinProps {
  id: string,
  cryptos: number,
  priceAvarege: number,
}

export async function updateOnlyCoin({ id, cryptos, priceAvarege }: updateOnlyCoinProps) {
  if (cryptos != 0 && id) {
    const contributed = parseFloat((cryptos * priceAvarege).toFixed(2))
    const cryptosNum = parseFloat(cryptos.toFixed(6))

    const ref = doc(db, 'coins', id)
    const payload = {
      Cryptos: cryptosNum,
      AvaregePrice: priceAvarege,
      Contributed: contributed,
    }
    await updateDoc(ref, payload)

  } else if (cryptos === 0 && id) {
    const ref = doc(db, 'coins', id)
    const payload = {
      Cryptos: 0,
      AvaregePrice: 0,
      Contributed: 0,
    }
    await updateDoc(ref, payload)
  }
}