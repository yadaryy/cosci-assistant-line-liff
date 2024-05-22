
export interface notifyStatus {
  result: string,
  data: {
        id: number,
        user_code: string,
        emergency: boolean,
        news: boolean,
        created_at: string,
        updated_at: string
    }
}

export async function getNotifyStatus(id: string) {
  const url = `https://7533-49-229-124-186.ngrok-free.app/notify/${id}`;
try{
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const jsonResponse = await response.json();
  console.log('Response:', jsonResponse);

  return jsonResponse;
}catch(error){
  console.log(error);
  throw Error;
}
}

export async function postNotifySettings(id:String, emergency:Boolean, news:Boolean) {
    const url = `https://7533-49-229-124-186.ngrok-free.app/notify/setting/${id}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emergency: emergency ? 1 : 0,
        news: news ? 1 : 0,
      }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to set notification settings');
    }
}