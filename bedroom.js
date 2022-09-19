function backToHome() {
    window.location = "index.html";
}

img = "";
current_status = "";
objects = [];
 
function preload() {
    img = loadImage("bedroom.jpg");
}
 
function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}

function modelLoaded() {
    console.log("The COCOSsd model is loaded!");
    current_status = true;
    objectDetector.detect(img, gotResults);
}
 
function draw() {
    image(img, 0, 0, 500, 400);
 
    if (current_status != "") {
 
        for (var i = 0; i < objects.length; i++) {
            stroke("red");
            fill("red");
 
            percent = ((objects[i].confidence).toFixed(3)) * 100;
            confidence_label = " " + percent + "%"
 
            text(objects[i].label + confidence_label, objects[i].x + 10, objects[i].y + 10);
 
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);
 
            document.getElementById("status").innerHTML = "Finished detecting objects";
            document.getElementById("update_info").innerHTML = "<label class='info'> There were " + objects.length + " in this image </label>"
        }
    }
}
  
function gotResults(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        current_status = true;
        objects = results;
    }
}

