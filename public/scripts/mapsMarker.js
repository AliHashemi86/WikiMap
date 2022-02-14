//Listening on for click event
$(() => {
  console.log('IS THIS WORKING?');
  $('.map-type').on('click', testing);
});

//Triggers on click pulling information from the database
const testing = () => {
  $.get('/api/mapPoints')
    .then((data) => {
      console.log(data.maps)
      for (const maping of data.maps) {
        //Grabbing the latitude/longitude and placing it on the map
        const marker = L.marker([maping.latitude, maping.longitude])
        .addTo(map)
        //Template added to marker
        .bindPopup(`
          <h1>${maping.title}</h1>
          <image src="${maping.image}">
          <p>${maping.description}</p>
          `
        )
    .openPopup();
    // console.log(marker);
      }
    });
};
