import React,{ PropTypes ,useState, useEffect } from 'react';
import Modal from 'react-modal';

function ModifyModal({action, modifyModal, closeModal, userInfo, modifyUserInfo, checkAccount}){
   const customStyles = {
     content : {
       top                   : '50%',
       left                  : '50%',
       right                 : 'auto',
       bottom                : 'auto',
       marginRight           : '-50%',
       transform             : 'translate(-50%, -50%)',
       width                 : '400px'
     }
   };
   const [accountState, setAccountSate] = useState([false, false]);

   function onChangeHandler(e){
      let inputId = e.target.id,
          inputVal = e.target.value;
      if(inputId == 'userName'){
         if(checkAccount(inputVal)){
            let res = [false, accountState[1]];
            setAccountSate(res);
         }
         else{
            let res = [true, accountState[1]];
            setAccountSate(res);
         }

         return;
      }
      if(inputId == 'userEmail'){
         let reg = /^[^\s]+@[^\s]+\.[^\s]{2,3}$/;
         if(reg.test(inputVal)){
            let res = [accountState[0], true];
            setAccountSate(res);
         }
         else{
            let res = [accountState[0], false];
            setAccountSate(res);
         }
         return;
      }
   }

   return(
      <div>
         <Modal 
           isOpen={modifyModal}
           contentLabel={action}
           onRequestClose={closeModal}
           style={customStyles}
         >
            <div className="text-center font-weight-bold">{(action == 'add') ? "新增使用者" : "修改使用者資料"}</div>
            <div className="row py-2 align-items-center">
               <div className="col-auto text-danger pr-0">*</div>
               <div className="col">
                  <input id="userName" placeholder="Name" className="form-control" type="text" value={(action == 'modify') ? modifyUserInfo.name : null} readOnly={(action == 'modify') ? true : false} onChange={onChangeHandler} required/>    
               </div>
               <div className="col-auto">
                  {(action == 'modify' || accountState[0]) ? <i className="fas fa-check text-success"></i> : <i className="fas fa-times text-danger"></i>}
               </div>        
            </div>
            <div className="row py-2 align-items-center">
               <div className="col-auto text-danger pr-0">*</div>
               <div className="col">
                  <input id="userEmail" placeholder={(action == 'modify') ? modifyUserInfo.email : "E-mail"} className="form-control" type="email" onChange={onChangeHandler} required/>         
               </div>
               <div className="col-auto">
                  {(accountState[1]) ? <i className="fas fa-check text-success"></i> : <i className="fas fa-times text-danger"></i>}
               </div>    
            </div>
            <div className="row py-2 align-items-center">
               <div className="col-auto text-white pr-0">*</div>
               <div className="col">
                  <input id="userPhone" placeholder={(action == 'modify') ? modifyUserInfo.phone : "Phone"} className="form-control" type="number" onChange={onChangeHandler} />  
               </div>          
            </div>
            <div className="pt-3 text-center">
               <button onClick={() => closeModal(action)} className="btn btn-primary mr-3">{(action == 'add') ? "新增" : "儲存"}</button>
               <button onClick={() => closeModal('close')} className="btn btn-secondary">取消</button>
            </div>
         </Modal>
      </div>
   )
}

export default ModifyModal;