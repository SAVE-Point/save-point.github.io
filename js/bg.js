"use strict";

var MAX_SPHERES = 5;
var SPHERE_RADIUS = 20;
var G = 10;
var dt = 1;
var spheres = [];
var $window = $(window);
var $canvas;
var canvas;
var ctx;
var center = {x : 0, y : 0};
var k = 0.0025;

function nextFrame() {
    // If the document is not focused, do not refresh the animation.
    // Also, only animate every other frame.
    if (!document.hasFocus()) {
        window.requestAnimationFrame(nextFrame);
        return;
    }

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    $canvas.width(width);
    $canvas.height(height);
    
    ctx.clearRect(0, 0, width, height);

    var i;
    // check if any of the spheres is out of view

    spheres = _.filter(spheres, function(sphere) {
        if (((sphere.x > width || sphere.x < 0) || (sphere.y > height || sphere.y < 0)))
            return false;
        return true;
    });

    if (spheres.length < MAX_SPHERES) {
        var l = MAX_SPHERES-spheres.length;
        for (i = 0; i < l; i++) {
            
            var sphere = {
                x: width * Math.random(),
                y: height * Math.random(),
                u: (1-2*Math.random()) * 2,
                v: (1-2*Math.random()) * 2,
                col: "rgba(" + ((Math.random()*130+125)|0) + "," +
                    ((Math.random()*130+125)|0) + "," +
                    ((Math.random()*130+125)|0) + ",",
                alpha: 0
            };
            spheres.push(sphere);
        }
    }
    //console.log(spheres);
    
    for (i = 0; i < spheres.length; i++) {
        var s = spheres[i];
        ctx.fillStyle = s.col + s.alpha + ")";
        ctx.beginPath();
        ctx.arc(s.x | 0, s.y | 0, SPHERE_RADIUS, 0, 2 * Math.PI, false);
        
        ctx.fill();
        if (s.alpha < 0.2)
            s.alpha += 0.001;

        var a = Math.pow((center.x - s.x)*(center.x - s.x) + (center.y - s.y)*(center.y - s.y), 1)/G;
        var ax = -(s.x - center.x)/a;
        var ay = -(s.y - center.y)/a;

        s.x += s.u * dt;
        s.y += s.v * dt;
        s.u += (ax - k*s.u) * dt;
        s.v += (ay - k*s.v) * dt;
    }


    window.requestAnimationFrame(nextFrame);
}

var backgrounds = {
    '#save-brand': 'img/bg2.jpg',
    '#save-games': 'img/bg-games.jpg',
    '#save-apps': 'img/bg-apps.jpg',
    '#save-about': 'img/bg-about.jpg'
};

function styleBackground() {
    var height = window.innerHeight;
    var cssBackground = _.map(backgrounds, function(img, el) {
        var y = $(el).offset().top-20;

        $(el).css('min-height', height);
        
        return 'url(' + img + ') 0px ' + y + "px no-repeat";
    });

    
    $("html").css('background', cssBackground.join());
    $("html").css('background-color', 'black');
    $("html").css('background-size', window.innerWidth + "px");
    
    $(".save-jump").attr('data-uk-smooth-scroll', "{offset:" + ($("#save-navigator").height()+10) + "}");
}

$(document).ready(function() {
    // If this function is not present, the browser is probably too old and we should not do
    // any animations...
    if (!window.requestAnimationFrame)
        return;

    // Store jQuery ref. to canvas and canvas context
    $canvas = $("#cover");
    canvas = $canvas[0];
    ctx = canvas.getContext('2d');
    canvas.style.width = $window.width() + "px";    
    canvas.style.height = $window.height() + "px";
    canvas.width = "2000";
    canvas.height = "2000";


    // Make massive object follow mouse, or clicks (for mobile)
    $(document).on("touch mousemove", function(e) {
        center.x = e.clientX;
        center.y = e.clientY;
    });

    center.x = $window.width() * 0.5;
    center.y = $window.height() * 0.5;

    // Move background images so that they are placed above the sections
    $(window).resize(styleBackground);
    _.defer(styleBackground);
    _.delay(styleBackground, 1000);

    // Animation code
    window.requestAnimationFrame(nextFrame);
});

