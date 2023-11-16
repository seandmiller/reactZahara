import { 
    faCogs,
    faUser,
    faRobot,
    faCircleCheck,
    faCircleXmark,
    faSave,
    faMedkit,
    faNotesMedical,
    faHandHoldingMedical
    
    

   } from '@fortawesome/free-solid-svg-icons';
import {library} from "@fortawesome/fontawesome-svg-core";



const Icons = () => {
return library.add(faCogs,faCircleCheck,faHandHoldingMedical,faMedkit,faNotesMedical, faSave, faCircleXmark,faUser,faRobot); }

export default Icons;