'use strict';

let examples = [];

exports.addCriminal = function(args, res, next) {
  try {
      let object = args.criminal.value;
      examples.forEach((i, index) => {
          if (i.id == object.id) throw ({ ERROR: "id is a primary key"});
      });
      examples.push(object);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(object));
  }
  catch (error) {
      res.send(error);
  }

};

exports.deleteCriminalById = function(args, res, next) {
    let id = args.id.value;
    examples.forEach((i, index) => {
        if (i.id == id) {
            examples.splice(examples.indexOf(i),1);
        }
    });
    res.end();
};

exports.findCriminal = function(args, res, next) {
    if (Object.keys(examples).length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(examples));
    } else {
        res.end();
    }
};

exports.findCriminalById = function(args, res, next) {
    let id = args.id.value;
    examples.forEach((i, index) => {
        if (i.id == id) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(i));
        }
        if (index+1 == examples.length)
            res.send({MESSAGE: "criminal is not found"});
    });
    if (examples.length == 0)
        res.send({MESSAGE: "criminal is empty"});
};