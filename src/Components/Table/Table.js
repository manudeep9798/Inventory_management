import React from 'react'

const Table = ({data,displayData,header}) => {
    console.log(data);
    return (
        <div>
            <div className="dataTable">
                {data!==[]?<div>
                    <table id="table-to-xls" className="table table-bordered thead-dark table-responsive">
                        <thead>
                            <tr>
                                {header&&header.map((val,idx)=>{
                                    return(
                                        <th scope="col" key={idx}>{val}</th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                displayData&&displayData.map((val,idx1)=>{
                                    return(
                                        <tr ky={idx1}>{val&&Object.values(val).map((data,index)=>{
                                            return(
                                                <td key={index}><p>{data}</p></td>
                                            )
                                        })}</tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>:null}
            </div>
        </div>
    )
}

export default Table
