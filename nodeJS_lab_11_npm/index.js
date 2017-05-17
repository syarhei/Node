module.exports = require('./lib/RC');

let RC = require('./lib/RC');

let rc = RC();

let user = "accetone";
let rep = "cwp";

rc.getRepositories_byUser(user).then(console.log).catch(console.log);
//rc.getRepositories_byKeyword(rep).then(console.log).catch(console.log);
//rc.getCommits_byUser(user, rep).then(console.log).catch(console.log);