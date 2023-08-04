import CoinsWallet from "@/app/components/wallet/CoinsWallet";
import { getCurrentUser } from "@/app/libs/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Wallet'
}

export default async function Wallet() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  if (user.name != 'Marcolino') {
    redirect('/')
  }

  return (
    <div className="flex w-full h-auto items-center justify-center mt-5">
      <CoinsWallet />
    </div>
  );
}