import React from "react";
import './Login.css'
import './ContentPage.css'
import 'react-toastify/dist/ReactToastify.css'
import { Header } from '../components/Header.jsx'
import 'react-circular-progressbar/dist/styles.css';
import { exportComponentAsPNG } from "react-component-export-image";
import image from '../images/image.jpg'
import Bg from '../images/certificatebg.png'
import jwt_decode from "jwt-decode";
 

export default function CourseCompletion() {
    let certificateWrapper = React.createRef();

    const handleDownload = (e) =>  {
        e.preventDefault();
        exportComponentAsPNG(certificateWrapper, {
            html2CanvasOptions: { backgroundColor: null }
        });
    }
    const token = localStorage?.getItem('access_token');
    let decoded_token=token?jwt_decode(token):{}
    return (

        <div>
            <Header />
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 ,display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <h2>
                        Hurray !!!!
                        Course Completed
                    </h2>
                    <h2>
                    Thank you for completing course
                    </h2>
                    <button onClick={handleDownload}>Download certificate</button>
                    <img src={Bg}></img>

                </div>
                <div id="downloadWrapper" ref={certificateWrapper} style={{ flex: 3 }}>
                    <div id="certificateWrapper">
                        <p style={{
                            position: 'relative',
                            left: 185,
                            top: 130,
                        }
                        }
                        >{decoded_token?.username}</p>
                        <img style={{ width: 400, height: 300 }} src={image} alt="Certificate" />
                    </div>
                </div>
            </div>

        </div>
    )
}
