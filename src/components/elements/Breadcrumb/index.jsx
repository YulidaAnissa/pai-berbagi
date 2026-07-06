import clsx from "clsx";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export function Breadcrumb({
  className,
  items = [{ link: "/", label: "Home" }],
  linkHome = "/",
  labelHome = "Home",
  divider,
  devider = "/",
}) {
  const separator = divider ?? devider;
  const customRoot = items?.[0]?.root;
  const homeLabel = labelHome?.split("-").join(" ");

  const linkClass =
    "inline-flex max-w-[180px] items-center gap-2 truncate rounded-full px-3 py-1.5 text-sm font-semibold text-[#0b6b3a] transition-all duration-200 hover:bg-[#e8f5ee] hover:text-[#07552d]";

  const activeClass =
    "inline-flex max-w-[240px] items-center truncate rounded-full border border-[#eadfb9] bg-[#fff8df] px-3 py-1.5 text-sm font-bold text-[#6d4f12] shadow-sm";

  return (
    <nav
      className={clsx(
        "flex flex-wrap items-center gap-1 rounded-full border border-white/70 bg-white/75 px-3 py-2 text-sm shadow-sm backdrop-blur-md",
        className
      )}
      aria-label="Breadcrumb"
    >
      {!customRoot && (
        <>
          <Link to={linkHome} className={linkClass}>
            <FaHome size={13} />
            {homeLabel}
          </Link>
          <span className="px-1 text-[#d6a93a]">{separator}</span>
        </>
      )}

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={`${item.label}-${index}`} className="flex items-center gap-1">
            {item.link === "" || isLast ? (
              <span className={activeClass}>{item.label}</span>
            ) : (
              <Link to={item.link} className={linkClass}>
                {item.label}
              </Link>
            )}

            {!isLast && (
              <span className="px-1 text-[#d6a93a]">{separator}</span>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;