import fs from 'fs-extra';

export default function (request, reply) {

    let output = fs.readFileSync('filename', 'utf8')
        .trim()
        .split('\n')
        .map(line => line.split('\t'))
        .reduce(function (customers, line) {
            customers[line[0]] = customers[line[0]] || [];
            customers[line[0]].push({
                name: line[1],
                price: line[2],
                quantity: line[3]
            });
            return customers;
        }, {});
    console.log("orders2 output:", JSON.stringify(output, null, 2));
}