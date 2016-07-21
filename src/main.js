const querystring	= require('querystring');
const request		= require('request');

class SoundCloud {
	constructor() {
		this.hostApi		= 'api.soundcloud.com';
		this.hostConnect	= 'soundcloud.com/connect';
		this.initialized	= false;
		this.client			= {
			id:		null,
			secret: null
		};
	}

	init(params = {}) {
		if (!params.hasOwnProperty('id')) {
			throw new Error('soundcloud-node: client id not found');
		}
		this.client.id		= params.id;
		if (params.hasOwnProperty('secret')) {
			this.client.secret = params.secret;
		}
		this.initialized	= true;
	}

	_getUrl(path, params) {
		let url = `https://${this.hostApi}${path}?client_id=${this.client.id}`;
		if (params) {
			params = querystring.stringify(params);
			url = `${url}&${params}`;
		}
		return url;
	}

	_execMethod(method, path, params) {
		return new Promise((resolve, reject) => {
			if (!this.initialized) {
				reject('SoundCloud must first be initialized with a client ID and a client secret.');
			}
			request({
				method:	method,
				url:	this._getUrl(path, params),
				json:	true
			}, (error, response, body) => {
				if (error) {
					reject(error);
				} else if (response.statusCode === 200) {
					resolve(body);
				} else {
					reject({
						code:		response.statusCode,
						message:	response.statusMessage
					});
				}
			});
		});
	}

	get(path, params) {
		return this._execMethod('GET', path, params);
	}

	put(path, params) {
		return this._execMethod('PUT', path, params);
	}

	post(path, params) {
		return this._execMethod('POST', path, params);
	}

	delete(path, params) {
		return this._execMethod('DELETE', path, params);
	}
}

module.exports = new SoundCloud();
