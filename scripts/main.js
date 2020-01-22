const Formatter = (function () {
    const $main_menu = $("#main-menu")


    const load = () => {
        $main_menu.load("header.html", manageHeader)

    };

    const manageHeader = () => {
        if(window.location.pathname === "/site/index.html"){
            toggleHeader("home-link");
        }
        else if(window.location.pathname === "/site/projects.html"){
            gitHubRequest()
            toggleHeader("projects-link");
        }
        else if (window.location.pathname === "/site/resume.html"){
            toggleHeader("resume-link");
        }
    };

    const toggleHeader = (id) => {
        let link = document.getElementById(id);
        link.classList.toggle("active");
        link.setAttribute("href", "#");
    };

    const gitHubRequest = () => {
        const url = "https://api.github.com/users/dan032/repos";
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.send();

        xhr.onload = () => {
            if (xhr.status != 200){
                console.log("Error Loading Github Information")
            }
            else{
                const response = JSON.parse(xhr.responseText);
                renderResponse(response);
            }
        }

    }

    const renderResponse = (response) =>{
        let $projects = $("#projects")
        let tmp = "";

        for (let i = 0; i < response.length; i++){
            tmp += "<div class='project'><p>" + response[i].name + "</p>" + "<p>" + response[i].description + "</p></div>"
        }
        $projects.append(tmp)
    }

    return {
        load,
    }
})();

$(function () {
    Formatter.load()
})