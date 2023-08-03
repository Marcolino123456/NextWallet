'use client'

import { snapshotApexChartsDonut } from '@/app/firebase/snapshot/snapshotDocHome'
import { coinsWalletProps } from '@/app/interfaces/interfaces'
import { ApexOptions } from 'apexcharts'
import { useEffect, useState } from 'react'
import ApexCharts from 'react-apexcharts'

interface profitProps {
  symbol: string,
  profit: number
}

const ApexChartProfitBar = () => {

  const [coinsWallet, setCoinsWallet] = useState<coinsWalletProps[]>([])
  const [coinNames, setCoinNames] = useState<string[]>([])
  const [coinProfit, setCoinProfit] = useState<number[]>([])

  useEffect(() => {
    snapshotApexChartsDonut(setCoinsWallet)
  }, [])

  useEffect(() => {
    const dataProfit: Array<profitProps> = []
    const names: Array<string> = []
    const profit: Array<number> = []

    coinsWallet.forEach((value) => {
      const data = {
        symbol: value.symbol.toUpperCase(),
        profit: parseFloat(((value.Cryptos * value.priceUsd) - value.Contributed).toFixed(2))
      }
      dataProfit.push(data)
    })

    const sorted = dataProfit.sort((a, b) => b.profit - a.profit)

    sorted.forEach((value) => {
      if (value.profit != 0) {
        names.push(value.symbol)
        profit.push(value.profit)
      }
    })

    setCoinNames(names)
    setCoinProfit(profit)

  }, [coinsWallet])

  const series = [{
    name: 'Profit',
    data: coinProfit
  }]

  const options: ApexOptions = {
    chart: {
      type: 'bar',
    },

    title: {
      text: 'Profit by currency',
      align: 'center',
      margin: 20,
      style: {
        fontSize: '22px',
        color: '#2773EB',
        fontWeight: 'bold'
      }
    },

    plotOptions: {
      bar: {
        colors: {
          ranges: [{
            from: 1,
            to: 99999999,
            color: '#2773EB'
          }, {
            from: -99999999,
            to: -1,
            color: '#ff0a0a'
          }]
        },
        borderRadius: 10,
        horizontal: false,
        dataLabels: {
          position: 'top'
        },
      },
    },

    dataLabels: {
      enabled: true,
      formatter: (val) => { return `$${val.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
      offsetY: -20,
    },

    tooltip: {
      theme: 'dark'
    },

    yaxis: {
      labels: {
        formatter: (val) => { return `$${val}` },
        style: {
          colors: ['#faf6f6']
        }
      }
    },

    xaxis: {
      categories: coinNames,
      labels: {
        show: true,
        style: {
          colors: '#faf6f6',
        }
      }
    },

    grid: {
      row: {
        colors: ['#17133B'],
      },
    }
  }

  return (
    <div className='p-2 w-full flex justify-center items-center rounded-xl bg-[#040D1F]'>
      <ApexCharts options={options} series={series} type='bar' width={700} height={420} />
    </div>
  );
}

export default ApexChartProfitBar;