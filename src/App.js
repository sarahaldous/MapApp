import React, {useState, useEffect} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import * as parkData from "./data/skateboard-parks.json"

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 45,
    longitude: -75,
    width: '100vw',
    height: '100vh',
    zoom: 10

  });

  const [selectedPark, setSelectedPark] = useState(null);


  useEffect(() => {
    const listener = e => {
      if(e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    }

  }, [])



  return <div>
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
      mapStyle="mapbox://styles/sealdous/ckmb69xdc0zug17q5wz14j8dw"
      onViewportChange={viewport => {
        setViewport(viewport);
      }}
      >
        {parkData.features.map((park) => (
          <Marker key={park.properties.PARK_ID} latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}>
            <button 
              className="marker-btn" 
              onClick={(e) => {
              e.preventDefault();
              setSelectedPark(park);
            }}
            >
              <img src="/skateboarding.svg" alt="Skate Park Icon"/>SKATE</button>
          </Marker>
        ))} 
        {selectedPark && (
          <Popup 
            latitude={selectedPark.geometry.coordinates[1]} 
            longitude={selectedPark.geometry.coordinates[0]}
            onClose={() => {
              setSelectedPark(null)
            }}>
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        )}
        </ReactMapGL>
  </div>
}




// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
