import moment from 'moment-timezone';

export const getLocalTime = () => {
    return moment.tz("America/Mazatlan").format('YYYY-MM-DD HH:mm:ss');
};

export const getLocalDate = () => {
    return new Date(getLocalTime());
};
