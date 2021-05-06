const app = require("./index.js");
const request = require("supertest");
const server = request.agent(app);

function loginUser() {
    return function (done) {
      server
        .post("/login")
        .send({ email: "123@gmail.com", password: "123" })    // Cindy user, expect to be 302 as the credentials are correct
        .expect(302)
        .expect("Location", "/reminders")
        .end(onResponse);
  
      function onResponse(err, res) {
        if (err) return done(err);
        return done();
      }
    };
}

describe("Tests routes that requires authentication", function () {
  it("logs a user in", loginUser());
  it("accesses a protected page that requires user to be logged in", function (done) {
    server
      .get("/reminders")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        //console.log(res.text);
        done();
      });
  });

  it("tests the response code of a route that does not exist", function (done) {
    server
      .get("/routedoesnotexist")
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        //console.log(res.text);
        done();
      });
  });

});