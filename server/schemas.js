import mongoose from 'mongoose'

const Schema = mongoose.Schema,
      schemas = {}

schemas.User = mongoose.model('User',
	new Schema({
		username       : String,
		password       : String,
		salt           : String,
		token          : String,
		created_date   : { type: Date, default: Date.now }
	})
)

export default schemas
