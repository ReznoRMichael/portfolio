function ProjectsGenerator(userclick)
{
    var x = thumbnailArrayLength(userclick); // how many projects to show - calculated from .json current project array length

    document.getElementById("generate").innerHTML = ""; // clear the contents each time user clicks the category button (safety)
    thumbnails = ""; // clear the contents each time user clicks the category button

    h2Class = jsonObj.projects[userclick].Header.h2Class;
    h2Title = jsonObj.projects[userclick].Header.h2Title;
    h2Description = jsonObj.projects[userclick].Header.h2Description;
    
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

    for(i=0; i<x; i++)
    {
        aLink = jsonObj.projects[userclick].Thumbnails[i].aLink;
        pDescription = jsonObj.projects[userclick].Thumbnails[i].pDescription;
        figCaption = jsonObj.projects[userclick].Thumbnails[i].figCaption;
        
        if(userclick > 0 && userclick < 4) backgroundImage = "style='background-image:url(\"default.png\")'";
        else backgroundImage = "style='background-image:url(\""+h2Class+"/"+h2Class+i+".png\")'";

        var thumbnail = [
            "<div class='col-sm-10 col-md-8 col-lg-6'>",
                "<a href='"+aLink+"' target='_blank'>",
                "<figure>",
                    "<div class='portfolio-img-16-9' "+backgroundImage+">",
                        "<div class='portfolio-img-16-9-overlay'>",
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



    //console.log(h2Class);

    document.getElementById("generate").innerHTML = pageStart + thumbnails + pageEnd;
}