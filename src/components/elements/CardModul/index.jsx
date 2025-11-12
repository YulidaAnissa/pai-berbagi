import { ModalDetailModul } from "..";
import Button from "../Button";
import { useState } from "react";
import { FaUser, 
  FaGraduationCap,
  FaUserAlt } from "react-icons/fa";

export function Component({
  data
}) {
  const [ modal, setModal ] = useState(false);
  const handleClick = () => {
    setModal(true);
  }

  const content = [
      {
        title: 'Tingkat Pendidikan',
        value: data?.jenjang?.jenjang,
        icon: <FaGraduationCap size={15} />,
      },
      {
        title: 'Dipublikasikan oleh',
        value: data?.name,
        icon: <FaUserAlt size={15} />,
      }
    ];

  return (
    <div
      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      <div className="hidden md:grid relative h-40 w-full overflow-hidden">
        <img
          src={data?.jenjang?.imagesModul}
          alt={data.title}
          className="object-fill md:object-cover w-full h-full transition-transform duration-300"
        />
        <div className="absolute inset-0 flex flex-col p-5 text-white text-left">
          <p className="font-bungee tracking-wide font-semibold my-auto uppercase text-gray-800">{data.title}</p>
        </div>
      </div>

      <div className="p-4 text-left gap-1 md:gap-2 grid">
        <h3 className="font-medium text-lg text-gray-800 truncate">
          {data.title} 
        </h3>
        {content.map((item,) => (
          <div className="text-xs flex items-center gap-2 text-gray-600 mt-1">
            <div>{item.icon}</div>
            <span>{item?.value || "Penulis tidak diketahui"}</span>
          </div>
        ))}
        <Button 
          // as="a"
          className="mt-2 px-4 mx-auto border-primary w-full hover:bg-primary hover:text-white"
          // download
          // href={data?.files}
          // onClick={(e) => e.stopPropagation()}
          onClick={handleClick}
          size="small"
          variant="ghost"
        >
          Lihat Selengkapnya
        </Button>
      </div>
      {modal && (<ModalDetailModul modul={data} onClose={() => setModal(false)} />)}
    </div>
  );
}

export default Component;