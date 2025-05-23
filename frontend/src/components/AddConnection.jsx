import React from 'react'

export const AddConnection = () => {
  return (
    <a className='addconnection' href='/addconnection' style={{borderRadius:"50%", color:"#0d6efd", padding:"10px", border:"1px solid #0d6efd",width:"40px",height:"40px",display:"flex",justifyContent:"center",alignItems:"center", textDecoration:"none", position:"fixed",right:"25px",bottom:"46px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", backgroundColor:"#F7AEF8"}}>
        <i className="fa fa-plus" style={{fontSize:"33px"}}></i>
    </a>
  )
}
