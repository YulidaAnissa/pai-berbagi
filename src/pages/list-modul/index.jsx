import { useEffect, useState } from 'react'
import { CardJenjang, Button, CardModul, Breadcrumb, LoadingModul, SkeletonText, NotModul, FilterRadio } from '../../components/elements';
import InputBase from '../../components/forms/InputBase';
import { SearchIcon } from '../../components/elements/Icons';
import { mobileCheck } from '../../utils/common';
import InputSearch from '../../components/forms/InputSearch';
import { useSearchParams } from 'react-router-dom';
import { SORTING } from '../../constants';
import { useJenjang, useModul } from '../../hooks/useData';

function App() {
  const [search, setSearch] = useState(null);
  const [selectedJenjang, setSelectedJenjang] = useState(null);
  const [selectedSort, setSelectedSort] = useState('asc');
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading } = useJenjang();
  
  const { data: modul, isLoading: isLoadingModul } = useModul({
    id: selectedJenjang,
    search: search ?? '',
    sort: selectedSort ?? ''
  });

  console.log('selectedJenjang', selectedJenjang);

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
      <div className="bg-[#f3f3d3] m-h-[180px] md:min-h-[280px] py-8 px-4 md:py-12 md:px-8">
        <div className="lg:max-w-screen-lg mx-auto text-left grid gap-4">
          <Breadcrumb items={breadcrumbitems} />
          <div className="flex gap-2 items-center pt-2 md:pt-4">
            <p className="text-lg md:text-2xl capitalize font-bold text-primary">203.454</p>
            <p className="text-base md:text-xl">Modul Ajar</p>
          </div>
          <p className="md:text-base text-sm">Temukan perpustakaan template Modul Ajar</p>
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
      <div className="grid grid-cols-5 md:grid-cols-7 lg:max-w-screen-lg mx-auto mt-6">
        {renderFilter()}
        <div className="col-span-5 ">
          {search && <Tag label={search} onRemove={() => setSearch(null)} />}
          {!isLoadingModul && modul?.count > 0 && (
            <p className="pl-2 text-xs text-left">
              Menampilkan {modul.count} Modul
            </p>
          )}
          <div className="col-span-5">
            {isLoadingModul ? (
              <LoadingModul />
            ) : modul && modul.count > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {modul?.data?.map((item, keys) => (
                  <CardModul key={keys} data={item} />
                ))}
              </div>
            ) : (
              <NotModul />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
