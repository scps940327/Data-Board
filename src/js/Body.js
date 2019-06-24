import React,{ PropTypes ,useState, useEffect } from 'react';
import ReactDOM from "react-dom";

import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';

function Body(){
   const [userData, setUserData] = useState(
      [
         {
            name: 'user1',
            email: 'aaa@mail.com',
            phone: '0912345678'
         }
      ]
   );
   const [accountList, setAccountList] = (['user1'])
   const [modifyModal, setmodifyModal] = useState(false);
   const [action, setAction] = useState('');
   const [modifyUserInfo, setModifyUserInfo] = useState({name: '', email: '', phone: ''});

   const customStyles = {
     content : {
       top                   : '50%',
       left                  : '50%',
       right                 : 'auto',
       bottom                : 'auto',
       marginRight           : '-50%',
       transform             : 'translate(-50%, -50%)'
     }
   };

   function checkAccount(e){
      if(e.target.value)
      console.log(e.target.value);
   }

   function addUserAction(){
      if(!modifyModal){
         setAction('add');
         setmodifyModal(true);
      }
   }

   function modifyUser(info){
      setAction('modify');
      setmodifyModal(true);
      setModifyUserInfo(info);
   }

   function openModal() {
      setmodifyModal(true);
   }

   function closeModal(index) {
      let userName = document.getElementById('userName'),
          userPhone = document.getElementById('userPhone'),
          userEmail = document.getElementById('userEmail');
      if(!userName.value.length){
         console.log(userName.value);
         toast.error('請填入姓名！', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
         });
         userName.focus();
         return false;
      }

      if(!userEmail.value.length){
         console.log(userEmail.value);
         toast.error('請填入信箱！', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
         });
         userEmail.focus();
         return false;
      }

      let tmp = userData.slice(0),
          newData = {
            name: userName.value,
            phone: userPhone.value,
            email: userEmail.value
          }
      if(action == 'add'){
         let res = tmp.push(newData);
             resAccount = accountList.push(userName.value);
         setUserData(res);
         setAccountList(resAccount);
      }

      if(action == 'modify'){
         let arrBefore = tmp.slice(0, index),
             arrAfter = tmp.slice(index+1),
             res = [];
         res = arrBefore.push(newData);
         res = res.concat(arrAfter);
         setUserData(res);
      }


      if(modifyModal){
         setmodifyModal(false);
      }
   }

   return(
      <div className="content_wrapper px-3">
         <div className="bg-white p-4">
            <div className="text-right pb-2">
               <button className="btn btn-primary" onClick={addUserAction}>
                  <i className="fas fa-plus"></i>
                  <span className="pl-2">ADD</span>
               </button>
            </div>
            <div className="row bg-light py-1">
               <div className="col-1">NO.</div>
               <div className="col-2">Name</div>
               <div className="col-3">Phone</div>
               <div className="col-4">Email</div>
               <div className="col-2">Action</div>
            </div>
            {userData.map((user, i) => 
            <UserInfoItem data = {user} index={i} key={'user' + i} modifyUser={modifyUser} />)}
            <ModifyModal action={action} modifyModal={modifyModal} closeModal={closeModal} modifyUserInfo={modifyUserInfo} checkAccount={checkAccount}/>
         </div>
         <ToastContainer />
      </div>
   )
}

function UserInfoItem({data, index, modifyUser}){
   return(
      <div className="row border-bottom py-1">
         <div className="col-1">{index+1}</div>
         <div className="col-2">{data.name}</div>
         <div className="col-3">{data.phone}</div>
         <div className="col-4">{data.email}</div>
         <div className="col-2">
            <button type="button" className="bg-transparent border-0">
               <i className="fas fa-trash-alt"></i>
            </button>
            <button type="button" className="bg-transparent border-0" onClick={() => modifyUser(data)}>
               <i className="fas fa-pencil-alt"></i>
            </button>
         </div>
      </div>
   )
}

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

   return(
      <div>
         <Modal 
           isOpen={modifyModal}
           contentLabel={action}
           onRequestClose={closeModal}
           style={customStyles}
         >
            <div className="text-center font-weight-bold">{(action == 'add') ? "New" : "Modify"}</div>
            <div className="py-2">
               <input id="userName" placeholder="Name" className="form-control" value={(action == 'modify') ? modifyUserInfo.name : null} readOnly={(action == 'modify') ? true : false} onChange={checkAccount} required/>            
            </div>
            <div className="py-2">
               <input id="userPhone" placeholder="Phone" className="form-control" value={(action == 'modify') ? modifyUserInfo.phone : null} />            
            </div>
            <div className="py-2">
               <input id="userEmail" placeholder="E-mail" className="form-control" value={(action == 'modify') ? modifyUserInfo.email : null} required/>            
            </div>
            <div className="pt-3 text-center">
               <button onClick={closeModal} className="btn btn-primary">{(action == 'add') ? "新增" : "儲存"}</button>
            </div>
         </Modal>
      </div>
   )
}

export default Body;
ReactDOM.render(<Body/>, document.getElementById('root'));