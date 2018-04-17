import  React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import  '../styles/style.scss';


function shape(props) {
    const {ctx, x, y, width, height, name} = props;

    switch(name){
    case "circle" :
                    ctx.beginPath();
                    ctx.arc(x + 100, y + 100, 50, 0, 2 * Math.PI);
                    ctx.stroke();
                    ctx.fillStyle = "#996633";
                    ctx.fill();
                    break;
    case "rectangle":
                      ctx.fillRect(x, y , width + 100, height);
                      ctx.fillStyle="#996633";
                      break;

    case "triangle" :

                      ctx.beginPath();
                      ctx.moveTo(10, 10);
                      ctx.lineTo(300, 150);
                      ctx.lineTo(10, 150);
                      ctx.lineTo(10, 10);
                      ctx.stroke();
                      ctx.fillStyle = "#996633";
                      ctx.fill();
                      break;
    case "square" :
                      ctx.fillRect(x + 100, y  + 100, width , height);
                      ctx.fillStyle="#996633";
                      break;

    }
}

class IndexForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      flag : true,
      X : 0,
      Y : 0
    }
  }



updateCanvas(e) {
    const ctx = this.refs.canvas.getContext('2d');

    var canvas = this.refs.canvas;
    var $canvas=$(".canvas");
    var canvasOffset=$canvas.offset();
    var offsetX=canvasOffset.left;
    var offsetY=canvasOffset.top;
    var scrollX=$canvas.scrollLeft();
    var scrollY=$canvas.scrollTop();

    shape({ctx, x: 50, y: 50, width: 100, height: 100, name : e.target.id});

    function handleMouseDown(e){
      e.preventDefault();

      // get the mouse position
      var mouseX=parseInt(e.clientX-offsetX);
      var mouseY=parseInt(e.clientY-offsetY);

      alert("X :" + mouseX +"Y : " + mouseY);

    }

    // listen for mousedown events
    $(canvas).mousedown(function(e){handleMouseDown(e);})


}




hideParent(){
  this.setState({flag : !this.state.flag});
}


render() {
     return (<div onClick={(e)=>{
     if (e.target.id){
     this.updateCanvas(e);
     }
     }}>
         <canvas ref="canvas" className="canvas" width={1292} height={520}/>
         <div className="box">
         <div className={this.state.flag?"parent":"hideParent"}>
         <div id="circle" className="ui-widget-header" >
          Circle
         </div>
         <div  id="triangle" className="ui-widget-header">
            Triangle
         </div>
         <div  id="square" className="ui-widget-header">
            Square
         </div>
         <div  id="rectangle" className="ui-widget-header">
            Rectangle
         </div>
              <div className={this.state.flag?"child":"hideChild"} onClick={() => {this.hideParent()}}>
          {this.state.flag?"HIDE>":"<SHOW"}
        </div>
        </div>
        </div>
         </div>
     );
}
}

export default IndexForm;
