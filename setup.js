const fs = require('fs');
const path = require('path');

const baseDir = 'dukcapil-app';

const dirs = [
  'backend/config', 'backend/controllers', 'backend/middlewares',
  'backend/models', 'backend/routes', 'backend/uploads',
  'frontend/public', 'frontend/src/assets', 'frontend/src/components',
  'frontend/src/pages', 'frontend/src/services'
];

const files = {
  'README.md': `# Sistem Informasi DUKCAPIL\n\n## Cara Menjalankan\n\n### Backend\n1. cd backend\n2. npm install\n3. Konfigurasi .env dan pastikan MySQL berjalan\n4. npm start\n\n### Frontend\n1. cd frontend\n2. npm install\n3. npm run dev\n`,
  '.gitignore': `node_modules/\n.env\ndist/\n.DS_Store\nbackend/uploads/*\n!backend/uploads/.gitkeep\n`,
  'backend/.env': `PORT=5000\nDB_HOST=localhost\nDB_USER=root\nDB_PASS=\nDB_NAME=db_dukcapil\nJWT_SECRET=rahasia_negara_dukcapil_123\n`,
  'backend/package.json': `{\n  "name": "dukcapil-backend",\n  "version": "1.0.0",\n  "description": "Backend API untuk DUKCAPIL",\n  "main": "server.js",\n  "scripts": {\n    "start": "node server.js",\n    "dev": "nodemon server.js"\n  },\n  "dependencies": {\n    "bcrypt": "^5.1.1",\n    "cors": "^2.8.5",\n    "dotenv": "^16.3.1",\n    "express": "^4.18.2",\n    "jsonwebtoken": "^9.0.2",\n    "multer": "^1.4.5-lts.1",\n    "mysql2": "^3.6.1",\n    "sequelize": "^6.33.0"\n  },\n  "devDependencies": {\n    "nodemon": "^3.0.1"\n  }\n}`,
  'backend/server.js': `const express = require('express');\nconst cors = require('cors');\nconst dotenv = require('dotenv');\nconst sequelize = require('./config/database');\n\ndotenv.config();\nconst app = express();\n\napp.use(cors());\napp.use(express.json());\napp.use('/uploads', express.static('uploads'));\n\nsequelize.sync({ alter: true })\n    .then(() => console.log('Database Connected & Synced!'))\n    .catch((err) => console.log('Error Database: ', err));\n\napp.get('/', (req, res) => res.send('API DUKCAPIL Berjalan Lancar'));\n\nconst PORT = process.env.PORT || 5000;\napp.listen(PORT, () => console.log(\`Server berjalan di port \${PORT}\`));`,
  'backend/config/database.js': `const { Sequelize } = require('sequelize');\nrequire('dotenv').config();\n\nconst sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {\n    host: process.env.DB_HOST,\n    dialect: 'mysql',\n    logging: false\n});\n\nmodule.exports = sequelize;`,
  'backend/models/User.js': `const { DataTypes } = require('sequelize');\nconst sequelize = require('../config/database');\n\nconst User = sequelize.define('User', {\n    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },\n    nama_lengkap: { type: DataTypes.STRING, allowNull: false },\n    nip: { type: DataTypes.STRING, unique: true, allowNull: false },\n    password: { type: DataTypes.STRING, allowNull: false },\n    role: { type: DataTypes.ENUM('admin', 'petugas'), defaultValue: 'petugas' }\n}, { timestamps: true });\n\nmodule.exports = User;`,
  'backend/uploads/.gitkeep': ``,
  'frontend/package.json': `{\n  "name": "dukcapil-frontend",\n  "private": true,\n  "version": "0.0.0",\n  "type": "module",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build",\n    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",\n    "preview": "vite preview"\n  },\n  "dependencies": {\n    "axios": "^1.5.0",\n    "chart.js": "^4.4.0",\n    "react": "^18.2.0",\n    "react-chartjs-2": "^5.2.0",\n    "react-dom": "^18.2.0",\n    "react-icons": "^4.11.0",\n    "react-router-dom": "^6.16.0",\n    "sweetalert2": "^11.7.28"\n  },\n  "devDependencies": {\n    "@types/react": "^18.2.15",\n    "@types/react-dom": "^18.2.7",\n    "@vitejs/plugin-react": "^4.0.3",\n    "autoprefixer": "^10.4.16",\n    "postcss": "^8.4.31",\n    "tailwindcss": "^3.3.3",\n    "vite": "^4.4.5"\n  }\n}`,
  'frontend/vite.config.js': `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({\n  plugins: [react()],\n})`,
  'frontend/tailwind.config.js': `/** @type {import('tailwindcss').Config} */\nexport default {\n  content: [\n    "./index.html",\n    "./src/**/*.{js,ts,jsx,tsx}",\n  ],\n  theme: {\n    extend: {\n      colors: {\n        'dukc-blue': '#1e3a8a',\n      }\n    },\n  },\n  plugins: [],\n}`,
  'frontend/postcss.config.js': `export default {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n}`,
  'frontend/index.html': `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Sistem DUKCAPIL</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n</html>`,
  'frontend/src/main.jsx': `import React from 'react'\nimport ReactDOM from 'react-dom/client'\nimport App from './App.jsx'\nimport './index.css'\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n)`,
  'frontend/src/index.css': `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\nbody {\n  background-color: #f3f4f6;\n}`,
  'frontend/src/App.jsx': `import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';\nimport Dashboard from './pages/Dashboard';\n\nfunction App() {\n  return (\n    <Router>\n      <Routes>\n        <Route path="/" element={<Dashboard />} />\n      </Routes>\n    </Router>\n  );\n}\n\nexport default App;`,
  'frontend/src/pages/Dashboard.jsx': `import React from 'react';\nimport { Bar } from 'react-chartjs-2';\nimport { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';\n\nChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);\n\nconst Dashboard = () => {\n    const dataStatistik = {\n        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],\n        datasets: [\n            {\n                label: 'Pengajuan KTP Baru',\n                data: [120, 150, 100, 180, 200, 170],\n                backgroundColor: 'rgba(59, 130, 246, 0.8)',\n            },\n            {\n                label: 'Cetak Kartu Keluarga',\n                data: [80, 90, 75, 110, 130, 105],\n                backgroundColor: 'rgba(34, 197, 94, 0.8)',\n            }\n        ],\n    };\n\n    return (\n        <div className="min-h-screen bg-gray-100 flex">\n            <div className="w-64 bg-dukc-blue text-white min-h-screen p-5">\n                <h1 className="text-2xl font-bold border-b border-blue-400 pb-4">DUKCAPIL Apps</h1>\n                <ul className="mt-5 space-y-3">\n                    <li className="p-2 bg-blue-700 rounded cursor-pointer">Dashboard</li>\n                    <li className="p-2 hover:bg-blue-700 rounded cursor-pointer">Data Penduduk</li>\n                </ul>\n            </div>\n            <div className="flex-1 p-8">\n                <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Statistik</h2>\n                <div className="grid grid-cols-3 gap-6 mb-8">\n                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">\n                        <p className="text-gray-500 text-sm font-semibold">Total Penduduk</p>\n                        <h3 className="text-3xl font-bold mt-2">1,250,432</h3>\n                    </div>\n                </div>\n                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">\n                    <h3 className="text-xl font-bold mb-4 text-gray-700">Grafik Layanan</h3>\n                    <Bar data={dataStatistik} />\n                </div>\n            </div>\n        </div>\n    );\n};\n\nexport default Dashboard;`
};

// Buat direktori utama
if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

// Buat sub-direktori
dirs.forEach(d => {
  const dirPath = path.join(baseDir, d);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
});

// Tulis semua file
for (const [filePath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(baseDir, filePath), content.trim());
}

console.log('✅ Berhasil! Folder "dukcapil-app" dan seluruh kodenya sudah dibuat.');