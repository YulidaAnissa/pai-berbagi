import React from "react";
import {
  ArrowDownTrayIcon,
  EyeIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";

const ModulCard = () => {
    const modul = {
  id: 12,
  title: "Deep Learning PJOK",
  author: "Asep Jamil Habibi, S.Pd., Gr.",
  namaJenjang: "SD/MI",
  coverUrl: "/images/pjok-cover.jpg",
  downloadUrl: "/files/deep-learning-pjok.pdf",
  previewUrl: "https://example.com/pratinjau/deep-learning-pjok",
  views: 732,
  tags: ["modulajar", "guruberbagi", "PPG", "inovasiguru"]
};

  const handlePreview = () => {
    if (modul.previewUrl) {
      window.open(modul.previewUrl, "_blank");
    } else {
      alert("Pratinjau belum tersedia.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition hover:shadow-2xl">
      {/* Cover Image */}
      <img
        src={modul.coverUrl || "/placeholder.jpg"}
        alt={`Cover ${modul.title}`}
        className="w-full h-48 object-cover"
      />

      {/* Konten */}
      <div className="p-5 space-y-3">
        <h2 className="text-xl font-bold text-blue-700">{modul.title}</h2>
        <p className="text-sm text-gray-600">Oleh: {modul.author}</p>
        <p className="text-sm text-gray-500">Jenjang: {modul.namaJenjang}</p>

        {/* Aksi */}
        <div className="flex flex-wrap gap-3 mt-4">
          <button
            onClick={handlePreview}
            className="inline-flex items-center bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 text-sm"
          >
            <PlayIcon className="w-4 h-4 mr-2" />
            Pratinjau Modul
          </button>

          <a
            href={modul.downloadUrl}
            className="inline-flex items-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
          >
            <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
            Unduh Sekarang
          </a>

          <a
            href={`/modul/${modul.id}`}
            className="text-blue-600 hover:underline text-sm self-center"
          >
            Simak Modul Ajar →
          </a>
        </div>

        {/* Statistik */}
        <div className="flex items-center text-gray-500 text-sm mt-2">
          <EyeIcon className="w-4 h-4 mr-1" />
          {modul.views || 0} kali dilihat
        </div>

        {/* Tag */}
        <div className="flex flex-wrap gap-2 mt-4">
          {modul.tags?.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModulCard;