import fs from 'fs-extra';

export default function (request, reply) {
    fs.readJSON('uploads/data.json', 'utf8', function (err, data) {
        if (err) {
            reply({status: 'nok', results: 'no data found'});
        } else {
            const pattern = new RegExp(request.payload.query.toLowerCase());
            const results = data.filter(person => pattern.test(person.name.toLowerCase()));
            const output = results.slice(0, 19);
            reply({status: 'Done', results: output});
        }
    });
}
