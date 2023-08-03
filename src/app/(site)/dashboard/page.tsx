import ApexChartsBar from "@/app/components/dashboard/ApexChartsBar";
import ApexChartsDonut from "@/app/components/dashboard/ApexChartsDonut";
import ApexChartProfitBar from "@/app/components/dashboard/ApexChartsProfitBar";
import UserData from "@/app/components/dashboard/UserData";
import { getCurrentUser } from "@/app/libs/session";
import axios from "axios";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Dashboard'
}

export default async function dashboard() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  if (user.name != 'Marcolino') {
    redirect('/')
  }

  const { data } = await axios.get('http://localhost:3000/api/coinGeckoApi')
  const resp = await data.data

  return (
    <div className="w-full h-auto px-5 flex">
      <div className="flex flex-col w-1/2 h-auto">
        <div className="h-44 flex flex-row gap-7 pt-4">
          <UserData coins={resp} />
        </div>
        <div className="overflow-y-auto h-[470px] bg-[#040D1F] rounded-2xl">
          <ApexChartProfitBar />
        </div>
      </div>
      <div className="flex flex-col w-1/2 h-auto gap-2">
        <div className="w-full h-1/2 py-4 pl-4">
          <ApexChartsDonut />
        </div>
        <div className="w-full h-1/2 pl-4 rounded-xl">
          <ApexChartsBar />
        </div>
      </div>
    </div>
  );
}