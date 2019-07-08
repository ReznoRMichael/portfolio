/* ------------------------------------------------------------------------------- */

var ninjaClicked = false;
var ninjaHidden = true;

/**
 * Shows and hides the spoiler after clicking the button (using jQuery).
 * @param value number, used if there will be more than one spoiler on a page.
 */
function ninjaSpoiler(value)
{
    ninjaClicked = true;
    var ninjaClick = "ninjaClick" + value;
    var ninjaButton = "ninja" + value;

    if (ninjaClicked && ninjaHidden)
    {
        $('#' + ninjaClick).show(300);
        document.getElementById(ninjaButton).innerHTML = "Close Tech Spoiler ▲";
        ninjaHidden = false;
    }
    else
    {
        $('#' + ninjaClick).hide(300);
        document.getElementById(ninjaButton).innerHTML = "Open Tech Spoiler ▼";
        ninjaClicked = false;
        ninjaHidden = true;
    }
}

/* ------------------------------------------------------------------------------- */
