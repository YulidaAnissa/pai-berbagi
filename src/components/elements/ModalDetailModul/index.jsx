
import {
  FaBook,
  FaUserGraduate,
  FaBuilding,
  FaCalendarPlus,
  FaFileAlt,
} from 'react-icons/fa';


export function Component({ modul, onClose }){
  if (!modul) return null;
  const createdAt = new Date(modul?.createdAt);
  const formatted = createdAt.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  console.log(formatted); // Output: "5 November 2025"

  console.log('modul di modal detail', modul);
  const content = [
    {
        title: "Judul",
        value: modul?.title,
        icon: <FaBook/>
    },
    {
        title: "Tingkat Pendidikan",
        value: modul?.jenjang?.jenjang,
        icon: <FaUserGraduate/>
    },
    {
        title: "Dipublikasikan oleh",
        value: modul?.name,
        icon: <FaBuilding/>
    },
    {
        title: "Ditambahkan ke sistem",
        value: formatted,
        icon: <FaCalendarPlus/>
    },
  ];
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <p
          className="absolute top-2 right-4 text-gray-500 hover:text-red-700 text-xl"
          onClick={onClose}
        >
          &times;
        </p>
        <div className="flex flex-col md:flex-row items-start md:items-stretch w-full my-5">
            {/* Kolom Kiri */}
            <div className="md:w-1/2 px-4 space-y-3">
              {content.map((item, index) => (
               <div
                key={index}
                className="flex gap-4"
              >
                <div className="my-auto">{item.icon}</div>
                <div className="grid gap-x-2 text-sm text-gray-700 text-left">
                    <div className="font-medium text-gray-800">{item.title}</div>
                    <div>{item.value}</div>
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
            <div className="md:w-1/2 px-4">
                <h3 className="text-lg font-semibold">Description</h3>
                <p className="text-sm text-gray-400">{modul?.desc}</p>
            </div>
            </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">Pratinjau File:</h3>
          <iframe
            src={modul.filePreviewUrl}
            title="Pratinjau File"
            className="w-full h-64 border rounded"
          />
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Gambar Modul:</h3>
          <img
            src={modul.gambarUrl}
            alt="Gambar Modul"
            className="w-full rounded-lg shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default Component;
