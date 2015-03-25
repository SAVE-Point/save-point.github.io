# [save-point.github.io](http://save-point.io)
This repository contains the static content for the [SAVE/Point website](http://save-point.io). The webpage was designed by [Stefano Meschiari](http://www.github.com/stefano-meschiari).

## Adding images to the kiosk slideshow
We are installing iPads to several floors in the department building (currently on 13th, more to follow). 
The iPads display a custom-designed dashboard to launch educational activities and games created and managed by our group
(you can see the dashboard running in a web browser at http://save-point-dev.herokuapp.com/dashboard/?login=kiosk). 

After a minute of inactivity, the iPads go into a "slideshow mode" -- a custom web app that displays a series of images
with a caption and an attribution. The images are scrolled if they don't fit the iPad's aspect ratio. The slides are
displayed in a random order. Tapping on the screen exits the slideshow and goes back into the dashboard.

Slides are pulled from:
  1. The HubbleSite and APOD RSS feed, through a custom parser;
  2. The [kiosk_news.yaml](kiosk_news.yaml) file in this repository.
  
*We encourage members of the UT department to add new images to the slideshow that showcase their latest research!* You can add
images to the slideshow either by sending us an email to savepoint@astro.as.utexas.edu, with the title of the image (no more than ~10 words), an attribution
line (e.g. your name and that of coauthors; affiliations; etc.), and the image itself (should be larger than 1024x768). 

Alternatively, you can add it yourself! Create a pull request for the [kiosk_news.yaml](kiosk_news.yaml) file, and add a new
entry at the top by following the existing structure of the file. The file is in the YAML format, and each slide is specified as follows:
```
- title: The title of the slide
  attrib: Attribution line
  img: http://link.to/theimage.jpg
```

(Note (1) the indentation on the lines; (2) images are only downloaded once, so it will not be pulling down the image from the server at every request.)

To run the screensaver inside your browser, go to http://save-point-dev.herokuapp.com/apps/screensaver/; to see a scrollable list of images currently loaded, go to http://save-point-dev.herokuapp.com/apps/screensaver/?showall=true.
