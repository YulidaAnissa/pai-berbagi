
export function Component({
  data, onClick
}) {

  return (
    <div 
      className="relative z-10 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg max-w-md h-32 md:h-48 hover:scale-105 cursor-pointer" 
      onClick={() => onClick("jenjang", data.idJenjang)}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center p-4 rounded-2xl shadow-lg"
        style={{ backgroundImage: `url(${data.image})` }}
      />
      <div className="absolute inset-0 bg-black/40 rounded-2xl" />
      <div className="text-left relative text-white font-semibold text-md md:text-xl p-4">
        <p>{data?.jenjang}</p>
        <p>{data?.count}+ Koleksi</p>
      </div>
    </div>
  );
}

export default Component;