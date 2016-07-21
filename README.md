# soundcloud-node-es6
[![dependencies status](https://david-dm.org/lludol/soundcloud-node-es6/status.svg)](https://david-dm.org/lludol/soundcloud-node-es6#info=dependencies)
[![dev-dependencies status](https://david-dm.org/lludol/soundcloud-node-es6/dev-status.svg)](https://david-dm.org/lludol/soundcloud-node-es6#info=devDependencies)
[![Build Status](https://travis-ci.org/lludol/soundcloud-node-es6.svg?branch=master)](https://travis-ci.org/lludol/soundcloud-node-es6)
[![Coverage Status](https://coveralls.io/repos/github/lludol/soundcloud-node-es6/badge.svg?branch=master)](https://coveralls.io/github/lludol/soundcloud-node-es6?branch=master)
[![npm version](https://badge.fury.io/js/soundcloud-node-es6.svg)](https://badge.fury.io/js/soundcloud-node-es6)

A node.js wrapper for the Soundcloud SDK. Inspired by the library [node-soundcloud](https://github.com/jakemmarsh/node-soundcloud).

## WARNING

This module is still in development.
Only the client id is used, the secret id is ignored (so, you can get only public information).

I have to implement the Redirect URI and the OAuth Token.

## Getting started

```bash
npm install soundcloud-node-es6
```

```js
const SC = require('soundcloud-node-es6');

// Initialize the client
SC.init({
	id: 'YOUR_CLIENT_ID',
	secret: 'YOUR_SECRET_ID'
});

// To get informations about a track
SC.get('/tracks/245743948').then((result) => {
	console.log(result);
}).catch((error) => {
	console.log(error);
});

// To search a track
SC.get('/tracks', {
	q: 'Desiigner - Panda',
}).then((result) => {
	for (const track of result) {
		console.log(track);
	}
}).catch((error) => {
	console.log(error);
});

// You can also use other method
SC.post(...);
SC.put(...);
SC.delete(...);
```


## Unit testing

```bash
# To launch the test
npm test

# To see the code coverage
npm run cover
```

To run the test you have to define two env variables:
```bash
export CLIENT_ID=YOUR_CLIENT_ID
export SECRET_ID=YOUR_SECRET_ID
```

## Contributing

Don't hesitate to [create a pull request](https://github.com/lludol/node-soundcloud-es6/pulls) to improve the project.

## Bugs

If you find a bug or want a new feature, dont'hesitate to [create an issue](https://github.com/lludol/node-soundcloud-es6/issues).

## License

[MIT](LICENSE)
