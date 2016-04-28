/*
 * imports
 */
import Hapi     from 'hapi'
import schemas  from './schemas'
import index    from './routes/index'
import user     from './routes/user'
import UserModel     from './models/user'
import mongoose from 'mongoose'
import jwt      from 'hapi-auth-jwt2'

/*
 * db
 */
mongoose.connect('mongodb://localhost/words',(err) => {
	if(err) throw err
})

const server = new Hapi.Server();

server.connection({ 
    host   : 'localhost', 
    port   : 8000,
    routes : {
    	cors : true
    }
});

server.register(jwt,(err) => {

	if(err) throw err
	
	server.auth.strategy('jwt','jwt',{
		key           : 'SECRETKEY',
		validateFunc  : UserModel.tokenVerify,
		verifyOptions : { }
	})

	// index
	server.route(index.route());

	// user
	for(let route in user.route())
		server.route(user.route()[route])

})
// server start
server.start((err) => {

    if (err) {
        throw err;
    }
    
    console.log('Server running at:', server.info.uri);
});
