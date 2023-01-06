function drawRect(x, y, w, h, color, linewidth, context = ctx) {
    context.beginPath();
    context.lineWidth = "" + linewidth + "";
    context.strokeStyle = color;
    context.rect(x, y, w, h);
    context.stroke();
}
function drawFillRect(x, y, w, h, color, context = ctx) {
    context.beginPath();
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
    context.stroke();
}

function drawLine(x1, y1, x2, y2, color, linewidth, context = ctx) {
    context.lineWidth = "" + linewidth + "";
    context.strokeStyle = color;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

function drawCircle(x, y, r, color, linewidth, context = ctx) {
    context.beginPath();
    context.lineWidth = "" + linewidth + "";
    context.strokeStyle = color;
    context.arc(x, y, r, 0, 2 * Math.PI);
    context.stroke();
}

function drawFillCircle(x, y, r, color, context = ctx) {
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, r, 0, 2 * Math.PI);
    context.fill();

}

function drawPartCircle(x, y, radius, color, linewidth, angle1, angle2, context = ctx) {
    const startAngle = angle1;
    const endAngle = angle2;
    context.beginPath();
    context.lineWidth = "" + linewidth + "";
    context.strokeStyle = color;
    context.arc(x, y, radius, startAngle, endAngle, false);
    context.stroke();
    
}
//---------------------