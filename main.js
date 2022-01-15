prediction1 = "";
prediction2 = "";
Webcam.set({
    width: 340,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');
function takesnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured" src="' + data_uri + '">';
    });
}
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/xQpK7VpQt/model.json', modelloaded);
function modelloaded() {
    console.log('modelloaded');
}
function speak() {
    var synth = window.speechSynthesis;
    speakdata_1 = "The first prediction is " + prediction1;
    speakdata_2 = "The second prediction is " + prediction2;
    var utterthis = new SpeechSynthesisUtterance(speakdata_1 + speakdata_2);
    synth.speak(utterthis);
}
function predictemotion() {
    img = document.getElementById("captured");
    classifier.classify(img, gotresult);
}

function gotresult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        document.getElementById("emotion_name_1").innerHTML = results[0].label;
        document.getElementById("emotion_name_2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if (prediction1 == "Happy") {
            document.getElementById("emoji_1").innerHTML = "&#128522;";
        }
        if (prediction1 == "sad") {
            document.getElementById("emoji_1").innerHTML = "&#128532;";
        }
        if (prediction1 == "Angry") {
            document.getElementById("emoji_1").innerHTML = "&#128548;";
        }


        if (prediction2 == "Happy") {
            document.getElementById("emoji_2").innerHTML = "&#128522;";
        }
        if (prediction2 == "sad") {
            document.getElementById("emoji_2").innerHTML = "&#128532;";
        }
        if (prediction2 == "Angry") {
            document.getElementById("emoji_2").innerHTML = "&#128548;";
        }
    }
    
}