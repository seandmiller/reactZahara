import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {GlobalContext } from '../context/GlobalContext';
import { faNotesMedical } from '@fortawesome/free-solid-svg-icons';




const Client = () => {
    const [symptoms, setSymptoms] = useState(['Child Neglect', 'Violent Trauma', 'Sexual Trauma', 'Phsyical Abuse', 'Abondonment', 
           'Rejection', 'Sexual Abuse', 'Depression', 'Anxiety', 'Lonliness', "Stress", 'Fearful', 'Emotional Abuse', 'Emotionally Numb', "Overwhelm",
            'Ambitionless', 'Anger Managment', 'Sadness', 'Narcissist', 'Insecurity', 'Introvert', 'Extrovert', 'Outcast',
              'Self Hatred', 'Suicidal', 'Fatigue', 'Trust Issues', 'Laziness', 'Gluttony', 'Body Dysmorphia','Survival Mode', 'Defensive', 'Defective', 
              'Manipulation']);
    const [clientSymptoms,setClientSymptoms] = useState([]);
    
    const {clientContext, setClientContext} = useContext(GlobalContext);




    const symptomsDisplay = symptoms.map(symptom => {    if (!clientSymptoms.includes(symptom) && !clientContext.includes(symptom) ) {
        return (
      <button onClick={() =>  {
        
        setClientSymptoms([...clientSymptoms, symptom])}}>
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


const clientContextSymptomsDisplay = clientContext.map(symptom => { return (
    <li className='symptom-list' onClick={() => handleSymDelete(symptom)}>
     
      {symptom} <FontAwesomeIcon icon='circle-check'/>
  </li>)})

    return (  
    
    <div className='client-page-wrapper'>
    <div className='symptom-text-wrapper'>
    
    <div className='chatbot-client'>   <Link to='/chatbot'> Speak to Zahara <FontAwesomeIcon icon='robot'/>  </Link>  </div>
            <p >
           I want you to take a moment of self reflection. You will need to have a conversation with yourself, look through all these words and select the ones that you feel
           most align with you. Be 100% honest if the word makes you feel uncomfortable and you feel a little resistance towards it that means you are on the 
           right path.
            </p>
     </div>
        
        <div className='client-wrapper'>
        
      
           <div className='symptom-wrapper'>

       {symptomsDisplay}

           </div>

           <div className='client-symptom-wrapper'>  <p>Your Symptoms</p> <div className='client-symptoms'>    {clientContext.length > 0 ? clientContextSymptomsDisplay  :  clientSymptomsDisplay } </div> </div>
            
            <div></div>
            <div className='symptoms-to-be-added'> {clientContext.length > 0 ? clientSymptomsDisplay : null} </div>
        </div>
      <div className='save-btn-wrapper'>  <button onClick={() => { setClientContext([...clientSymptoms, ...clientContext]); setClientSymptoms([])}} >Save </button> </div>
   </div> )
}


export default Client