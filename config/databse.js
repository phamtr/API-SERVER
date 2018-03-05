const crypto = require('crypto').randomBytes(256).toString('hex');
module.exports=
{
   // uri: 'mongodb://localhost:27017/mean-angular-2',
    uri: 'mongodb://truong2:truong2@ds255958.mlab.com:55958/api-app',
    secret: crypto,
    db: 'api-app'
}