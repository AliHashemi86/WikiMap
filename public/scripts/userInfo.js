//Listening on for click event
$(() => {
  console.log('User Information')
  $('.info').load(userInfo());
});

//Triggers on click pulling information from the database
const userInfo = () => {
  $.get("/api/users")
  .then((data) => {
    const work = $(".infoDump");
    for (user of data.users) {
      const template = `<label>Name: </label><h3>${user.name}</h3>
      <label>Email: </label><p>${user.email}</p>`;
      work.append(template);
    }
  });
};
