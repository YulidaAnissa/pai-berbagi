export function Component({ data, onClick }) {
  return (
    <button
      type="button"
      className="group relative h-36 w-full overflow-hidden rounded-2xl bg-slate-900 text-left shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/15 focus:outline-none focus:ring-2 focus:ring-emerald-500 md:h-48"
      onClick={() => onClick("jenjang", data.idJenjang)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${data.image})` }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="text-xl font-black leading-tight md:text-2xl">
          {data?.jenjang}
        </p>
        <p className="mt-1 text-sm font-semibold text-emerald-100">
          {data?.count || 0}+ Koleksi
        </p>
      </div>
    </button>
  );
}

export default Component;