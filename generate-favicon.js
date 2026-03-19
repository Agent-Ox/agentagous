const { createCanvas } = require('canvas');
const fs = require('fs');

const size = 64;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');

// Draw hexagon
ctx.beginPath();
const points = [
  [32, 4], [58, 18], [58, 46], [32, 60], [6, 46], [6, 18]
];
ctx.moveTo(points[0][0], points[0][1]);
points.forEach(p => ctx.lineTo(p[0], p[1]));
ctx.closePath();

// Gradient fill
const grad = ctx.createLinearGradient(0, 0, 64, 64);
grad.addColorStop(0, '#7C3AED');
grad.addColorStop(1, '#3B82F6');
ctx.fillStyle = grad;
ctx.fill();

// Letter A
ctx.fillStyle = 'white';
ctx.font = 'bold 26px sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('A', 32, 34);

// Green pulse dot
ctx.beginPath();
ctx.arc(52, 14, 7, 0, Math.PI * 2);
ctx.fillStyle = '#10B981';
ctx.fill();

// Save
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./app/favicon.png', buffer);
console.log('Favicon created!');
