const fs = require('fs');
fs.writeFileSync(
  './.env',
  `API_URL=${process.env.API_URL}\nSECRET_KEY=${process.env.SECRET_KEY}\nGOOGLE_ID=${process.GOOGLE_ID}`
);

// eslint-disable-next-line no-console
console.log('File .env was created!');
