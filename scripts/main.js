var imageSrcs = [];

function loadPage()
{
    loadImages();
}

function loadImages()
{
    buildImageSrcs();
    renderImageTable();

    window.addEventListener("resize", renderImageTable);
}

function buildImageSrcs()
{
    let IMG_SRC = "./site_images/art/";

    /* This implementation is not very nice. For now, I just manually 
       keep track of how many items and are in each directory. */
    const NUM_JPEGS = 15;
    const NUM_GIFS = 7;
    const NUM_PNGS = 2;
    let NUM_PIC_TOTAL = NUM_JPEGS + NUM_GIFS + NUM_PNGS;

    var total_index = 0;
    var index_jpeg = 0;
    var index_gif = 0;
    var index_png = 0;

    // Loop through each item type
    while (total_index < NUM_PIC_TOTAL) {
        if (index_jpeg < NUM_JPEGS) {
            index_jpeg++;
            imageSrcs.push(IMG_SRC + "jpeg/" + index_jpeg + ".jpeg");
        }

        if (index_gif < NUM_GIFS) {
            index_gif++;
            imageSrcs.push(IMG_SRC + "gif/" + index_gif + ".gif");
        }

        if (index_png < NUM_PNGS) {
            index_png++;
            imageSrcs.push(IMG_SRC + "png/" + index_png + ".png");
        }

        total_index++;
    }
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