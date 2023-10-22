import {Header} from '../components/Header.jsx'
import './Home.css'
import  SignUp from '../images/HomeImage.png'



export  default function Home(){
    return(
        <div>
        <Header/>
        <img style={{width:'100vw',height:'80vh'}} src={SignUp}/>
        </div>
    )

}