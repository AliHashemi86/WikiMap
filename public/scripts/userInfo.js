//Listening on for click event
$(() => {
  console.log("User Information");
  $("#info").load(userInfo(), favoriteList());
});

//Triggers on click pulling information from the database
const userInfo = () => {
  $.get("/api/users").then((data) => {
    const container = $("#infoDump");
    for (user of data.users) {
      const template = `<h2>Name: ${user.name}</h2>
     <h2>Email: ${user.email}</h2>`;
      container.append(template);
    }
  });
};

const favoriteList = () => {
  $.get("/api/favorites").then((data) => {
    console.log(data)
    const fav = $("#favList");
    const values = Object.values(data)
    let holdValues = values[0]
    console.log(values[0])
    for(let arr of holdValues) {
      console.log(arr.title)
      const template = `<h3>${arr.title}</h3>
      `;
      fav.append(template);
    }
  });
};
