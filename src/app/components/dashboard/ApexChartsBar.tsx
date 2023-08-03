'use client'

import { snapshotApexChartsBar } from '@/app/firebase/snapshot/snapshotDocHome'
import { coinsWalletProps } from '@/app/interfaces/interfaces'
import { ApexOptions } from 'apexcharts'
import { useEffect, useState } from 'react'
import ApexCharts from 'react-apexcharts'

interface dataObjectProps {
  symbol: string,
  contribut: number
}

const ApexChartsBar = () => {

  const [coinsWallet, setCoinsWallet] = useState<coinsWalletProps[]>([])
  const [coinNames, setCoinNames] = useState<string[]>([])
  const [coinContributed, setCoinContributed] = useState<number[]>([])

  useEffect(() => {
    snapshotApexChartsBar(setCoinsWallet)
  }, [])

  useEffect(() => {
    const dataObject: Array<dataObjectProps> = []
    const contributed: Array<number> = []
    const names: Array<string> = []

    coinsWallet.forEach((value) => {
      const data = {
        symbol: value.symbol.toUpperCase(),
        contribut: parseFloat(value.Contributed.toFixed(2))
      }
      dataObject.push(data)
    })

    const sorted = dataObject.sort((a, b) => b.contribut - a.contribut)

    sorted.forEach((value) => {
      if (value.contribut != 0) {
        names.push(value.symbol)
        contributed.push(value.contribut)
      }
    })

    setCoinNames(names)
    setCoinContributed(contributed)

  }, [coinsWallet])

  const series = [{
    name: 'Contributed',
    data: coinContributed
  }]

  const options: ApexOptions = {
    chart: {
      type: 'bar',
    },

    title: {
      text: 'Contributed by currency',
      align: 'center',
      margin: 10,
      style: {
        fontSize: '22px',
        color: '#2773EB',
        fontWeight: 'bold'
      }
    },

    plotOptions: {
      bar: {
        borderRadius: 10,
        horizontal: false,
        dataLabels: {
          position: 'top'
        }
      }
    },

    dataLabels: {
      enabled: true,
      formatter: (val) => { return `$${val.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
      offsetY: -20,
    },

    colors: ['#2773EB'],

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
      <ApexCharts options={options} series={series} type='bar' width={700} height={281} />
    </div>
  )
}

export default ApexChartsBar;