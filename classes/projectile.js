var sim1 = {
    gravitationalConst: 9.8,
    dampness: 2,
    running: false,
    speed: 1,
    stopped: false,
    landed: false,
    trajectory: []
}

class projectile {
    constructor(x, y, r, vt, angle, mass, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vt = vt;
        this.angle = angle;
        this.xv = Math.cos(angle) * vt;
        this.yv = Math.sin(angle) * vt;
        this.mass = mass;
        this.color = color;
    }
    update(simulation) {
        var xstop = 250;
        if(!simulation.stopped) {
            if (simulation.running) {
                this.yv -= simulation.gravitationalConst / (1000/60) * simulation.speed;
        
                var x = (this.x + cam.x)/cam.curscale;
                var y = (this.y + cam.y)/cam.curscale;
                var r = this.r/cam.curscale;
    
                if(x - r < xstop || x + r > renderer.w) {
                    if(x - r < xstop) {
                        this.x += Math.abs(xstop - (x - r));
                    }
                    else {
                        this.x -= Math.abs(renderer.w - (x + r));
                    }
                    this.xv /= -simulation.dampness;
                }
                // if(renderer.h - (y + r) < 7 && airtime > 400) {
                //     if(!simulation.landed) {
                //         simulation.landed = true;
                //         console.log(airtime - 1000/60)
                //     }
                // }
                if(y + r > renderer.h) {
                    this.y -= Math.abs(renderer.h - (y + r));
                    this.yv /= -simulation.dampness;
                    if(!simulation.landed) {
                        simulation.landed = true;
                    }
                }
        
                if(Math.abs(y + r - renderer.h) < 1/cam.curscale && Math.abs(this.yv) < 1/cam.curscale) {
                    this.yv = 0;
                }
                if(Math.abs(this.xv) < 0.01) {
                    this.xv = 0;
                }
        
                this.x += this.xv * simulation.speed;
                this.y -= this.yv * simulation.speed;
                this.draw();
                if(!simulation.landed) {
                    airtime += (1000/60) * sim1.speed;
                    graph1.points.push({x: (this.x + cam.x - 250 - this.r), y: (this.y + cam.y) - renderer.h, time: airtime})
                }
            }
            else {
                this.draw();
                this.predict();
                drawPartCircle((this.x + cam.x)/cam.curscale, (this.y + cam.y)/cam.curscale, 50/cam.curscale, "white", 2, -this.angle, 0);
                drawLine((this.x + cam.x)/cam.curscale, (this.y + cam.y)/cam.curscale, (this.x + 100 + cam.x)/cam.curscale, (this.y + cam.y)/cam.curscale, "white", 2);
                drawLine((this.x + cam.x)/cam.curscale, (this.y + cam.y)/cam.curscale, (this.x + Math.cos(this.angle) * 100 + cam.x)/cam.curscale, (this.y - Math.sin(this.angle) * 100 + cam.y)/cam.curscale, "white");
    
            }
        }
        else {
            this.draw();

            drawLine((this.x + cam.x - this.r)/cam.curscale, (this.y + cam.y - 25)/cam.curscale - this.r/cam.curscale, 0, (this.y + cam.y - 25)/cam.curscale - this.r/cam.curscale, "white");
            drawLine((this.x + cam.x - this.r)/cam.curscale, (this.y + cam.y - 25)/cam.curscale - this.r/cam.curscale, (this.x + cam.x - this.r)/cam.curscale, (this.y + cam.y)/cam.curscale - this.r/cam.curscale, "white");
            drawLine(251, (this.y + cam.y - 25)/cam.curscale - this.r/cam.curscale, 251, (this.y + cam.y)/cam.curscale - this.r/cam.curscale, "white");


            drawLine((this.x + cam.x + 50)/cam.curscale, (this.y + cam.y)/cam.curscale + this.r/cam.curscale, (this.x + cam.x + 50)/cam.curscale, renderer.h, "white");
            drawLine((this.x + cam.x + 25)/cam.curscale, (this.y + cam.y)/cam.curscale + this.r/cam.curscale, (this.x + cam.x + 50)/cam.curscale, (this.y + cam.y)/cam.curscale + this.r/cam.curscale, "white");
            drawLine((this.x + cam.x + 25)/cam.curscale, renderer.h - 1, (this.x + cam.x + 50)/cam.curscale, renderer.h - 1, "white");
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.fillText((((renderer.h - (cam.y + this.r + this.y)/cam.curscale) * cam.curscale) / (3.73 * 100/6 * 3.74)).toPrecision(2) + " m", (this.x + cam.x + 70)/cam.curscale, (renderer.h - (this.y + cam.y)/cam.curscale)/2 + (this.y + cam.y)/cam.curscale);

            ctx.fillText(((((cam.x - this.r + this.x)/cam.curscale - 250) * cam.curscale) / (3.73 * 100/6 * 3.74)).toPrecision(2) + " m", ((this.x + cam.x + 50)/cam.curscale - 251)/2 + 251, (this.y + cam.y - 25)/cam.curscale - this.r/cam.curscale - 20);
        }
    }
    predict() {
        var time = 2 * this.yv / (sim1.gravitationalConst);
        var height = time * this.yv / 4;
        var dist = time * this.xv;

        // drawFillCircle((this.x + dist/2 * 3.74 * 100/6 * 3.74 + cam.x)/cam.curscale, (this.y - height * 3.74 * 100/6 * 3.74 + cam.y)/cam.curscale, this.r/cam.curscale, this.color);
        // drawFillCircle((this.x + dist * 3.74 * 100/6 * 3.74 + cam.x)/cam.curscale, (this.y + cam.y)/cam.curscale, this.r/cam.curscale, this.color);

        drawCircle((this.x + dist/2 * 3.73 * 100/6 * 3.74 + cam.x)/cam.curscale, (this.y - height * 3.73 * 100/6 * 3.74 + cam.y)/cam.curscale, this.r/cam.curscale, this.color, 5)
        drawCircle((this.x + dist * 3.73 * 100/6 * 3.74 + cam.x)/cam.curscale, (this.y + cam.y)/cam.curscale, this.r/cam.curscale, this.color);

        pretime = time * 1000;
        document.querySelector("i5").innerHTML = "Time of flight: " + time.toPrecision(2) + " s";
        document.querySelector("i6").innerHTML = "Maximum Height: " + height.toPrecision(2) + " m";
        document.querySelector("i7").innerHTML = "Horizontal Distance (Range): " + dist.toPrecision(2) + " m";

        if(clamp(1, 100, (dist * 3.73 * 100/6 * 3.74 + 300 * dist/3)/renderer.w) > clamp(1, 100, (height * 3.73 * 100/6 * 3.74 + 300 * height/3)/renderer.h)) {
            cam.scale = clamp(1, 100, (dist * 3.73 * 100/6 * 3.74 + 300 * dist/3)/renderer.w);
        }
        else {
            cam.scale = clamp(1, 100, (height * 3.73 * 100/6 * 3.74 + 300 * height/3)/renderer.h);
        }
        updateCamera();
    }
    draw() {
        drawFillCircle((this.x + cam.x)/cam.curscale, (this.y + cam.y)/cam.curscale, this.r/cam.curscale, this.color);
    }
}

var pretime = 0;
var projectiles = [];

function addProjectile(x, y, r, vt, angle, mass, color) {
    angle = degreesToRadians(angle);
    projectiles.push(new projectile(x, y, r, vt, angle, mass, color));
}

addProjectile(300, 637, 20, 5, 45, 3, "blue");