import FrontPage from "./components/frontpage";
import ChatBot from "./components/chatbot";
import { Routes,Route} from 'react-router-dom';
import Client from './components/client';
import SignIn from './components/signin';
import Icons from "./components/helper";

function App() {
  
  Icons();

  return (
    <div className="App">
     

<Routes>


<Route exact path='/' element={<FrontPage/>}  />
<Route  exact path='/chatbot' element={<ChatBot/>}/>
<Route exact path='/client' element={<Client/>} ></Route>
<Route exact path='/signin' element={<SignIn/>} ></Route>

</Routes>



  

  
    </div>
  );
}

export default App;
