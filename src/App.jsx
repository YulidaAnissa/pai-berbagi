import { useEffect, useState } from 'react'
import './App.css'
import Button from './components/elements/Button';

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null)
  // const getJenjang = await fetch('http://localhost:3211/jenjang');
  // const jenjang = await getJenjang.json();
  // console.log(jenjang);

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
      <div className="flex gap-4">
        <Button>Ayo Berbagi</Button>
        <Button>Lihat Referensi</Button>
      </div>
      <div className="grid gap-y-6 lg:max-w-screen-lg mx-auto my-12">
        <p className="text-4xl font-bold">
          Unduh Modul Ajar
        </p>
        <p className="text-md">
          Koleksi Modul Ajar berkualitas untuk melengkapi Kegiatan Belajar Mengajar Anda
        </p>
        <div className="grid grid-cols-4 gap-4">
          {data?.map((item) => (
            <div className="relative rounded-lg overflow-hidden shadow-lg h-40 hover:scale-105" key={item?.id}>
              <div 
                className="absolute inset-0 bg-cover bg-center p-4"
                style={{ backgroundImage: `url(${item.images})` }}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="text-left relative z-10 text-white font-semibold text-xl p-4">
                <p>{item?.jenjang}</p>
                <p>{item?.count}+ Koleksi</p>
              </div>
            </div>
          ))}
        </div>
        <Button className="w-fit mx-auto">Lihat Semua</Button>
      </div>
    </>
  )
}

export default App
