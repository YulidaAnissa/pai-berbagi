import { ModalDetailModul } from "..";
import Button from "../Button";
// import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export function Component({
  data
}) {
  const [ modal, setModal ] = useState(false);
  // const navigate = useNavigate();
  const handleClick = () => {
    // navigate(`/modul/${data.idModul}`);
    setModal(true);
  }

  return (
    <div
      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={data?.jenjang?.imagesModul}
          alt={data.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full shadow">
          {data.jenjang?.jenjang}
        </span>
      </div>

      <div className="p-4 text-left">
        <h3 className="text-md font-bold text-gray-800">
          {data.title} 
        </h3>
        <Button className="mt-2 px-4 text-indigo-600 hover:underline mx-auto" onClick={handleClick} size="small">
          Lihat Detail
        </Button>
      </div>
      {modal && (<ModalDetailModul modul={data} onClose={() => setModal(false)} />)}
    </div>





  );
}

export default Component;