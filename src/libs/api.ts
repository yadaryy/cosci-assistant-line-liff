export async function getNotify(id:String) {
    const url = `https://f897-184-22-54-143.ngrok-free.app/api/notify/${id}`; // Assuming the API route is defined under /pages/api/notify/[id].js
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return await response.json();
  }

  