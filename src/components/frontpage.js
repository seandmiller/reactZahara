
import {useRef,useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingMedical} from '@fortawesome/free-solid-svg-icons';


const USERregex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}/;
const PWDregex  =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const Frontpage = () =>  {

     
   
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false)
    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)
    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch , setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const userRef = useRef();
    const errRef  = useRef();
   


   
  

        useEffect(() => {userRef.current.focus(); }, []);
        useEffect(() => {
            const result = PWDregex.test(pwd);
         
            setValidPwd(result);
            const match = pwd === matchPwd;
            setValidMatch(match);


        }, [pwd, matchPwd]);


        useEffect(() => {
            const result = USERregex.test(user);
            console.log(result);
            console.log(user);
            setValidName(result);
        }, [user]);

        useEffect(() => {
            setErrMsg('');

        }, [user, pwd, matchPwd])

 const  handelSubmit = async(e) =>  {
    e.preventDefault();
    const v1 = USERregex.test(user);
    const v2 = PWDregex.test(pwd);

    if (!v1 || !v2) {
        setErrMsg('Invalid Entry');
        return
    }
    fetch("https://quiet-lowlands-62573-2c3c77d42eb8.herokuapp.com/api/post", {
  method: "POST",
  body: JSON.stringify({
    name: user,
    password: pwd,
   
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
}).then((response) => console.log(response.json()))
    setSuccess(true);

 }


        return (

             <>  {success ? ( <section>
                <h1>Success!</h1>
                <p>
                <Link to='/signin'>Sign In</Link>
                </p>
             </section> ) 
                
                : ( <div className='frontpage-container'> 
                 <div className='frontpage-title'> 
                    
                    <h1>Zahara <FontAwesomeIcon icon={faHandHoldingMedical}/> </h1>
                  <div className='t1'> <p className='type1'>Hi my name is Zahara an interactive ChatBot. </p> </div>
                      <div className='t2'> <p className='type2'> Im here to help you get a better sense of yourself.</p> </div>
                    <div className='t3'>   <p className='type3'> We will do this through the lense of Psycho-Analytical Theory.</p> </div>
                 </div>
            <section className='register-wrapper'>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>
         {errMsg}
            </p>

            <p className='register-text'>Register</p>
            <form onSubmit={handelSubmit}>
              <label htmlFor='username'>
               username: 
               <span className={validName ? 'valid' : 'hide'}> <FontAwesomeIcon icon='circle-check'/></span>
            <span className={validName || !user ? 'hide' : 'invalid'}>
                 <FontAwesomeIcon icon='circle-xmark'/>
            </span>
     


              </label>
              <input
                   type='text'
                   id='username'
                   ref={userRef}
                   autoComplete='off'
                   onChange={(e) => setUser(e.target.value)}
                   aria-invalid={validName ? 'false' : 'true'}
                   aria-describedby='uidnote'
                   onFocus={() =>{setUserFocus(true)}}
                   onBlur={() => {setUserFocus(false)}}
              />
   
      <p id='uidnote' className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
        4 to 24 charaters.<br/>
        must begin with a letter A <br/>
        Letters, Numbers and underscores allowed

      </p>

      <label htmlFor='password'>
               password:
            <span className={validPwd ? 'valid' : 'hide'}>
            <FontAwesomeIcon icon='circle-check'/>
            </span>
            <span className={validPwd|| !pwd ? 'hide' : 'invalid'}>
            <FontAwesomeIcon icon='circle-xmark'/>
            </span>


              </label>
              <input
                   type='password'
                   id='password'
                   onChange={(e) => setPwd(e.target.value)}
                   aria-invalid={validPwd ? 'false' : 'true'}
                   aria-describedby='pwdnote'
                   onFocus={() =>{setPwdFocus(true)}}
                   onBlur={() => {setPwdFocus(false)}}
              />
   
      <p id='pwdnote' className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
        8 to 24 charaters.<br/>
        must include uppercase and lowercase letters, a number and a special charater <br/>
        Allowed special characters : <span aria-label='exclamation-mark'>!</span>
        <span aria-label='dollar-sign'>$</span> <span aria-label='percentage'>%</span> <span aria-label='at-symbol'>@</span> 
        <span aria-label='hashtag'>#</span>



      </p>

      <label htmlFor='matchPassword'>
              confirm password:
            <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
            <FontAwesomeIcon icon='circle-check'/>
            </span>
            <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
            <FontAwesomeIcon icon='circle-xmark'/>
            </span>


              </label>
              <input
                   type='password'
                   id='matchPassword'
                   
                   onChange={(e) => setMatchPwd(e.target.value)}
                   aria-invalid={validMatch ? 'false' : 'true'}
                   aria-describedby='confirmnote'
                   onFocus={() =>{setMatchFocus(true)}}
                   onBlur={() => {setMatchFocus(false)}}
              />
   
      <p id='confirmnote' className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
        Must match password<br/>
        



      </p>
  
      <div className='btn-wrapper'>  <button disabled={!validMatch || !validPwd || !validName ? true : false}>Sign Up</button> </div>

            </form>
          <p>
            Already have an account?

            <Link to='/signin'> Sign In</Link> 
          </p>
          <p>
            Continue as <Link to='/chatbot'>Guest</Link>
          </p>
            </section>
            </div>
               )}  </>   )
    }
export default Frontpage;