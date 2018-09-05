//T1 CG - Lucas Gomes da Silva - 1312010
// ./npm install
// ./npm start 
// http://localhost:3000/
var canvas = document.getElementById('canvasantes');
var ctx = canvas.getContext('2d');

ctx.font = '48px serif';
ctx.fillText("escolha a imagem",50,100);

function drawimg(img)
{
  console.log(img.src);
  ctx.drawImage(img,0,0,canvas.width,canvas.height);
}

function cinza(img)
{
  let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
}