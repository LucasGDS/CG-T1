//T1 CG - Lucas Gomes da Silva - 1312010
// ./npm install
// ./npm start 
// http://localhost:3000/
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.font = '48px serif';
ctx.fillText("escolha a imagem",50,100);

function drawimg(img)
{
  ctx.drawImage(img,0,0,canvas.width,canvas.height);
}

function cinza() // Luminosidade:0.21 R + 0.72 G + 0.07 B
{
  let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
  for (let i = 0; i < imgData.data.length; i+=4)
  {
    let R = imgData.data[i];
    let G = imgData.data[i+1];
    let B = imgData.data[i+2];

    var newcolor = Math.floor(0.21*R+0.72*G+0.07*B);
    imgData.data[i] = imgData.data[i+1] = imgData.data[i+2] = newcolor;
  }
  ctx.putImageData(imgData,0,0);
  console.log("putImage");
}

function gaussiano() // mascara 3x3
{
  
}
