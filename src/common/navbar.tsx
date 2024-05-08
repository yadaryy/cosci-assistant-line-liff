import Image from 'next/image';
interface NavbarProps {
  profileImage?: string;
}

 const Navbar = ({ profileImage }: NavbarProps) => {
  return (
    <nav className="top-0 z-50 bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-sm font-semibold whitespace-nowrap">COSCI Assistant</span>
        <div className="flex flex-wrap items-left gap-3">
          {profileImage && (
            <Image src={profileImage} alt="Profile" className="object-cover rounded-full" width={25} height={25} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;