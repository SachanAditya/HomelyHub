let map;
const { lat, lng } = window.mapCoordinates;

console.log(` Latitude : ${lat} ,Longitude : ${lng}`);

async function initMap() {

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
        zoom: 9,
        center: { lat, lng },
        mapId: "DEMO_MAP_ID",
    });

    const marker = new AdvancedMarkerElement({
        map: map,
        position: { lat, lng },
        title: "Location",
    });

}

// let map;
// let autocomplete;

// function initMap() {
//     // Create the map centered on a default location
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: { lat: -33.8688, lng: 151.2195 }, // Default to Sydney, Australia
//         zoom: 13
//     });

//     const input = document.getElementById('pac-input');

//     // Create the autocomplete object and bind it to the input field
//     autocomplete = new google.maps.places.Autocomplete(input);
//     autocomplete.bindTo('bounds', map);

//     // Set up the event listener for when the user selects a place
//     autocomplete.addListener('place_changed', () => {
//         const place = autocomplete.getPlace();
//         if (!place.geometry) {
//             console.log("No details available for the input: '" + place.name + "'");
//             return;
//         }

//         if (place.geometry.viewport) {
//             map.fitBounds(place.geometry.viewport);
//         } else {
//             map.setCenter(place.geometry.location);
//             map.setZoom(17); // Zoom to 17 if the place has no viewport
//         }

//         // Place a marker on the selected location
//         new google.maps.Marker({
//             position: place.geometry.location,
//             map: map
//         });
//     });
// }