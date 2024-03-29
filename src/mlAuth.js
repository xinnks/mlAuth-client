import { $fetch } from "ohmyfetch"

export default class mlAuth {

	constructor({key, secret}){
		this.endpoint = "https://api.mlauth.ml"
		let credentials;
		if(window){
			credentials = btoa(`${key}:${secret}`)
		} else {
			let buffer = Buffer.from(`${key}:${secret}`, "utf8")
			credentials = buffer.toString("base64");
		}
		this.client = $fetch.create({
			baseURL: this.endpoint,
			method: 'POST',
			headers: {
		    Accept: 'application/json',
  			"Authorization": `Basic ${credentials}`
		  }
		})
	}

	/**
	 * makes a login request for app client
	 */
	async login(email){
		if(!email) throw new Error("Email is missing")
		try {
			return this.client(`/ml/login`, {
				body: { email }
			})
		} catch (error) {
			throw new Error(error)
		}
	}

	/**
	 * Verifies a login request token from the magic link
	 */
	async verify(token){
		if(!token) throw new Error("Token is missing")
		try {
			return this.client(`/ml/verify`, {
				body: { token }
			})
		} catch (error) {
			throw new Error(error)
		}
	}

	// mlAuth Client exclusive

	/**
	 * Registers a new app to the service
	 */
	async registerUser(data){
		if(!data) throw new Error("user data is missing")
		try {
			return this.client(`/auth/register`, {
				body: data
			})
		} catch (error) {
			throw new Error(error)
		}
	}

	/**
	 * Verifies a user's account after registration
	 */
	async verifyAccount(token){
		if(!token) throw new Error("token is missing")
		try {
			return this.client(`/auth/verify`, {
				body: { token }
			})
		} catch (error) {
			throw new Error(error)
		}
	}

	/**
	 * @description Updates a user's details
	 */
	async updateAccount({data, sessionToken}){
		if(!sessionToken) throw new Error("sessionToken is missing")
		if(!data) throw new Error("data is missing")
		try {
			return this.client(`/service/update-account`, {
				body: { ...data, sessionToken }
			})
		} catch (error) {
			throw new Error(error)
		}
	}

	/**
	 * @description Deletes an account
	 */
	async deleteAccount({sessionToken}){
		if(!sessionToken) throw new Error("sessionToken is missing")
		try {
			return this.client(`/service/delete-account`, {
				body: { sessionToken }
			})
		} catch (error) {
			throw new Error(error)
		}
	}

	/**
	 * @description Creates a new app
	 */
	async createApp({data, sessionToken}){
		if(!sessionToken) throw new Error("sessionToken is missing")
		if(!data) throw new Error("data is missing")
		try {
			return this.client(`/service/create-app`, {
				body: { ...data, sessionToken }
			})
		} catch (error) {
			throw new Error(error)
		}
	}

	/**
	 * @description Updates an app's details
	 */
	async updateApp({data, sessionToken}){
		if(!sessionToken) throw new Error("sessionToken is missing")
		if(!data) throw new Error("data is missing")
		try {
			return this.client(`/service/update-app`, {
				body: { ...data, sessionToken }
			})
		} catch (error) {
			throw new Error(error)
		}
	}

	/**
	 * App keys generation request
	 */
	async generateKeys({data, sessionToken}){
		if(!sessionToken) throw new Error("sessionToken is missing")
		if(!data.app_id) throw new Error("app_id is missing")
		try {
			return this.client(`/service/generate-keys`, {
				body: { ...data, sessionToken }
			})
		} catch (error) {
			throw new Error(error)
		}
	}

	/**
	 * App keys generation request
	 */
	async deleteApp({data, sessionToken}){
		if(!sessionToken) throw new Error("sessionToken is missing")
		if(!data.app_id) throw new Error("app_id is missing")
		try {
			return this.client(`/service/delete-app`, {
				body: { ...data, sessionToken }
			})
		} catch (error) {
			throw new Error(error)
		}
	}

	/**
	 * Ends an app's session from the mlAuth client
	 */
	async logout(sessionToken){
		if(!sessionToken) throw new Error("sessionToken is missing")
		try {
			return this.client.raw(`/service/logout`, {
				body: { sessionToken }
			})
		} catch (error) {
			throw new Error(error)
		}
	}
}