import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        src={logo}
        height="60"
        width="60"
        alt="The Wood Heaven logo"
        quality={100}
      />
      {/* <Image
        src="/logo.png"
        height="60"
        width="60"
        alt="The Wood Heaven logo"
      /> */}
      <span className="text-xl font-semibold text-primary-100">
        The Wood Heaven
      </span>
    </Link>
  );
}

export default Logo;
