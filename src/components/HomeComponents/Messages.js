import React from 'react'
import {
    faAddressCard,
    faHeart,
    faMessage,
    faThumbsUp,
    faUserCircle,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { useEffect, useState } from "react";
  import home from "../../images/home.jpg";
  import GlobalStatistics from "../../components/GlobalStatistics";
  import ViewPublications from "../../components/ViewPublications";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import { Carousel } from "react-responsive-carousel";
 
const Displayer = ({data}) =>{
return(
    <>
     <Carousel
                  showArrows={true}
                    interval={5000}
                    showThumbs={false}
                    showIndicators={false}
                    autoPlay
                    infiniteLoop
                  >
                   
                    {data.map((images, index) => (
                      <img
                      px={5}
                      alt={`${images.nom}`}
                      mt={10}
                        key={index}
                        width={"full"}
                        height={"xl"}
                        src={`http://185.98.139.246:9090/ogatemanagement-api/fichier/${images.id}`}
                      />
                    ))}
                    
                  </Carousel>
    </>
)
}




function Messages({idM,
    propio,
    date,
    message,
    image,
    appart,
    doc,
    init,
    prix,
    periodicite,
    ville,
    piece,
    chambre,
    salon,
    like,
    comment,
    isliked,
    isInteressed,
    isFav,
    favoris,
    all,}) {

        const [isLiked,setIsLiked] = useState(isliked)
        const [IsInteressed,setIsInteressed] = useState(isInteressed)
        const [IsFav,setIsFav] = useState(isFav)
        const [Liked,setLiked] = useState(like)
        const [Fav,setFav] = useState(favoris)
        




  return (
    <div className="bg-white p-10 rounded-md">
    <div className="header flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          {/* <img src="" alt="" /> */}
          <FontAwesomeIcon icon={faUserCircle} className="size-20" />
          <div className="">
            <h3>{propio}</h3>
            <span>{date}</span>
          </div>
        </div>
        <button className="text-blue-400 font-bold">Intéressé</button>
      </div>
      <div className="flex flex-col">
        <span>{appart.designation},{ville}</span>
        <span>{message}</span>
      </div>
    </div>
    <div className="body py-4">
       
      <Displayer data={image}/>
    </div>
    <div className="footer flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faThumbsUp} />
          <span>{like}</span>
          <span>Personne(s)</span>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span>{comment}</span>
            <span>Commentaire(s)</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{Fav}</span>
            <span>Reaction(s)</span>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex justify-between">
        <button className="flex items-center gap-2">
          <FontAwesomeIcon icon={faThumbsUp} />
          <span>J'aime</span>
        </button>
        <button className="flex items-center gap-2">
          <FontAwesomeIcon icon={faMessage} />
          <span>Commenter</span>
        </button>
        <button className="flex items-center gap-2">
          <FontAwesomeIcon icon={faAddressCard} />
          <span>Republier</span>
        </button>
        <button className="flex items-center gap-2">
          <FontAwesomeIcon icon={faHeart} />
          <span>Favoris</span>
        </button>
      </div>
    </div>
  </div>
  )
}

export default Messages