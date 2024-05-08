'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getProfile, initLIFF } from '@/libs/liff';
import { getNotify } from '@/libs/api';
import Navbar from '@/common/navbar';

export default function Home() {
  const [profileImage, setProfileImage] = useState('');
  useEffect(() => {
    initLIFF();
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

  const handleSubmit = async() => {
    console.log('hello world');
  };
  return (
    <>
    <Navbar profileImage= {profileImage} />
    <div className="flex min-h-screen items-start justify-center p-4 overflow-hidden ">
    <div className="mx-auto max-w-2xl justify-center">
    <div className="pb-5 mx-auto flex justify-center">
    <label htmlFor="department" className=" relative inline-flex text-md font-medium text-white  pr-4" >
  ตั้งค่าการรับข่าวสาร
</label>  
    <label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer" />
  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full shadow-md peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-300"></div>
</label>
</div>
      <div className="flex flex-wrap justify-center gap-4">
        
        <label className="w-3/5 relative cursor-pointer">
          <input type="checkbox" className="peer sr-only" name="size-choice"  />
          <span className="absolute top-2 right-2 z-10 opacity-0 transition-all peer-checked:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-800 stroke-white" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="9" />
              <path d="M9 12l2 2l4 -4" />
            </svg>
          </span>
          <div className="woverflow-hidden rounded-lg bg-white shadow-md ring ring-transparent grayscale transition-all active:scale-95 peer-checked:ring-gray-300 peer-checked:grayscale-0">
            <header className="px-2.5 py-2.5">
              <p className="text-lg font-bold tracking-wide text-gray-700">ข่าวสารทั่วไป</p>
              <p className="text-xs text-gray-400">ภายในวิทยาลัยนวัตกรรมสื่อสารสังคม</p>
            </header>
          </div>
        </label>
        <label className="w-3/5 relative cursor-pointer">
          <input type="checkbox" className="peer sr-only" name="size-choice" />
          <span className="absolute top-2 right-2 z-10 opacity-0 transition-all peer-checked:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-800 stroke-white" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="9" />
              <path d="M9 12l2 2l4 -4" />
            </svg>
          </span>
          <div className="overflow-hidden rounded-lg bg-white shadow-md ring ring-transparent grayscale transition-all active:scale-95 peer-checked:ring-gray-300 peer-checked:grayscale-0">
            <header className="px-2.5 py-2.5">
              <p className="text-lg font-bold tracking-wide text-gray-700">ข่าวด่วน</p>
              <p className="text-xs text-gray-400">การแจ้งเหตุฉุกเฉินหรือเรื่องเร่งด่วน</p>
            </header>
          </div>
        </label>
      </div>
      <div className="pt-5 flex justify-center">
    <button type="button" className="ease-out duration-300 shadow-md w-2/5 flex flex-wrap justify-center text-dark bg-white hover:hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">ยืนยัน</button>
    </div>
    </div>
  </div>
  </>
  );
}
