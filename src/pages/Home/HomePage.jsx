import {
  faAddressCard,
  faHeart,
  faMessage,
  faThumbsUp,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import home from "../../images/home.jpg";
import GlobalStatistics from "../../components/GlobalStatistics";
import ViewPublications from "../../components/ViewPublications";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Map from "../../components/HomeComponents/Map";
import Messages from "../../components/HomeComponents/Messages";

function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  ///Scroll infini////
  const [message, setMessage] = useState([]);
  const [isLast, setIsLast] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  const [nbPage, setNbPage] = useState(0);
  const [nbElement, setNbElement] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loaderLast, setLoaderLast] = useState(false);

  const NextPage = () => {
    if (nbPage < totalPages - 1) {
      setNbPage(nbPage + 1);
    }
    return navigate("/home-page");
  };

  //////fin de la function

  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    try {
      setUsername(localStorage.getItem("username"));
      setToken(localStorage.getItem("crsf-token"));
      let config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      //recherche des publications
      axios
        .get(
          `http://185.98.139.246:9090/ogatemanagement-api/client/rechercherpublicationparpage?page=${nbPage}&taille=${nbElement}`,
          config
        )
        .then((response) => {
          setMessage(response.data.donnee.publications);
          setIsFirst(response.data.donnee.isFirst);
          setIsLast(response.data.donnee.isLast);
          setTotalPages(response.data.donnee.totalPages);
          setTotalElements(response.data.donnee.totalElements);
        })
        .catch((error) => {});
    } catch (error) {}
  });
  return (
    <section className="home-page h-auto bg-[#ebebe8] py-10 roboto-thin">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[28%_44%_28%] gap-4">
          {/*grid-cols-1 lg:grid-cols-3*grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 */}
          <div className="">
            <GlobalStatistics />
          </div>
          <div className="grid grid-rows-[auto_auto_auto] gap-10">
            <div className="bg-white p-10">
              <div className="grid grid-cols-2 grid-rows-2 gap-4">
                <div className="">
                  <label htmlFor="">Type de poste</label>
                  <select
                    id="countries_multiple"
                    className="focus:outline-none focus:border-[#7a1317] bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-white block w-full p-2.5 dark:bg-[#ebebe8] dark:placeholder-gray-800 dark:text-gray-800 dark:focus:ring-white dark:focus:border-white"
                  >
                    <option className="" value="Particulier">
                      Information
                    </option>
                    <option className="" value="Entreprise">
                      Vente
                    </option>
                    <option className="" value="Entreprise">
                      Location
                    </option>
                    <option className="" value="Entreprise">
                      Location-Vente
                    </option>
                  </select>
                </div>
                <div className="">
                  <label htmlFor="">Type de bien</label>
                  <select
                    id="countries_multiple"
                    className="focus:outline-none focus:border-[#7a1317] bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-white block w-full p-2.5 dark:bg-[#ebebe8] dark:placeholder-gray-800 dark:text-gray-800 dark:focus:ring-white dark:focus:border-white"
                  >
                    <option className="" value="Particulier">
                      Maison
                    </option>
                    <option className="" value="Particulier">
                      Studio
                    </option>
                    <option className="" value="Entreprise">
                      Terrain
                    </option>
                  </select>
                </div>
                <div className="">
                  <label htmlFor="">Meublé ?</label>
                  <select
                    id="countries_multiple"
                    className="focus:outline-none focus:border-[#7a1317] bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-white block w-full p-2.5 dark:bg-[#ebebe8] dark:placeholder-gray-800 dark:text-gray-800 dark:focus:ring-white dark:focus:border-white"
                  >
                    <option className="" value="Particulier">
                      Oui
                    </option>
                    <option className="" value="Entreprise">
                      Non
                    </option>
                  </select>
                </div>
                <div className="">
                  <label
                    for="medium-range"
                    className="block text-sm text-gray-900"
                  >
                    Prix
                  </label>
                  <input
                    id="medium-range"
                    type="range"
                    value="50"
                    class="w-full h-2 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-[#E53E3E]"
                  />
                  <div className="flex justify-between mt-4">
                    <button className="bg-[#E53E3E] py-2 px-6 text-white rounded-md">
                      Réinitialiser
                    </button>
                    <button className="bg-blue-600 py-2 px-6 text-white rounded-md">
                      Appliquer
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-10 rounded-md flex flex-col">
              {/* <button className="text-center text-xl font-bold text-white py-2 px-6 bg-[#7a1317] mb-4">
                View all on map
              </button>
              <div className="bg-[#ebebe8]">
             Place de la map
              </div> */}
              <Map />
            </div>
            {message.map((data, index) => (
              <Messages
                like={data.nombrelike}
                isliked={data.isLiked}
                isInteressed={data.isInteresse}
                isFav={data.isFavoris}
                comment={data.nombrecommentaire}
                favoris={data.nombrefavoris}
                idM={data.id}
                propio={data.Client}
                date={data.datePublication}
                image={data.fichiers}
                message={data.description}
                appart={data.typeBien}
                doc={data.typeDocuments}
                init={data.apportInitial}
                prix={data.prix}
                periodicite={data.periodicite}
                ville={data.localisation}
                piece={data.nombrePieces}
                chambre={data.nombreChambres}
                salon={data.nombreSalon}
                all={data}
              />
            ))}
          </div>
          <div className="">
            <ViewPublications />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
