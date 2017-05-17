/**
 * Created by Sergei on 09.05.2017.
 */

let RC = require('@syarhei/gh-test-msu');

let rc = RC();

let user = "accetone";
let rep = "cwp";

rc.getRepositories_byUser(user).then(console.log).catch(console.log);
//rc.getRepositories_byKeyword(rep).then(console.log).catch(console.log);
//rc.getCommits_byUser(user, rep).then(console.log).catch(console.log);