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

class EventEmmitter {
    events: {}
    constructor() {
        this.events = {}
    }
    on(eventName, fn) {
        if(!this.events[eventName]) this.events[eventName] = [];
        this.events[eventName].push(fn);
        
        return ()=> {
            this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
        }
    }
    emit(eventName, data) {
        const event = this.events[eventName];
        if(event){
            event.forEach((fn)=> {
                fn.call(null, data);
            });
        }
    }
}


export const EVENT = new EventEmmitter();