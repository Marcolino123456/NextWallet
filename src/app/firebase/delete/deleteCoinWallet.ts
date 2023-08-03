import { collection, deleteDoc, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../../libs/firebase";
import { toast } from "react-hot-toast";

export async function deleteCoinWallet(id: string) {
  if (id) {
    const docRef = collection(db, `coins/${id}/Traders`)
    const docRefDel = doc(db, 'coins', id);

    onSnapshot(query(docRef), (snapshot) => {
      const dataCoins = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

      if (dataCoins.length > 0) {
        toast.error('Existing Negotiations')
      } else {
        const del = async () => await deleteDoc(docRefDel)
        del()
        toast.success('Currency Deleted')
      }
    }
    )
  }
}