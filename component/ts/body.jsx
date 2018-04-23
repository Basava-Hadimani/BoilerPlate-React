import { h, render, Component } from 'preact';
import Jcrop from 'jcrop';
import Modal from './modal.jsx';

var number = 0;
var image1 = false;
var image2 = false;
var image3 = false;

export default class Body extends Component{
   constructor(props) {
      super(props)
      this.state = {
      isModalOpen: false
       }
    }



	imageUpload(id){

		$(function () {
    	$(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        	}
    		});
		})

		function imageIsLoaded(e){

			switch(id.target.__preactattr_.class){
				case 'upload1' :

								$('#myImg1').attr('src', e.target.result);

               					 $(function(){

               					 $('#myImg1').Jcrop({
									onChange: showPreview,
									onSelect: showPreview,
               						aspectRatio: 4/3
               					 });



                    			function showPreview(c){
                        image1 = true;
									console.log(c);
						    		if(parseInt(c.w) > 0) {
						        		var imageObj = $("#myImg1")[0];
						        		var canvas = $("#canvas1")[0];
						       		    var context = canvas.getContext("2d");
						        		context.drawImage(imageObj, c.x  , c.y  , c.w  , c.h , 0, 0, canvas.width, canvas.height);

						        		}
						        	}
						        });
								break;

				case 'upload2' :
								$('#myImg2').attr('src',e.target.result);


                               	 $(function(){

                               		$('#myImg2').Jcrop({
                					onChange: showPreview,
                					onSelect: showPreview,
                               		aspectRatio: 4/3
                               		});



                                   function showPreview(c){
                                    image2 = true;
                						console.log(c);
                						if(parseInt(c.w) > 0) {
                 						     var imageObj = $("#myImg2")[0];
                						     var canvas = $("#canvas2")[0];
                						     var context = canvas.getContext("2d");
                						      context.drawImage(imageObj, c.x  , c.y  , c.w  , c.h , 0, 0, canvas.width, canvas.height);

                						      }
                						      }
                				});
								break;

				case 'upload3' :

                        		$('#myImg3').attr('src', e.target.result);

                                 $(function(){

                                	 $('#myImg3').Jcrop({
                        			 onChange: showPreview,
                        			 onSelect: showPreview,
                                 	 aspectRatio: 4/3
                                 	});



                                 function showPreview(c){
                                  image3 = true;
                       			 console.log(c);
                          		 if(parseInt(c.w) > 0) {
                           		 var imageObj = $("#myImg3")[0];
                            	 var canvas = $("#canvas3")[0];
                                 var context = canvas.getContext("2d");
                                 context.drawImage(imageObj, c.x  , c.y  , c.w  , c.h , 0, 0, canvas.width, canvas.height);

                                }
                               }
                              });
							  break;
			}

		};

	}

openModal(Number) {
  	number = Number
       this.setState({ isModalOpen: true })
}

closeModal() {
    this.setState({ isModalOpen: false })
}

saveImage(id){

var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");
var canvas3 = document.getElementById("canvas3");

var image1URL = canvas1.toDataURL("image/png").replace("image/png", "image/octet-stream");
var image2URL = canvas2.toDataURL("image/png").replace("image/png", "image/octet-stream");
var image3URL = canvas3.toDataURL("image/png").replace("image/png", "image/octet-stream");

switch(id){
case 1 :
console.log(image1);
      if(image1){
      window.location.href=image1URL;
      }
      break;

case 2 :
console.log(image2);
        if(image2){
        window.location.href=image2URL;
        }
        break;
case 3 :
console.log(image3);
          if(image3){
          window.location.href=image3URL;
          }
          break;

}





}

 	render(){
 	return(
 		<div id="body" class="container" onClick={(e)=>{this.imageUpload(e)}}>
 		<div class="row imageBox">

 			<div class="image1  col-4">
 			<button class="uploadImage1" onClick={() => this.openModal(1)}>Upload image 1</button>
 			</div>

      		<div class="image1  col-4">
     	    <button class="uploadImage2" onClick={() => this.openModal(2)}>Upload image 2</button>
            </div>

      		<div class="image1  col-4">
      		<button class="uploadImage3" onClick={() => this.openModal(3)}>Upload image 3</button>
      		</div>


 			</div>


 			<canvas  id="canvas1"  width={400} height={300}/>
      		<canvas  id="canvas2"  width={400} height={300}/>
      		<canvas  id="canvas3"  width={400} height={300}/>

			<div>

          	<Modal number = {number} isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          	<div class={(number===1)?"Image1":(number===2)?"Image2":"Image3"}>
     			<img id={(number===1)?"myImg1":(number===2)?"myImg2":"myImg3"} src="#"/>
     			<input type="file" name="pic" accept="image/*" class={(number===1)?"upload1":(number===2)?"upload2":"upload3"}>Upload</input>
     		</div>
            	<p><button id="crop" onClick={() => this.closeModal()}>Crop</button></p>
          	</Modal>
        	</div>

 			<button onClick={()=>{this.saveImage(1)}} class="save1 mdc-button">Save Image 1</button>
      <button onClick={()=>{this.saveImage(2)}} class="save2 mdc-button">Save Image 2</button>
      <button onClick={()=>{this.saveImage(3)}} class="save3 mdc-button">Save image 3</button>
        	</div>
 	);
 	}

 }
