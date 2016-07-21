const expect	= require('chai').expect;
const SC		= require('../src/main.js');

describe('soundcloud', () => {
	describe('init method must trhow errors', () => {
		it('throws an error if the client id isn\' sent', (done) => {
			expect(() => { SC.init(); }).to.throw(Error);
			done();
		});
	});

	describe('init method not called', () => {
		it('SC.get reject an error message if the init method hasn\'t been called', (done) => {
			SC.get('/tracks/13158665').then(() => {
				done(new Error('The init method has already been called'));
			}).catch((error) => {
				expect(error).to.be.equals('SoundCloud must first be initialized with a client ID and a client secret.');
				done();
			});
		});
	});

	describe('get track informations', () => {
		before(() => {
			if (process.env.SC_CLIENT_ID === undefined || process.env.SC_CLIENT_SECRET) {
				throw new Error('You have to define env variables SC_CLIENT_ID and SC_CLIENT_SECRET');
			}
			SC.init({
				id:		process.env.SC_CLIENT_ID,
				secret:	process.env.SC_CLIENT_SECRET
			});
		});

		it('return the information of a track', (done) => {
			SC.get('/tracks/245743948').then((result) => {
				expect(result, 'Track information must have an id').to.contain.all.keys('id');
				done();
			}).catch((error) => {
				done(new Error(`${error.code} - ${error.message}`));
			});
		});
		it('return an error because the track doesn\'t exist', (done) => {
			SC.get('/tracks/42').then((result) => {
				done(new Error('Must be an error 404'));
			}).catch((error) => {
				expect(error).to.contain.all.keys('code', 'message');
				done();
			});
		});
	});
});
