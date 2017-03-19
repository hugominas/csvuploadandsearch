import fs from 'fs-extra';

export default function (request, reply) {
    fs.readJSON('uploads/data.json', 'utf8', function (err, data) {
        const pattern = new RegExp(request.payload.query);
        let results = data.filter(person => pattern.test(person.name.toLowerCase()))
        let output = results.slice(0,19);
        reply({status: 'Done', results:output});
    })
}