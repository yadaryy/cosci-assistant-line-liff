import { useEffect } from 'react';
import liff from '@line/liff';

export default function useLIFF() {
  useEffect(() => {
    const initializeLIFF = async () => {
      try {
        await liff.init({ liffId: '2000715932-eAbL6q22' });
        console.log('LIFF initialized');
      } catch (error) {
        console.error('LIFF initialization failed', error.message);
      }
      if (!liff.isLoggedIn()) {
        liff.login();
      }
    };

    initializeLIFF();
  }, []);

  return null; 
}
