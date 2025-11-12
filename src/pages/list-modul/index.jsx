import { useEffect, useState } from 'react'
import { CardJenjang, Button, CardModul, Breadcrumb, LoadingModul, SkeletonText, NotModul, FilterRadio } from '../../components/elements';
import InputBase from '../../components/forms/InputBase';
import { SearchIcon } from '../../components/elements/Icons';
import { mobileCheck } from '../../utils/common';
import InputSearch from '../../components/forms/InputSearch';
import { useSearchParams } from 'react-router-dom';
import { SORTING } from '../../constants';
import { useJenjang, useModul } from '../../hooks/useData';
import { useNavigate } from 'react-router-dom';

function App() {
  const [search, setSearch] = useState(null);
  const [selectedJenjang, setSelectedJenjang] = useState(null);
  const [selectedSort, setSelectedSort] = useState('asc');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data, isLoading } = useJenjang();
  
  const { data: modul, isLoading: isLoadingModul } = useModul({
    id: selectedJenjang,
    search: search ?? '',
    sort: selectedSort ?? ''
  });

  const isMobile = mobileCheck();

  useEffect(() => {
  const jenjangParam = searchParams.get('jenjang');
  const sortParam = searchParams.get('sort');

  setSelectedJenjang(Number(jenjangParam) || null); // pastikan angka atau null
  setSelectedSort(sortParam || ''); // pastikan string
}, [searchParams]);


  const handleSearch = () => {
    updateSearchParams({ search });
  }

  const breadcrumbitems = [
    { link: '', label: 'Modul Ajar' }
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


  const renderFilter = () => {
    if (isMobile) {
      return null;
    } else {
      return (
        <div className="col-span-2 text-left pr-3">
          <div className="flex justify-between items-center">
            <p className="font-bold">Filter Pencarian</p>
            <p
              className="text-sm text-blue-600 cursor-pointer" 
              onClick={() => {
                updateSearchParams({}, ['jenjang', 'sort']);
                setSelectedJenjang(null);
                setSelectedSort(null);
              }}
            >
              {selectedJenjang || selectedSort ? "Reset" : ""}
            </p>
          </div>
          {/* Jenjang */}
          <FilterRadio
            data={data}
            isLoading={isLoading}
            selected={selectedJenjang}
            setSelected={setSelectedJenjang}
            queryKey="jenjang"
            valueKey="idJenjang"
            labelKey="jenjang"
            updateSearchParams={updateSearchParams}
            title="Jenjang"
          />
          {/* Sort */}
          <FilterRadio
            data={SORTING}
            isLoading={false}
            selected={selectedSort}
            setSelected={setSelectedSort}
            queryKey="sort"
            valueKey="value"
            labelKey="label"
            updateSearchParams={updateSearchParams}
            title="Urutkan Berdasarkan"
          />

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
     <div
      className="bg-gradient-to-br from-gray-600 via-gray-400 to-gray-200 bg-cover bg-center min-h-[180px] md:min-h-[200px] py-8 px-4 md:py-12 md:px-8"
    >
      <div className="lg:max-w-screen-lg mx-auto text-left grid gap-4 p-4 rounded">
        <Breadcrumb className="text-white" items={breadcrumbitems} />
        <p className="text-white md:text-base text-sm font-semibold">Temukan perpustakaan template Modul Ajar</p>
        <InputSearch
          classButton="w-fit"
          className="bg-white md:h-12 h-8"
          placeholder="Cari Modul Ajar"
          data-testid={`search-input-id`}
          onSearch={handleSearch}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          value={search ?? ''}
        />
      </div>
    </div>

      <div className="grid grid-cols-5 md:grid-cols-7 lg:max-w-screen-lg mx-auto mt-6 px-4 md:px-0">
        {renderFilter()}
        <div className="col-span-5 ">
          {search && <Tag label={search} onRemove={() => setSearch(null)} />}
          {!isLoadingModul && modul?.count > 0 && (
            <p className="pl-2 text-xs text-left mb-2">
              Menampilkan {modul.count} Modul
            </p>
          )}
          <div className="col-span-5">
            {isLoadingModul ? (
              <LoadingModul />
            ) : modul && modul.count > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {modul?.data?.map((item, keys) => (
                  <CardModul key={keys} data={item} />
                ))}
              </div>
            ) : (
              <NotModul>
                <p className="text-sm">Coba ubah pencarian atau pilih jenjang lain</p>
                <p className="text-sm mb-4">atau mulai kontribusi Anda untuk pendidikan yang lebih baik</p>
                <Button
                  onClick={() => navigate('/contribute')}
                  className="mx-auto text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                  ✍️ Kontribusi Sekarang
                </Button>
              </NotModul>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
