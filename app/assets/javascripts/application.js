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
	const imageTemplate = $(".image-template");
	const inputContainer = $("#input-container");
	const dropzone = $("#dropzone");
	const image = $(".dropzone__image");
	const dropzoneInstructions = $("#dropzone__instructions");
	const dropzoneOptions = $(".dropzone__options");
	const deleteOptions = $(".dropzone__delete-options");
	const deleteOption = $("#dropzone__delete-option");
	const descriptionOption = $("#dropzone__description-option");
	const cancelButton = $("#dropzone__cancel-button");
	const deleteButton = $("#dropzone__delete-button");
	let file = null;
	let userDropped = false;
	let optionsHidden = false;
  
  console.log("jquery");


  dropzone.on("dragover", function(event){
  	console.log("Hovering");
  	 event.preventDefault();  
    event.stopPropagation();
  	$(".image-template").addClass("grey-background");
 
  });
  dropzone.on("dragleave", function(event){
  	console.log("Leaving");
  	event.preventDefault();  
    event.stopPropagation();
  	imageTemplate.removeClass("grey-background");
  
  });
 dropzone.on("drop", function(event){
  	console.log("Dropped");
  	event.preventDefault();
  	event.stopPropagation();
  	file = event.originalEvent.dataTransfer.files[0]
  	console.log(file);
  	readImage();
  });


  $("#dropzone__select-button").on("click", function(){
  	console.log("Add Image");
  	imageInputField[0].value = null;
  	imageInputField.click();
  });

  imageInputField.on("change", function(event){
  	console.log("Change");
  	event.preventDefault();  
    event.stopPropagation();
    file = imageInputField[0].files[0];
    console.log(imageInputField[0].value);
  	readImage();
  	return false;
  });

  imageTemplate.on("mouseenter", function(){

  	console.log(userDropped, optionsHidden, inputContainer.hasClass("hidden"));

  	if (userDropped && !optionsHidden && inputContainer.hasClass("hidden")){
  		console.log("Mouse Over");
  		dropzoneOptions.addClass("show-flex");
  		descriptionOption.addClass("show-inline-flex");
  		descriptionOption.removeClass("hidden");
  	}else if(userDropped && !optionsHidden && inputContainer.hasClass("show") ){
  		dropzoneOptions.addClass("show-flex");
  		descriptionOption.addClass("hidden");
  		descriptionOption.removeClass("show-inline-flex");
  	}
  });
  imageTemplate.on("mouseleave", function(){

  	if (userDropped){
  		console.log("Mouse Leave");
  		dropzoneOptions.removeClass("show-flex");
  	}
  });


  deleteOption.on("click", function(){
  	optionsHidden = true;
  	dropzoneOptions.removeClass("show-flex");
  	deleteOptions.addClass("show-flex");
  	deleteOptions.removeClass("hidden");
  	
  });

  descriptionOption.on("click", function(){
  	inputContainer.removeClass("hidden");
  	inputContainer.addClass("show");
  	dropzoneOptions.removeClass("show-flex");
  });

  cancelButton.on('click', function(){
      optionsHidden = false;
      deleteOptions.addClass("hidden");
      deleteOptions.removeClass("show-flex");
   });

  deleteButton.on("click", function(){
  	 optionsHidden = false;
     userDropped = false;
     deleteOptions.addClass("hidden");
     deleteOptions.removeClass("show-flex");
     image[0].src = "";
     image.removeClass("show");
     dropzoneInstructions.removeClass("hidden");
     imageTemplate.removeClass("white-background");
     inputContainer.addClass("hidden");
  	 inputContainer.removeClass("show");

  });




  function readImage(){
  
  	console.log("Image Read");
  	const reader = new FileReader();
  	userDropped = true;
	reader.onloadend = function () {
		
		console.log(image);
    	image[0].src = reader.result;
    	image.addClass("show");
    	dropzoneInstructions.addClass("hidden");
    	imageTemplate.addClass("white-background");
    	imageTemplate.removeClass("grey-background");

  	}
  	if (file){
  		reader.readAsDataURL(file);
  		console.log("File read");
  	}else{
  		image.src = "";
  	}

  }


});


