import React,{ PropTypes ,useState, useEffect } from 'react';

function UserInfoItem({data, index, modifyUser, delUser}){
   let userInfo = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      index: index
   }
   return(
      <div className="row border-bottom py-3">
         <div className="col-1">{index+1}</div>
         <div className="col-2">{data.name}</div>
         <div className="col-3">{data.phone}</div>
         <div className="col-4">{data.email}</div>
         <div className="col-2">
            <button type="button" className="bg-transparent border-0" onClick={() => delUser(index)}>
               <i className="fas fa-trash-alt"></i>
            </button>
            <button type="button" className="bg-transparent border-0" onClick={() => modifyUser(userInfo)}>
               <i className="fas fa-pencil-alt"></i>
            </button>
         </div>
      </div>
   )
}

export default UserInfoItem;