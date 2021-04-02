const {connect} = require('mongoose');
const MONGODB_URL = process.env.DATABASE;
console.log(MONGODB_URL);
module.exports = () => {
    const dbOptions = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }

    return connect(MONGODB_URL, dbOptions);
}
