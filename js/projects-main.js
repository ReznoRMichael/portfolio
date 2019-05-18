function ProjectsGenerator(userclick)
{
    var x = thumbnailArrayLength(userclick); // how many projects to show - calculated from .json current project array length

    document.getElementById("generate").innerHTML = ""; // clear the contents each time user clicks the category button (safety)
    thumbnails = ""; // clear the contents each time user clicks the category button
    thumbGroup = ""; // clear the contents each time user clicks the category button

    h2Class = jsonObj.projects[userclick].Header.h2Class;
    h2Title = jsonObj.projects[userclick].Header.h2Title;
    h2Description = jsonObj.projects[userclick].Header.h2Description;
    aTarget = "_blank";
    imgExt = ".jpg";
    //backgroundImage = "style='background-image:url(\"default.png\")'";
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

        /* ----- Photography and Game Photography ----- */

        case 2:
        case 3:

        x = jsonObj.projects[userclick].Thumbnails.length; // total number of games calculated from array length
        thumbGroup = ""; // helper holding all thumbnails from each game

        for(i=0; i<x; i++)
        {
            aLink = jsonObj.projects[userclick].Thumbnails[i].aLink;
            pDescription = jsonObj.projects[userclick].Thumbnails[i].pDescription;
            figCaption = jsonObj.projects[userclick].Thumbnails[i].figCaption;
            numImages = jsonObj.projects[userclick].Thumbnails[i].photosAmount; // read number of photos from each game in .JSON
            parseInt(numImages); // convert string from .JSON to Int

            /* Generate all thumbnails from current game */

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

    document.getElementById("generate").innerHTML = pageStart + thumbnails + pageEnd;

    // initialize lazy load of images
    var bLazy = new Blazy({
        selector: 'img',
        container: '#generate'
    });

    bLazy.revalidate(); // fix for scripted load!
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
        document.getElementById(ninjaButton).innerHTML = "Close spoiler ▲";
        ninjaHidden = false;
    }
    else
    {
        $('#'+ninjaClick).hide(300);
        document.getElementById(ninjaButton).innerHTML = "Open spoiler ▼";
        ninjaClicked = false;
        ninjaHidden = true;
    }
}