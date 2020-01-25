const Renderer = (function () {

    const load = () => {
        $("#main-menu").load("header.html", managePages);
    };

    // Manages page interactivity
    const managePages = () => {
        let prefix = "";

        if (window.location.hostname === 'localhost'){
            prefix = "/site";
        }

        if(window.location.pathname === `${prefix}/home.html`){
            toggleHeader("home-link");
            showBody();
        }
        else if(window.location.pathname === `${prefix}/projects.html`){
            toggleHeader("projects-link");
            showBody();
        }
        else if (window.location.pathname === `${prefix}/resume.html`){
            toggleHeader("resume-link");
            showBody();
        }
    };

    // Toggles which header button is active, and alters the URL to prevent the user from loading the page again
    const toggleHeader = (id) => {
        let link = document.getElementById(id);
        link.classList.toggle("active");
        link.setAttribute("href", "#");
    };

    const showBody = () =>{
        $('body').fadeIn(500)
    };

    return {
        load,
    };
})();

$(function () {
    Renderer.load();
});