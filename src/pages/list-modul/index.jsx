import { useEffect, useState } from 'react'
import { CardJenjang, Button, CardModul, Breadcrumb, LoadingModul, SkeletonText, NotModul, FilterRadio } from '../../components/elements';
import InputBase from '../../components/forms/InputBase';
import { SearchIcon } from '../../components/elements/Icons';
import { mobileCheck } from '../../utils/common';
import InputSearch from '../../components/forms/InputSearch';
import { useSearchParams } from 'react-router-dom';
import { SORTING } from '../../constants';
import { useJenjang, useModul, useCategories } from '../../hooks/useData';
import { useNavigate } from 'react-router-dom';
import { BiCategory } from "react-icons/bi";

function App() {
  const [search, setSearch] = useState(null);
  const [selectedJenjang, setSelectedJenjang] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSort, setSelectedSort] = useState('asc');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data, isLoading } = useJenjang();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  
  const { data: modul, isLoading: isLoadingModul } = useModul({
    id: selectedJenjang,
    search: search ?? '',
    sort: selectedSort ?? '',
    kategori: selectedCategory,
  });

  const isMobile = mobileCheck();

  useEffect(() => {
    const jenjangParam = searchParams.get('jenjang');
    const sortParam = searchParams.get('sort');
    const kategoriParam = searchParams.get('kategori');

    setSelectedJenjang(Number(jenjangParam) || null); // pastikan angka atau null
    setSelectedCategory(Number(kategoriParam) || null); // pastikan angka atau null
    setSelectedSort(sortParam || ''); // pastikan string
  }, [searchParams]);


  const handleSearch = () => {
    updateSearchParams({ search });
  }

  const breadcrumbitems = [
    { link: '', label: '📚 Modul Pembelajaran' }
  ];

  const updateSearchParams = (newParams = {}, removeKeys = []) => {
    const currentParams = Object.fromEntries([...searchParams.entries()]);

    // Hapus key yang diminta
    removeKeys.forEach((key) => {
      delete currentParams[key];
    });

    // Gabungkan dengan parameter baru
    const mergedParams = { ...currentParams, ...newParams };

    // Validasi khusus untuk jenjang (harus angka) dan lainnya tidak boleh kosong
    const cleanedParams = Object.fromEntries(
      Object.entries(mergedParams).filter(([key, value]) => {
        if (value === null || value === undefined || value === '') return false;
        if (key === 'jenjang') return !isNaN(Number(value));
        return true;
      })
    );

    setSearchParams(cleanedParams);
  };

  console.log('searchParams', Object.fromEntries([...searchParams.entries()]));


  const renderFilter = () => {
    if (isMobile) {
      return null;
    } else {
      return (
        <div className="col-span-2 text-left pr-3">
          {/* Filter Panel */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-indigo-600 flex items-center gap-2">
                🔍 Filter Pencarian
              </h3>
              {(searchParams.get('jenjang') || searchParams.get('sort') || searchParams.get('kategori')) && (
                <button
                  onClick={() => {
                    updateSearchParams({}, ['jenjang', 'sort', 'kategori']);
                    setSelectedJenjang(null);
                    setSelectedSort(null);
                    setSelectedCategory(null);
                  }}
                  className="text-sm text-red-500 hover:text-red-700 font-medium"
                >
                  Reset ✖
                </button>
              )}
            </div>

            {/* Jenjang */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">🎓 Jenjang</h4>
              <FilterRadio
                data={data}
                isLoading={isLoading}
                selected={searchParams.get('jenjang') ? Number(searchParams.get('jenjang')) : null}
                setSelected={setSelectedJenjang}
                queryKey="jenjang"
                valueKey="idJenjang"
                labelKey="jenjang"
                updateSearchParams={updateSearchParams}
              />
            </div>

            {/* Kategori */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2"><BiCategory className="inline mr-1" /> Kategori</h4>
              <FilterRadio
                data={categories}
                isLoading={isLoadingCategories}
                selected={searchParams.get('kategori') ? Number(searchParams.get('kategori')) : null}
                setSelected={setSelectedCategory}
                queryKey="kategori"
                valueKey="idKategori"
                labelKey="kategori"
                updateSearchParams={updateSearchParams}
              />
            </div>

            {/* Sort */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">↕ Urutkan</h4>
              <FilterRadio
                data={SORTING}
                isLoading={false}
                selected={searchParams.get('sort')}
                setSelected={setSelectedSort}
                queryKey="sort"
                valueKey="value"
                labelKey="label"
                updateSearchParams={updateSearchParams}
              />
            </div>
          </div>
        </div>
      )
    }
  }

  const Tag = ({ label, onRemove }) => (
    <div className="flex mb-3">
      <div className="inline-flex items-center px-2 py-1 text-blue-600 text-xs rounded-lg">
        {label}
        <p
          className="ml-2 text-blue-600 hover:text-red-500 font-bold text-xs leading-none cursor-pointer"
          onClick={onRemove}
        >
          &times;
        </p>
      </div>
    </div>
  );


  return (
  <>

<header className="h-72 relative bg-gradient-to-r from-green-50 via-green-100 to-emerald-50 rounded-2xl shadow-xl p-8 overflow-hidden">
  {/* Overlay pattern halus */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,99,22,0.05),_transparent_70%)] rounded-2xl" />

  {/* Konten Header */}
  <div className="relative z-10 space-y-6 xl:max-w-screen-xl mx-auto">
    <Breadcrumb className="font-medium" items={breadcrumbitems} />
    {/* Judul + Search */}
    <div className="flex flex-col md:flex-row md:justify-between gap-6">
      <div>
        <h1 className="text-left text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text drop-shadow-md">
          Koleksi Modul Pembelajaran
        </h1>
        <p className="mt-2 text-lg text-green-700">
          Jelajahi koleksi dengan filter yang lebih mudah dan tampilan ramah
        </p>
      </div>
    </div>
    <InputSearch
      className="bg-white rounded-lg shadow-md md:h-10 h-8"
      placeholder="Cari Modul Pembelajaran..."
      onSearch={handleSearch}
      onChange={(e) => setSearch(e.target.value)}
      value={search ?? ''}
    />
  </div>

  {/* Wave Shape di bawah header */}
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
    <svg className="relative block w-full h-12 text-green-200"
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 1200 120"
         preserveAspectRatio="none">
      <path d="M0,0V46.29c47.79,22,103.74,29.05,158,17.39C230.64,50.9,284.09,17.21,339,5.5c54.9-11.71,109.35,1.29,163,20.39,53.65,19.1,107.1,45.79,161,54.39,53.9,8.6,108.35-1.29,163-20.39,54.65-19.1,108.1-45.79,161-54.39,53.9-8.6,108.35,1.29,163,20.39,54.65,19.1,108.1,45.79,161,54.39,53.9,8.6,108.35-1.29,163-20.39V0Z"
            fill="currentColor"></path>
    </svg>
  </div>
</header>


<div className="grid grid-cols-5 md:grid-cols-7 xl:max-w-screen-xl mx-auto mt-8 gap-6 px-4 md:px-0">
  {renderFilter()}
  <div className="col-span-5 space-y-4">
    {search && (
      <Tag
        label={search}
        onRemove={() => setSearch(null)}
      />
    )}

    {!isLoadingModul && modul?.count > 0 && (
      <p className="pl-2 text-xs text-gray-500">
        Menampilkan <span className="font-semibold">{modul.count}</span> Modul
      </p>
    )}

    {isLoadingModul ? (
      <LoadingModul />
    ) : modul && modul.count > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modul?.data?.map((item, keys) => (
          <CardModul
            key={keys}
            data={item}
            className="transform hover:scale-105 transition duration-300 shadow-md hover:shadow-xl"
          />
        ))}
      </div>
    ) : (
      <NotModul className="text-center p-6 bg-white rounded-xl shadow-md">
        <p className="text-sm text-gray-600">🔍 Tidak ada hasil</p>
        <p className="text-sm mb-4 text-gray-500">
          Coba ubah pencarian atau pilih jenjang lain
        </p>
        <Button
          onClick={() => navigate('/contribute')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          ✍️ Kontribusi Sekarang
        </Button>
      </NotModul>
    )}
  </div>
</div>

  </>
);
}

export default App
