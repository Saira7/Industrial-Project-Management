import {Button} from "flowbite-react";
import 'firebase/auth';
import React from "react";
import {AiFillGoogleCircle} from "react-icons/ai"
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import {app} from "../../firebase";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";





const OAuth = () => {

    const auth = getAuth(app);
    const [ setUser] = useState(null);  
    const navigate = useNavigate();

    const handleGoogleClick = async() => {
        //configure firbase
        const provider= new GoogleAuthProvider()
        provider.setCustomParameters({prompt:" Select Account"})
        try {
            const ResultsFromGoogle= await signInWithPopup(auth,provider);
            const res= await fetch("api/auth/google",
                {
                    method: "   POST",
                    headers: {
                       " content-Type": "application/json"
                    },
                    body: JSON.stringify({ 
                        name: ResultsFromGoogle.user.displayName,
                        email: ResultsFromGoogle.user.email,
                        password: ResultsFromGoogle.user.password,

                        googlePhotoURL: ResultsFromGoogle.user.photoURL,
                    }),
                });

                const data= await res.json();
                if (res.ok){
                    setUser(data);
                    navigate("/");

                }
            
        } catch (error) {
            console.error(error);
        }
    };
    
    return(
        <Button type= "button" gradiantDuoTone ="PinkToPurple" outline onClick = {handleGoogleClick}>
            <AiFillGoogleCircle classname ="w-6 h-6 mr-2"/>
            Sign-in With Google


        </Button>
    )



}
export default OAuth