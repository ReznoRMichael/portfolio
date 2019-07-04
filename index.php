<!DOCTYPE html>
<html lang="en">

<?php include_once('header.html'); ?>

<!-- Container: Main Content -->

<div class="container-fluid">
    <div id="generate" class="content content-center">
        
        <div class="michaelreznor">

            <h2>Hi! My name is Michał Stefaniak.</h2>

            <p>This is a small website that I've written from scratch in HTML, CSS, JavaScript where I'm trying to organize my selected hobbies in 5 different categories: Programming, Graphics Design, Photography, Game Photography and Personal Technology Blog.</p>

            <p>The page is generating everything on-the-fly from a single JSON file in pure JavaScript using a single function that I've written by myself from zero.</p>

            <p>More info about me is organized on <a href="https://www.linkedin.com/in/michal-stefaniak/" target="_blank">my LinkedIn profile</a>.</p>

            <p><i>If you wish to go back to this text, just click the "Michael ReznoR's Projects" text on the top, or refresh the page.</i></p>

            <div class="orangebutton" onclick="ninjaSpoiler(0)" id="ninja0">Open Tech Spoiler ▼</div>
            <div class="ninjahiddenspoiler" id="ninjaClick0">
                <p><strong>This page:</strong><br>
                — HTML5, CSS, JavaScript, JSON, jQuery, Bootstrap 4 and a bit of PHP<br>
                — One-Page Design with header.html and footer.html included with PHP<br>
                — dynamic generation of titles, descriptions, thumbnails, links from one JSON file through a single function<br>
                — two-dimensional array in JSON file<br>
                — bLazy to lazy-load image files<br>
                — file-size web optimized .png and .jpg images (pingo, Irfanview)
                </p>
                <p>Problems to fix after gaining more knowledge:<br>
                — projects-main.js: line 230, issue with bLazy not loading any images on Chrome/Opera after first page load and on slower internet/devices
                </p>

                <p>Have fun! :)</p>
            </div>

        </div>
        
    </div> <!-- end content -->
</div> <!-- end container-fluid -->

<!-- Footer -->

<?php include_once('footer.html'); ?>
