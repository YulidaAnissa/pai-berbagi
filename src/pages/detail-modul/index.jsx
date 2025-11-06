import ModulDetail from "./DetailModul";
import { useModulById } from "../../hooks/useData";
import { useParams } from "react-router-dom";


const DetailPage = () => {
  const { idModul } = useParams();
  const { data: modul, isLoading } = useModulById(idModul);

  if (isLoading) return <p>Memuat detail modul...</p>;
  if (!modul) return <p>Modul tidak ditemukan.</p>;


  return <ModulDetail modul={modul} />;
};

export default DetailPage;
