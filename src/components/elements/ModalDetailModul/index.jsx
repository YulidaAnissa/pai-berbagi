import React, { useState } from 'react';
import {
  FaBook,
  FaGraduationCap,
  FaUserAlt,
  FaCalendarPlus,
} from 'react-icons/fa';

export function Component({ modul, onClose }) {

  const [showFullDesc, setShowFullDesc] = useState(false);
  if (!modul) return null;

  const toggleDesc = () => setShowFullDesc((prev) => !prev);

  const createdAt = new Date(modul?.createdAt);
  const formatted = createdAt.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const content = [
    {
      title: 'Fokus Pembahasan',
      value: modul?.title,
      icon: <FaBook size={20} />,
    },
    {
      title: 'Tingkat Pendidikan',
      value: modul?.jenjang?.jenjang,
      icon: <FaGraduationCap size={20} />,
    },
    {
      title: 'Dipublikasikan oleh',
      value: modul?.name,
      icon: <FaUserAlt size={20} />,
    },
    {
      title: 'Ditambahkan ke sistem',
      value: formatted,
      icon: <FaCalendarPlus size={20} />,
    },
  ];

  const shortDesc = modul?.desc?.slice(0, 200); // batas karakter pendek

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative animate-fade-in bg-white text-black border border-white/30 rounded-xl shadow-lg max-w-2xl w-full p-2 md:p-6 max-h-[90vh] mx-3"
        onClick={(e) => e.stopPropagation()}
      >
        <p
          className="absolute top-2 right-3 text-gray-500 hover:text-red-700 text-2xl font-bold z-10 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </p>
        <div className="overflow-y-hidden md:overflow-y-auto max-h-[80vh] my-6">
          <div className="flex flex-col md:flex-row pr-2">
          {/* <div className="overflow-y-auto flex flex-col md:flex-row items-start md:items-stretch w-full my-5"> */}
            {/* Kolom Kiri */}
            <div className="md:w-1/2 px-4 space-y-3">
              {content.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="my-auto">{item.icon}</div>
                  <div className="grid gap-x-2 text-gray-700 text-left">
                    <div className="font-medium text-gray-800">{item.title}</div>
                    <div className="text-sm">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider Zigzag Lembut */}
            <div className="hidden md:flex justify-center items-stretch px-2">
              <svg
                width="24"
                height="200"
                viewBox="0 0 24 200"
                preserveAspectRatio="none"
                className="text-purple-400"
              >
                <defs>
                  <linearGradient id="softZigzagGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                  <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#d8b4fe" />
                  </filter>
                </defs>
                <path
                  d="M12 0 Q0 10 12 20 Q24 30 12 40 Q0 50 12 60 Q24 70 12 80 Q0 90 12 100 Q24 110 12 120 Q0 130 12 140 Q24 150 12 160 Q0 170 12 180 Q24 190 12 200"
                  stroke="url(#softZigzagGradient)"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#softGlow)"
                />
              </svg>
            </div>

            {/* Kolom Kanan */}
            <div className="md:w-1/2 px-4 text-left gap-2 md:my-0 my-3">
              <h3 className="text-lg font-semibold md:mb-4 md:text-center text-left">Description</h3>
              <p className="text-sm text-gray-400 text-justify">
                {showFullDesc ? modul?.desc : shortDesc}
                {modul?.desc?.length > 200 && (
                  <p
                    onClick={toggleDesc}
                    className="ml-2 text-indigo-600 hover:underline text-sm font-medium"
                  >
                    {showFullDesc ? 'Tampilkan lebih sedikit' : 'Tampilkan lebih banyak'}
                  </p>
                )}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Pratinjau File:</h3>
            <iframe
              src={modul?.files}
              title="Pratinjau File"
              className="w-full h-64 border rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;