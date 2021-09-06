import React, { useState } from 'react'
import {FaFileImport} from 'react-icons/fa'
import Table from '../../Components/Table/Table'
import * as XLSX from 'xlsx'
const Index = () => {
    const [file,setFile]=useState()
    const [data,setData]=useState()
    const [displayData,setDisplayData]=useState()
    const [header,setHeader]=useState()
    const [searchId,setSearchId]=useState("")
    const [searchUrl,setSearchUrl]=useState("")
    const [searchSpoc,setSearchSpoc]=useState("")
    const readExcel=(file)=>{
        const promise=new Promise((res,rej)=>{
            const fileReader=new FileReader();
            fileReader.readAsArrayBuffer(file)
            fileReader.onload=(e)=>{
                const bufferArray=e.target.result;
                const wb=XLSX.read(bufferArray,{type:'buffer'});
                const wsName=wb.SheetNames[0];
                const ws=wb.Sheets[wsName];
                const data=XLSX.utils.sheet_to_json((ws),{defval:''});
                res(data);
            };
            fileReader.onerror=(err)=>{
                rej(err)
            }
        })
        promise.then((d)=>{
            setData(d);
            setDisplayData(d);
            setHeader(Object.keys(d[0]))
        }).catch((err)=>{
            console.log(err);
        })
    }
    const handleFileUpload=(e)=>{
        setHeader([])
        setFile(e.target.files[0])
        readExcel(e.target.files[0])
    }
  
    
    const searchHandel=()=>{
        if(searchId===""&&searchUrl===""&&searchSpoc===""){
            setDisplayData(data)
            return;
        }else{
            var result=[];
            if(searchId!==""){
                 result=data.filter((val)=>{
                    if(val.TPID.toString().includes(searchId)){
                        return(val)
                    }
                })
            }
            var result1=result;
            if(searchUrl!==""){
                if(result.length===0){
                    result1=data.filter((val)=>{
                        if(val.URL.includes(searchUrl)){
                            return(val)
                        }
                    })
                }else{
                        result1=result.filter((val)=>{
                        if(val.URL.includes(searchUrl)){
                            return(val)
                        }
                    })
                }
            }
            var result2=result1;
            if(searchSpoc!==""){
                if(result1.length===0){
                    result2=data.filter((val)=>{
                        if(val['BU / SPOC'].toUpperCase().includes(searchSpoc.toUpperCase())){
                            return(val)
                        }
                    })
                }else{
                    result2=result1.filter((val)=>{
                        if(val['BU / SPOC'].toUpperCase().includes(searchSpoc.toUpperCase())){
                            return(val)
                        }
                    })
                }
            }
            setDisplayData(result2)
        }
     
    }
    const handelIdSearch=(e)=>{
        setSearchId(e.target.value)
    }
    const handelUrlSearch=(e)=>{
        setSearchUrl(e.target.value)
    }
    const handelSpocSearch=(e)=>{
        setSearchSpoc(e.target.value)
    }
    const handelSearchCancel=(e)=>{
        setSearchId("")
        setSearchUrl("")
        setSearchSpoc("")
        setDisplayData(data)
    }
    return (
        <div className="indexPage">
            <div className="searchBar">
                    <form action="submit" onSubmit={(e)=>e.preventDefault()}>
                        <div  className="searchBar">
                        <div>
                    <label>TP-ID</label><br></br>
                    <div className="searchInput box-shadow-06">
                        <input onChange={(e)=>handelIdSearch(e)} value={searchId} placeholder="Search TPID" className="shadow p-2 mb-5 bg-white rounded textInput" type="text"/>
                    </div>
                    </div>
                    <div>
                    <label>URL</label><br></br>
                    <div className="searchInput box-shadow-06">
                        <input onChange={(e)=>handelUrlSearch(e)} value={searchUrl} placeholder="Search URL" className="shadow p-2 mb-5 bg-white rounded textInput" type="text"/>
                    </div>
                    </div>
                    <div>
                    <label>SPOC</label><br></br>
                    <div className="searchInput box-shadow-06">
                        <input onChange={(e)=>handelSpocSearch(e)} value={searchSpoc} placeholder="Search SPOC" className="shadow p-2 mb-5 bg-white rounded textInput" type="text"/>
                    </div>
                    </div>
                    <div>
                    <label></label><br></br>
                    <button type="submit" value="submit" onClick={searchHandel} className=" searchBtn shadow p-2 mb-5 rounded ">
                        Search
                    <input onSubmit={(e)=>e.preventDefault()} className="hidden" type="submit"/></button>
                    </div>
                    <div>
                    <label></label><br></br>
                    <button className=" shadow p-2 mb-5 rounded " id="searchCancelBtn" onClick={(e)=>handelSearchCancel(e)}>Cancel</button>
                    </div>
                    </div>
                    </form>
                    
                    </div>
            <div className="uploadSection">
                <label className="uploadFileBtn">
                     <input className="hidden" onChange={(e)=>handleFileUpload(e)} type="file"/> Select <FaFileImport/>
                </label>
                <div style={{display:"flex"}}>
                {file!==undefined?<p><strong>File Selected:</strong> {file.name}</p>:null}
                {displayData&&file!==undefined?<p><strong>Entries: </strong>{displayData.length}</p>:null}
                </div>
            </div>
            {displayData!==undefined?<Table data={data} displayData={displayData} header={header}/>:null}
        </div>
    )
}

export default Index
