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
    const reminderLen = database[0].reminders.length
    server
      .post("/reminder/")
      .send({
        title: "test feed the dog",
        description: "feed her before tomorrow",
        completed: false,
        image_url: "/Reminder.svg",
        subtasks: "",
        date: "05/20/2021",
        tags: "Delicious food",
      })
      .then((res) => database)
      .then((db) => {
        expect(db[0].reminders[reminderLen].title).toEqual("test feed the dog")
        expect(db[0].reminders[reminderLen].description).toEqual("feed her before tomorrow")
        expect(db[0].reminders[reminderLen].completed).toEqual(false)
        expect(db[0].reminders[reminderLen].subtasks).toEqual([""])
        expect(db[0].reminders[reminderLen].date).toEqual("05/20/2021")
        expect(db[0].reminders[reminderLen].tags).toEqual("Delicious food")
        expect(db[0].reminders.length).toEqual(reminderLen + 1);
      })
      .then(() => done());
  });
});


describe("Mock event creation 2", function () {
  it("mock event creation 2", function (done) {
    const reminderLen = database[0].reminders.length
    server
      .post("/reminder/")
      .send({
        title: "test feed the cat",
        description: "feed her before sunset",
        completed: false,
        image_url: "/Reminder.svg",
        subtasks: "it, needs, happen, quite, soon",
        date: "05/21/2021",
        tags: "Delicious, food, at, my, fingertips",
      })
      .then((res) => database)
      .then((db) => {
        expect(db[0].reminders[reminderLen].title).toEqual("test feed the cat")
        expect(db[0].reminders[reminderLen].description).toEqual("feed her before sunset")
        expect(db[0].reminders[reminderLen].completed).toEqual(false)
        expect(db[0].reminders[reminderLen].subtasks).toEqual(["it", " needs", " happen", " quite", " soon"])
        expect(db[0].reminders[reminderLen].date).toEqual("05/21/2021")
        expect(db[0].reminders[reminderLen].tags).toEqual("Delicious, food, at, my, fingertips")
        expect(db[0].reminders.length).toEqual(reminderLen + 1);
      })
      .then(() => done());
  });
});


describe("Mock event creation 3", function () {
  it("mock event creation 3 (empty attributes)", function (done) {
    const reminderLen = database[0].reminders.length
    server
      .post("/reminder/")
      .send({
        title: "test empty event",
        description: "",
        completed: false,
        image_url: "/Reminder.svg",
        subtasks: "",
        date: "",
        tags: "",
      })
      .then((res) => database)
      .then((db) => {
        expect(db[0].reminders[reminderLen].title).toEqual("test empty event")
        expect(db[0].reminders[reminderLen].description).toEqual("")
        expect(db[0].reminders[reminderLen].completed).toEqual(false)
        expect(db[0].reminders[reminderLen].subtasks).toEqual([""])
        expect(db[0].reminders[reminderLen].date).toEqual("")
        expect(db[0].reminders[reminderLen].tags).toEqual("")
        expect(db[0].reminders.length).toEqual(reminderLen + 1);
      })
      .then(() => done());
  });
});


describe("Mock event creation 4", function () {
  it("mock event creation 4 (very long title)", function (done) {
    const reminderLen = database[0].reminders.length
    server
      .post("/reminder/")
      .send({
        title: "test this title is so long, will it work or break our code? Or will it be shortened?",
        description: "",
        completed: false,
        image_url: "/Reminder.svg",
        subtasks: "",
        date: "05/22/2021",
        tags: "",
      })
      .then((res) => database)
      .then((db) => {
        expect(db[0].reminders[reminderLen].title).toEqual("test this title is so long, will it work or break our code? Or will it be shortened?")
        expect(db[0].reminders[reminderLen].description).toEqual("")
        expect(db[0].reminders[reminderLen].completed).toEqual(false)
        expect(db[0].reminders[reminderLen].subtasks).toEqual([""])
        expect(db[0].reminders[reminderLen].date).toEqual("05/22/2021")
        expect(db[0].reminders[reminderLen].tags).toEqual("")
        expect(db[0].reminders.length).toEqual(reminderLen + 1);
      })
      .then(() => done());
  });
});


describe("Mock event creation 5", function () {
  it("mock event creation 5 (purposefully stacking events on the same day - May 21, 2021)", function (done) {
    const reminderLen = database[0].reminders.length
    server
      .post("/reminder/")
      .send({
        title: "test feed the cattt now",
        description: "feed her before sunset",
        completed: false,
        image_url: "/Reminder.svg",
        subtasks: "it, needs, happen, quite, soon",
        date: "05/21/2021",
        tags: "Delicious, food, at, my, fingertips",
      })
      .then((res) => database)
      .then((db) => {
        expect(db[0].reminders[reminderLen].title).toEqual("test feed the cattt now")
        expect(db[0].reminders[reminderLen].description).toEqual("feed her before sunset")
        expect(db[0].reminders[reminderLen].completed).toEqual(false)
        expect(db[0].reminders[reminderLen].subtasks).toEqual(["it", " needs", " happen", " quite", " soon"])
        expect(db[0].reminders[reminderLen].date).toEqual("05/21/2021")
        expect(db[0].reminders[reminderLen].tags).toEqual("Delicious, food, at, my, fingertips")
        expect(db[0].reminders.length).toEqual(reminderLen + 1);
      })
      .then(() => done());
  });
});


describe("Mock event creation 6", function () {
  it("mock event creation 6 (purposefully stacking events on the same day - May 21, 2021)", function (done) {
    const reminderLen = database[0].reminders.length
    server
      .post("/reminder/")
      .send({
        title: "test feed the cattt now haha",
        description: "feed her before sunset",
        completed: false,
        image_url: "/Reminder.svg",
        subtasks: "it, needs, happen, quite, soon",
        date: "05/21/2021",
        tags: "Delicious, food, at, my, fingertips",
      })
      .then((res) => database)
      .then((db) => {
        expect(db[0].reminders[reminderLen].title).toEqual("test feed the cattt now haha")
        expect(db[0].reminders[reminderLen].description).toEqual("feed her before sunset")
        expect(db[0].reminders[reminderLen].completed).toEqual(false)
        expect(db[0].reminders[reminderLen].subtasks).toEqual(["it", " needs", " happen", " quite", " soon"])
        expect(db[0].reminders[reminderLen].date).toEqual("05/21/2021")
        expect(db[0].reminders[reminderLen].tags).toEqual("Delicious, food, at, my, fingertips")
        expect(db[0].reminders.length).toEqual(reminderLen + 1);
      })
      .then(() => done());
  });
});