const Formatter = (function () {
    const $main_menu = $("#main-menu")

    const load = () => {
        $main_menu.load("header.html", manageHeader)
    };

    const manageHeader = () => {
        if(window.location.pathname === "/site/index.html"){
            toggleHeader("home-link")
        }
        else if(window.location.pathname === "/site/projects.html"){
            toggleHeader("projects-link")
        }
        else if (window.location.pathname === "/site/resume.html"){
            toggleHeader("resume-link")
        }
    };

    const toggleHeader = (id) => {
        let link = document.getElementById(id)
        link.classList.toggle("active")
        link.setAttribute("href", "#")
    };

    return {
        load,
    }
})();

$(function () {
    Formatter.load()
})