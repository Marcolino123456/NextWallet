import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../libs/firebase";

interface updateDocProps {
  id: string,
  price: number,
  hightHistorical: number,
}

export async function updateDocHome({ id, price, hightHistorical }: updateDocProps) {
  if (id) {
    try {
      const ref = doc(db, 'coins', id)
      const payload = {
        priceUsd: price,
        historicalValue: hightHistorical
      }
      await updateDoc(ref, payload)
    } catch (error) {
      console.log(error)
    }
  }
}