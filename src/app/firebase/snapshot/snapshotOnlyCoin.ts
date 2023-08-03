import { doc, getDoc } from "firebase/firestore";
import { onlyCoinProps } from "../../interfaces/interfaces";
import { db } from "../../libs/firebase";

export async function snapshotOnlyCoin({ id, setOnlyCoin }: onlyCoinProps) {
  const docRef = doc(db, 'coins', id)

  const docSnap = await getDoc(docRef)

  if (docSnap.exists() && setOnlyCoin) {
    const data = docSnap.data()
    setOnlyCoin(data)
  }
}