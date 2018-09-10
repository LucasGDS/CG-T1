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

function cinza(sob) // Luminosidade:0.21 R + 0.72 G + 0.07 B ou L=0.3R+0.59G+0.11B?
{
  sob === 0 ? console.log("cinza"):console.log("arestas");
  let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
  for (let i = 0; i < imgData.data.length; i+=4)
  {
    let R = imgData.data[i];
    let G = imgData.data[i+1];
    let B = imgData.data[i+2];

    if (sob === 0)
    {
      var newcolor = Math.floor(0.21*R+0.72*G+0.07*B);
    }
    else
    {
      var newcolor = Math.floor(0.30*R+0.59*G+0.11*B);
    }
    imgData.data[i] = imgData.data[i+1] = imgData.data[i+2] = newcolor;
  }
  ctx.putImageData(imgData,0,0);
  
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
    let x = (i / 4) % canvas.width; //iterate on vector
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

function laplaciano()
//     [0 -1 0]
//     |-1 4-1|
//     [0 -1 0]
//
{
  let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
  let oldimgData = ctx.getImageData(0,0,canvas.width,canvas.height); 

  for (let i = 0; i < imgData.data.length; i+=4)
  {
    let x = (i / 4) % canvas.width;
    let y = Math.floor((i / 4) / canvas.width);

    if( x === 0 || y === 0 || x === canvas.width-1 || y === canvas.height-1) //edge case, skip iteration
    {
      continue;
    }

    let os12 = (x + (y-1)*canvas.width) * 4; 
    let os21 = ((x-1) + y*canvas.width) * 4; 
    let os23 = ((x+1) + y*canvas.width) * 4;  
    let os32 = (x + (y+1)*canvas.width) * 4; 
    
    for (let j = 0;j < 3; ++j) //one for each RGB
    {
      imgData.data[i+j] = (4*oldimgData.data[i+j]-oldimgData.data[os12+j]-oldimgData.data[os21+j]-oldimgData.data[os23+j]-oldimgData.data[os32+j]);
    }
  }

  ctx.putImageData(imgData,0,0);
  console.log("laplaciano");
}

function Sobel()
{
  cinza(1);
  //gaussiano(); //SE FOSSE NECESSARIO BASTARIA DESCOMENTAR

  let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
  let oldimgData = ctx.getImageData(0,0,canvas.width,canvas.height);
  let Gx = ctx.getImageData(0,0,canvas.width,canvas.height);
  let Gy = ctx.getImageData(0,0,canvas.width,canvas.height);

  for (let i = 0; i < imgData.data.length; i+=4)
  {
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
      Gx.data[i+j] = (-oldimgData.data[os11+j]
        +0
        +oldimgData.data[os13+j]
        -2*oldimgData.data[os21+j]
        +0
        +2*oldimgData.data[os23+j]
        -oldimgData.data[os31+j]
        +0
        +oldimgData.data[os33+j]);
    }

    for (let j = 0;j < 3; ++j) //one for each RGB
    {
      Gy.data[i+j] = (oldimgData.data[os11+j]
        +2*oldimgData.data[os12+j]
        +oldimgData.data[os13+j]
        -oldimgData.data[os31+j]
        -2*oldimgData.data[os32+j]
        -oldimgData.data[os33+j]);
    }
    
    for (let j = 0;j < 3; ++j) //one for each RGB
    {
      imgData.data[i+j] = Math.sqrt( (Gx.data[i+j]*Gx.data[i+j]) + (Gy.data[i+j] * Gy.data[i+j])); 
    }
  }

  ctx.putImageData(imgData,0,0);
  console.log("Sobel");
}

function LoG()
{
  cinza(1);
  gaussiano();
  laplaciano();
}

function corInv()
{
  let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
  for (let i = 0; i < imgData.data.length; i+=4)
  {
    imgData.data[i] = 255-imgData.data[i];
    imgData.data[i+1] = 255-imgData.data[i+1];
    imgData.data[i+2] = 255-imgData.data[i+2];
  }
  ctx.putImageData(imgData,0,0);
}