/**
 * Created by Sergei on 09.05.2017.
 */

let axs = require('axios');

module.exports = () => {

    function getRepCom() {
        this.getRepositories_byUser = getRepositories_byUser;
        this.getRepositories_byKeyword = getRepositories_byKeyword;
        this.getCommits_byUser = getCommits_byUser;

        function getRepositories_byUser(user) {

            return new Promise((resolve, reject) => {
                axs.get("https://api.github.com/users/" + user + "/repos?per_page=10").then(
                    (result) => {
                        if (result == undefined) reject("error");
                        let array = [];
                        let data = result.data;
                        for (let i = 0; i < data.length; i++) {
                            array.push({id: data[i].id, name: data[i].name, url: data[i].html_url})
                        }
                        resolve(array);
                    }
                ).catch((error) => {
                    reject("Error: " + error.message);
                });
            })
        }

        function getRepositories_byKeyword(keyword) {
            return new Promise((resolve, reject) => {
                axs.get("https://api.github.com/search/repositories?q=" + keyword + "&per_page=10").then(
                    (result) => {
                        if (result == undefined) reject("error");
                        let array = [];
                        let data = result.data.items;
                        for (let i = 0; i < data.length; i++) {
                            array.push({id: data[i].id, name: data[i].name, owner: data[i].owner.login, url: data[i].html_url})
                        }
                        resolve(array);
                    }
                ).catch((error) => {
                    reject("Error: " + error.message);
                });
            })
        }

        function getCommits_byUser(user, repository) {
            return new Promise((resolve, reject) => {
                axs.get("https://api.github.com/repos/" + user + "/" + repository + "/commits?per_page=10").then(
                    (result) => {
                        if (result == undefined) reject("error");
                        let array = [];
                        let data = result.data;
                        for (let i = 0; i < data.length; i++) {
                            array.push({sha: data[i].sha, author: data[i].author.login, message: data[i].commit.message, date: data[i].commit.committer.date})
                        }
                        resolve(array);
                    }
                ).catch((error) => {
                    reject("Error: " + error.message);
                });
            })
        }

    }

    return new getRepCom();
};