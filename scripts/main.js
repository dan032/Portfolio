const Formatter = (function () {
    const $main_menu = $("#main-menu")

    const load = () => {
        $main_menu.load("header.html", managePages)
    };

    // Manages which link in the header is currently active, and begins relevant API requests
    const managePages = () => {
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
            if (xhr.status !== 200){
                console.log("Error Loading Github Information")
            }
            else{
                const response = JSON.parse(xhr.responseText);
                renderResponse(response);
            }
        }
    };

    const renderResponse = (response) =>{
        let $projects = $("#projects")
        let tmp = "";
        const imageArr = Array("'./img/car.png'", "'./img/web.png'")
        const iconArr = Array("'/img/github.png", "'")
        for (let i = 0; i < response.length; i++){
            tmp += "<div class='project'>"
            tmp += "<img class='project-image' src=" + imageArr[i] + "/>"
            tmp += "<p class='project-title'>" + response[i].name + "</p>"
            tmp += "<div class='project-link'>"
            tmp += "<img class='mini-icon' src='./img/github.png' alt='Github Image'/>"
            tmp += "</div>"
            tmp += "<p class='project-desc'>" + response[i].description + "</p>"
            tmp += "</div>"
        }
        $projects.append(tmp)
    };

    return {
        load,
    }
})();

$(function () {
    Formatter.load()
})