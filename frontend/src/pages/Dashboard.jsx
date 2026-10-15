import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const dataStatistik = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
        datasets: [
            {
                label: 'Pengajuan KTP Baru',
                data: [120, 150, 100, 180, 200, 170],
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
            },
            {
                label: 'Cetak Kartu Keluarga',
                data: [80, 90, 75, 110, 130, 105],
                backgroundColor: 'rgba(34, 197, 94, 0.8)',
            }
        ],
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <div className="w-64 bg-dukc-blue text-white min-h-screen p-5">
                <h1 className="text-2xl font-bold border-b border-blue-400 pb-4">DUKCAPIL Apps</h1>
                <ul className="mt-5 space-y-3">
                    <li className="p-2 bg-blue-700 rounded cursor-pointer">Dashboard</li>
                    <li className="p-2 hover:bg-blue-700 rounded cursor-pointer">Data Penduduk</li>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Statistik</h2>
                <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                        <p className="text-gray-500 text-sm font-semibold">Total Penduduk</p>
                        <h3 className="text-3xl font-bold mt-2">1,250,432</h3>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
                    <h3 className="text-xl font-bold mb-4 text-gray-700">Grafik Layanan</h3>
                    <Bar data={dataStatistik} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;