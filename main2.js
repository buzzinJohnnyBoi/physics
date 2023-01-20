var canvas = document.querySelector("#canvas1");
var ctx = canvas.getContext("2d");

var airtime = -2000/60;

var renderer = {
    w: window.innerWidth,
    h: window.innerHeight - 100,
    backgroundColor: "rgb(50, 50, 50)"
}

function update() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateCanvas();
    updateProjectiles();
    updateCamera();
    drawRuler();
    updateTimer();
}

function updateTimer() {
    if(airtime < 0) {
        var time = 0;
    }
    else {
        var time = (Math.round(airtime/10)/100).toPrecision(2);
    }
    document.querySelector(".timer").innerHTML = time + " s";
}

function updateCanvas() {
    renderer.w = window.innerWidth;
    renderer.h = window.innerHeight - 100;
    ctx.fillStyle = renderer.backgroundColor;
    ctx.fillRect(0, 0, renderer.w, renderer.h);
}

function run() {
    if(sim1.running) {
        sim1.running = false;
        document.querySelector("#run").innerHTML = "Start";
        projectiles[0].xv = Math.cos(projectiles[0].angle) * projectiles[0].vt;
        projectiles[0].yv = Math.sin(projectiles[0].angle) * projectiles[0].vt;
        sim1.stopped = false;
        sim1.landed = false;
        airtime = -2000/60;
        document.querySelector("#Pause").innerHTML = "Pause";   
    }
    else {
        sim1.running = true;
        document.querySelector("#run").innerHTML = "Start Over";
        projectiles[0].xv *= 3.74;
        projectiles[0].yv *= 3.74;
    }
}

function stop() {
    if(sim1.running) {
        if(sim1.stopped) {
            sim1.stopped = false;
            document.querySelector("#Pause").innerHTML = "Pause";   
        }
        else {
            sim1.stopped = true;
            document.querySelector("#Pause").innerHTML = "Unpause";
        }
    }
}

function updateProjectiles() {
    projectiles.forEach(i => {
        i.update(sim1);
    });
}

document.onkeydown = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32      
    ) {
      run();
    }
  }


projectiles[0].predict();


setInterval(update, 1000/60);

