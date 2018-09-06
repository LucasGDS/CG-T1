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

function cinza() // Luminosidade:0.21 R + 0.72 G + 0.07 B ou L=0.3R+0.59G+0.11B?
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
  console.log("cinza");
}

function gaussiano() // mascara 3x3
//      [121]
//  1/16|242|
//      [121]
{
  let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
  let oldimgData = imgData;

  for (let i = 0; i < imgData.data.length; i+=4)
  {
    let rgbponderado;

    let x = (i / 4) % canvas.width;
    let y = Math.floor((i / 4) / canvas.width);

    if( x === 0 || y === 0 || x === canvas.width-1 || y === canvas.height-1) //edge case, skip iteration
    {
      continue;
    }

    let os11 = ((x-1) + (y-1)*canvas.width) * 4; //offset11    
    let os12 = (x + (y-1)*canvas.width) * 4;
    let os13 = ((x+1) + (y-1)*canvas.width) * 4; 
    let os21 = ((x-1) + y*canvas.width) * 4; 
    let os23 = ((x+1) + y*canvas.width) * 4; 
    let os31 = ((x-1) + (y+1)*canvas.width) * 4; 
    let os32 = (x + (y+1)*canvas.width) * 4; 
    let os33 = ((x+1) + (y+1)*canvas.width) * 4;
    
    for (let j = 0;j < 3; ++j) //one for each RGB
    {
      imgData.data[i+j] = 1/16*(oldimgData.data[os11+j]
        +2*oldimgData.data[os12+j]
        +oldimgData.data[os13+j]
        +2*oldimgData.data[os21+j]
        +4*oldimgData.data[i+j]
        +2*oldimgData.data[os23+j]
        +oldimgData.data[os31+j]
        +2*oldimgData.data[os32+j]
        +oldimgData.data[os33+j]);
    }
  }

  ctx.putImageData(imgData,0,0);
  console.log("gauss");
}
