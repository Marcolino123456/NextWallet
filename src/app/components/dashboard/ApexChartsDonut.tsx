'use client'

import { snapshotApexChartsDonut } from '@/app/firebase/snapshot/snapshotDocHome'
import { coinsWalletProps } from '@/app/interfaces/interfaces'
import { ApexOptions } from 'apexcharts'
import { useEffect, useState } from 'react'
import ApexCharts from 'react-apexcharts'

interface BalanceDonutProps {
  name: string,
  balance: number,
}

const ApexChartsDonut = () => {

  const [coinsWallet, setCoinsWallet] = useState<coinsWalletProps[]>([])
  const [coinNames, setCoinNames] = useState<string[]>([])
  const [coinBalance, setCoinBalance] = useState<number[]>([])

  useEffect(() => {
    snapshotApexChartsDonut(setCoinsWallet)
  }, [])

  useEffect(() => {
    const dataBalance: Array<BalanceDonutProps> = []
    const nameCoin: Array<string> = []
    const balanceCoin: Array<number> = []

    coinsWallet.forEach((value) => {
      const data = {
        name: value.name,
        balance: parseFloat((value.Cryptos * value.priceUsd).toFixed(2))
      }
      dataBalance.push(data)
    })

    const sorted = dataBalance.sort((a, b) => a.balance - b.balance)

    sorted.forEach((value) => {
      if (value.balance != 0) {
        nameCoin.push(value.name)
        balanceCoin.push(value.balance)
      }
    })

    setCoinNames(nameCoin)
    setCoinBalance(balanceCoin)

  }, [coinsWallet])

  const options: ApexOptions = {
    chart: {
      type: 'donut',
    },

    labels: coinNames,

    title: {
      text: 'Balance by Currency',
      align: 'center',
      margin: 10,
      style: {
        fontSize: '22px',
        color: '#2773EB',
        fontWeight: 'bold'
      }
    },

    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        offsetX: -35,
        donut: {
          labels: {
            show: true,
            value: {
              color: '#fbfdff'
            },
            total: {
              show: true,
              fontSize: '25',
              color: '#2773EB',
              label: 'Total',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a: number, b: number) => {
                  return parseFloat((a + b).toFixed(2))
                }, 0)
              }
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      fontSize: '20px',
      height: 220,
      offsetY: 30,
      offsetX: -26,
      inverseOrder: true,
      labels: {
        useSeriesColors: true,
      },
      itemMargin: {
        horizontal: 5
      },
      formatter: function (val: string, opts: any) {
        return val + " - $" + opts.w.globals.series[opts.seriesIndex].toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      }
    },

    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom',
        }
      }
    }]
  }

  return (
    <div className='p-2 w-full flex justify-center items-center rounded-xl bg-[#040D1F]'>
      <ApexCharts options={options} series={coinBalance} type='donut' width={550} height={283} />
    </div>
  )
}

export default ApexChartsDonut;