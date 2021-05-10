const app = require("./index.js");
const request = require("supertest");
const server = request.agent(app);
const database = require("./database.js").Database;


function loginUser() {
  return function (done) {
    server
      .post("/login")
      .send({ email: "123@gmail.com", password: "123" }) // Cindy user, expect to be 302 as the credentials are correct
      .expect(302)
      .expect("Location", "/reminders")
      .then(() => done());
  };
}

describe("Mock event creation", function () {
  it("test ability to log a user in", loginUser());
  it("mock event creation", function (done) {
    server
      .post("/reminder/")
      .send({
        title: "feed the dog",
        description: "feed her before tomorrow",
        completed: false,
        image_url: "/Reminder.svg",
        subtasks: [],
        date: "05/20/2021",
        tags: "Delicious food",
      })
      .then((res) => database)
      .then((db) => {
        //console.log(db[0].reminders);
        expect(db[0].reminders.length).toEqual(3);
      })
      .then(() => done());
  });
});
