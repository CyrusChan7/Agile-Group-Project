const request = require('supertest');
const app = require('./index.js');


// testing / route (landing page)
describe('GET /', function(){
    it('respond with landing page status 200', function(done){
        request(app)
            .get('/')
            .set('Accept', 'application/html')
            .expect(200)
            .end(function(err, res){
            if (err) {
                console.log(err);
                return done(err);
            }
            done();
        });
    })
});