import mongoose from 'mongoose'
import jwt      from 'jsonwebtoken'
import bcrypt   from 'bcrypt'

const UserSchema = mongoose.model('User')

export default class user {
	static signup (...params) {
		const data = params[0],
	      	  call = params[1]

		new Promise( (resolve,reject) => {

			UserSchema.findOne({
				username : new RegExp(data.username,'i')
			},(err,user) => {
				resolve(user)
			})

		}).then( (user) => {

			const salt = bcrypt.genSaltSync(10)

			if(user == null)
				new UserSchema({
					username : data.username,
					password : bcrypt.hashSync(data.password, salt),
					salt     : salt,
					token    : jwt.sign({ username : data.username },'SECRETKEY')
				}).save((err,_) => {
					call({ log : 'account_create' })
				})
			else
				call({ log : 'username_available' })

		})
	}
	static signin (...params) {
		const data = params[0],
	      	  call = params[1]
	
		UserSchema.findOne({
			username : data.username
		},(err,user) => {
			if(user == null)
				call(null)
			else
				if(bcrypt.hashSync(data.password, user.salt) == user.password)
					call(user)
				else 
					call(null)
		})
	}
	static tokenVerify (decoded, request, callback) {
		UserSchema.findOne({
			token : jwt.sign(decoded,'SECRETKEY')
		},(err,user) => {
			if(user == null)
				callback(null,false)
			else
				callback(null,true)
		})
	}
}