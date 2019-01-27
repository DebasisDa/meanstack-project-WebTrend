const bcrypt = require('bcryptjs');

async function run(){
const salt = await bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("B4c0/\/", salt);
console.log(salt);
console.log(hash);
}

run();