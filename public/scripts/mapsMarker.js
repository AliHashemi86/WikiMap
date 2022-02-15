//Listening on for click event
$(() => {
  console.log('IS THIS WORKING?');
  $('.map-type').load(findMap(), mapMarkers());
});

const findMap = () => {
  $.get('/api/mapPoints')
    .then((data) => {
      // console.log(data.maps)
      for (const maping of data.maps) {
        map.panTo(new L.LatLng(maping.latitude, maping.longitude));
      }
    });
};

// Triggers on click pulling information from the database
const mapMarkers = () => {
  $.get('/api/points')
    .then((data) => {
      console.log(data.maps);
      for (const point of data.mapPoints) {
        console.log(data.mapPoints);
        console.log(point);
        //Grabbing the latitude/longitude and placing it on the map
        const marker = L.marker([point.latitude, point.longitude])
          .addTo(map)
          //Template added to marker
          .bindPopup(`
            <h1>${point.title}</h1>
            <image src="${point.image}">
            <p>${point.description}</p>
            `
          );
      }
    });
};
