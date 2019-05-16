var jsonObj, h2Class, h2Title, h2Description, aLink, aTarget, pDescription, figCaption, backgroundImage, imgImage, imgExt, imgSize, numImages;
var aspectRatio = "16-9";
var thumbGroup = "", thumbnails = "";

function loadJSON(callback)
{   
    // new Http request object (asynchronous), both the web page and the XML file it tries to load, must be located on the same server.
    var xobj = new XMLHttpRequest(); 

    xobj.overrideMimeType("application/json");

    // Specifies the request
    /* method: the request type GET or POST
    url: the file location
    async: true (asynchronous) or false (synchronous)
    user: optional user name
    psw: optional password */
    xobj.open('GET', 'projects.json', true); // Replace 'my_data' with the path to your file

    // Defines a function to be called when the readyState property changes
    xobj.onreadystatechange = function GetResponseText() {
            if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            // Returns the response data as a string
            callback(xobj.responseText);
            }
    };
    // Sends the request to the server - Used for GET requests
    xobj.send(null);  
}

loadJSON(function JSONparse(response) {
    // Parse JSON string into object
        jsonObj = JSON.parse(response);
        //console.log(jsonObj);
    });

function thumbnailArrayLength(userclickcheck)
{
    return jsonObj.projects[userclickcheck].Thumbnails.length;
}

function blazyInit()
{
    // Initialize
    var bLazy = new Blazy();
}