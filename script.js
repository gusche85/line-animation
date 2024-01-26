
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const lineCoordinates = [
    { startX: 97, startY: 433, endX: 97, endY: 197 }, //1
    { startX: 97, startY: 197, endX: 600, endY: 197 },

    { startX: 203, startY: 433, endX: 203, endY: 210 }, //2
    { startX: 203, startY: 210, endX: 600, endY: 210 },

    { startX: 306, startY: 433, endX: 306, endY: 225 }, //3
    { startX: 306, startY: 225, endX: 600, endY: 225 },

    { startX: 409, startY: 433, endX: 409, endY: 240 }, //4
    { startX: 409, startY: 240, endX: 600, endY: 240 },

    { startX: 510, startY: 433, endX: 510, endY: 255 }, //5
    { startX: 510, startY: 255, endX: 600, endY: 255 },

    { startX: 1332, startY: 433, endX: 1332, endY: 197 }, //13
    { startX: 1332, startY: 197, endX: 840, endY: 197 },

    { startX: 1227, startY: 433, endX: 1227, endY: 210 }, //12
    { startX: 1227, startY: 210, endX: 840, endY: 210 },

  { startX: 1125, startY: 433, endX: 1125, endY: 225 }, //11
  { startX: 1125, startY: 225, endX: 840, endY: 225 },

  { startX: 1024, startY: 433, endX: 1024, endY: 240 }, //10
  { startX: 1024, startY: 240, endX: 840, endY: 240 },

  { startX: 920, startY: 433, endX: 920, endY: 255 }, //9
  { startX: 920, startY: 255, endX: 840, endY: 255 },

  { startX: 820, startY: 433, endX: 820, endY: 350 }, //8
  { startX: 820, startY: 350, endX: 770, endY: 304 },

  { startX: 616, startY: 433, endX: 616, endY: 350 }, //7
  { startX: 616, startY: 350, endX: 670, endY: 304 },

  { startX: 718, startY: 433, endX: 718, endY: 360},
  { startX: 718, startY: 360, endX: 718, endY: 300 },
];

let dots = lineCoordinates.map(line => ({
    position: { x: line.startX, y: line.startY },
    direction: 1,
    t: 0
}));

let speed = 0.005; // Determines the speed of the dot's movement

function drawDot(x, y, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, 5, 0, Math.PI * 2);
    context.fill();
}

function drawLines() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each line
    lineCoordinates.forEach(line => {
        context.beginPath();
        context.moveTo(line.startX, line.startY);
        context.lineTo(line.endX, line.endY);
        context.stroke();
    });

    // Draw dots on each line
    dots.forEach(dot => {
        drawDot(dot.position.x, dot.position.y, 'transparent');
    });
}

let tValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // One per dot
//let speed = 0.005; // The speed of the dots

function animateDot() {
    //context.clearRect(0, 0, canvas.width, canvas.height);
    drawLines(); // Assume this function draws static lines and it's already defined

    // Animate each dot from the end of the second line to the start of the first line
    for (let i = 0; i < lineCoordinates.length; i += 2) {
        const line1 = lineCoordinates[i];
        const line2 = lineCoordinates[i + 1];
        const tIndex = i / 2;
        let dotPosition;

        if (tValues[tIndex] < 1) {
            // Move along the first line
            dotPosition = {
                x: line1.endX - tValues[tIndex] * (line1.endX - line1.startX),
                y: line1.endY - tValues[tIndex] * (line1.endY - line1.startY)
            };
        } else {
            // Move along the second line (subtracting as we are moving in the opposite direction)
            const t = tValues[tIndex] - 1;
            dotPosition = {
                x: line2.endX + t * (line2.startX - line2.endX),
                y: line2.endY + t * (line2.startY - line2.endY)
            };
        }

        tValues[tIndex] += speed;

        // Reset t and switch to the next line segment pair once the dot reaches the end of the second line
        if (tValues[tIndex] >= 2) {
            tValues[tIndex] = 0;
        }

        drawDot(dotPosition.x, dotPosition.y, 'orange');
    }

    requestAnimationFrame(animateDot);
}

animateDot();
