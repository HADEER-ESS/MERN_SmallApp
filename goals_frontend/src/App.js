import './App.css';
import MainScreen from './screens/MainScreen/MainScreen';
import RegisterScreen from "./screens/RegisterScreen/RegistScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import { BrowserRouter , Route , Routes} from "react-router-dom"
import NavComponent from './components/navBar/NavComponent';

function App() {
  return (
    <BrowserRouter>
    <NavComponent/>
      <Routes>
        <Route path='/' element={<MainScreen/>}/>
        <Route path='/regist' element={<RegisterScreen/>}/>
        <Route path='/login' element={<LoginScreen/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
