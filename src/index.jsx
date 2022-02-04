import "primereact/resources/themes/md-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import React from "react";
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { FirstList, SecondList, UserTemplate, ErrorMassage } from "./fragment";
import { send, EVENT } from "./func";
import ReactDOM from "react-dom";




const FirstPanel =({useData})=> {
    const [value, setValue] = React.useState();
    const [users, setUsers] = React.useState([]);

    const useSearch =()=> {
        send("users", {name:value}, "POST").then((responces)=> {
            if(responces && !responces.error && responces.login && !users.find((user)=> user.login===responces.login && true)){
                localStorage.setItem("users", JSON.stringify([...users, responces]));
                setUsers([...users, responces]);
            }
            else if(responces.error) EVENT.emit("error", responces.error);
        });
    }
    React.useEffect(()=> {
        let cacheUsers = localStorage.getItem("users");
        if(cacheUsers && cacheUsers!==null) setUsers(JSON.parse(cacheUsers));
    }, []);

    return(
        <>
            <div style={{width:"80%",marginLeft:"35%",marginBottom:"5%"}}>
                Github searcher
            </div>
            <div style={{display:"flex", flexDirection:"row"}}>
                <span className="p-float-label" style={{width:"80%",marginLeft:"10%"}}>
                    <InputText 
                        id="in" 
                        style={{width:"90%"}}
                        value={value} 
                        onChange={(ev)=> setValue(ev.target.value)} 
                    />
                    <label htmlFor="in">
                        Search for Users
                    </label>    
                </span>
                <Button 
                    icon="pi pi-search" 
                    onClick={()=> useSearch()}
                />
            </div>
            <FirstList
                users={users}
                useData={useData}
            />
        </>
    );
}
const SecondPanel =({userData})=> (
    <>
        <div style={{marginLeft:"35%",marginBottom:"5%"}}>
            Github searcher
        </div>
        <UserTemplate data={userData} />
        <SecondList login={userData.login} />
    </>
);



const App =()=> {
    const [error, setError] = React.useState();
    const [data, setData] = React.useState({});

    React.useEffect(()=> EVENT.on("error", setError), [])

    return(
        <>
            {error && <ErrorMassage txt={error} />}
            <Splitter style={{height:'100%'}}>
                <SplitterPanel>
                    <FirstPanel useData={setData}/>
                </SplitterPanel>
                <SplitterPanel>
                    <SecondPanel userData={data} />
                </SplitterPanel>
            </Splitter>
        </>
    );
}



ReactDOM.render(<App/>, document.querySelector(".root"));