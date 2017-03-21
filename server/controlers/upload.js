import fs from 'fs-extra';

export default function (request, reply) {
    // This is the directory you wish to place the files.
    const uploadDir = 'uploads/';
    const filename = (request.payload.file.hapi) ? request.payload.file.hapi.filename : 'default.csv';
    fs.ensureDirSync(uploadDir);
    // Create stream where the files will go.
    const writeStream = fs.createWriteStream(uploadDir + filename);

    if (request.payload.file.pipe) {
        // Pipe the payload file into the write stream.
        request.payload.file.pipe(writeStream);

        // On stream end or error send a response.
        request.payload.file.on('end', function () {
            // lets create a json file for esay search

            fs.readFile(uploadDir + filename, 'utf8', function (err, data) {
                if (err) {
                    reply({'Status': 'notok'});
                }
                const output = data
                    .trim()
                    .split(/\n/)
                    .map(line => line.split(/,(?! )/g))
                    .reduce(function (customers, line) {
                        customers.push({
                            id: line[0],
                            name: line[1],
                            age: line[2],
                            address: line[3],
                            team: line[4],
                        });
                        return customers;
                    }, []);
                fs.writeJson(uploadDir + 'data.json', output, function (err) {
                    reply({'Status': 'Done', filename: 'data.csv'});
                });
            });
        }).on('error', function (e) {
            reply(e);
        });
    }else{
        reply({'Status': 'nok'});
    }
}
