import {expect} from 'chai';
import {Server} from 'hapi';
import h2o2 from 'h2o2';
import inert from 'inert';
import serveRoutes from '../../server/routes';
import FormData from 'form-data';
import streamToPromise from 'stream-to-promise';

describe('server/Configuration', () => {
    let server;
    beforeEach(function (done) {
        server = new Server();
        server.connection({host: 'localhost', port: 8000});
        server.register(
            [h2o2, inert],
            (err) => {
                if (err) {
                    throw err;
                }
                server.start(() => {
                    done()
                });
            });
        server.route(serveRoutes);
    })
    it('server should reply', (done) => {
        var options = {
            method: "GET",
            url: "/"
        };
        server.inject(options, function (response) {
            expect(response.statusCode).to.not.equal(500);
            expect(response.statusCode).to.not.equal(404);
            done()
        })
    })
    it('should upload to route', (done) => {

        const form = new FormData();
        form.append('file', new Buffer('lets imagine this is a CSV'));
        form.append('filename', 'and that this is a fiename');

        streamToPromise(form).then(function (payload) {
            server.inject({
                method: "POST",
                url: "/import",
                headers: form.getHeaders(),
                payload: payload
            }, function (response) {
                expect(response.statusCode).to.equal(200);
                done()
            })
        })
    }).timeout(2000);

    it('should be able to post to search', (done) => {

        const form = new FormData();
        form.append('query', 'searchText');
        streamToPromise(form).then(function (payload) {
            server.inject({
                method: "POST",
                url: "/search",
                headers: form.getHeaders(),
                payload: payload
            }, function (response) {
                expect(response.statusCode).to.equal(200);
                done()
            })
        })
    });
});