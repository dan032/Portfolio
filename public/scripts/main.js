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

        $('.container').fadeIn(500)
    };

    // Toggles which header button is active
    const toggleHeader = (id) => {
        let link = document.getElementById(id);
        link.classList.toggle("active");
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
                const imageArr = ["../img/star.png","../img/election.png","../img/school.png", "../img/data2.png", "../img/car2.png", "../img/web2.png"];
                const technologies = [
                    ["C++"],
                    ["Python", "Numpy", "Pandas"],
                    ["React Native", "Firebase"],
                    ["Python"],
                    ["Java", "Room Persistence"],
                    ["HTML", "CSS", "Javascript", "NodeJS"]
                ];

                for (let i = 0; i < projects.length; i++) {
                    tmp += "<div class='project'>";
                    tmp += "<div class='project-top'>";
                    tmp += `<img class='project-image' src=${imageArr[i]} alt="Project Image">`;
                    tmp += "</div>";
                    tmp += "<div class='project-middle'>";
                    tmp += `<p class="project-title">${projects[i].name}</p>`;
                    tmp += "<div class='project-link'>";
                    tmp += `<a href = ${projects[i].html_url}><img class='icons' src='img/github.png' alt='Github Image'/></a>`;
                    if (i === 4) {
                        tmp += '<a href="https://www.youtube.com/watch?v=999AQMEhrTE"><img class="icons" src="../img/youtube.png" alt=\'Youtube Image\'/></a>\n';
                    }
                    tmp += "</div>";
                    tmp += "<p class ='project-desc'>" + projects[i].description + "</p>";
                    tmp += "</div>";
                    tmp += "<div class='project-bottom'>";
                    tmp += "<p style='margin: 3px'> Technologies: </p>";
                    tmp += "<div class='technologies'>";
                    for (let j = 0; j < technologies[i].length; j++){
                        tmp += `<span class="tech">${technologies[i][j]}</span>`
                    }
                    tmp += "</div>";
                    tmp += "</div>";
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
