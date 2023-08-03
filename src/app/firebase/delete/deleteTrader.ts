import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../libs/firebase";

interface deleteTraderProps {
  idPri: string,
  idSec: string,
}

export async function deleteTrader({ idPri, idSec }: deleteTraderProps) {

  if (idPri && idSec) {
    const docRef = doc(db, `coins/${idPri}/Traders`, idSec)
    await deleteDoc(docRef)
  }
}