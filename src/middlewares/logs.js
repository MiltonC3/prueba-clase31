const fs = require('fs');
const path = require('path');

module.exports = function (req, res, next) {
    const currenDate = new Date();
    const hs = currenDate.getHours();
    const m = currenDate.getMinutes();
    const s = currenDate.getSeconds();
    let message = `El usuario ingreso en: ${req.url} a las ${hs}h:${m}m:${s}s
`;
    let pathLogs = path.join(__dirname, '..', 'data', 'logs.txt');
    fs.appendFileSync(pathLogs, message);
    next();
};
