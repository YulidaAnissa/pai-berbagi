import Button from "../Button";
import Image from "../Image";

export function Component({
  data
}) {


  return (
    <div className="bg-white cursor-pointer text-left rounded-lg p-2 min-h-fit">
      <Image
        src={data?.images}
        alt={data?.jenjang}
        className="w-full h-28 md:h-40 mb-2 object-cover rounded-lg"
      />
      <div className="grid gap-2 text-sm md:text-md">
        <p>Ini Judul</p>
        {/* <p>Ini Judul2</p> */}
        <p>ini penulis</p>
        <Button className="w-full rounded-b-lg hover:bg-primary hover:text-white border-primary" size="small" variant="ghost">Unduh</Button>
      </div>
     
    </div>
  );
}

export default Component;