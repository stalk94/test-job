export async function send(url:string, data:object, metod:"POST"|"GET") {
    let dataServer = {
        method: metod ?? 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }
    if(metod==='POST') dataServer.body = JSON.stringify(data);

    let response = await fetch(document.baseURI + url, dataServer);
    return await response.json();
}