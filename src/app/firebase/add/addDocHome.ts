import axios from "axios"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../libs/firebase"

export const addDocHome = async (id: string) => {
  if (id) {
    const { data } = await axios.get(`/api/dynamicApi/${id}`)
    const resp = await data.data

    const payload = {
      AvaregePrice: 0,
      Contributed: 0,
      Cryptos: 0,
      id: resp.id,
      marketCapRank: resp.market_cap_rank,
      symbol: resp.symbol,
      name: resp.name,
      imageSmall: resp.image.small,
      imageLarge: resp.image.large,
      priceUsd: resp.market_data.current_price.usd,
      historicalValue: resp.market_data.ath.usd,
    }

    await setDoc(doc(db, 'coins', id), payload)
  }
}