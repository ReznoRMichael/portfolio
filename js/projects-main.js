let BLAZY = ""; // new Blazy();
window.BLAZY = BLAZY;

/**
 * Generates all the dynamic content on the page from the .json file.
 * @param userClick number, the category that the user has clicked on the nav menu.
 * @param thumbGroupClick number, the chosen sub-group of the given main category. Used for Graphic Design, Photography and Game Photography categories.
 */
function ProjectsGenerator(userClick, thumbGroupClick = -1) {
    var x = jsonObj.projects[userClick].Thumbnails.length; // how many projects (sub-categories) to show - calculated from .json current project array length

    BLAZY = ""; // reset bLazy object
    document.getElementById("generate").innerHTML = ""; // clear the contents each time user clicks the category button (safety)
    thumbnails = ""; // clear the contents each time user clicks the category button
    thumbGroup = ""; // clear the contents each time user clicks the category button

    h2Class = jsonObj.projects[userClick].Header.h2Class;
    h2Title = jsonObj.projects[userClick].Header.h2Title;
    h2Description = jsonObj.projects[userClick].Header.h2Description;
    aTarget = "_blank";
    imgExt = ".jpg";
    imgImage = "";

    var pageStart = [
        "<header>",
        "<h2 class='" + h2Class + "'>" + h2Title + "</h2>",
        "<p>" + h2Description + "</p>",
        "</header>",
        "<div class='row justify-content-center'>"
    ].join("\n");

    var pageEnd = [
        "</div>",
        "<a href='#' id='go-up' class='orangebutton' onclick='goToTop($)'>Go to top ▲</a>"
    ].join("\n");

    // bLazy = new Blazy();

    /* --------------------------- Assign correct aspect ratio to thumbnails ------------------------------ */

    switch (userClick) {
        case 2:
            aspectRatio = "aspect-ratio-3-2";
            backgroundImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAn8AAAGqAQMAAABAm7C5AAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAADhJREFUeNrtwQENAAAAwiD7pzbHN2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADEHYbKAAGgJIvbAAAAAElFTkSuQmCC";
            break;
        default:
            aspectRatio = "aspect-ratio-16-9";
            backgroundImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAFoAQMAAAD9/NgSAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAADJJREFUeNrtwQEBAAAIAqD+r07dARwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA83HoAAGKJJ+xAAAAAElFTkSuQmCC";
            break;
    }

    /* --------------------------- Choose Category ------------------------------ */

    switch (userClick) {

        /* ----- Programming (latest first) ----- */
        case 0:
            thumbnails = generateThumbnails('.png', x, 'latest');
            break; // end case 0

            /* ----- Personal Tech Blog ----- */
        case 4:
            thumbnails = generateThumbnails('.png', x);
            break; // end case 4

            /* ----- Graphic Design, Photography and Game Photography ----- */
        case 1:
        case 2:
        case 3:

            /* ----- Generate all Thumbnails of a chosen group if thumbGroupClick > -1 ----- */

            if (thumbGroupClick > -1) {

                aLink = jsonObj.projects[userClick].Thumbnails[thumbGroupClick].aLink;
                pDescription = jsonObj.projects[userClick].Thumbnails[thumbGroupClick].pDescription;
                figCaption = jsonObj.projects[userClick].Thumbnails[thumbGroupClick].figCaption;
                numImages = jsonObj.projects[userClick].Thumbnails[thumbGroupClick].photosAmount; // read number of photos from each sub-category in .JSON
                parseInt(numImages); // convert string from .JSON to Int

                for (n = 0; n < numImages; n++) {
                    imgSize = "small-";
                    imgImage = h2Class + "/" + imgSize + aLink + n + imgExt;
                    imgSize = "big-";
                    aLongLink = "'" + h2Class + "/" + imgSize + aLink + n + imgExt + "' target='" + aTarget + "'";

                    var thumbnail = [
                        "<div class='col-sm-10 col-md-8 col-lg-6'>",
                        "<a href=" + aLongLink + ">",
                        "<figure>",
                        "<div class='portfolio-img " + aspectRatio + "'>",
                        "<img class='b-lazy' src='" + backgroundImage + "' data-src='" + imgImage + "' alt='" + figCaption + "'>",
                        // "<img class='b-lazy' src='" + imgImage + "' alt='" + figCaption + "'>",
                        "<div class='portfolio-img-overlay'>",
                        "<p>" + pDescription + "<br><br>Click to view the original image</p>",
                        "</div>",
                        "</div>",
                        "<figcaption>" + figCaption + " #" + n + "</figcaption>",
                        "</figure>",
                        "</a>",
                        "</div>"
                    ].join("\n");

                    pageStart = [
                        "<header>",
                        "<h2 class='" + h2Class + "'>" + h2Title + " - " + figCaption + "</h2>",
                        "<p><a href='#' class='orangebutton' onclick='ProjectsGenerator(" + userClick + ")'>◄ Go Back to Categories</a></p>",
                        "</header>",
                        "<div class='row justify-content-center'>"
                    ].join("\n");

                    pageEnd = [
                        "</div>",
                        "<a href='#' class='orangebutton' onclick='ProjectsGenerator(" + userClick + ")'>◄ Go Back to Categories</a>",
                        "<a href='#' id='go-up' class='orangebutton' onclick='goToTop($)'>Go to top ▲</a>"
                    ].join("\n");

                    thumbnails += thumbnail;
                }
            }

            /* Generate thumbnail group of the sub-categories if thumbGroupClick = 0 */
            else {
                for (i = 0; i < x; i++) {
                    aLink = jsonObj.projects[userClick].Thumbnails[i].aLink;
                    aLongLink = "'#' onclick='ProjectsGenerator(" + userClick + "," + i + ")'";
                    pDescription = jsonObj.projects[userClick].Thumbnails[i].pDescription;
                    figCaption = jsonObj.projects[userClick].Thumbnails[i].figCaption;
                    numImages = jsonObj.projects[userClick].Thumbnails[i].photosAmount; // read number of photos from each sub-category in .JSON
                    parseInt(numImages); // convert string from .JSON to Int

                    imgSize = "thumb-";
                    imgImage = h2Class + "/" + imgSize + aLink + imgExt;

                    var thumbnail = [
                        "<div class='col-sm-10 col-md-8 col-lg-6'>",
                        "<a href=" + aLongLink + ">",
                        "<figure>",
                        "<div class='portfolio-img " + aspectRatio + "'>",
                        "<img class='b-lazy' src='" + backgroundImage + "' data-src='" + imgImage + "' alt='" + figCaption + "'>",
                        // "<img class='b-lazy' src='" + imgImage + "' alt='" + figCaption + "'>",
                        "<div class='portfolio-img-overlay'>",
                        "<p>" + pDescription + "<br><br>Click to view the full gallery ( " + numImages + " images )</p>",
                        "</div>",
                        "</div>",
                        "<figcaption>" + figCaption + "</figcaption>",
                        "</figure>",
                        "</a>",
                        "</div>"
                    ].join("\n");

                    thumbnails += thumbnail; // merge the current group with the rest
                }
            }
            break; // end case 1, 2, 3

        default:

            /* ----- All undefined Cases & Categories ----- */

            break; // end default

    }


    /* ------------------------------------------------------------------------------------ */
    /**
     * Generates all the thumbnails after the user's click on a category.
     * @param imgExt string, the file extension used for thumbnails (.jpg or .png)
     * @param iStop number, where to stop iterating over the loop (Thumbnails.length)
     * @param order string, the order of the viewing (latest or null)
     */
    function generateThumbnails(imgExt, iStop, order) {
        if (order === 'latest') {
            for (i = iStop - 1; i >= 0; i--) {
                aLink = jsonObj.projects[userClick].Thumbnails[i].aLink;
                pDescription = jsonObj.projects[userClick].Thumbnails[i].pDescription;
                figCaption = jsonObj.projects[userClick].Thumbnails[i].figCaption;

                var thumbnail = [
                    "<div class='col-sm-10 col-md-8 col-lg-6'>",
                    "<a href='" + aLink + "' target='" + aTarget + "'>",
                    "<figure>",
                    "<div class='portfolio-img " + aspectRatio + "'>",
                    "<img class='b-lazy' src='" + backgroundImage + "' data-src='" + h2Class + "/" + h2Class + i + imgExt + "' alt='" + figCaption + "'>",
                    // "<img class='b-lazy' src='" + h2Class + "/" + h2Class + i + imgExt + "' alt='" + figCaption + "'>",
                    "<div class='portfolio-img-overlay'>",
                    "<p>" + pDescription + "</p>",
                    "</div>",
                    "</div>",
                    "<figcaption>" + figCaption + "</figcaption>",
                    "</figure>",
                    "</a>",
                    "</div>"
                ].join("\n");

                thumbnails += thumbnail;
            }
        } else {
            for (i = 0; i < iStop; i++) {
                aLink = jsonObj.projects[userClick].Thumbnails[i].aLink;
                pDescription = jsonObj.projects[userClick].Thumbnails[i].pDescription;
                figCaption = jsonObj.projects[userClick].Thumbnails[i].figCaption;

                var thumbnail = [
                    "<div class='col-sm-10 col-md-8 col-lg-6'>",
                    "<a href='" + aLink + "' target='" + aTarget + "'>",
                    "<figure>",
                    "<div class='portfolio-img " + aspectRatio + "'>",
                    "<img class='b-lazy' src='" + backgroundImage + "' data-src='" + h2Class + "/" + h2Class + i + imgExt + "' alt='" + figCaption + "'>",
                    // "<img class='b-lazy' src='" + h2Class + "/" + h2Class + i + imgExt + "' alt='" + figCaption + "'>",
                    "<div class='portfolio-img-overlay'>",
                    "<p>" + pDescription + "</p>",
                    "</div>",
                    "</div>",
                    "<figcaption>" + figCaption + "</figcaption>",
                    "</figure>",
                    "</a>",
                    "</div>"
                ].join("\n");

                thumbnails += thumbnail;
            }
        }

        return thumbnails;
    }
    /* ------------------------------------------------------------------------------------ */
    // Appends all generated thumbnails to the #generate div (views them)
    /* ------------------------------------------------------------------------------------ */

    function viewAllThumbnails(contents, callback) {

        document.getElementById("generate").innerHTML = contents;

        $(window).on("load", callback()); // LoadBlazy
    }

    viewAllThumbnails(pageStart + thumbnails + pageEnd, LoadBlazy);

} // end function ProjectsGenerator()

/**
 * Starts the script for lazy-loading images. Initialize bLazy
 */
function LoadBlazy() {
    BLAZY = new Blazy();
}