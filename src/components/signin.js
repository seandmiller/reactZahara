import React, {useRef, useState, useEffect, useContext} from "react";
import { Link} from 'react-router-dom';

import {GlobalContext } from '../context/GlobalContext';
import { useNavigate } from "react-router-dom";




const SignIn = () => {
    const {setAuth, setUserObj,setClientContext} =  useContext(GlobalContext)
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd]  = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();



     useEffect(() => {
         userRef.current.focus();}, [])

        
    
    useEffect(() => {
        setErrMsg('');
    },[user,pwd])
  const handelSubmit = async (e) => {
    e.preventDefault();
    setUser('');
    setPwd('');
    fetch("https://quiet-lowlands-62573-2c3c77d42eb8.herokuapp.com/api/login", {
  method: "POST",
  body: JSON.stringify({
    name: user,
    password: pwd,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }}).then((response) =>  {
   const res = response.json()
    return res
      }).then(result => { 
        setSuccess(true);
        setUserObj(result.userData);  
        setAuth(result.accessToken); 
         sessionStorage.setItem("symptoms", result.userData.symptoms);
         sessionStorage.setItem('name', result.userData.name);
         sessionStorage.setItem('auth', result.accessToken);    
         setClientContext(result.userData.symptoms);
         navigate('/client');
    }).catch((err) => {
        setErrMsg(err);
        console.log(err)
    })
   

    



   
  }
   



    return (
  <>   {success ? (<section>
           
                 <h1>Log in was sucessful!!!</h1>


              </section> ) : (

        <section className="signin-wrapper">
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>
                {errMsg}</p>
                <h1>Sign In</h1>
            <form onSubmit={handelSubmit}>
            <label htmlFor="username">username:</label>
            <input
            type='text'
            id='username'
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required

            />

        <label htmlFor="password">Password:</label>
            <input
            type='password'
            id='password'
      
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            />
            <button> Sign In </button>

            </form>
         <div className="signin-links-wrapper">
            <Link to='/'>Need an account?</Link>
            <Link to='/client'> client</Link>
            </div>
        </section>
                )}  </> )
}

export default SignIn;