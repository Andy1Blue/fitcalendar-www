const fs = require('fs')
fs.writeFileSync('./.env', `API_KEY=${process.env.API_KEY}\nGOOGLE_ID=${process.env.API_KEY}`)