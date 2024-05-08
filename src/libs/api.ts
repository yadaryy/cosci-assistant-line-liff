export async function getNotifyStatus(id:String) {
    const url = `https://5481-184-22-54-143.ngrok-free.app/notify/${id}`; // Assuming the API route is defined under /pages/api/notify/[id].js
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    console.log(response.json())

    return response.json()
  }


export async function postNotifySettings(id:String, emergency:Boolean, news:Boolean) {
    const url = `https://5481-184-22-54-143.ngrok-free.app/notify/setting/${id}`;
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