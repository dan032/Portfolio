const Renderer = (function () {

    const load = () => {
        $("#main-menu").load("header.html", managePages);
    };

    // Manages page interactivity
    const managePages = () => {
        if(window.location.pathname === "/home.html"){
            toggleHeader("home-link");
        }
        else if(window.location.pathname === "/projects.html"){
            toggleHeader("projects-link");
        }
        else if (window.location.pathname === "/resume.html"){
            toggleHeader("resume-link");
        }
    };

    // Toggles which header button is active, and alters the URL to prevent the user from loading the page again
    const toggleHeader = (id) => {
        let link = document.getElementById(id);
        link.classList.toggle("active");
        link.setAttribute("href", "#");
    };

    return {
        load,
    };
})();

$(function () {
    Renderer.load();
});