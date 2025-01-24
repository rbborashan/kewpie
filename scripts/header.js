function buildHeader()
{
    var title;

    if (document.title.search("-") === -1) { // index.html
        title = document.title;
    }
    else {
        title = document.title.split('-')[1].split(' ')[1];
    }

    updatePageNav(title);
}

function updatePageNav(title)
{
    let navLinks = document.getElementsByClassName("navlink");
    var activePage = "";

    if (title === "Drawings") {
        activePage = title;
    }
    else if (title === "Scrapbook") {
        activePage = title;
    }
    else if (title === "Poetry") {
        activePage = title;
    }
    else if (title === "About") {
        activePage = "About Me";
    }
    else { // index.html
        activePage = "";
    }

    for (let link of navLinks) {
        if (link.innerText === activePage) {
            link.setAttribute("class", "navlink active-navlink unselectable");
        }
        else {
            link.setAttribute("class", "navlink unselectable");
        }
    }
}