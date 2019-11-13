const fs = require('fs');
module.exports = (req, res, next) => {
  if (req.method === 'POST') {
    let stream = JSON.parse(fs.readFileSync('db.json'));
    let path = req.url.substr(1, req.url.indexOf('/', 1) - 1);
    let id = parseInt(req.url.substr(req.url.indexOf('/', 1) + 1, 1));
    let item = stream[path].find(e => e.id === id);

    if (item && Object.hasOwnProperty.call(item, 'isActive')) {
      item.isActive = false;
      fs.writeFileSync('db.json', stream, 'UTF-8');
    } else {
      next();
    }
    res.end();
  } else {
    next();
  }
};
