const Formatter = (function () {
    const $main_menu = $("#main-menu");

    const load = () => {
        $main_menu.load("header.html", managePages);
    };

    // Manages dynamic page interactivity
    const managePages = () => {
        if(window.location.pathname === "/site/index.html"){
            toggleHeader("home-link");
        }
        else if(window.location.pathname === "/site/projects.html"){
            gitHubRequest();
            toggleHeader("projects-link");
        }
        else if (window.location.pathname === "/site/resume.html"){
            toggleHeader("resume-link");
        }
    };

    // Toggles which header button is active, and alters the URL to prevent the user from loading the page again
    const toggleHeader = (id) => {
        let link = document.getElementById(id);
        link.classList.toggle("active");
        link.setAttribute("href", "#");
    };

    // Performs API request to GitHub to access my current projects
    const gitHubRequest = () => {
        const url = "https://api.github.com/users/dan032/repos";
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4){
                return;
            }
            if (xhr.status === 200){
                const response = JSON.parse(xhr.responseText);
                renderResponse(response);
            }
            else{
                console.log("Error Loading Github Information")
            }
        };
        xhr.send();
    };

    // Parses and renders the GitHub Projects
    const renderResponse = (response) =>{
        let $projects = $("#projects");
        let tmp = "";
        const imageArr = Array('./img/data.jpg', "'./img/car.png'", "'./img/web.png'");
        for (let i = 0; i < response.length; i++){
            tmp += "<div class='project'>";
            tmp += `<img class='project-image' src= ${imageArr[i]}/>`;
            tmp += `<p class='project-title'> ${response[i].name} </p>`;
            tmp += "<div class='project-link'>";
            tmp += `<a href= ${response[i].svn_url}><img class='mini-icon' src='./img/github.png' alt='Github Image'/></a>`;
            tmp += "</div>";
            tmp += `<p class='project-desc'> ${response[i].description}</p>`;
            tmp += "</div>";
        }
        $projects.append(tmp);
    };

    return {
        load,
    };
})();

$(function () {
    Formatter.load();
});