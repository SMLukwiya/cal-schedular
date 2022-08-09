import Image from "next/image";

const Avatar = ({ name }: { name: string }) => {
  return (
    <div>
      <Image src={"/images/earth.png"} alt="globe" width={40} height={40} className="object-contain" />
      <h2 className="mt-2 text-lg font-bold text-gray-400">{name}</h2>
    </div>
  );
};

export default Avatar;
