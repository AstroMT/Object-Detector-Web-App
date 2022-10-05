objectDetector = "";

function backToHome() {
    window.location = "index.html";
}

img = "";
current_status = "";
objects = [];

function preload() {
    img = loadImage("dining_room.jpg");
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
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    current_status = true;
    objects = results;

}

function draw() {
    if (current_status != undefined) {

        image(img, 0, 0, 500, 400);
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Finished detecting objects";

            fill("red");

            percent = floor(objects[i].confidence * 100).toFixed(2);
            confidence_label = " " + percent + "%"

            text(objects[i].label + confidence_label, objects[i].x + 10, objects[i].y + 10);

            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            document.getElementById("update_info").innerHTML = "<label class='info'> There was " + objects.length + " object(s) in this image </label>"
        }
    }
}