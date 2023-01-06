var cam = {
    x: 250,
    y: 0,
    curscale: 1,
    scale: 1,
}

function updateCamera() {
    if(sim1.running == false) {
        cam.curscale += (cam.scale - cam.curscale);
        cam.x += (251 - (projectiles[0].x + cam.x - projectiles[0].r)/cam.curscale);
        cam.y += (renderer.h - 1 - projectiles[0].r/cam.curscale - (projectiles[0].y + cam.y)/cam.curscale);
    }
}