
export function Component({
  data
}) {


  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg h-28 md:h-40 hover:scale-105 cursor-pointer">
      <div 
        className="absolute inset-0 bg-cover bg-center p-4"
        style={{ backgroundImage: `url(${data.images})` }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="text-left relative z-10 text-white font-semibold text-md md:text-xl p-4">
        <p>{data?.jenjang}</p>
        <p>{data?.count}+ Koleksi</p>
      </div>
    </div>
  );
}

export default Component;