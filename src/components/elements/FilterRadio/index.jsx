import { LoadingRadio } from "../index";

export function Component({
  title,
  queryKey,
  selected,
  setSelected,
  data,
  isLoading,
  updateSearchParams,
  valueKey = "id",
  labelKey = "label",
}) {
  const handleSelect = (value) => {
    setSelected(value);

    if (value === null || value === undefined || value === "") {
      updateSearchParams({}, [queryKey]);
      return;
    }

    updateSearchParams({ [queryKey]: value });
  };

  return (
    <div className="mt-4 w-full">
      {title && (
        <p className="mb-3 text-sm font-black uppercase tracking-[0.14em] text-slate-700">
          {title}
        </p>
      )}

      {isLoading ? (
        <LoadingRadio />
      ) : (
        <div className="grid gap-2">
          <label
            className={`group flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-3 text-sm transition ${
              !selected
                ? "border-emerald-300 bg-emerald-50 text-emerald-900 shadow-sm"
                : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50/40"
            }`}
          >
            <input
              type="radio"
              checked={!selected}
              onChange={() => handleSelect(null)}
              name={queryKey}
              className="h-4 w-4 border-slate-300 text-emerald-700 focus:ring-emerald-500"
            />

            <span
              className={`font-semibold leading-5 ${
                !selected ? "text-emerald-900" : "text-slate-700"
              }`}
            >
              Semua
            </span>
          </label>

          {data?.map((item) => {
            const value = item[valueKey];
            const label = item[labelKey];
            const isActive = selected === value;

            return (
              <label
                key={value}
                className={`group flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-3 text-sm transition ${
                  isActive
                    ? "border-emerald-300 bg-emerald-50 text-emerald-900 shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50/40"
                }`}
              >
                <input
                  type="radio"
                  value={value ?? ""}
                  checked={isActive}
                  onChange={() => handleSelect(value)}
                  name={queryKey}
                  className="h-4 w-4 border-slate-300 text-emerald-700 focus:ring-emerald-500"
                />

                <span
                  className={`font-semibold leading-5 ${
                    isActive ? "text-emerald-900" : "text-slate-700"
                  }`}
                >
                  {label}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Component;