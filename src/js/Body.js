import React,{ PropTypes ,useState, useEffect } from 'react';
import ReactDOM from "react-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserInfoItem from './UserInfoItem.js';
import ModifyModal from './ModifyModal.js';

function Body(){
   const [userData, setUserData] = useState(
      [
         // {
         //    name: 'user1',
         //    email: 'aaa@mail.com',
         //    phone: '0912345678'
         // }
      ]
   );
   const [accountList, setAccountList] = useState([]);
   const [modifyModal, setmodifyModal] = useState(false);
   const [action, setAction] = useState('');
   const [modifyUserInfo, setModifyUserInfo] = useState({name: '', email: '', phone: '', index: ''});

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

   useEffect(() => {
      
   }, []);

   function checkAccount(userName){
      return accountList.includes(userName);
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

   function delUser(index){
      if(confirm('請問是否確認要刪除' + userData[index].name + ' ?')){
         let arrBefore = userData.slice(0, index),
             arrAfter = userData.slice(index+1),
             res = [];
         res = arrBefore.concat(arrAfter);
         setUserData(res);
      }
   }

   function closeModal(action, index) {
      if(action != 'close'){
         let userName = document.getElementById('userName'),
             userPhone = document.getElementById('userPhone'),
             userEmail = document.getElementById('userEmail'),
             userPhoneVal;
         // if(!userName.value.length){
         //    console.log(userName.value);
         //    toast.error('請填入姓名！', {
         //       position: "top-right",
         //       autoClose: 3000,
         //       hideProgressBar: true,
         //       closeOnClick: true,
         //       pauseOnHover: true,
         //       draggable: true
         //    });
         //    userName.focus();
         //    return false;
         // }

         // if(checkAccount(userName.value)){

         // }

         // if(!userEmail.value.length){
         //    console.log(userEmail.value);
         //    toast.error('請填入信箱！', {
         //       position: "top-right",
         //       autoClose: 3000,
         //       hideProgressBar: true,
         //       closeOnClick: true,
         //       pauseOnHover: true,
         //       draggable: true
         //    });
         //    userEmail.focus();
         //    return false;
         // }

         if(!userPhone.value.length){
            userPhoneVal = modifyUserInfo.phone;
         }
         else{
            userPhoneVal = userPhone.value;
         }
         let tmp = userData.slice(0), 
            newData = {
               name: userName.value,
               phone: userPhoneVal,
               email: userEmail.value
             };

         if(action == 'add'){
            let resAccount;
            tmp.push(newData);
            resAccount = accountList.slice(0);
            resAccount.push(userName.value);

            setUserData(tmp);
            setAccountList(resAccount);
            toast.success('使用者 '+newData.name+' 已新增', {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true
            });
         }

         if(action == 'modify'){
            let arrBefore = tmp.slice(0, modifyUserInfo.index),
                arrAfter = tmp.slice(modifyUserInfo.index+1),
                res = [];
            arrBefore.push(newData);
            res = arrBefore.concat(arrAfter);
            setUserData(res);
            toast.success(newData.name + ' 的資料已修改', {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true
            });
         }
      }


      if(modifyModal){
         setmodifyModal(false);
      }
   }

   return(
      <div className="content_wrapper px-sm-3">
         <div className="bg-white p-sm-4 text-center">
            <div className="row no-gutters bg-light py-3 mx-0">
               <div className="col-1">NO</div>
               <div className="col-2">姓名</div>
               <div className="col-3">TEL</div>
               <div className="col-4">信箱</div>
               <div className="col-2">動作</div>
            </div>
            {userData.map((user, i) => 
            <UserInfoItem data = {user} index={i} key={'user' + i} modifyUser={modifyUser} delUser={delUser} />)}
            {(modifyModal)
               ? <ModifyModal action={action} modifyModal={modifyModal} closeModal={closeModal} modifyUserInfo={modifyUserInfo} checkAccount={checkAccount}/>
               : null
            }
            <div className="text-right p-3 pb-sm-0 px-sm-0">
               <button className="btn btn-info" onClick={addUserAction}>
                  <i className="fas fa-plus"></i>
                  <span className="pl-2">ADD</span>
               </button>
            </div>
         </div>
         <ToastContainer />
      </div>
   )
}

export default Body;
ReactDOM.render(<Body/>, document.getElementById('root'));