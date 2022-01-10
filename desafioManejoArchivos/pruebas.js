const fs = require('fs')

const a = fs.readFileSync('productos.txt','utf-8').toString()
const a2 = JSON.parse(a)


console.log(a2)
