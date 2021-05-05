var request = require('supertest');
var app = require('./index.js');

describe('GET /', function(){
    it('respond with landing page', function(done){
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