import { Link } from 'react-router-dom';

export function Breadcrumb({
  items = [
    { link: '/', label: 'Beranda' },
  ],
  linkHome = '/',
  labelHome = 'Beranda',
  devider = '>' }) {
  
  const getLabeHome = () => {
    return labelHome?.split('-').join(' ');
  };

  const createArrow = (key) => {
    if (items.length - 1 !== key) {
      return <p className="px-2 text-gray-700">{devider}</p>;
    }
  };

  const customRoot = items?.[0]?.root;

  return (
    <div className="flex text-sm md:text-base">
      {!customRoot && (
        <div className="flex">
          <Link className="capitalize font-medium cursor-pointer text-primary" to={linkHome}>
            {getLabeHome()}
          </Link>
          <p className="px-2 text-gray-700">{devider}</p>
        </div>
      )}
      {items.map((item, keys) => (
        <div className="flex" key={keys}>
          {item.link === '' ? (
            <p className="font-medium text-gray-800">{item.label}</p>
          ) : (
            <Link className="capitalize font-medium cursor-pointer text-primary" to={item.link}>
              {item.label}
            </Link>
          )}
          {createArrow(keys)}
        </div>
      ))}
    </div>
  );
}

export default Breadcrumb;