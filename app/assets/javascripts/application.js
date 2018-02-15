// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require rails-ujs
//= require turbolinks
//= require_tree .

$(document).ready(function() {

	const imageInputField = $("#image-input");
	const dropzone = $("#dropzone");
	const image = $(".dropzone__image");
	const dropzoneInstructions = $("#dropzone__instructions");
	let file = null;
  
  console.log("jquery");


  dropzone.on("dragover", function(event){
  	console.log("Hovering");
  	 event.preventDefault();  
    event.stopPropagation();
  	$(".image-template").addClass("hovered-image-template");
 
  });
  dropzone.on("dragleave", function(event){
  	console.log("Leaving");
  	event.preventDefault();  
    event.stopPropagation();
  	$(".image-template").removeClass("hovered-image-template");
  
  });
 dropzone.on("drop", function(event){
  	console.log("Dropped");
  	event.preventDefault();
  	event.stopPropagation();
  	file = event.originalEvent.dataTransfer.files[0]
  	readImage();


  });


  $("#dropzone__select-button").on("click", function(){
  	console.log("Add Image");
  	imageInputField.click();
  });

  imageInputField.on("change", function(event){
  	console.log("Change");
  	event.preventDefault();  
    event.stopPropagation();
    file = imageInputField[0].files[0];
  	readImage();
  });

  function readImage(){
  
  	console.log("Image Read");
  	const reader = new FileReader();

	reader.onloadend = function () {
		console.log(image);
    	image[0].src = reader.result;
    	image.addClass("show");
    	dropzoneInstructions.addClass("hidden");
  	}
  	if (file){
  		reader.readAsDataURL(file);
  		console.log("File read");
  	}else{
  		image.src = "";
  	}

  	
  }


});


