//fires off functions on load
$(() => {
  console.log('IS THIS WORKING?');
  $('.map-type').load(findMap2(), mapMarkers2());
});

const findMap2 = () => {
  $.get('/api/mapPoints')
    .then((data) => {
      // console.log(data.maps)
      for (const maping of data.maps) {
        map10.panTo(new L.LatLng(maping.latitude, maping.longitude));
      }
    });
};

// Triggers on load pulling information from the database
const mapMarkers2 = () => {
  $.get('/api/points')
    .then((data) => {
      for (const point of data.mapPoints) {
        //Grabbing the latitude/longitude and placing it on the map
        const marker = L.marker([point.latitude, point.longitude])
          .addTo(map10)
          //Template added to marker
          .bindPopup(`
            <p>Num: ${point.id}</p>
            <h1>${point.title}</h1>
            <image src="${point.image}">
            <p>${point.description}</p>
            <button type="button" class="remove-marker2">Delete</button>
            <button onclick="popupForum()">Edit</button>

            <div id="edit-forum2" style="display:none">
              <form action="/api/points" method="post">
                <input name="id" placeholder="Number"/>
                <input name="title" placeholder="title" />
                <input name="image" placeholder="image URL" />
                <input name="description" placeholder="description" />
                <button type="submit">Submit</button>
              </form>
            </div>
            `, {maxWidth: "auto"}
          );
          marker.on("popupopen", deletePoint);
      }
    });
};

const popupForum = () => {
  const popup  = document.getElementById("edit-forum2");
  popup.style.display = "block";
}

// Remove marker function
function deletePoint() {
const marker = this;
const removeButton = document.querySelector(".remove-marker2");
removeButton.addEventListener("click", () => {
  map.removeLayer(marker);
});
}
