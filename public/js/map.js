const coordsArray = coordinates.split(',').map(Number); // Convert string to array of numbers

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: coordsArray, // starting position [lng, lat]
    zoom: 9 // starting zoom
});
const marker = new mapboxgl.Marker({color : "red"})
    .setLngLat(coordsArray) // Use the parsed coordinates
    .setPopup(new mapboxgl.Popup({ offset: 25 })
    .setHTML(" <h5>Exact location will be provided after booking</h5>")) // add   popup
    .addTo(map);

