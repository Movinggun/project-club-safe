import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(-1.158019);
  const [lat, setLat] = useState(52.95577);
  const [zoom, setZoom] = useState(12);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.on('load', () => { 

        const images =[
            {imageUrl: 'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png', id: 'club-marker'},
        ]

        images.forEach(img => {
            map.loadImage(img.imageUrl, function(error, res) {
              map.addImage(img.id, res)
            })
        })

        map.addSource("points",
        {
        "type":"geojson",
        "data":{
            "type":"FeatureCollection",
            "features":[
                {
                    "type":"Feature",
                    "geometry":{
                    "type":"Point",
                    "coordinates":[
                    -1.1540260592036873,52.95607014482465
                    ]
                    },
                    "properties":{
                    "title":"Rock City"
                    }
                },
                {
                    "type":"Feature",
                    "geometry":{
                    "type":"Point",
                    "coordinates":[
                    -1.1535345472925655,52.95607723851137
                    ]
                    },
                    "properties":{
                    "title":"Stealth / Rescue Rooms"
                    }
                },
                {
                    "type":"Feature",
                    "geometry":{
                    "type":"Point",
                    "coordinates":[
                    -1.1523883280795246,52.95287102774833
                    ]
                    },
                    "properties":{
                    "title":"Icon Bar"
                    }
                },
                {
                    "type":"Feature",
                    "geometry":{
                    "type":"Point",
                    "coordinates":[
                    -1.1513642285779326,52.952410278442386
                    ]
                    },
                    "properties":{
                    "title":"Bierkeller"
                    }
                },
                {
                    "type":"Feature",
                    "geometry":{
                    "type":"Point",
                    "coordinates":[
                    -1.1439683417766844,52.95557206428191
                    ]
                    },
                    "properties":{
                    "title":"Pryzm"
                    }
                },
                {
                    "type":"Feature",
                    "geometry":{
                    "type":"Point",
                    "coordinates":[
                    -1.1464017495154053,52.95406723483515
                    ]
                    },
                    "properties":{
                    "title":"Mojo"
                    }
                },
                {
                    "type":"Feature",
                    "geometry":{
                    "type":"Point",
                    "coordinates":[
                    -1.149434423508211,52.94921068094817
                    ]
                    },
                    "properties":{
                    "title":"Ocean",
                    "color": "#ff0000"
                    },
                }
            ]
        }
    });

    map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'points',
            "minzoom": 12,
            'layout': {
                'icon-image': 'club-marker',
                "icon-size": 0.8,
                'text-field': ['get', 'title'],
                'text-font': ['Open Sans Semibold','Arial Unicode MS Bold'],
                'text-offset': [0, 1.25],'text-anchor': 'top'
            },
            'paint': {
                'text-color': ['get', 'color']
            }
        })
    });

    map.on('mouseenter', 'points', () => {
        map.getCanvas().style.cursor = 'pointer'
    })

    map.on('mouseleave', 'points', () => {
        map.getCanvas().style.cursor = ''
    })

    map.on('click', 'points', function(e) {
        var title = e.features[0].properties.title;
        console.log("clicked " + title)
      });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;