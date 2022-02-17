//Listening on for click event
$(() => {
  // console.log('IS THIS WORKING?');
  $('.map-type').load(findMap(), mapMarkers(), mapNameList());
});

//Listen for right click
// $(() => {
//   // console.log('right clicked');
//   $('.map-type').on('contextmenu', removePoint());
// });

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
      // console.log(data.maps);
      for (const point of data.mapPoints) {
        // console.log(data.mapPoints);
        // console.log(point);
        //Grabbing the latitude/longitude and placing it on the map
        const marker = L.marker([point.latitude, point.longitude])
          .addTo(map)
          //Template added to marker
          .bindPopup(`
            <h1>${point.title}</h1>
            <image src="${point.image}">
            <p>${point.description}</p>
            `, {maxWidth: "auto"}

          );
      }
    });
};

const mapNameList = () => {
  console.log('TEST MAP NAME 1')
  $.get("/api/mapPoints").then((data) => {
    console.log('test map', data.maps)
    let mapName = $(".mapName");
    for (let map of data.maps) {
      // console.log('test map2', map)
      let template = `<span style="padding-left: 10px">⭐ ${map.title}</span>`;
      mapName.append(template);
    }
    console.log('TEST MAP NAME 2')

  });
};


const removePoint = () => {
  console.log('Right click')
 ///Testing removing points on right click
 $.get('/api/points').then((data) => {
     // console.log(data.maps);
     // for (const point of data.mapPoints) {
     //   // console.log(data.mapPoints);
     //   // console.log(point);
     //   const marker = L.marker([point.latitude, point.longitude])
     //     .removeLayer(marker)
     //     //Template added to marker
     // }
   });
  };
