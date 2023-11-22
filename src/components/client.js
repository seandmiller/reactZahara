import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {GlobalContext } from '../context/GlobalContext';
import { faNotesMedical,faHandHoldingMedical } from '@fortawesome/free-solid-svg-icons';




const Client = () => {
    const [symptoms, setSymptoms] = useState(['Child Neglect', 'Violent Trauma', 'Sexual Trauma', 'Phsyical Abuse', 'Abondonment', 
           'Rejection', 'Sexual Abuse', 'Depression', 'Anxiety', 'Lonliness', "Stress", 'Fearful', 'Emotional Abuse', 'Emotionally Numb', "Overwhelm",
            'Ambitionless', 'Anger Managment', 'Sadness', 'Narcissist', 'Insecurity', 'Introvert', 'Extrovert', 'Outcast',
              'Self Hatred', 'Suicidal', 'Fatigue', 'Trust Issues', 'Laziness', 'Gluttony', 'Body Dysmorphia','Survival Mode', 'Defensive', 'Defective', 
              'Manipulation']);
    const [clientSymptoms,setClientSymptoms] = useState([]);
    
    const {clientContext, setClientContext} = useContext(GlobalContext);
  
    const sessionSymptoms = sessionStorage.getItem('symptoms');
    const userName = sessionStorage.getItem('name');
    useEffect(() => {
        if (!sessionSymptoms) { return; }
        
        setClientContext(sessionSymptoms).split(',');
    }, []);


    const symptomsDisplay = symptoms.map(symptom => {    if (!clientSymptoms.includes(symptom) && !clientContext.includes(symptom) ) {
        return (
      <button onClick={() =>  { {clientSymptoms.length + clientContext.length >= 10 ? console.log('') :
        
        setClientSymptoms([...clientSymptoms, symptom])} }}>
       
       
        {symptom}
   
   
   
    </button>)  }  else { return ( <div className='empty-select'>  <FontAwesomeIcon icon={faNotesMedical} color='green'/></div>   ) }   }  )
    
const clientSymptomsDisplay = clientSymptoms.map(symptom => { return (
        <li>
         
          {symptom} 
      </li>)})

const handleSymDelete = (curr_symp) => {
    
    setClientContext(clientContext.map(symptom => { 
        if (curr_symp !== symptom) {
        return  symptom} }).filter(Boolean))
   

}



const handleSave = () => {
    sessionStorage.setItem('symptoms', [...clientContext, ...clientSymptoms]);
    setClientContext([...clientSymptoms, ...clientContext]); 
     
     if (!userName) {
        setClientSymptoms([]);
        console.log('no user')
        return;
     }
     
    if (sessionStorage.getItem('auth')) {
       
        fetch(`https://quiet-lowlands-62573-2c3c77d42eb8.herokuapp.com/api/update/${userName}`, {
            method:"PATCH",
            body: JSON.stringify({
                symptoms:[...clientContext,...clientSymptoms]  
              }),
          headers: {"Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${sessionStorage.getItem('auth')}`}
    })
       .then(resp => resp.json())
       .then(json => console.log(json.symptoms)) 
       .catch(err => {console.log(err)}) } 
  setClientSymptoms([]);     
}

const clientContextSymptomsDisplay = clientContext.map(symptom => { return (
    <li className='symptom-list' onClick={() => handleSymDelete(symptom)}>
     
      {symptom} <FontAwesomeIcon icon='circle-check'/>
  </li>)})




    return (  
    
    <div className='client-page-wrapper'>
    <div className='symptom-text-wrapper'>
   

    
    <div className='chatbot-client'>   <Link to='/chatbot'> Speak to Zahara <FontAwesomeIcon icon={faHandHoldingMedical}/>  </Link>  </div>
            <p >
           I want you to take a moment of self reflection. You will need to have a conversation with yourself, look through all these words and select the ones that you feel
           most align with you. Be 100% honest if the word makes you feel uncomfortable and you feel a little resistance towards it that means you are on the 
           right path. Select 10
            </p>
     </div>
        
        <div className='client-wrapper'>
        
      
           <div className='symptom-wrapper'>
         {clientContext.length >= 10 ? null : 
          
          symptomsDisplay
             
             }
           </div>

           <div className='client-symptom-wrapper'>  <p>Your Symptoms</p> <div className='client-symptoms'>    {clientContext.length > 0 ? clientContextSymptomsDisplay  :  clientSymptomsDisplay } </div>
           <div className='symptoms-to-be-added'> {clientContext.length > 0 ? clientSymptomsDisplay : null} </div>
            </div>
            
            <div></div>
           
        </div>
      <div className='save-btn-wrapper'>  <button onClick={handleSave} >Save </button> </div>
   </div> )
}


export default Client