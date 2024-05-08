'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getProfile, initLIFF } from '@/libs/liff';
import { getNotifyStatus } from '@/libs/api';
import { postNotifySettings } from '@/libs/api';
import Navbar from '@/common/navbar';
import { ChangeEvent, MouseEvent } from 'react';
import { notifyStatus } from '../libs/api';

export default function Home() {
  const [profileImage, setProfileImage] = useState('');
  const [editState, setEditState] = useState(false);
  const [settingState, setSettingState] = useState(false);
  const [emergency, setEmergency] = useState(false);
  const [news, setNews] = useState(false);
  const [userId, setUserId] = useState('');
  const [notifyStatus, setNotifyStatus] = useState<notifyStatus>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initLIFF();
    async function fetchProfile() {
      try {
        const profile = await getProfile();
        if (profile && profile.pictureUrl) {
            setProfileImage(profile.pictureUrl);
            setUserId(profile.userId);
          }
        const notificationStatus = await getNotifyStatus(profile.userId); 
        if (notificationStatus) {
            setNotifyStatus(notificationStatus);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }
    fetchProfile();
  }, []);

  const handleSettingState = (event: ChangeEvent<HTMLInputElement>) => {
    setSettingState(event.target.checked);
  }

  const handleEmergencyChange = (event: ChangeEvent<HTMLInputElement>) => {// Check if files exist and get the first file
      setEmergency(event.target.checked);
  };

  const handleNewsChange = (event: ChangeEvent<HTMLInputElement>) => {// Check if files exist and get the first file
      setNews(event.target.checked);
  };

  const handleEdit = async() => {
    setEditState(true);
  }
  const handleSubmit = async() => {
    setEditState(false);
    postNotifySettings(userId, emergency, news)
  };

  useEffect(() => {
    setNews(notifyStatus?.data.news ?? false);
    setEmergency(notifyStatus?.data.emergency ?? false);
    setLoading(false);
  }, [notifyStatus])
  return (
    <>
    <Navbar profileImage= { profileImage } />
    <div role="status" className="absolute z-50 -translate-x-1/2 -translate-y-1/2 top-1/4 left-1/2 isolate aspect-video w-24 rounded-xl bg-black/50 shadow-lg ring-1 ring-black/5 flex justify-center items-center" style={{ opacity: loading ? 1 : 0}}>
        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
    <div className="flex min-h-screen items-start justify-center p-4 overflow-hidden">
      <div className="mx-auto max-w-2xl justify-center">
        <div className="pb-5 mx-auto flex justify-center">
          <div className="flex items-center">
            <label htmlFor="department" className="relative text-md font-medium text-white mr-4" >
              ตั้งค่าการรับข่าวสาร
            </label>  
            {editState && (
              <label className="relative items-center cursor-pointer">
                <input type="checkbox" checked= {settingState} onChange= {handleSettingState} className="sr-only peer" /> 
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full shadow-md peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-300"></div>
              </label>
            )}
            {!editState && ( 
            <button type="button" onClick={handleEdit} className="py-1.5 px-3 my-2 text-sm font-medium text-dark focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600">แก้ไข</button> 
            )}
          </div>
        </div>
          <div className="flex flex-wrap justify-center gap-4">
            <label className="w-3/5 relative cursor-pointer">
              <input type="checkbox" checked={news} onChange={handleNewsChange} disabled={!editState} className="peer sr-only" name="size-choice"  />
              <span className="absolute top-2 right-2 z-10 opacity-0 transition-all peer-checked:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-800 stroke-white" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
              </span>
              <div className="overflow-hidden rounded-lg bg-white shadow-md ring ring-transparent grayscale transition-all active:scale-95 peer-checked:ring-gray-300 peer-checked:grayscale-0">
                <header className="px-2.5 py-2.5">
                  <p className="text-lg font-bold tracking-wide text-gray-700">ข่าวสารทั่วไป</p>
                  <p className="text-xs text-gray-400">ภายในวิทยาลัยนวัตกรรมสื่อสารสังคม</p>
                </header>
              </div>
            </label>
            <label className="w-3/5 relative cursor-pointer">
              <input type="checkbox" checked={emergency} onChange={handleEmergencyChange} disabled={!editState} className="peer sr-only" name="size-choice" />
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
            {editState && (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="ease-out duration-300 shadow-md w-2/5 flex flex-wrap justify-center text-dark bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    ยืนยัน
                  </button>
              )} 
        </div>
      </div>
    </div>
  </>
  );
}
