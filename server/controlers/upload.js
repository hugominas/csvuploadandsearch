import fs from 'fs-extra';


export default function (request, reply) {
    // This is the directory you wish to place the files.
    const uploadDir = 'uploads/';
    fs.ensureDirSync(uploadDir);
    // Create stream where the files will go.
    const writeStream = fs.createWriteStream(uploadDir + request.payload.file.hapi.filename);

    // Pipe the payload file into the write stream.
    request.payload.file.pipe(writeStream);

    // On stream end or error send a response.
    request.payload.file.on('end', function () {

        // lets create a json file for esay search

        fs.readFile(uploadDir + request.payload.file.hapi.filename, 'utf8', function (err, data) {
            if (err) {
                reply({'Status': 'notok'});
            }
            let output = data
                .trim()
                .split(/\n/)
                .map(line => line.split(/,(?! )/g))
                .reduce(function (customers, line) {
                    customers.push({
                        id: line[0],
                        name: line[1],
                        age: line[2],
                        address: line[3],
                        colour: line[4]
                    });
                    return customers;
                }, [])
            fs.writeJson(uploadDir + 'data.json', output, function (err) {
                reply({'Status': 'Done', filename: 'data.csv'});
            })
        });

    }).on('error', function (e) {
        reply(e);
    });
}