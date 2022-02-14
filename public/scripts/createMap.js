//Listening on for click event
$(() => {
  console.log('IS THIS WORKING?')
  $('#create-map').on('click', testing)
})

//Triggers on click pulling information from the database
function testing() {
  $.get('/new_map')
    .then((data) => {
      for(map in data.maps) {
        console.log(map)
      }
      // const marker = L.marker(data.rows[5])
    })
//   const marker = L.marker(e.latlng, {
//     draggable: true,
//   })
//     .addTo(map)
//     .bindPopup(
//       `<h1>This is title</h1>
// <img style="height: 100px" src="">
// <p>This is description</p>`
//     )
//     .openPopup();
//   console.log(marker);
}
