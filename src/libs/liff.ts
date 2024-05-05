
import liff from '@line/liff';

const liffId = "2000715932-eAbL6q22";

export const initLIFF = async () => {
  await liff.init({ liffId: liffId });
  if (!liff.isLoggedIn()) {
    liff.login();
  }
};

export const getProfile = async () => {
  if (liff.isLoggedIn()) {
    return await liff.getProfile();
  } else {
    liff.login();
  }
};