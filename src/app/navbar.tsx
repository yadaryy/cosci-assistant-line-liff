'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getProfile, initLIFF } from '@/libs/liff';

const Navbar = () => {
  const [profileImage, setProfileImage] = useState('');
  initLIFF();
  useEffect(() => {
    async function fetchProfile() {
      try {
        const profile = await getProfile();
        if (profile && profile.pictureUrl) { // Check if profile and pictureUrl are defined
            setProfileImage(profile.pictureUrl);
          }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }
    fetchProfile();
  }, []);


  return (
    <nav className="top-0 z-50 bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-sm font-semibold whitespace-nowrap">COSCI Assistant</span>
        <div className="flex flex-wrap items-left gap-3">
          <button>
            <Image src="/musical-bell-outline.png" alt="BELL IMAGE" width={25} height={25} />
          </button>
          {profileImage && (
            <Image src={profileImage} alt="Profile" className="object-cover rounded-full" width={40} height={40} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;