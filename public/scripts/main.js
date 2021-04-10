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
                const chosenRepos = [
                    {
                        name: "AdventOfCode2020",
                        imageUrl: "../img/star.png",
                        technologies: ["C++"],
                    },
                    {
                        name:  "CanadaElections",
                        imageUrl: "../img/election.png",
                        technologies: ["Python", "Numpy", "Pandas"]
                    },
                    {
                        name: "Groupski",
                        imageUrl: "../img/school.png",
                        technologies:  ["React Native", "Firebase"],
                    },
                    {
                        name: "IndeedScraping",
                        imageUrl: "../img/data2.png",
                        technologies: ["Python"]
                    },
                    {
                        name: "ParkPal",
                        imageUrl: "../img/car2.png",
                        technologies: ["Java", "Room Persistence"],
                        youtube: "https://www.youtube.com/watch?v=999AQMEhrTE"
                    }
                ];

                const filtered = projects.filter((val) => {
                    return chosenRepos.some(e => e.name === val.name)
                });

                for (let i = 0; i < filtered.length; i++) {
                    tmp += "<div class='project'>";
                    tmp += "<div class='project-top'>";
                    tmp += `<img class='project-image' src=${chosenRepos[i].imageUrl} alt="Project Image">`;
                    tmp += "</div>";
                    tmp += "<div class='project-middle'>";
                    tmp += `<p class="project-title">${filtered[i].name}</p>`;
                    tmp += "<div class='project-link'>";
                    tmp += `<a href = ${filtered[i].html_url}><img class='icons github-icon' src='img/github.png' alt='Github Image'/></a>`;
                    if (chosenRepos[i].youtube) {
                        tmp += `<a href=${chosenRepos[i].youtube}><img class="icons" src="../img/youtube.png" alt=\'Youtube Image\'/></a>\n`;
                    }
                    tmp += "</div>";
                    tmp += "<p class ='project-desc'>" + filtered[i].description + "</p>";
                    tmp += "</div>";
                    tmp += "<div class='project-bottom'>";
                    tmp += "<p style='margin: 3px'> Technologies: </p>";
                    tmp += "<div class='technologies'>";
                    for (let j = 0; j < chosenRepos[i].technologies.length; j++){
                        tmp += `<span class="tech">${chosenRepos[i].technologies[j]}</span>`
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
