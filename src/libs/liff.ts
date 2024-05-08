
import liff from '@line/liff';

export const initLIFF = async () => {
  await liff.init({ liffId: '2000715932-eAbL6q22'});
  if (!liff.isLoggedIn()) {
    liff.login();
  }
};

export const getProfile = async () => {
    return await liff.getProfile();
};