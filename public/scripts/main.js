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
            gitHubRequest();
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

    // Generates the Projects page with data received by the API call.
    const gitHubRequest = () => {
        const xhr = new XMLHttpRequest();
        const url = "https://api.github.com/users/dan032/repos";
        const $projects = $('#projects');
        let tmp = "";

        xhr.open("get", url, true);

        xhr.onreadystatechange = () =>{
            if (xhr.readyState === 4 && xhr.status === 200){
                const projects = JSON.parse(xhr.responseText);
                const imageArr = ["../img/election.png", "../img/data2.png", "../img/car2.png", "../img/web2.png"];

                for (let i = 0; i < projects.length; i++) {
                    tmp += "<div class='project'>";
                    tmp += `<img class='project-image' src=${imageArr[i]} alt="Project Image">`;
                    tmp += `<p class="project-title">${projects[i].name}</p>`;
                    tmp += "<div class='project-link'>";
                    tmp += `<a href = ${projects[i].html_url}><img class='icons' src='img/github.png' alt='Github Image'/></a>`;

                    if (i === 2) {
                        tmp += '<a href="https://www.youtube.com/watch?v=999AQMEhrTE"><img class="icons" src="../img/youtube.png" alt=\'Youtube Image\'/></a>\n';
                    }
                    tmp += "</div>";
                    tmp += "<p class ='project-desc'>" + projects[i].description + "</p>";
                    tmp += "</div>";
                }
            }
            if (xhr.readyState === 4 && xhr.status !== 200){
                tmp += "<p> Error with GitHub API </p>"
            }
            $projects.append(tmp);
        };

        xhr.send()
    };
    return {
        load,
    };
})();

$(function () {
    Renderer.load();
});