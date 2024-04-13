import React, { useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  InfoBoxF,
  InfoWindow,
  InfoWindowF,
  Marker,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import axios from "axios";



function Map() {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [zoom, setZoom] = useState(3);
  const [home, setHome] = useState("");
  const [all, setAll] = useState("none");
  const [mark, setMark] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    function success(pos) {
      var crd = pos.coords;

      //   console.log("Votre position actuelle est :");
      setLat(crd.latitude);
      setLong(crd.longitude);
      //   console.log(`La précision est de ${crd.accuracy} mètres.`);
      let config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("local")).data.accessToken
          }`,
        },
      };
      axios
        .post(
          `http://185.98.139.246:9090/ogatemanagement-api/client/rechercherpublicationsapproximatives`,
          { latitude: crd.latitude, longitude: crd.longitude },
          config
        )
        .then((res) => setMark(res.data.donnee))
        .catch((error) => {});
    }

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function error(err) {
      console.warn(`ERREUR (${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  const containerStyle = {
    width: "555px",
    height: "400px",
  };

  const placed = [
    { latitude: 5.36, longitude: -3.96 },
    { latitude: 5.34, longitude: -3.94 },
    { latitude: 5.37, longitude: -3.97 },
  ];

  const center = {
    lat: lat,
    lng: long,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAoJQLE8uAbWnyPHCv-_udEUhH7HQooJlM",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(
    function callback(map) {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const bounds = new window.google.maps.LatLngBounds(center);

      map.fitBounds(bounds);
      setAll("grid");

      setMap(map);
      // setZoom(3)
    },
    [center]
  );
  const HandleClicked = React.useCallback(function callback(props) {
    setSelected(props)
    console.log("position",props)
  }, []);


  const HandleDragEnd = React.useCallback(function callback() {
    
  }, []);


  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleZoom = React.useCallback(function callback() {
    setZoom(5);
    setAll("none");
  }, []);

  return isLoaded ? (
    <>
     
        <button
         className="text-center text-xl font-bold text-white py-2 px-6 bg-[#7a1317] mb-4"
          onClick={handleZoom}
        >
          View all on map
        </button>
   
      <div  className="bg-[#ebebe8]"  >
      <GoogleMap
      
        mapContainerStyle={containerStyle}
        mapTypeId="hybrid"
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <MarkerF position={{ lat: lat, lng: long }}  onClick={()=>setHome({ lat: lat, lng: long })}/>
        {home && <InfoWindowF
                // anchor={{ lat: selected.latitude, lng: selected.longitude }}
                position={{ lat: lat, lng: long }}
                zIndex={0}
                onCloseClick={()=>setHome("")}
              >
                <div className="flex">
                  <h1 fontWeight={600} fontSize={"15px"}>Vous</h1>
                </div>
              </InfoWindowF>}
        {mark.map((place) => (
          <>
            {/* {console.log("place", place)} */}
            <MarkerF
              draggable
              onClick={()=>{HandleClicked({ lat: place.latitude, lng: place.longitude })}}
              onDragEnd={HandleDragEnd}
              position={{ lat: place.latitude, lng: place.longitude }}
            >

           {selected &&  <InfoWindowF
                // anchor={{ lat: selected.latitude, lng: selected.longitude }}
                position={{ lat: selected.lat, lng: selected.lng }}
                zIndex={place.id}
                onCloseClick={()=>setSelected("")}
              >
                <div>
                  <h1 fontWeight={600} fontSize={"15px"}>{place.typeBien.designation}</h1>
                  <a href={`#`}> <button className="bg-[#7a1317] mt-2 text-white p-2 rounded-md" >plus d{"'"}info</button></a>
                 
                </div>
              </InfoWindowF>}  
          
            </MarkerF>
           
          </>
        ))}
      </GoogleMap>
      </div>
    </>
  ) : (
    <></>
  );
}

export default Map;
