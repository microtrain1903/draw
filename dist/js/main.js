      //Manual Color override
      var favStrokeStyle ="";
      var favfillStyle="";

var draw = (function() {
    //variables for triangle
    var count = 0;


    //Get the height and width of the main we will use this set canvas to the full
    //size of the main element.
    var mWidth = document.querySelector('main').offsetWidth,
      mHeight = document.querySelector('main').offsetHeight,
  
      //Create the canvas
      canvas = document.createElement("canvas"),
  
      //Create the context
      ctx = canvas.getContext("2d"),
  
      //Create the initial bounding rectangle
      rect = canvas.getBoundingClientRect(),
  
      //current x,y position
      x=0,
      y=0,
  
      //starting x,y
      x1=0,
      y1=0,
  
      //ending x,y
      x2=0,
      y2=0;

      //Tracks the last x,y state
      lx = false;
      ly = false;

      isDrawing=false;

      //Current usable shape
      shape="";

  

    return{
        setIsDrawing: function(bool){
            isDrawing = bool;
        },
        getIsDrawing: function(){
            return isDrawing;
        },
        setShape: function(shp){
            shape = shp; 
        },
        getShape: function(){
            return shape;
        },
        draw: function(){
            ctx.restore();
            if(shape==='rectangle'){
                this.drawRect();
            }
            else if(shape==='line'){
                this.drawLine();
            }
            else if(shape==='circle'){
                this.drawCircle();
            }
            else if(shape==='path'){
                this.drawPath();
            }
            else if(shape==='triangle'){
                this.drawTriangle();
            }
            else if(shape==='flower'){
                this.drawFlower();
            }
            else{
                alert('Please choose a shape');
            }
            ctx.save();
        },
        //set x,y cords based on event data
        setXY: function(evt){
            //Track the last x,y position before setting the current position
            lx=x;
            ly=y;

            x = (evt.clientX - rect.left) - canvas.offsetLeft;
            y = (evt.clientY - rect.top) - canvas.offsetTop;
        },
        writeXY: function(){
            //Write the cord back to GUI
            document.getElementById('trackX').innerHTML = 'X: ' + x;
            document.getElementById('trackY').innerHTML = 'Y: ' + y;
        },
        setStart: function(){
            x1=x;
            y1=y;
        },
        setEnd: function(){
            x2=x;
            y2=y;
        },
        drawRect: function(){
            //Random fill color
            ctx.fillStyle = checkFill();
            ctx.strokeStyle = checkStyle();
            ctx.fillRect(x1,y1,(x2-x1),(y2-y1));
        },
        drawLine: function(){
            ctx.strokeStyle = checkStyle();//favStyle;//#'+Math.floor(Math.random()*16777215).toString(16);
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            ctx.stroke();
        },
        drawCircle: function(){
            ctx.strokeStyle = checkStyle();;//'#'+Math.floor(Math.random()*16777215).toString(16);
            ctx.fillStyle = checkFill();//favfill;//'#'+Math.floor(Math.random()*16777215).toString(16);            
            let a = (x1-x2);
            let b = (y1-y2);
            let radius = Math.sqrt( a*a + b*b);
            ctx.beginPath();
            ctx.arc(x1,y1, radius/2, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
        },
        drawPath: function(){
            //Start by using random fill colors.
            ctx.strokeStyle = checkStyle();//'#'+Math.floor(Math.random()*16777215).toString(16);
            ctx.beginPath();
            ctx.moveTo(lx,ly);
            ctx.lineTo(x,y);
            ctx.stroke();
        },
        drawTriangle: function(){
            ctx.fillStyle = checkFill();
            //Start by using random fill colors.
            ctx.strokeStyle = checkStyle();//'#'+Math.floor(Math.random()*16777215).toString(16);
            if(count == 0){
                ctx.beginPath();
                ctx.moveTo(x,y);
                count++

            }
            else if( count == 1){
                ctx.lineTo(x,y);
                count++

            }
            else if( count == 2){
                ctx.lineTo(x,y);
                ctx.closePath();
                ctx.stroke();
                count = 0;
                ctx.fill();
            }
        },
        drawFlower: function(){
              //Start by using random fill colors.
              ctx.strokeStyle = checkStyle();//'#'+Math.floor(Math.random()*16777215).toString(16);
              if(count == 0){
                  ctx.beginPath();
                  ctx.moveTo(x,y);
                  count++  
              }
              else if( count == 1){
                  ctx.lineTo(x,y);         
              }
              else if( count == 2){
                  ctx.lineTo(x,y);
                  ctx.closePath();
                  ctx.stroke();
                  count = 0;
              }
              count++
        },
        getCanvas: function(){
            return canvas;
        },
        init: function(){
            canvas.width = mWidth;
            canvas.height = mHeight;
            document.querySelector('main').appendChild(canvas);
        }
    };
})();  

draw.init();

//add mousemove listener to canvas
draw.getCanvas().addEventListener('mousemove', function(evt){
    draw.setXY(evt);
    draw.writeXY();
    if(draw.getShape()=='path' && draw.getIsDrawing()===true){
        draw.draw();
    }
}, false);

//set the starting position
draw.getCanvas().addEventListener('mousedown', function(){
    draw.setStart();
    draw.setIsDrawing(true);
}, false);

//set the starting position
draw.getCanvas().addEventListener('mouseup', function(){
    draw.setEnd();
    draw.draw();
    draw.setIsDrawing(false);
}, false);

document.getElementById('btnRect').addEventListener('click', function(){
    draw.setShape('rectangle');
}, false);

document.getElementById('btnLine').addEventListener('click', function(){
    draw.setShape('line');
}, false);

document.getElementById('btnCircle').addEventListener('click', function(){
    draw.setShape('circle');
}, false);

document.getElementById('btnPath').addEventListener('click', function(){
    draw.setShape('path');
}, false);

document.getElementById('btnTriangle').addEventListener('click', function(){
    draw.setShape('triangle');
    count =0;
}, false);

document.getElementById('btnFlower').addEventListener('click', function(){
    draw.setShape('flower');
    count = 0;
}, false);

document.getElementById('favFillStyle').addEventListener('click', function(){
        favFillStyle = document.getElementById('favFillStyle').value;
        //alert(favFillStyle);
}, false);

document.getElementById('favStrokeStyle').addEventListener('click', function(){
        favStrokeStyle = document.getElementById('favStrokeStyle').value;
        //alert(favStrokeStyle);
}, false);

var randomFillStyle = true;
var randomStrokeStyle = true;




document.getElementById('checkFillStyle').addEventListener('click', function(){
    if(document.getElementById("checkFillStyle").checked == false){
        randomFillStyle = true;  
    }    
    else{
        randomFillStyle = false;
    }
}, false);

document.getElementById('checkStrokeStyle').addEventListener('click', function(){
    if(document.getElementById("checkStrokeStyle").checked == false){
        randomStrokeStyle = true;
    }else{
        randomStrokeStyle = false;
    }
}, false);

function checkFill(){
    if(randomFillStyle == true){
        
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }
    else{
        //alert(favFillStyle);
        return favFillStyle;
    }
}

function checkStyle(){
    if(randomStrokeStyle == true){
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }
    else{
        //alert(favStrokeStyle);
        return favStrokeStyle;
    }
}

