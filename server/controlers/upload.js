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
        reply({ 'Status': 'Done', filename:request.payload.file.hapi.filename});
    }).on('error', function (e) {
        reply(e);
    });
}