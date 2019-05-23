var bLazy = new Blazy();

function ProjectsGenerator(userclick)
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
    
    var pageStart = [
        "<header>",
        "<h2 class='"+h2Class+"'>"+h2Title+"</h2>",
        "<p>"+h2Description+"</p>",
        "</header>",
        "<div class='row justify-content-center'>"
    ].join("\n");
    
    var pageEnd = [
        "</div>"
    ].join("\n");

    /* ----- Choose Category ----- */

    switch(userclick)
    {
        /* ----- Programming & Personal Tech Blog ----- */

        case 0:
        case 4:

        imgExt = ".png";

        for(i=0; i<x; i++)
        {
            aLink = jsonObj.projects[userclick].Thumbnails[i].aLink;
            pDescription = jsonObj.projects[userclick].Thumbnails[i].pDescription;
            figCaption = jsonObj.projects[userclick].Thumbnails[i].figCaption;
            //backgroundImage = "style='background-image:url(\""+h2Class+"/"+h2Class+i+imgExt+"\")'";

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
        break; // end case 0, 4

        /* ----- Graphic Design, Photography and Game Photography ----- */

        case 1:
        case 2:
        case 3:

        thumbGroup = ""; // temporary helper holding all generated thumbnails code from each sub-category

        for(i=0; i<x; i++)
        {
            aLink = jsonObj.projects[userclick].Thumbnails[i].aLink;
            pDescription = jsonObj.projects[userclick].Thumbnails[i].pDescription;
            figCaption = jsonObj.projects[userclick].Thumbnails[i].figCaption;
            numImages = jsonObj.projects[userclick].Thumbnails[i].photosAmount; // read number of photos from each sub-category in .JSON
            parseInt(numImages); // convert string from .JSON to Int

            /* Generate all thumbnails from current sub-category */

            for(n=0; n<numImages; n++)
            {
                imgSize = "small-";
                //backgroundImage = "style='background-image:url(\""+h2Class+"/"+imgSize+aLink+n+imgExt+"\")'";
                imgImage = h2Class+"/"+imgSize+aLink+n+imgExt;
                imgSize = "big-";

                var thumbnail = [
                    "<div class='col-sm-10 col-md-8 col-lg-6'>",
                        "<a href='"+h2Class+"/"+imgSize+aLink+n+imgExt+"' target='"+aTarget+"'>",
                        "<figure>",
                            "<div class='portfolio-img "+aspectRatio+"'>",
                                "<img class='b-lazy' src='"+backgroundImage+"' data-src='"+imgImage+"' alt='"+figCaption+"'>",
                                "<div class='portfolio-img-overlay'>",
                                    "<p>"+pDescription+"</p>",
                                "</div>",
                            "</div>",
                            "<figcaption>"+figCaption+"</figcaption>",
                        "</figure>",
                        "</a>",
                    "</div>"
                ].join("\n");

                thumbGroup += thumbnail;
            }
            
            thumbnails += thumbGroup; // merge the current group with the rest
            thumbGroup = ""; // clear the current group to start another in the next loop
        }
        break; // end case 3

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

    function loadBlazy()
    {
        // not really elegant "fix" for Chrome/Opera with 100ms timeout...
        // hope to fix it properly in the future when I will learn more about what is happening here
        setTimeout(function () { bLazy = new Blazy(); }, 100);
    }

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