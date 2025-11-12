
export function Component(){
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md transition-opacity duration-300">
      <div className="bg-white/80 border border-white/30 p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-6 animate-fade-in">      
        {/* Ikon edukatif */}
        <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full shadow-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422A12.083 12.083 0 0112 20.944a12.083 12.083 0 01-6.16-10.366L12 14z" />
          </svg>
        </div>

     <div className="flex items-end gap-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-2 h-4 bg-indigo-500 rounded animate-wave"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
        {/* Teks interaktif */}
        <div className="text-center">
          <p className="text-indigo-700 font-semibold text-lg animate-pulse">Sedang memproses...</p>
          <p className="text-sm text-gray-600 mt-1">Mohon tunggu sebentar, kami sedang menyimpan modul Anda.</p>
        </div>
      </div>
    </div>
  );
};

export default Component;
