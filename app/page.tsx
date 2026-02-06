import Image from "next/image";
import Botbar from "./components/Botbar";

export default function Page() {
  return (
      <div className=" relative w-full max-w-9xl mx-auto">
        <Image
            src="/Hero_Img.png"
            alt="Background image"
            width="1600"
            height="600"
            className="object-cover w-full"
            priority
        />
        <Botbar />
      </div>
  );
}