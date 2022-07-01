import { $fetch } from "ohmyfetch"

export default class mlAuth {

	constructor({key, secret}){
		this.endpoint = "https://ml-auth.ml"
		const customFetch = $fetch.create({
			baseURL: this.endpoint,
			method: 'POST',
			headers: {
		    Accept: 'application/json',
  			"Authorization": `Basic `+ btoa(`${key}:${secret}`)
		  }
		})
		this.client = customFetch
	}

	/**
	 * makes a login request for app client
	 */
	async login(email){
		if(!email) throw("Email is missing")
		try {
			return this.client(`/ml/login`, {
				body: { email }
			})
		} catch (error) {
			throw(error)
		}
	}

	/**
	 * Verifies a login request token from the magic link
	 */
	async verify(token){
		if(!token) throw("Token is missing")
		try {
			return this.client(`/ml/verify`, {
				body: { token }
			})
		} catch (error) {
			throw(error)
		}
	}

	// mlAuth Client exclusive

	/**
	 * Registers a new app to the service
	 */
	async createApp(data){
		if(!data) throw("user data is missing")
		try {
			return this.client(`/service/register`, {
				body: data
			})
		} catch (error) {
			throw(error)
		}
	}

	/**
	 * Verifies an app's account after registration
	 */
	async verifyApp(token){
		if(!token) throw("token is missing")
		try {
			return this.client(`/service/verify`, {
				body: { token }
			})
		} catch (error) {
			throw(error)
		}
	}

	/**
	 * App keys generation request
	 */
	async generateKeys({data, sessionToken}){
		if(!sessionToken) throw("sessionToken is missing")
		if(!data.callback_url) throw("callback_url is missing")
		try {
			return this.client.raw(`/service/generate-keys`, {
				body: { ...data, sessionToken }
			})
		} catch (error) {
			throw(error)
		}
	}

	/**
	 * Ends an app's session from the mlAuth client
	 */
	async logout(sessionToken){
		if(!sessionToken) throw("sessionToken is missing")
		try {
			return this.client.raw(`/service/logout`, {
				body: { sessionToken }
			})
		} catch (error) {
			throw(error)
		}
	}
}