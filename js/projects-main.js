var bLazy = new Blazy();

function ProjectsGenerator(userclick, thumbgroupclick=-1)
{
    var x = thumbnailArrayLength(userclick); // how many projects (sub-categories) to show - calculated from .json current project array length

    document.getElementById("generate").innerHTML = ""; // clear the contents each time user clicks the category button (safety)
    thumbnails = ""; // clear the contents each time user clicks the category button
    thumbGroup = ""; // clear the contents each time user clicks the category button

    h2Class = jsonObj.projects[userclick].Header.h2Class;
    h2Title = jsonObj.projects[userclick].Header.h2Title;
    h2Description = jsonObj.projects[userclick].Header.h2Description;
    aTarget = "_blank";
    imgExt = ".jpg";
    imgImage = "";

    var pageStart = [
        "<header>",
        "<h2 class='"+h2Class+"'>"+h2Title+"</h2>",
        "<p>"+h2Description+"</p>",
        "</header>",
        "<div class='row justify-content-center'>"
    ].join("\n");

    switch(userclick)
    {
        case 2:
            aspectRatio = "aspect-ratio-3-2";
            backgroundImage = "default-3-2.png";
            break;
        default:
            aspectRatio = "aspect-ratio-16-9";
            backgroundImage = "default.png";
            break;
    }
    
    var pageEnd = [
        "</div>",
        "<a href='#' id='go-up' class='orangebutton' onclick='goToTop($)'>Go to top ▲</a>"
    ].join("\n");

    /* ----- Choose Category ----- */

    switch(userclick)
    {

        /* ----- Programming (newest first) ----- */

        case 0:

        imgExt = ".png";

        for(i=x-1; i>=0; i--)
        {
            aLink = jsonObj.projects[userclick].Thumbnails[i].aLink;
            pDescription = jsonObj.projects[userclick].Thumbnails[i].pDescription;
            figCaption = jsonObj.projects[userclick].Thumbnails[i].figCaption;

            var thumbnail = [
                "<div class='col-sm-10 col-md-8 col-lg-6'>",
                    "<a href='"+aLink+"' target='"+aTarget+"'>",
                    "<figure>",
                        "<div class='portfolio-img "+aspectRatio+"'>",
                            "<img class='b-lazy' src='"+backgroundImage+"' data-src='"+h2Class+"/"+h2Class+i+imgExt+"' alt='"+figCaption+"'>",
                            "<div class='portfolio-img-overlay'>",
                                "<p>"+pDescription+"</p>",
                            "</div>",
                        "</div>",
                        "<figcaption>"+figCaption+"</figcaption>",
                    "</figure>",
                    "</a>",
                "</div>"
            ].join("\n");

            thumbnails += thumbnail;
        }
        break; // end case 0

        /* ----- Personal Tech Blog ----- */

        case 4:

        imgExt = ".png";

        for(i=0; i<x; i++)
        {
            aLink = jsonObj.projects[userclick].Thumbnails[i].aLink;
            pDescription = jsonObj.projects[userclick].Thumbnails[i].pDescription;
            figCaption = jsonObj.projects[userclick].Thumbnails[i].figCaption;

            var thumbnail = [
                "<div class='col-sm-10 col-md-8 col-lg-6'>",
                    "<a href='"+aLink+"' target='"+aTarget+"'>",
                    "<figure>",
                        "<div class='portfolio-img "+aspectRatio+"'>",
                            "<img class='b-lazy' src='"+backgroundImage+"' data-src='"+h2Class+"/"+h2Class+i+imgExt+"' alt='"+figCaption+"'>",
                            "<div class='portfolio-img-overlay'>",
                                "<p>"+pDescription+"</p>",
                            "</div>",
                        "</div>",
                        "<figcaption>"+figCaption+"</figcaption>",
                    "</figure>",
                    "</a>",
                "</div>"
            ].join("\n");

            thumbnails += thumbnail;
        }
        break; // end case 4

        /* ----- Graphic Design, Photography and Game Photography ----- */

        case 1:
        case 2:
        case 3:

        /* ----- Generate all Thumbnails of a choosen group if thumbgroupclick > -1 ----- */

        if(thumbgroupclick > -1)
        {

            aLink = jsonObj.projects[userclick].Thumbnails[thumbgroupclick].aLink;
            pDescription = jsonObj.projects[userclick].Thumbnails[thumbgroupclick].pDescription;
            figCaption = jsonObj.projects[userclick].Thumbnails[thumbgroupclick].figCaption;
            numImages = jsonObj.projects[userclick].Thumbnails[thumbgroupclick].photosAmount; // read number of photos from each sub-category in .JSON
            parseInt(numImages); // convert string from .JSON to Int

            for(n=0; n<numImages; n++)
            {
                
                imgSize = "small-";
                imgImage = h2Class+"/"+imgSize+aLink+n+imgExt;
                imgSize = "big-";
                aLongLink = "'"+h2Class+"/"+imgSize+aLink+n+imgExt+"' target='"+aTarget+"'";

                var thumbnail = [
                    "<div class='col-sm-10 col-md-8 col-lg-6'>",
                        "<a href="+aLongLink+">",
                        "<figure>",
                            "<div class='portfolio-img "+aspectRatio+"'>",
                                "<img class='b-lazy' src='"+backgroundImage+"' data-src='"+imgImage+"' alt='"+figCaption+"'>",
                                "<div class='portfolio-img-overlay'>",
                                    "<p>"+pDescription+"<br><br>Click to view the original image</p>",
                                "</div>",
                            "</div>",
                            "<figcaption>"+figCaption+" #"+n+"</figcaption>",
                        "</figure>",
                        "</a>",
                    "</div>"
                ].join("\n");

                pageStart = [
                    "<header>",
                    "<h2 class='"+h2Class+"'>"+h2Title+" - "+figCaption+"</h2>",
                    "<p><a href='#' class='orangebutton' onclick='ProjectsGenerator("+userclick+")'>◄ Go Back to Categories</a></p>",
                    "</header>",
                    "<div class='row justify-content-center'>"
                ].join("\n");

                pageEnd = [
                    "</div>",
                    "<a href='#' class='orangebutton' onclick='ProjectsGenerator("+userclick+")'>◄ Go Back to Categories</a>",
                    "<a href='#' id='go-up' class='orangebutton' onclick='goToTop($)'>Go to top ▲</a>"
                ].join("\n");

                thumbnails += thumbnail;
            }
        }

        /* Generate thumbnail group of the sub-categories if thumbgroupclick = 0 */

        else
        {
            for(i=0; i<x; i++)
            {
                aLink = jsonObj.projects[userclick].Thumbnails[i].aLink;
                aLongLink = "'#' onclick='ProjectsGenerator("+userclick+","+i+")'";
                pDescription = jsonObj.projects[userclick].Thumbnails[i].pDescription;
                figCaption = jsonObj.projects[userclick].Thumbnails[i].figCaption;
                numImages = jsonObj.projects[userclick].Thumbnails[i].photosAmount; // read number of photos from each sub-category in .JSON
                parseInt(numImages); // convert string from .JSON to Int

                imgSize = "thumb-";
                imgImage = h2Class+"/"+imgSize+aLink+imgExt;

                var thumbnail = [
                    "<div class='col-sm-10 col-md-8 col-lg-6'>",
                        "<a href="+aLongLink+">",
                        "<figure>",
                            "<div class='portfolio-img "+aspectRatio+"'>",
                                "<img class='b-lazy' src='"+backgroundImage+"' data-src='"+imgImage+"' alt='"+figCaption+"'>",
                                "<div class='portfolio-img-overlay'>",
                                    "<p>"+pDescription+"<br><br>Click to view the full gallery ( "+numImages+" images )</p>",
                                "</div>",
                            "</div>",
                            "<figcaption>"+figCaption+"</figcaption>",
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

    //console.log(h2Class);

    function generateAll(callback)
    {
        pageStart += thumbnails += pageEnd;
        document.getElementById("generate").innerHTML = pageStart;
        callback();
    }

    // this function starts only after the function generateAll() has completed
    function loadBlazy()
    {
        // not really elegant "fix" for Chrome/Opera with 100ms timeout...
        // hope to fix it properly in the future when I will learn more about AJAX
        setTimeout(function () { bLazy = new Blazy(); }, 100);
    }

    // if this function completes, it sends the callback to the function loadBlazy()
    generateAll(loadBlazy);

}

/* ------------------------------------------------------------------------------- */

var ninjaClicked = false;
var ninjaHidden = true;

function ninjaSpoiler(value)
{
    ninjaClicked = true;
    var ninjaClick = "ninjaClick"+value;
    var ninjaButton = "ninja"+value;
    
    if(ninjaClicked && ninjaHidden)
    {
        $('#'+ninjaClick).show(300);
        document.getElementById(ninjaButton).innerHTML = "Close Tech Spoiler ▲";
        ninjaHidden = false;
    }
    else
    {
        $('#'+ninjaClick).hide(300);
        document.getElementById(ninjaButton).innerHTML = "Open Tech Spoiler ▼";
        ninjaClicked = false;
        ninjaHidden = true;
    }
}