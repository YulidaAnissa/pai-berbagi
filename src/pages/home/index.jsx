// src/App.jsx
import React from "react";
import { useJenjang, useModul, useCategories } from '../../hooks/useData';
import { CardJenjang, Button, CardModul, NotModul } from '../../components/elements';
import { useNavigate  } from 'react-router-dom';

function App() {
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const navigate = useNavigate();
  const { data: data, isLoading: isLoadingJenjang } = useJenjang();

  const { data: modul, isLoading: isLoadingModul } = useModul({ sort: 'desc', limit: 4 });

  const handleClickModul = (type, id) => {
    if (!id) {
      navigate('/list-modul');
      return;
    }
    navigate(`/list-modul?${type}=${id}`);
  }

  const renderLoading = (type, value) => 
  [...Array(value)].map((_, i) => (
    <div key={i} className="animate-pulse bg-white p-4 rounded shadow">
      <div className="h-32 bg-gray-200 rounded mb-4"></div>
      {type === "modul" ? (
        <>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </>
      ) : null}
    </div>
  ));
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-kemenagGreen via-creamSoft to-pastelMint text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 backdrop-blur-md bg-white/40 fixed w-full z-50 shadow-sm">
        <h1 className="text-2xl font-bold text-green-700">PAI Berbagi</h1>
        <div className="space-x-6">
          <a href="#kategori" className="hover:text-softMint">Kategori</a>
          <a href="#jenjang" className="hover:text-softMint">Jenjang</a>
          <a href="#modul" className="hover:text-softMint">Modul</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center h-[38rem] px-6">
        <h2 className="text-5xl font-extrabold mb-6 text-green-700">
          Edukasi Islami dengan PAI Berbagi
        </h2>
        <p className="max-w-xl text-lg mb-8 text-gray-600">
          Guru Pendidikan Agama Islam bersama memberikan sumber belajar berkualitas untuk pelajar di seluruh Indonesia.
        </p>
        <a href="#kategori"><button className="px-6 py-3 bg-softMint text-green-900 font-semibold rounded-full shadow hover:bg-peachSoft transition">
          Mulai Sekarang
        </button></a>
      </section>

      {/* Features Section */}
      <section id="kategori" className="py-20 px-8 bg-white/50 backdrop-blur-md rounded-t-3xl">
        <h3 className="text-4xl font-bold text-center mb-12 text-green-700">Kategori Edukasi</h3>
        <div className="grid md:grid-cols-3 gap-8 lg:max-w-screen-lg mx-auto">
          {isLoadingCategories ? 
            renderLoading('', 3)
          : categories.map((cat, index) => (
            <div
              key={index}
              className={`p-6 ${cat.color} rounded-xl shadow hover:scale-105 transition cursor-pointer`}
              onClick={() => handleClickModul("kategori", cat.idKategori)}
            >
              <img src={cat.icon} alt="Modul Interaktif Icon" className="w-20 h-20 mx-auto mb-4 object-contain" />
              <h3 className="text-xl font-semibold text-green-600">{cat.kategori}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="jenjang" className="py-20 px-8">
        <h3 className="text-4xl font-bold text-center text-green-700 mb-3">Modul Pembelajaran Sesuai Jenjang Pendidikan</h3>
        <h5 className="italic mb-12">Koleksi Modul Pembelajaran berkualitas untuk melengkapi Kegiatan Belajar Mengajar Anda</h5>
        <div className="grid md:grid-cols-4 gap-8 xl:max-w-screen-xl mx-auto mb-16">
          {isLoadingJenjang ? 
            renderLoading('', 4)
          : data?.map((item, keys) => (
            <CardJenjang key={keys} data={item} onClick={handleClickModul}/>
          ))}
        </div>
        <Button className="w-fit mx-auto" color="primary" onClick={() => handleClickModul(null)}>Lihat Semua</Button>
      </section>

      <section id="modul" className="py-20 px-8 bg-white/50 backdrop-blur-md">
        <div className="grid gap-4 md:gap-y-6 lg:max-w-screen-lg mx-auto px-4 md:px-0">
          <div className="flex justify-between">
            <p className="text-2xl md:text-4xl font-bold text-left text-green-700 mb-12">
              Modul Pembelajaran Terbaru
            </p>
            {modul?.data?.length >= 1 && (
              <p className="text-md md:text-lg text-left my-auto cursor-pointer hover:text-primary" onClick={() => navigate(`/list-modul?sort=desc`)}>
                Lihat Semua
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {isLoadingModul ? (
              renderLoading("modul")
            ) : modul?.data?.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <NotModul>
                  <p className="text-sm mb-4">Yuk jadi yang pertama berbagi modul ajar untuk Guru PAI!</p>
                  <Button
                    onClick={() => navigate('/contribute')}
                    className="mx-auto font-medium py-2 px-4 rounded-lg transition duration-200"
                  >
                    ✍️ Kontribusi Sekarang
                  </Button>
                </NotModul>
              </div>
            ) : (
              modul?.data?.map((item, keys) => (
                <CardModul key={keys} data={item} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-6 text-center bg-softEmerald text-green-900">
        <p>© 2026 KemenagEdu. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;