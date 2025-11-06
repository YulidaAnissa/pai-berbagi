import { CardJenjang, Button, CardModul } from '../../components/elements';
import { useNavigate  } from 'react-router-dom';
import { useJenjang, useModul } from '../../hooks/useData';

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
      <div className="relative xl:max-w-screen-xl mx-auto my-12">
        <img
          src="/assets/banner.svg"
          alt="Banner"
          className="w-full h-auto rounded-lg"
        />
        <div className="absolute inset-0 bg-black/40 rounded-lg" />
        <div className="absolute inset-0 flex items-center justify-start p-8 z-10 rounded-lg">
          <div className="text-white font-semibold text-left">
            <p className="text-2xl md:text-6xl font-bungee">Ayo PAI Berbagi!</p>
            <p className="text-md md:text-xl">Guru PAI Bersama Membangun Akhlak Bangsa</p>
            <div className="flex flex-col md:flex-row mt-4 gap-3">
              <Button 
                onClick={() => navigate('/contribute')}
              >
                Kontribusi Modul Ajar
              </Button>
              <Button
                onClick={() => navigate('/list-modul')}
                variant="ghost"
              >
                Jelajahi Modul Ajar
              </Button>
            </div>
          </div>
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
        <div className="bg-[#f3f3d3]">
          <div className="grid gap-4 md:gap-y-6 lg:max-w-screen-lg mx-auto my-12 py-16 px-4 md:px-0">
            <div className="flex justify-between">
              <p className="text-2xl md:text-4xl font-bold text-left">
                Modul Ajar
              </p>
              <p className="text-md md:text-lg text-left my-auto cursor-pointer hover:text-primary" onClick={() => navigate(`/list-modul?sort=desc`)}>
                Lihat Semua
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {isLoadingModul ? 
                renderLoading("modul")
              : 
                modul?.data?.map((item, keys) => (
                  <CardModul key={keys} data={item} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
