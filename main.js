var noseX = 0;
var noseY = 0;
var difference = 0;
var leftWristX = 0;
var rightWristX= 0;
var textP5 = '';

function setup(){
    video = createCapture(VIDEO);
    video.size(550,500);

    canvas = createCanvas(700, 450);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function draw(){
    background('#D3D3D3');
    fill('#006400');
    stroke('#000000');
    strokeWeight(10);
    textSize(difference);
    text(textP5 , noseX , noseY);
}

function modelLoaded(){
    console.log('Loaded!');
}

function gotPoses(results , error){
    if(results.length > 0){
        console.log(results);

        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log('nose x and y = ' + noseX + ',' + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);
        textP5 = document.getElementById('text').value;

        console.log('all = ' + leftWristX + ',' + rightWristX + ',' + difference);
        console.log(textP5);
    }else{
        console.log(error);
    }
}