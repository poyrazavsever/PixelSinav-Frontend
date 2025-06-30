import PanelSidebar from '@/components/layout/panelSidebar'
import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Icon } from '@iconify/react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

type PageWithLayout = {
  Layout?: boolean;
};

// Chart options
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: '#fff',
        font: {
          family: 'Nunito'
        }
      }
    }
  },
  scales: {
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: '#fff',
        font: {
          family: 'Nunito'
        }
      }
    },
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: '#fff',
        font: {
          family: 'Nunito'
        }
      }
    }
  }
}

const Panel = () => {
  // Mock data for charts
  const enrollmentData = {
    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
    datasets: [
      {
        label: 'Kayıt Olan Kullanıcılar',
        data: [65, 78, 90, 85, 95, 110],
        borderColor: '#D65A31',
        backgroundColor: '#D65A31',
        tension: 0.4
      }
    ]
  }

  const completionData = {
    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
    datasets: [
      {
        label: 'Dersi Tamamlayan Kullanıcılar',
        data: [40, 55, 60, 70, 75, 85],
        borderColor: '#4CAF50',
        backgroundColor: '#4CAF50',
        tension: 0.4
      }
    ]
  }

  // Mock data for messages and comments
  const recentMessages = [
    {
      id: 1,
      sender: 'Ahmet Yılmaz',
      message: 'Matematik dersindeki son güncellemeler harika olmuş!',
      time: '2 saat önce'
    },
    {
      id: 2,
      sender: 'Ayşe Kara',
      message: 'Fizik dersi için yeni bir bölüm ekleyebilir miyiz?',
      time: '5 saat önce'
    },
    {
      id: 3,
      sender: 'Mehmet Demir',
      message: 'Kimya dersindeki quiz soruları çok faydalıydı.',
      time: '1 gün önce'
    }
  ]

  const recentComments = [
    {
      id: 1,
      user: 'Zeynep Yıldız',
      lesson: 'Matematik 101',
      comment: 'Konuları çok iyi anladım, özellikle görsel örnekler çok faydalıydı.',
      rating: 5,
      time: '3 saat önce'
    },
    {
      id: 2,
      user: 'Can Özdemir',
      lesson: 'Fizik 101',
      comment: 'Örnekler biraz daha detaylı olabilir, ama genel olarak çok iyi.',
      rating: 4,
      time: '1 gün önce'
    },
    {
      id: 3,
      user: 'Elif Aksoy',
      lesson: 'Kimya 101',
      comment: 'Anlatım tarzı çok başarılı, tekrar tekrar izledim.',
      rating: 5,
      time: '2 gün önce'
    }
  ]

  return (
    <div className="flex h-screen bg-dark">
      <PanelSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="font-pixelify text-4xl mb-8">
          <span className="text-orange-light">Kontrol</span>
          <span className="text-white"> Paneli</span>
        </h1>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4">
          {/* Enrollment Chart */}
          <div className="bg-dark-800 bg-gray p-6">
            <h2 className="font-nunito text-xl text-white mb-4">Kayıt İstatistikleri</h2>
            <Line options={chartOptions} data={enrollmentData} />
          </div>

          {/* Completion Chart */}
          <div className="bg-dark-800 bg-gray p-6">
            <h2 className="font-nunito text-xl text-white mb-4">Tamamlama İstatistikleri</h2>
            <Line options={chartOptions} data={completionData} />
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-dark-800 bg-gray p-6 mb-4">
          <h2 className="font-nunito text-xl text-white mb-4">Son Mesajlar</h2>
          <div className="flex items-start gap-4">
            {recentMessages.map(message => (
              <div key={message.id} className="max-w-sm flex items-center gap-4 p-4 bg-background">
                <div className="p-2 bg-orange-primary/10 rounded">
                  <Icon icon="pixelarticons:message" className="w-6 h-6 text-orange-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-nunito text-white">{message.sender}</h3>
                  <p className="font-nunito text-neutral-400 mt-1 line-clamp-1">{message.message}</p>
                  <span className="font-nunito text-sm text-neutral-400 mt-2 block">{message.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Comments */}
        <div className="bg-dark-800 bg-gray p-6">
          <h2 className="font-nunito text-xl text-white mb-4">Son Yorumlar</h2>
          <div className="flex items-start gap-4">
            {recentComments.map(comment => (
              <div key={comment.id} className="flex items-start gap-4 p-4 bg-background max-w-sm">
                <div className="p-2 bg-orange-primary/10 rounded">
                  <Icon icon="pixelarticons:chat" className="w-6 h-6 text-orange-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-nunito text-white">{comment.user}</h3>
                    <span className="font-nunito text-sm text-orange-primary">{comment.lesson}</span>
                  </div>
                  <p className="font-nunito text-neutral-400 mt-1 line-clamp-1">{comment.comment}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      {[...Array(comment.rating)].map((_, i) => (
                        <Icon key={i} icon="pixelarticons:star" className="w-4 h-4 text-orange-primary" />
                      ))}
                    </div>
                    <span className="font-nunito text-sm text-neutral-400">{comment.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

(Panel as PageWithLayout).Layout = false;

export default Panel