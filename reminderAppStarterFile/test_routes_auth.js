const Layer = require('./node_modules/express/lib/router/layer');
const app = require('./index.js');
const request = require('supertest');


// Mock an authenticated user in the middleware stack
// Referenced code from "https://stackoverflow.com/questions/25635080/testing-oauth-authenticated-routes" begins here 
exports.login = login;
exports.logout = logout;

function login(user){

  var fn = function insertUser(req, res, next){
    req.user = user;
    next();
  }

  var layer = new Layer('/', {
    sensitive: false,
    strict: false,
    end: false
  }, fn);
  layer.route = undefined;

  app._router.stack.unshift(layer);
}

function logout(){
  app._router.stack.shift();
}
// Referenced code found above ends here


it('test routes that require authentication, should mock authentication first', function(done){
    login(this.user);
    describe('GET /reminders', function(){
        it('test /reminders route, should get response code 302', function(done){
            request(app)
                .get('/reminders')
                .set('Accept', 'application/html')
                .expect(302)
                .end(function(err, res){
                if (err) {
                    console.log(err);
                    return done(err);
                }
                done();
            });
        })
    });
    logout();
    done();
  });