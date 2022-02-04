import React from "react";
import { send } from "./func";
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";



export function FirstList({users, useData}) {
    return(
        <div>
            <DataTable 
                value={users} 
                responsiveLayout="scroll"
            >
                <Column 
                    style={{color:"#57575766"}}
                    header="Avatar" 
                    body={(rowData)=> <img src={rowData.avatar_url} style={{width:"60px",color:"#57575766"}}/>} 
                />
                <Column
                    header={<div style={{color:"#57575766"}}>UserName</div>}
                    body={(rowData)=> <var>{rowData.name??"null"}</var>} 
                />
                <Column 
                    style={{color:"#57575766"}}
                    header="Repo" 
                    body={(rowData)=> (
                        <Button 
                            className="p-button-warning" 
                            label="repo" 
                            onClick={()=> useData(rowData)} 
                        />
                    )} 
                />
            </DataTable>
        </div>
    );
}
export function SecondList({login}) {
    const [value, setValue] = React.useState();
    const [data, setData] = React.useState([]);
    const [filtreData, setFiltreData] = React.useState([]);

    const useFiltre =(reposData:Array<object>)=> {
        setFiltreData(reposData.filter((elem)=> {
            if(value && elem.name.search(value)!==-1) return elem;
            else if(!value) return elem;
        }));
    }
    React.useEffect(()=> {
        send("repo", {login: login}, "POST").then((responces)=> {
            useFiltre(responces);
            setData(responces)
        });
    }, [login]);
    

    return(
        <div>
            <DataTable 
                value={filtreData} 
                header={
                    <span className="p-float-label" style={{width:"90%",marginLeft:"10%"}}>
                        <InputText 
                            id="in" 
                            style={{width:"90%"}}
                            value={value}
                            onChange={(ev)=> {setValue(ev.target.value); useFiltre(data)}} 
                        />
                        <label htmlFor="in">
                            Search for users Repositories
                        </label>
                    </span>
                } 
                responsiveLayout="scroll"
            >
                <Column 
                    header="RepoName"
                    body={(rowData)=> <var>{rowData.name}</var>}
                />
                <Column 
                    header="Info" 
                    body={(rowData)=> (
                        <div style={{display:"flex",flexDirection:"column",fontSize:"14px"}}>
                            <var>{ rowData.forks } Forks</var>
                            <var>{ rowData.stargazers_count } Stars</var>
                        </div>
                    )}
                />
            </DataTable>
        </div>
    );
}
export function UserTemplate({data}) {
    const useFormatData =(created:string)=> {
        if(created) return created.split("T")[0];
    }

    return(
        <>
        {data &&
            <div style={{display:"flex",flexDirection:"row"}}>
                <img src={data.avatar_url} style={{width:"160px",height:"120px"}}/>
                <div style={{flexDirection:"column",marginLeft:"5%"}}>
                    <div>name: {data.name??"null"}</div>
                    <div>email: {data.email??"null"}</div>
                    <div>location: {data.location??"null"}</div>
                    <div>join date: {useFormatData(data.created_at)}</div>
                    <div>folowers: {data.followers}</div>
                    <div>folowing: {data.following}</div>
                </div>
            </div>
        }
        </>
    );
}