var imageSrcs = [];

function loadPage()
{
    buildHeader();
    loadImages();
}

function loadImages()
{
    if (document.title === "Kewpie Klub - Drawings"
        || document.title === "Kewpie Klub") {
        buildImageSrcs("./site_images/art/", 26, 9, 12);
    }
    if (document.title === "Kewpie Klub - Scrapbook") {
        buildImageSrcs("./site_images/scraps/", 0, 0, 2);
    }

    window.addEventListener("resize", renderImageTable);
}

function buildImageSrcs(img_src, num_jpgs, num_gifs, num_pngs)
{
    /* This implementation is not very nice. For now, I just manually 
       keep track of how many items and are in each directory. */
    let num_pics = num_jpgs + num_gifs + num_pngs;

    var total_index = 0;
    var index_jpeg = 0;
    var index_gif = 0;
    var index_png = 0;

    imageSrcs = []; // Clear the array

    // Loop through each item type
    while (total_index < num_pics) {
        if (index_jpeg < num_jpgs) {
            index_jpeg++;
            imageSrcs.push(img_src + "jpeg/" + index_jpeg + ".jpeg");
        }

        if (index_gif < num_gifs) {
            index_gif++;
            imageSrcs.push(img_src + "gif/" + index_gif + ".gif");
        }

        if (index_png < num_pngs) {
            index_png++;
            imageSrcs.push(img_src + "png/" + index_png + ".png");
        }

        total_index++;
    }

    renderImageTable();
}

function determineMaxImagesPerRow(indexStart) {
    const screenWidth = window.innerWidth;

    if (screenWidth < 600) {
        return 2; // Small screens: 2 images per row
    } else if (screenWidth < 1024) {
        return 3; // Medium screens: 3 images per row
    } else {
        return 5; // Large screens: 5 images per row
    }
}

function renderImageTable()
{
    const pictable = document.getElementById("pictable");
    pictable.innerHTML = "";
    var maxImagesPerRow = determineMaxImagesPerRow();

    let row;
    imageSrcs.forEach((imgSrc, index) => {
        if (index % maxImagesPerRow === 0) {
            
            row = document.createElement("div");
            row.setAttribute("class", "pic-row");
            pictable.appendChild(row); // Create new row
        }

        let img = document.createElement("img");
        let imgLink = document.createElement("a");

        img.src = imgLink.href = imgSrc;
        img.setAttribute("class", "art-thumb");
        imgLink.setAttribute("class", "art-link")

        imgLink.appendChild(img);
        row.appendChild(imgLink);
    });
}

function addToPicRow(pictable, imgTag)
{
    var rowElements;
    var rowCount = 0;
    var imgElements = document.getElementsByClassName("art-thumb");
    let newRow = "<div class=\"pic-row\"></div>\n";

    // Add a new row
    if ((imgElements.length % 4) === 0) {
        pictable.innerHTML += newRow;
    }

    // Get current row
    rowElements = document.getElementsByClassName("pic-row");
    rowCount = rowElements.length;

    console.log("total row " + rowElements.length);
    // Add new image to current row
    rowElements[rowCount-1].innerHTML += imgTag;
}