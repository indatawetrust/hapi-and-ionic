import Joi  from 'joi'
import { user } from '../models/index'

const prefix = 'user'

export default class User {
	static route () {
		return {
			signin : User.signin(),
			signup : User.signup(),
			home   : User.home()
		}
	}
	
	static home () {
		return { 
			method : 'GET',
			path : `/${prefix}/home`,
			handler : function(request,reply){
				reply({ hello : "world" })
			},
			config : {
				auth : 'jwt'
			}
		}
	}
	
	static signin () {
		return { 
			method : 'POST',
			path : `/${prefix}/signin`,
			handler : function(request,reply){
				user.signin({
						username : request.payload.username,
						password : request.payload.password
					},(_) => {
						switch(_){
							case null:
								reply({ log : 'login_failed' })
							break;
							default:
								reply({ 
									log : 'login_success', 
									token : _.token,
									username : _.username
								})
						}
				})
			},
			config : User.config()
		}
	}
	static signup () {
		return { 
			method : 'POST',
			path : `/${prefix}/signup`,
			handler : function(request,reply){
				user.signup({
						username : request.payload.username,
						password : request.payload.password
					},(_) => {
					switch(_.log){
						case 'username_available':
							reply({ log : 'username_available' })
						break;
						case 'account_create':
							reply({ log : 'account_create' })
						break;
					}
				})
			},
			config : User.config()
		}
	}
	static config () {
		return {
			validate : {
				payload : {
					username : Joi.string().alphanum().min(3).max(20),
					password : Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)	
				}
			}
		}
	}
}
