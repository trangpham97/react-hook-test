import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import axios from 'axios';

const styles = {
  width: "70vw",
  height: "calc(80vh - 300px)",
  margin: '0 auto',
  position: 'relative',
  top: '100px'
};


const MapboxGLMap = () => {
  const [map, setMap] = useState(null);
  const [centerMarker, setCenterMarker] = useState({lng: 106.681405, lat: 10.764943});
  const mapContainer = useRef(null);

  const [place, setPlace] = useState([]);
  const [load, setLoad] = useState(false);
  const [setError] = useState('');

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoiYnJpYW5iYW5jcm9mdCIsImEiOiJsVGVnMXFzIn0.7ldhVh3Ppsgv4lCYs65UdA";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [centerMarker.lng, centerMarker.lat],
        zoom: 15
      });

      map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: "Enter search e.g. Vietnam",
        zoom: 10,

      }));

      map.on('click', function (e) {
        console.log(centerMarker.lng + ' ' + centerMarker.lat);
        setCenterMarker({lng: e.lngLat.lng, lat: e.lngLat.lng});
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat.lng},${e.lngLat.lat}.json?types=poi&access_token=pk.eyJ1IjoiYnJpYW5iYW5jcm9mdCIsImEiOiJsVGVnMXFzIn0.7ldhVh3Ppsgv4lCYs65UdA`;
        axios.get(url)
          .then(res => {
            setPlace(res.data);
            setLoad(true);
          })
          .catch(err => {
            setError(err.message);
            setLoad(true)
          })

        // new mapboxgl.Marker()
        // .setLngLat([e.lngLat.lng, e.lngLat.lat])
        // .addTo(map); 
      });



      map.on("load", () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map, place]);

  if (load && place.features[0] !== undefined) {
    document.querySelector('.mapboxgl-ctrl-geocoder--input').value = place.features[0].place_name;
  }

  return (
    <div className="wrap-map">
      <div ref={el => (mapContainer.current = el)} style={styles} />
    </div>
  );
};

export default MapboxGLMap;
