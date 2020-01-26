const Renderer = (function () {

    const load = () => {
        $("#main-menu").load("header.html", managePages);
    };

    // Manages page interactivity
    const managePages = () => {

        if(window.location.pathname === `/index.html` || window.location.pathname === '/'){
            toggleHeader("home-link");
        }
        else if(window.location.pathname === `/projects.html`){
            toggleHeader("projects-link");
        }
        else if (window.location.pathname === `/resume.html`){
            toggleHeader("resume-link");
        }
        else if (window.location.pathname === `/site_plan.html`){
            toggleHeader("plan-link");
        }

        showBody();
    };

    // Toggles which header button is active
    const toggleHeader = (id) => {
        let link = document.getElementById(id);
        link.classList.toggle("active");
    };

    // Activates Fade In effect for the page
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