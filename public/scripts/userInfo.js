//Listening on for click event
$(() => {
  console.log("User Information");
  $("#info").load(userInfo(), favoriteList(), favMap());
});

//Triggers on click pulling information from the database
const userInfo = () => {
  $.get("/api/users").then((data) => {
    const container = $("#infoDump");
    for (user of data.users) {
      const template = `<label>Name: </label><h2>${user.name}</h2>
      <label>Email: </label><h2>${user.email}</h2>`;
      container.append(template);
    }
  });
};

const favoriteList = () => {
  $.get("/api/favorites").then((data) => {
    // console.log(data)
    const fav = $("#favList");
    const values = Object.values(data)
    let holdValues = values[0]
    console.log(values[0])
    for(let arr of holdValues) {
      console.log(arr.title)
      const template = `<label>Favorite Maps: </label><h2>${arr.title}</h2>
      `;
      fav.append(template);
    }
  });
};
