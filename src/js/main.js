var draw = (function() {

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
      //Current usable shape
      shape="";

    return{
        setShape: function(shp){
            shape = shp;
        },
        draw: function(){
            ctx.restore();
            if(shape==='rectangle'){
                this.drawRect();
            }
            else if(shape==='line'){
                this.drawLine();
            }
            else{
                alert('Please choose a shape');
            }
            ctx.save();
        },
        //set x,y cords based on event data
        setXY: function(evt){
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
            ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);            
            ctx.fillRect(x1,y1,(x2-x1),(y2-y1));
        },
        drawLine: function(){
            ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
            ctx.beginPath();
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            ctx.stroke();
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
}, false);

//set the starting position
draw.getCanvas().addEventListener('mousedown', function(){
    draw.setStart();
}, false);

//set the starting position
draw.getCanvas().addEventListener('mouseup', function(){
    draw.setEnd();
    draw.draw();
}, false);

document.getElementById('btnRect').addEventListener('click', function(){
    draw.setShape('rectangle');
}, false);

document.getElementById('btnLine').addEventListener('click', function(){
    draw.setShape('line');
}, false);
