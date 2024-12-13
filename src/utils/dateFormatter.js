

const moment = require('moment-timezone');

const getLocalTime = () => {
    return moment.tz("America/Mazatlan").format('YYYY-MM-DD HH:mm:ss');
};

const getLocalDate = () => {
    return new Date(getLocalTime());
};

module.exports = {
    getLocalTime,
    getLocalDate
};