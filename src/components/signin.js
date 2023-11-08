import React, {useRef, useState, useEffect, useContext} from "react";
import { Link} from 'react-router-dom';
import AuthContext from "../context/GlobalContext";



const SignIn = () => {
    const {setAuth} =  useContext(AuthContext)
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd]  = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);



     useEffect(() => {
         userRef.current.focus();}, [])
    
    useEffect(() => {
        setErrMsg('');
    },[user,pwd])
  const handelSubmit = async (e) => {
    e.preventDefault();
    setUser('');
    setPwd('');

    setSuccess(true);
  }
   



    return (
  <>   {success ? (<section>
           
                 <h1>Log in was sucessful!!!</h1>


              </section> ) : (

        <section>
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
            ref={userRef}
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            />
            <button>Sign In </button>

            </form>

            <Link to='/'>Need an account?</Link>
        </section>
                )}  </> )
}

export default SignIn;