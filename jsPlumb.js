<!DOCTYPE html>
<html ng-app="">
<head>
    <style>
        #diagramContainer {
            padding: 20px;
            width:80%; height: 150px;
            border: 1px solid gray;
        }
        
        .item {
            height:80px; width: 80px;
            border: 1px solid blue;
            float: left;
        }	
    </style>
</head>
<body>

    <div id="diagramContainer">
        <div id="item_left"  class="item"></div>
        <div id="item_right" class="item" style="margin-left:50px;"></div>
        <div id="item_rightMost" class="item" style="margin-left:100px;"></div>
    </div>
    
    <p>Drag from the left items endpoint and drop on the right items endpoint.</p>

    <p><a href="http://www.freedevelopertutorials.com/jsplumb-tutorial/introduction/">Visit the full jsPlumb-Tutorial</a> to learn it and see many more interesting examples.</p>

    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"></script>
    <script src="/wp-content/themes/twentytwelve/js/jsPlumb/jquery.jsPlumb-1.6.4-min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jsPlumb/2.5.8/js/jsplumb.min.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css">    
    
    <script>
        jsPlumb.ready(function() {
            jsPlumb.setContainer("diagramContainer");
          $(".item").resizable({
        resize : function(event, ui) {            
                jsPlumb.repaint(ui.helper);
            },
            handles: "all"
        });
            
            var common = {
              isSource:true,
              isTarget:true,
              connector: ["Straight"]
            };
            
            jsPlumb.addEndpoint("item_left", { 
              anchors:["Right"]
            }, common); 
            
            jsPlumb.addEndpoint("item_right", { 
              anchor:"Left"
            }, common);

            jsPlumb.addEndpoint("item_right", { 
              anchor:"Right" 
            }, common);
            
            jsPlumb.addEndpoint("item_rightMost", { 
              anchor:"Right" 
            }, common);
            
            jsPlumb.draggable("item_left");
            jsPlumb.draggable("item_right");
            jsPlumb.draggable("item_rightMost");
            
        });
    </script> 

</body>
</html>
