var ruler = {
    x: 250,
    y: 0,
    color: "black",
    bgrdcolor: "rgb(255, 180, 111)"
}

function drawRuler() {
    drawFillRect(ruler.x, renderer.h, renderer.w - ruler.x, 100, ruler.bgrdcolor);
    ctx.fillStyle = ruler.color;
    ctx.font = "20px Arial";
    ctx.fillText("(meters)", 250 + 5, renderer.h + 90);
    ctx.font = "30px Arial";
    var increment = 3.74**2 * 100/6/2/cam.curscale * 2;
    var Iinc = 0.5;
    if(Math.floor(renderer.w/increment) > 10) {
        Iinc = Math.floor(Math.floor(renderer.w/increment)/10);
    }
    // if(Math.floor(renderer.w/increment) > 20) {
    //     Iinc = 2;
    // }

    drawLine(250, renderer.h, 250, renderer.h + 30, "black", 1);  
    ctx.fillText(0, 250 + 5, renderer.h + 60);




    for (let i = Iinc; i < Math.floor(renderer.w/increment); i+=Iinc) {
        drawLine(i * increment + 250, renderer.h, i * increment + 250, renderer.h + 30, "black", 1); 
        if(i % 1 == 0) {
            ctx.fillText(i, i * increment + 250 - 10, renderer.h + 60);
        }    
        else {
            ctx.fillText(i, i * increment + 250 - 20, renderer.h + 60);
        }
    }
    increment /= 5;
    for (let i = Iinc; i < Math.floor(renderer.w/increment); i+=Iinc) {
        drawLine(i * increment + 250, renderer.h, i * increment + 250, renderer.h + 20, "black", 1);
    }
}