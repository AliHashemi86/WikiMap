//fires off functions on load
$(() => {
  $(".map-type").load(findMap(), mapMarkers(), mapNameList());
});

const findMap = () => {
  $.get("/api/mapPoints").then((data) => {
    // console.log(data.maps)
    for (const maping of data.maps) {
      map.panTo(new L.LatLng(maping.latitude, maping.longitude));
    }
  });
};

// Triggers on load pulling information from the database
const mapMarkers = () => {
  $.get("/api/points").then((data) => {
    for (const point of data.mapPoints) {
      //Grabbing the latitude/longitude and placing it on the map
      const marker = L.marker([point.latitude, point.longitude])
        .addTo(map)
        //Template added to marker
        .bindPopup(
          `
          <h1>${point.title}</h1>
          <image id="popup-img" src="${point.image}">
          <p>${point.description}</p>
            `,
          { maxWidth: "auto" }
        );
    }
  });
};

//Grabs a list of map names from the database
const mapNameList = () => {
  let count = 0;
  // console.log('TEST MAP NAME 1')
  $.get("/api/mapPoints").then((data) => {
    // console.log('test map', data.maps)
    let mapName = $(".mapName");
    for (let map of data.maps) {
      count++;
      // console.log('test map2', map)
      let template = `<span style="padding-left: 10px">${count}: ${map.title}</span>`;
      mapName.append(template);
    }
    // console.log('TEST MAP NAME 2')
  });
};

// marker.on("click", function (e) {
//   map.fitBounds(marker.getBounds());
// });
