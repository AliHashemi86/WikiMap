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

          <button onclick="editForm()">Edit</button>
          <button onclick="deleteForm()" class="remove-marker">Delete</button>

          <div id="edit-forum" style="display:none">
            <form action="/api/points" method="post">
              <input name="id" placeholder="Number"/>
              <input name="title" placeholder="title" />
              <input name="image" placeholder="image URL" />
              <input name="description" placeholder="description" />
              <button type="submit">Submit</button>
            </form>
          </div>

          <div id="delete-forum" style="display:none">
          <form action="/api/deletePoint" method="post">
            <input name="id" placeholder="Number"/>
            <button type="submit">Submit</button>
          </form>
        </div>
            `, {maxWidth: "auto"}
          );
          // marker.on("popupopen", deletePoint);
      }
    });
};

const deleteForm = () => {
  const popup  = document.getElementById("delete-forum");
  popup.style.display = "block";

}

const editForm = () => {
  const popup2  = document.getElementById("edit-forum");
  popup2.style.display = "block";

}
