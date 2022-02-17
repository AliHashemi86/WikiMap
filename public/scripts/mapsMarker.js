//fires off functions on load
$(() => {
  // console.log('IS THIS WORKING?');
  $('.map-type').load(findMap(), mapMarkers(), mapNameList(), removePoint());
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

// Triggers on load pulling information from the database
const mapMarkers = () => {
  $.get('/api/points')
    .then((data) => {
      for (const point of data.mapPoints) {
        //Grabbing the latitude/longitude and placing it on the map
        const marker = L.marker([point.latitude, point.longitude])
          .addTo(map)
          //Template added to marker
          .bindPopup(`
            <h1 contenteditable="true">${point.title}</h1>
            <image src="${point.image}">
            <p contenteditable="true">${point.description}</p>
            <button class="edit-marker">Edit</button>
            <button type="button" class="remove-marker">Delete</button>
            `, {maxWidth: "auto"}
          );
          marker.on("popupopen", deletePoint);
      }
    });
};

// Remove marker function
function deletePoint() {
const marker = this;
const removeButton = document.querySelector(".remove-marker");
removeButton.addEventListener("click", () => {
  map.removeLayer(marker);
});
}

//Grabs a list of map names from the database
const mapNameList = () => {
  // console.log('TEST MAP NAME 1')
  $.get("/api/mapPoints").then((data) => {
    // console.log('test map', data.maps)
    let mapName = $(".mapName");
    for (let map of data.maps) {
      // console.log('test map2', map)
      let template = `<span style="padding-left: 10px">⭐ ${map.title}</span>`;
      mapName.append(template);
    }
    // console.log('TEST MAP NAME 2')
  });
};
