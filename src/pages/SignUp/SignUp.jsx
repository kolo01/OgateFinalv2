import { faMobile, faUser, faUserLock, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function SignUp() {

    const navigate = useNavigate();
    const [nom, setNom] = useState("");
    const [tel, setTel] = useState("");
    const [mdp, setMdp] = useState("");
    const [mdpC, setMdpC] = useState("");
    const [compte, setCompte] = useState("PARTICULIER");


    const Validate = () => {
    
        if (mdp == mdpC) {
            console.log( nom,
                tel,
                mdp,
                compte)
          axios
            .post("http://185.98.139.246:9090/ogatemanagement-api/signup", {
              nom: nom,
              username: tel,
              password: mdp,
              typeCompte: compte,
              localisation: "NON DEFINI",
            })
            .then((response) => {
             
              toast(`Inscription validée`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                type:"success"
               
                })
          return navigate("/");
       
            })
            .catch((error) => {
            //   console.log(error);
            
              try {
                
            if(error.response.data.donnee=="Le numéro de téléphone appartient à un autre utilisateur"){
                toast(`Numéro déjà existant`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                   
                   
                    })
              return navigate("/");
            }
            else if (error.response.data.donnee == null){
                toast(`Inscription validée`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    type:"success"
                   
                    })
              return navigate("/");
                
            }else{
               
                toast(`Une erreur à été detecté`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    type:"error"
                   
                    })
              
              
            } 
              } catch (error) {
                toast(`Erreur de connexion`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    type:"error"
                   
                    })
             
              }
            });
        } else {
         
            toast(`Verifier les mots de passe`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                type:"warning"
               
                })
         
        }
      };



    return (
        <section className="sign-up py-20 roboto-thin">
            <ToastContainer/>
            <div className="container mx-auto">
                <div className="w-3/6 mx-auto ">
                    <div className="flex flex-col p-10 rounded-md gap-10 bg-[#7a131638] shadow-[0_0_12px_rgba(0,0,0,0.1)] ">
                        <div className="text-4xl text-center text-[#7a1317] flex flex-col items-center gap-2">
                            <h1 className=''>Inscription</h1>
                            <FontAwesomeIcon icon={faUserPlus}/>
                        </div>

                        <div className="p-4">
                            <select id="countries_multiple"  onChange={(e)=>setCompte(e.target.value)} className="focus:outline-none focus:border-[#7a1317] bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-white block w-full p-2.5 dark:bg-white dark:placeholder-[#7a1317] dark:text-[#7a1317] dark:focus:ring-white dark:focus:border-white">
                                <option className='' value="PARTICULIER">Particulier</option>
                                <option className='' value="ENTREPRISE">Entreprise</option>
                            </select>
                        </div>

                        <form className='flex flex-col gap-4 p-4'>
                            <div className=" rounded-md flex gap-2 items-center p-3 bg-white">
                                <FontAwesomeIcon icon={faMobile} className='text-[#7a1317] '/>
                                <input type="text"  onChange={(e)=>setTel(e.target.value)} className='w-full focus:outline-none' placeholder='Téléphone'/>
                            </div>
                            <div className=" rounded-md flex gap-2 items-center p-3 bg-white">
                                <FontAwesomeIcon icon={faUser} className='text-[#7a1317] '/>
                                <input type="text"  onChange={(e)=>setNom(e.target.value)} className='w-full focus:outline-none focus:border-[#7a1317]' placeholder='Nom'/>
                            </div>
                            <div className=" rounded-md flex gap-2 items-center p-3 bg-white">
                                <FontAwesomeIcon icon={faUserLock} className='text-[#7a1317] '/>
                                <input type="password"  onChange={(e)=>setMdp(e.target.value)} className='w-full focus:outline-none focus:border-[#7a1317]' placeholder='Mot de passe'/>
                            </div>
                            <div className=" rounded-md flex gap-2 items-center p-3 bg-white">
                                <FontAwesomeIcon icon={faUserLock} className='text-[#7a1317] '/>
                                <input type="password"  onChange={(e)=>setMdpC(e.target.value)} className='w-full focus:outline-none focus:border-[#7a1317]' placeholder='Confirmer mot de passe'/>
                            </div>
                            <Link onClick={Validate} className='bg-[#7a1317] flex justify-center items-center text-white py-3'><FontAwesomeIcon icon={faUserPlus} className='mr-2'/>S'inscrire</Link>
                        </form>

                        <p className='text-center'>Vous êtes déjà membre ? <Link to={"/sign-in"} className='text-lg underline text-[#7a1317]'>Connectez-vous ici !</Link></p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp