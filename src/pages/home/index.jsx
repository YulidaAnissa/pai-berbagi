import { useEffect, useState } from 'react'
// import Button from '../../components/elements/Button';
import { CardJenjang, Button, CardModul } from '../../components/elements';

function App() {
  const [data, setData] = useState(null)
  const loadJenjang = async () => {
    const response = await fetch('http://localhost:3211/jenjang');
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    loadJenjang();
  }, [])

  console.log(data);

  return (
    <>
      <div className="relative xl:max-w-screen-xl mx-auto my-12">
        <img
          src="/assets/banner.svg"
          alt="Banner"
          className="w-full h-auto"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-start p-4 z-10">
          <div className="text-white font-semibold text-left">
            <p className="text-2xl md:text-6xl font-bungee">Ayo PAI Berbagi!</p>
            <p className="text-md md:text-xl">Guru PAI Bersama Membangun Akhlak Bangsa</p>
          </div>
        </div>
      </div>



      {/* <div className="relative overflow-hidden grid md:flex gap-4 px-4 md:px-0 lg:max-w-screen-lg mx-auto my-12">
        {/* <Button className="w-fit" color="primary">Ayo Berbagi</Button>
        <Button className="w-fit" variant="ghost">Lihat Referensi</Button> */}
        
        {/* <div className="absolute inset-0 bg-black/40" />
        <div className="text-left relative z-10 text-white font-semibold text-md md:text-xl p-4">
          <p>{data?.jenjang}</p>
          <p>{data?.count}+ Koleksi</p>
        </div> */}

      <div className="gap-6">
        <div className="grid gap-4 md:gap-y-6 lg:max-w-screen-lg mx-auto my-12 px-4 md:px-0">
          <p className="text-2xl md:text-4xl font-bold">
            Unduh Modul Ajar
          </p>
          <p className="text-sm md:text-md">
            Koleksi Modul Ajar berkualitas untuk melengkapi Kegiatan Belajar Mengajar Anda
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data?.map((item, keys) => (
              <CardJenjang key={keys} data={item} />
            ))}
          </div>
          <Button className="w-fit mx-auto" color="primary">Lihat Semua</Button>
        </div>
        <div className="bg-[#f3f3d3]">
          <div className="grid gap-4 md:gap-y-6 lg:max-w-screen-lg mx-auto my-12 py-16 px-4 md:px-0">
            <div className="flex justify-between">
              <p className="text-2xl md:text-4xl font-bold text-left">
                Modul Ajar
              </p>
              <p className="text-md md:text-lg text-left my-auto cursor-pointer hover:text-primary">
                Lihat Semua
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data?.map((item, keys) => (
                <CardModul key={keys} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
