import Logo from "@/app/_components/Logo";
import NavMenu from "@/app/_components/NavMenu";

function Header() {
  return (
    <header className="border-b border-primary-900 px-8 py-5">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <NavMenu />
      </div>
    </header>
  );
}

export default Header;
