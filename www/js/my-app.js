// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})
myApp.onPageInit('scanner', function (page) {
    // Do something here for "about" page
    //myApp.alert('welocme');
})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'scanner') {
        // Following code will be executed for page with data-page attribute equal to "about"
        //myApp.alert('Here comes About page');
      //  console.log('App ready');
          $( "#qrScanBtn" ).click(function() {
            doScan();
        });
    }
    if (page.name === 'camera') {
        // Following code will be executed for page with data-page attribute equal to "about"
        //myApp.alert('Here comes About page');
      //  console.log('App ready');
        $(function(){
          function camSuccess(imgData) {
            $("#img_camPH").attr("src",imgData);

          }
          function camError(error) {
            alert(error);
          }
          function accessCamera() {
            var options = { destinationType: Camera.DestinationType.FILE_URI,
              sourceType: Camera.PictureSourceType.CAMERA
            };
            navigator.camera.getPicture(camSuccess,camError, options);
          }
          $("#btn_camera").on("click",accessCamera);
        });

    }

});
function doScan(){
  alert('called');
  cordova.plugins.barcodeScanner.scan(
    function (result) {
      alert("We got a barcode\n" +
        "Result: " + result.text + "\n" +
        "Format: " + result.format + "\n" +
        "Cancelled: " + result.cancelled);
      },
      function (error) {
      alert("Scanning failed: " + error);
      }
  );
}

// Option 2. Using live 'pageInit' event handlers for each page
/*
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})
$$(document).on('pageInit', '.page[data-page="scanner"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})*/
