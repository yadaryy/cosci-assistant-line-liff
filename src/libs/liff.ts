import liff from '@line/liff';

export const initLIFF = async () => {
  try {
    await liff.init({ liffId: '2000715932-eAbL6q22' });  
  } catch (error) {
    console.error('liff init error')
  }
  if (!liff.isLoggedIn()) {
    liff.login();
  }
};

export const getProfile = async () => {
    await liff.ready
    if (liff.isLoggedIn()) {
      return await liff.getProfile();
    }else {
      liff.login();
    }
};