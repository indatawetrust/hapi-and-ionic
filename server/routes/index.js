export default class Index {
	static route () {
		return {
			method : 'GET',
			path : '/',
			handler : function(request,reply){
				return reply({ hello : 'world' })
			}
		}
	}
}
