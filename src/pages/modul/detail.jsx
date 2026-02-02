import React, { useState } from 'react';
import {
  FaBook,
  FaGraduationCap,
  FaUserAlt,
  FaCalendarPlus,
  FaAndroid,
  FaWindows,
  FaYoutube,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/elements/Breadcrumb';

export default function ModulDetailPage({ modul }) {
  const [showFullDesc, setShowFullDesc] = useState(false);
  if (!modul) return <p>Data modul tidak ditemukan</p>;

  const toggleDesc = () => setShowFullDesc((prev) => !prev);

  const createdAt = new Date(modul?.createdAt);
  const formatted = createdAt.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const content = [
    { title: 'Fokus Pembahasan', value: modul?.title, icon: <FaBook size={20} className="text-purple-500" /> },
    { title: 'Tingkat Pendidikan', value: modul?.jenjang, icon: <FaGraduationCap size={20} className="text-indigo-500" /> },
    { title: 'Dipublikasikan oleh', value: modul?.name, icon: <FaUserAlt size={20} className="text-pink-500" /> },
    { title: 'Ditambahkan ke sistem', value: formatted, icon: <FaCalendarPlus size={20} className="text-green-500" /> },
  ];

  const shortDesc = modul?.desc?.slice(0, 200);

  // Fungsi untuk ubah link YouTube ke embed
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    // eslint-disable-next-line no-useless-escape
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : url; // fallback kalau bukan YouTube
  };

  const breadcrumbitems = [
    { link: '/list-modul', label: '📚 Modul Pembelajaran' },
    { link: '', label: modul.title }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-kemenagGreen via-creamSoft to-pastelMint flex">
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Breadcrumb */}
        <Breadcrumb className="font-medium" items={breadcrumbitems} />
        {/* Title */}
        <div className="text-center my-6">
          <h1 className="text-3xl font-bold text-indigo-700">{modul?.title}</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Video Preview */}
          <div className="md:col-span-2 space-y-4">
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-lg border border-gray-200">
              <iframe
                title={modul?.title}
                // src="https://view.genially.com/696744af9d2710e0e75920a5"
                src={getYoutubeEmbedUrl(modul?.files)}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-xl"
              />
            </div>
          </div>

          {/* Detail Panel */}
          <div className="bg-gradient-to-br from-white via-purple-50 to-indigo-50 rounded-2xl shadow-xl p-6 border border-gray-200 space-y-6 hover:shadow-2xl transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <h3 className="text-xl font-bold text-indigo-700 tracking-wide">📘 DETAIL</h3>
              <span className="text-xs text-gray-400">Informasi Modul</span>
            </div>

            {/* Content Items */}
            <div className="space-y-4 text-left">
              {content.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center bg-white/70 rounded-lg p-3 hover:bg-indigo-50 transition-colors duration-200"
                >
                  <div className="p-3 rounded-full bg-gradient-to-tr from-indigo-100 to-purple-100 shadow-inner">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-indigo-600 mb-2">📝 Deskripsi</h4>
              <p
                className={`text-sm text-gray-700 leading-relaxed text-justify transition-all duration-300 ${
                  showFullDesc ? "max-h-full" : "max-h-24 overflow-hidden"
                }`}
              >
                {showFullDesc ? modul?.desc : shortDesc}
              </p>
              {modul?.desc?.length > 200 && (
                <button
                  onClick={toggleDesc}
                  className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium underline transition-colors"
                >
                  {showFullDesc ? "Tampilkan lebih sedikit ▲" : "Tampilkan lebih banyak ▼"}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}