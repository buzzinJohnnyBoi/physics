var sliders = document.querySelectorAll(".slider");
var info = document.querySelectorAll(".info");

sliders[0].oninput = function() {
    info[0].innerHTML = (this.value/10).toPrecision(2);
    sim1.speed = this.value/10;
}
sliders[1].oninput = function() {
    info[1].innerHTML = this.value/10;
    sim1.gravitationalConst = this.value/10;
}
sliders[2].oninput = function() {
    info[2].innerHTML = (this.value/10).toPrecision(2);
    sim1.dampness = this.value/10;
}
sliders[3].oninput = function() {
    if(!sim1.running) {
        info[3].innerHTML = this.value;
        projectiles[0].angle = degreesToRadians(this.value);
        projectiles[0].xv = Math.cos(projectiles[0].angle) * projectiles[0].vt;
        projectiles[0].yv = Math.sin(projectiles[0].angle) * projectiles[0].vt;
        projectiles[0].predict();
    }
    else {
        run();
    }
}

sliders[4].oninput = function() {
    if(!sim1.running) {
        info[4].innerHTML = (this.value/1).toPrecision(2);
        projectiles[0].vt = this.value;
        projectiles[0].xv = Math.cos(projectiles[0].angle) * projectiles[0].vt;
        projectiles[0].yv = Math.sin(projectiles[0].angle) * projectiles[0].vt;
        projectiles[0].predict();
    }
    else {
        run();
    }
}

function updateSliders() {
    sliders[0].value = sim1.speed * 10;
    sliders[1].value = sim1.gravitationalConst * 10;
    sliders[2].value = sim1.dampness * 10;
    sliders[3].value = radiansToDegrees(projectiles[0].angle);
    sliders[4].value = projectiles[0].vt;
    info[0].innerHTML = sliders[0].value/10;
    info[1].innerHTML = sliders[1].value/10;
    info[2].innerHTML = sliders[2].value/10;
    info[3].innerHTML = sliders[3].value;
    info[4].innerHTML = sliders[4].value;
}

updateSliders();