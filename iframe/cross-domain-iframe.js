/* ======================================================================
 *  GTM Cross-Domain Messaging (Sanitized)
 *  This file was cleaned of vendor-specific references.
 *  Configure ALLOWED_ORIGINS and selectors/cookies for your project.
 * ====================================================================== */

/** ============================
 *  Cross-Domain Messaging Config
 *  ============================
 *  1) Add *exact* origins that you trust.
 *  2) Keep this list small and specific.
 */
const ALLOWED_ORIGINS = [
  window.location.origin,                  // same-origin (parent/iframe)
  'https://your-iframe-origin.example.com' // TODO: replace with your iframe origin
];


const TARGET_PARENT_ORIGIN = ALLOWED_ORIGINS.find(o => o !== window.location.origin) || '*';
function isAllowedOrigin(origin) {
  return ALLOWED_ORIGINS.includes(origin);
}


// BEGIN SOCCER SHOTS CODE ******************************************************************************************************************
// parse event and add the string to first input field
// window.addEventListener('message', function(event) {
  if (!isAllowedOrigin(event.origin)) { return; }

  if (!isAllowedOrigin(event.origin)) { return; }

//   let hiddenField = jQuery('input');
//   //hiddenField[0].style.visibility = "hidden" ;
//   console.log(event.data + " this is event.data11111");
//   console.log(event.data.indexOf('soccer') + " this is index of soccer");
//     if (event.data.indexOf('yourBrand /* placeholder; no functional dependency */') > -1 && event.data.indexOf('soccer') == -1){
//         hiddenField[0].value = event.data;
//         return true;
//         //return hiddenField[0].value = event.data;
//     }
//  });
// END SOCCER SHOTS CODE ******************************************************************************************************************





jQuery(function() {
setTimeout(function(){
//--> CODE TO CATCH, RECORD AND RELEASE IFRAME EVENTS TO GTM NEEDS 
//ANY ID, CLASS, EVENT, ECT... CAN GO HERE
    jQuery("#form button[data-role=submit]").click(function(){
    //	window.addEventListener('message', function(event) {
  if (!isAllowedOrigin(event.origin)) { return; }

  if (!isAllowedOrigin(event.origin)) { return; }

     // console.log("RIGHT AFTER CLICK " + event.data);
    //	});
      // THROWS 'fullPostWindow' TO FOOTER
      parent.postMessage('fullPostWindow', TARGET_PARENT_ORIGIN);
      //console.log(event.data + " fullPostWindow fired");
    
      try {
        window.addEventListener('message', function(event) {
  if (!isAllowedOrigin(event.origin)) { return; }

  if (!isAllowedOrigin(event.origin)) { return; }
 
          //console.log(this.location.href + " formid HERE");
          //THROWS MESSAGE BACK TO DATALAYER. event.data CHECKS TO MAKE SURE THE URL MATCHES. 'formSend' CAN BE ANY STRING BUT MUST MATCH DATALAYER ON PARENT WINDOW SCRIPT.
          var pass_data = {
            'event':'formSend',
            'location': this.location,
          };
          //console.log(event.data + " fullPostWindow fired");
          //console.log(pass_data + " = pass_data is complete");
          //console.log(pass_data.event + " = pass_data event is complete");
          //console.log(pass_data.location + " = pass_data location is complete");
          parent.postMessage(JSON.stringify(pass_data), event.data);
          //console.log(event.data + " postmessage complete");
          //REMOVES POSTMESSAGE DATA SO IT DOES NOT COMPILE.
          this.removeEventListener('message', arguments.callee, false);
        });	
      }
      catch(event) {
        console.log("Something went wrong...");
        window.console && window.console.log(event);
      }
    });
  }, 3000);
});
//--> END GTM CATCH AND RELEASE CODE
// jQuery("#id123-button-send").click(function(){parent.postMessage("fullPostWindow", TARGET_PARENT_ORIGIN);try{window.addEventListener("message",function(e){
  if (!isAllowedOrigin(e.origin)) { return; }

  if (!isAllowedOrigin(e.origin)) { return; }
var n={event:"formSend",location:this.location};parent.postMessage(JSON.stringify(n),e.data),this.removeEventListener("message",arguments.callee,!1)})}catch(e){console.log("Something went wrong..."),window.console&&window.console.log(e)}});
jQuery("#id123-button-send").click(function(){
  //	window.addEventListener('message', function(event) {
  if (!isAllowedOrigin(event.origin)) { return; }

  if (!isAllowedOrigin(event.origin)) { return; }

  	//	console.log("RIGHT AFTER CLICK " + event.data);
  //	});
    // THROWS 'fullPostWindow' TO FOOTER
    parent.postMessage('fullPostWindow', TARGET_PARENT_ORIGIN);
    //console.log(event.data + " fullPostWindow fired");
    try {
      window.addEventListener('message', function(event) {
  if (!isAllowedOrigin(event.origin)) { return; }

  if (!isAllowedOrigin(event.origin)) { return; }
 
       //console.log(this.location.href + " formid HERE");
        //THROWS MESSAGE BACK TO DATALAYER. event.data CHECKS TO MAKE SURE THE URL MATCHES. 'formSubmit' CAN BE ANY STRING BUT MUST MATCH DATALAYER ON PARENT WINDOW SCRIPT.
        var pass_data = {
          'event':'formSend',
          'location': this.location,
        };
        parent.postMessage(JSON.stringify(pass_data), event.data);
        //console.log(event.data + " postmessage complete");
        //REMOVES POSTMESSAGE DATA SO IT DOES NOT COMPILE.
        this.removeEventListener('message', arguments.callee, false);
      });	
    }
    catch(event) {
      console.log("Something went wrong...");
      window.console && window.console.log(event);
    }
  });


  // jQuery(function() {
  //   setTimeout(function(){
  //     //console.log("RIGHT AFTER CLICK " + event.data);
  //         parent.postMessage('fullPostWindow', TARGET_PARENT_ORIGIN);
  //           //console.log(" fullPostWindow fired");
  //           //
  //           try {
  //             window.addEventListener('message', function(event) {
  if (!isAllowedOrigin(event.origin)) { return; }

  if (!isAllowedOrigin(event.origin)) { return; }
 
  //              // console.log(this.location.href + " formid HERE");
  //               var pass_data = {
  //                 'event':'formSend',
  //                 'location': this.location,
  //               };
  //               parent.postMessage(JSON.stringify(pass_data), event.data);
  //               //console.log(event.data + " postmessage complete");
  //               this.removeEventListener('message', arguments.callee, false);
  //             });
  //           }
  //           catch(event) {
  //             console.log("Something went wrong...");
  //             window.console && window.console.log(event);
  //           }
  //     }, 8500);
  //   });