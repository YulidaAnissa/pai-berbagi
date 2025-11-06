import { LoadingRadio } from "../index";

export function Component({ title, queryKey, selected, setSelected, data, isLoading, updateSearchParams, valueKey = "id", labelKey = "label" }) {

  console.log({selected});
  return (
    <div className="grid gap-2 mt-4 w-4/5">
      <p>{title}</p>
      {isLoading ? (
        <LoadingRadio />
      ) : data?.map((item) => (
        <div
          className={`flex cursor-pointer p-2 rounded ${
            selected === item[valueKey] ? "bg-blue-100" : ""
          }`}
          key={item[valueKey]}
          onClick={() => {
            setSelected(item[valueKey]);
            updateSearchParams({ [queryKey]: item[valueKey] });
          }}

        >
          <input 
            type="radio"
            value={item[valueKey] ?? ""}
            checked={selected === (item[valueKey])}
            onChange={() => setSelected(item[valueKey])}
            name={queryKey}
            className="my-auto w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <p
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {item[labelKey]}
          </p>
        </div>
      ))
    }
    </div>
  )};

export default Component;