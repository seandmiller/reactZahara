import { 
    faCogs,
    faUser,
    faRobot,
    faCircleCheck,
    faCircleXmark,
    faSave,
    faMedkit,
    faNotesMedical
    
    

   } from '@fortawesome/free-solid-svg-icons';
import {library} from "@fortawesome/fontawesome-svg-core";



const Icons = () => {
return library.add(faCogs,faCircleCheck,faMedkit,faNotesMedical, faSave, faCircleXmark,faUser,faRobot); }

export default Icons;