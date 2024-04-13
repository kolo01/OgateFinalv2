import {
  faAddressCard,
  faBookBookmark,
  faBookmark,
  faComputer,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";

function GlobalStatistics() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [favoris, setFavoris] = useState(0);
  const [interet, setInteret] = useState(0);
  const [publication, setPublication] = useState(0);
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
      axios
        .get(
          "http://185.98.139.246:9090/ogatemanagement-api/client/rechercherquantitepublicationsparclient",
          config
        )
        .then((res) =>( 
            console.log(res),
          setFavoris(res.data.donnee.nombreFavoris),
            setInteret(res.data.donnee.nombreInteresse),
            setPublication(res.data.donnee.nombrePublication))
        )
        .catch((err) => {
          console.log("erreur", err);
        });
    } catch (error) {}
  });
  return (
    <section className="global-statistics">
      <div className="bg-white">
        <div className="flex flex-col gap-4">
          <div className="rounded-t-md py-6 bg-[#7a1317]"></div>
          <div className="flex flex-col items-center gap-2 -mt-10 z-10">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="size-20 text-[#7a1317] border border-gray-300 rounded-full"
            />
            <h2 className="">{username}</h2>
          </div>
          <hr />
          <div className="flex flex-col p-6 gap-4">
            <h3 className="text-2xl font-bold">Statistique globale</h3>
            <div className="flex justify-between">
              <span>
                <FontAwesomeIcon icon={faComputer} className="mr-2" />{" "}
                Publications favoris :
              </span>
              <span className="font-bold">{favoris}</span>
            </div>
            <div className="flex justify-between">
              <span>
                <FontAwesomeIcon icon={faBookmark} className="mr-2" />{" "}
                Interessés par :
              </span>
              <span className="font-bold">{interet}</span>
            </div>
            <div className="flex justify-between">
              <span>
                <FontAwesomeIcon icon={faAddressCard} className="mr-2" /> Mes
                publications:
              </span>
              <span className="font-bold">{publication}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GlobalStatistics;
