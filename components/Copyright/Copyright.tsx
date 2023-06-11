import logoSingular from "../../assets/images/logo-singular.png";
import Image from "next/image";

export default function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="flex flex-col gap-1 text-center my-10">
        <p>Developed by Giorgos Iliopoulos</p>
        <p>Copyright {currentYear}</p>
        <div className="flex gap-2 w-full justify-center">
          <p>Data by</p>
          <Image
            src={logoSingular}
            className=" max-w-[150px]"
            alt="SingularLogic"
          />
        </div>
      </div>
    </>
  );
}
