import { CardJenjang, Button, CardModul, NotModul } from '../../components/elements';
import { useNavigate  } from 'react-router-dom';
import { useJenjang, useModul } from '../../hooks/useData';
import { FaBook, FaUsers, FaLightbulb } from 'react-icons/fa';

function App() {
  const navigate = useNavigate();
  const { data: data, isLoading: isLoadingJenjang } = useJenjang();

  const { data: modul, isLoading: isLoadingModul } = useModul({ sort: 'desc', limit: 4 });

  const handleClickModul = (id) => {
    if (!id) {
      navigate('/list-modul');
      return;
    }
    navigate(`/list-modul?jenjang=${id}`);
  }

  const renderLoading = (type) => 
  [...Array(4)].map((_, i) => (
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
    <>
      <div className="bg-gradient-to-br from-gray-600 via-gray-400 to-gray-200 relative h-auto md:h-[32rem] mx-auto overflow-hidden shadow-xl">
        <div className="p-8 z-10 relative flex flex-col items-center justify-center px-4 py-10 md:px-8 md:py-16">
          <div className="text-white font-semibold text-center animate-fade-in mx-auto" >
            <p className="text-2xl sm:text-4xl md:text-6xl font-bungee font-bold drop-shadow-md">
              Ayo PAI Berbagi!
            </p>
            <p className="text-sm sm:text-lg md:text-xl mt-2 font-medium">
              Guru PAI Bersama Membangun Akhlak Bangsa
            </p>
            <div className="flex gap-1 md:gap-4 mt-4 justify-center w-fit mx-auto">
              <Button className="text-xs h-auto md:text-base md:px-5 px-2" onClick={() => navigate('/contribute')}>
                Kontribusi Modul Ajar
              </Button>
              <Button className="text-xs h-auto md:text-base md:px-5 px-2" onClick={() => navigate('/list-modul')} variant="ghost">
                Jelajahi Modul Ajar
              </Button>
            </div>
          </div>
        </div>
        <div>
          <img
          src="https://res.cloudinary.com/dafq0pw8w/image/upload/v1762851096/banner_lxxcaj.png" // Ganti dengan gambar relevan dari hasil pencarian
          alt="Guru PAI Berbagi"
          className="absolute -mt-36 md:-mt-20 opacity-65 md:opacity-85"
          // className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
        />
        </div>
      </div>
      <div className="gap-6">
        <div className="grid gap-4 md:gap-y-6 lg:max-w-screen-lg mx-auto my-12 px-4 md:px-0">
          <p className="text-2xl md:text-4xl font-bold">
            Unduh Modul Ajar
          </p>
          <p className="text-sm md:text-md">
            Koleksi Modul Ajar berkualitas untuk melengkapi Kegiatan Belajar Mengajar Anda
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {isLoadingJenjang ? 
              renderLoading()
            : data?.map((item, keys) => (
              <CardJenjang key={keys} data={item} onClick={handleClickModul}/>
            ))}
          </div>
          <Button className="w-fit mx-auto" color="primary" onClick={() => handleClickModul(null)}>Lihat Semua</Button>
        </div>
        <div className="bg-gradient-to-br from-gray-600 via-gray-400 to-gray-200 p-2 md:p-8 text-white">
          <div className="grid gap-4 md:gap-y-6 lg:max-w-screen-lg mx-auto px-4 md:px-0">
            <div className="flex justify-between">
              <p className="text-2xl md:text-4xl font-bold text-left">
                Modul Ajar
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
                  <NotModul className="text-white">
                    <p className="text-sm mb-4">Yuk jadi yang pertama berbagi modul ajar untuk Guru PAI!</p>
                    <Button
                      onClick={() => navigate('/contribute')}
                      className="mx-auto text-white font-medium py-2 px-4 rounded-lg transition duration-200"
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
        </div>
      </div>
    </>
  )
}

export default App
