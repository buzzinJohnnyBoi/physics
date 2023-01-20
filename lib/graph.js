class graph {
    constructor(x, y, w, h, color, points) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.points = points;
        this.view = false;
    }
    update() {
        if(!this.view) {
            this.x = renderer.w - this.w;
            this.w = 140;
            this.h = 140;
        }
        else {
            this.w = (renderer.w - 250) - 40;
            this.x = 250 + 20;
            this.h = renderer.h - 75;
        }
        this.draw();
    }
    draw() {
        drawFillRect(this.x, this.y, this.w, this.h, this.color);
        if(this.points.length > 0) {
            const start = -this.points[0].time + 50;
            var scale = (this.w - 70) / this.points[this.points.length - 1].time;
            const middlePoint = Math.floor(this.points.length/2);
            var heightScale = 1;
            var bottom = -this.points[0].y * heightScale + this.h - 50;
            if(heightScale > 1) {
                heightScale = 1;
            }
            // if(this.view) {
            //     bottom = -this.points[0].y + this.h + 20;
            // }
            if(scale > 1000) {
                scale = 1;
            }
            for (let i = 0; i < this.points.length; i++) {
                const p = this.points[i];
                if(p.y < this.points[0].y) {
                    drawFillCircle((this.x + start) + p.time * scale, p.y * heightScale + this.y + bottom, 5, "blue")
                }
            }
            if(scale > 0) {
                if(this.view) {
                    var inc = this.w * scale / 20;
                }
                else {
                    var inc = this.w * scale;
                }
                for (let i = 0; i < Math.round((this.w - 50) / inc); i++) {
                    drawLine(inc * i + this.x + 50, this.y + this.h - 50, inc * i + this.x + 50, this.y + this.h - 30, "black");                
                }
            }
        }

        drawLine(50 + this.x, this.y, 50 + this.x, this.y + this.h - 50, "black");
        drawLine(50 + this.x, this.y + this.h - 50, this.x + this.w, this.y + this.h - 50, "black");

        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Time", this.x + 50, this.y + this.h - 10);

        ctx.save()
        ctx.translate(this.x + 20, this.y + this.h);
        ctx.rotate(-Math.PI/2);
        ctx.translate(-this.x + 20, -(this.y + this.h));
        
        ctx.fillText("Height", this.x + 20, this.y + this.h);

        ctx.translate(-this.x + 20, -(this.y + this.h));
        ctx.rotate(Math.PI/2);
        ctx.restore();
    }

}

var graph1 = new graph(0, 70, 140, 140, "white", [])