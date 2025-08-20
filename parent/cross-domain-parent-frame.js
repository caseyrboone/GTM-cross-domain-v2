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

function isAllowedOrigin(origin) {
  return ALLOWED_ORIGINS.includes(origin);
}


// JavaScript Document\
//	**********************************************************************
//
//	Code is using Cross-Domain Messaging and was developed with the
//	postMessage API and eventListeners. The event listener domain
//	must be an exact match. Contents of the address bar(url) Has to
//	be passed to our .js file on 123Contact(child iframe) and then
//	after the url is confirmed the event is created and passed back
//	to the parent window where the code pulls the event and passes
//	it to google tag manager then to the proper analytics account.
//
//	some console logs have been left behind for future testing
//
//	files involved: (gta-1) or (ga-script).js that connects to 123contact and footer.php
//
//	Resources:
//  http://www.lunametrics.com/blog/2015/10/21/google-analytics-iframes-form-submissions/
//  https://davidwalsh.name/window-postmessage
//  http://buildingwebapps.blogspot.com/2012/04/removing-anonymous-event-listeners-in.html
//
//	*********************************************************************

//begin catch

(function (window) {

  addEvent(window, 'message', function (message) {

    // The namespace of the Data Layer is window.dataLayer by default,
    // but this CAN be changed; ensure that this is not customized


    var dataEvents = message.data.toString();
    //console.log(dataEvents.includes("formSend") + " this is the 'dataEvents.includes(formSend)'");

    var dataLayer = window.dataLayer || (window.dataLayer = []);

		// Safely instantiate dataLayer locally

    // The message.data value is arbitrary and can be customized
    console.log(dataEvents + " this is data");
    if (dataEvents.indexOf('formSend') > -1 || dataEvents.indexOf('mapClick') > -1 ) {

      var pass_data = JSON.parse(message.data);
      //console.log(pass_data + "this is pass_data");
      var string = pass_data.location.href;
      //console.log(string + "string pass_data.event href");

      if (string.indexOf("sfnew2") > -1) {
        var splitFormID = string.split('=true&s=').pop().split('&jsform=').shift();
        //console.log(splitFormID + " form id number1");
      } 
      else if (string.indexOf("metalocator") > -1) {
        var splitFormID = string.split('&Itemid=').pop().split('&tmpl=').shift();
        //console.log(splitFormID + " form id number2");
      }
      else if (string.indexOf("cloudlocatorsoftware") > -1) {
        var splitFormID = string.split('&Itemid=').pop().split('&tmpl=').shift();
        //console.log(splitFormID + " form id number2");
      }
      else {
        var splitFormID = string.split('username-').pop().split('.html?').shift();
        //console.log(splitFormID + " form id number2");
      }

      var protocol = location.protocol;
     // console.log(pass_data.location.origin + "THIS IS PASSDATA HREF");
     //console.log(protocol + "THIS IS PROTOCAL HREF");
     // console.log(pass_data.location.origin + " pass_data.location.origin");
     // console.log(pass_data.event + " pass_data.event");
      if (pass_data.event === 'formSend' && (isAllowedOrigin(pass_data.location.origin))) {
        // Check this is a whitelisted message & origin
        dataLayer.push({
          // The key 'event' is required for GTM; the value is arbitrary and can be customized
          'event': 'formSend' + splitFormID,
          'location': pass_data.location.href,
          //Notify GTM via pushing this event
          //THIS MUST MATCH THE gtm-1.js "parent.postMessage". DATALAYER PUSHES TO GOOGLE TAG MANAGER.
        });
        console.log(splitFormID + " Push ENDED " + message.data);
        this.removeEventListener('message', arguments.callee, false);
      }
      else if (pass_data.event === 'mapClick' && isAllowedOrigin(pass_data.location.origin)) {
        // Check this is a whitelisted message & origin
        dataLayer.push({
          // The key 'event' is required for GTM; the value is arbitrary and can be customized
          'event': 'mapClick' + splitFormID,
          'location': pass_data.location.href,
          //Notify GTM via pushing this event
          //THIS MUST MATCH THE gtm-1.js "parent.postMessage". DATALAYER PUSHES TO GOOGLE TAG MANAGER.
        });
        console.log(splitFormID + " Push ENDED " + message.data);
        this.removeEventListener('message', arguments.callee, false);
      }
      else if (pass_data.event === 'mapClick' && isAllowedOrigin(pass_data.location.origin)) {
        // Check this is a whitelisted message & origin
        dataLayer.push({
          // The key 'event' is required for GTM; the value is arbitrary and can be customized
          'event': 'mapClick' + splitFormID,
          'location': pass_data.location.href,
          //Notify GTM via pushing this event
          //THIS MUST MATCH THE gtm-1.js "parent.postMessage". DATALAYER PUSHES TO GOOGLE TAG MANAGER.
        });
        console.log(splitFormID + " Push ENDED " + message.data);
        this.removeEventListener('message', arguments.callee, false);
      }
    }
  });

  // Cross-browser event listener
  function addEvent(el, evt, fn) {
    //console.log(el + ", " + evt + ", " + fn);
    if (el.addEventListener) {
      el.addEventListener(evt, fn);
      //console.log("Cross-browser event listener 1111");
    } else if (el.attachEvent) {
      el.attachEvent('on' + evt, function(evt) {
        fn.call(el, evt);
        //console.log("Cross-browser event listener 2222");
      });
    } else if (typeof el['on' + evt] === 'undefined' || el['on' + evt] === null) {
      el['on' + evt] = function(evt) {
        fn.call(el, evt);
        //console.log("Cross-browser event listener 3333");
      };
    }  
  }
})(window);

//THIS IS THE FULL LINE OF CODE FOR GETTING FORM ID, ATTACHING THE POST MESSAGE AND SENDING THEM TO listening js file. THIS IS BROKEN UP INTO VARS IN THE IF ELSE BELOW
//LISTENING FOR 'fullPostWindow'
window.addEventListener('message', function(e) {
  if (!isAllowedOrigin(e.origin)) { return; }

  if (!isAllowedOrigin(e.origin)) { return; }

  var message = e.data;
  //console.log(e.data + "this is e.data");
  if (message === "fullPostWindow") {
    //GETS URL FROM ADDRESS BAR
    var url = document.location.href;
    //console.log("url 1:" + url);
    //NEXT THREE VARS DRILLS DOWN TO THE 123CONTACT IFRAME AND GETS THE FORM ID
    var myDiv = document.getElementsByClassName("forms-wrapper /* update selector to match your DOM */");

    for (var i = 0; i < myDiv.length; i++) {

        //var frame = myDiv[i].querySelectorAll(":scope > iframe");// ---- IE does not support :scope
      var frame = Array.prototype.reduce.call(myDiv[i].children, function(acc, f) {
      if (f.tagName == "iframe")
          return acc;
          acc.push(f);
          return acc;
        }, []);
        //console.log(frame[2].id + " frame 2" );
        //console.log(frame + " frame" );
        if (url.indexOf('location-not-found') > -1 || url.indexOf('location-found') > -1 || url.indexOf('find-a-location') > -1 || url.indexOf('zip-code-locator') > -1) {
          let frameId = document.querySelector('[id^="locator_iframe"]').id;
          //let frameId = 'locator_iframe10990';
          console.log(frameId + " frame ID meta" );
          //var postWindow = document.getElementById('locator_iframe10990');
          var postWindow = document.getElementById(frameId);
          postWindow.contentWindow.postMessage(url, "*");
          this.removeEventListener('message', arguments.callee, false);
        }
        else {
          //console.log(frame[0].id + "frame[0]2");
          let frameId = frame[0].id;
          //console.log(frameId + " frame ID meta" );
          var postWindow = document.getElementById(frameId);
          //console.log(postWindow);
          postWindow.contentWindow.postMessage(url, "*");
          //console.log(postWindow.contentWindow);
          this.removeEventListener('message', arguments.callee, false);
      }
    }

  } else {
    //console.log("(NOT A CONSOLE ERROR) log: message does not match 'fullPostWindow' " + message);
  }

});
  





// METALOCATOR CODE FOR ADD PARAMS AND RELOAD
//jQuery(document).ready(function(){
  //setTimeout(function(){
    var docRefer = document.referrer;
    console.log('document.referrer: ' + document.referrer);
    //NEXT LINE IS THE REFERER LINK RETURNED BY "document.referrer" I USED FOR TESTING.
    //const docRefer = "https://code.metalocator.com/index.php?option=com_locator&view=directory&layout=combined&Itemid=10770&tmpl=component&framed=1&source=js&task=search_zip&radius=Nearest&postal_code=06777&params_detected=1";
    var url1 = window.location.href;
    // "location-not-found" IS THE PATH TO OUR LANDING PAGE WHICH IS WHERE THE CODE EXECUTES.
    if (url1.indexOf('?') == -1 && url1.indexOf('location-not-found') > -1 && url1.indexOf('greenhome') > -1 ){
      let wEquals = (document.cookie.match(/^(?:.*;)?\s*zipStored /* renamed from vendor-specific key */\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1];
      if (navigator.cookieEnabled == true && (wEquals != null && wEquals != '')){
        var params2 = "&ml___radius=nearest&ml___postal_code=" + wEquals;
        window.location.href = "?ml___task=search_zip" + params2 + "&reload=0";
      }
      else {
        //PULLING OUT THE PARTS WE NEEDED
        var splitRefer = docRefer.split('source=js&').pop().split('&params_detected=1').shift();
        // console.log(splitRefer + " form id number1");
        //SEPARATING THEM INTO AN ARRAY
        var splitReferArray = splitRefer.split('&');
        console.log('greenhome Array[0]: ' + splitReferArray[0]);
        console.log('greenhome Array[1]: ' + splitReferArray[1]);
        console.log('greenhome Array[2]: ' + splitReferArray[2]);
        //ADDING PART OF PARAM REQUIRED BY LOCATOR INPUT
        var ml = "&ml___";
        var params2 = "&ml___radius=nearest" + "&" + splitReferArray[2];
        console.log('greenhome params2:' + params2);
        //RELOADING PAGE
        window.location.href = "?ml___task=search_zip" + params2 + "&reload=0";
    
      }
    }
    else if (url1.indexOf('?') == -1 && (url1.indexOf('qfhc') > -1 || url1.indexOf('qualicare') > -1) && url1.indexOf('location-not-found') > -1 & url1.indexOf('&reload=0') == -1)  {
      var splitRefer = docRefer.split('?').pop();
      var splitReferArray = splitRefer.split('&');
      var ml = "&ml___";
      var params2 = '?' + splitReferArray[0] + "&ml___radius=2000&" + splitReferArray[2];
      console.log(params2);
      window.location.href = params2;
    }
  //}, 5000);
//}); 

// example  = true;
// jQuery(window).bind('beforeunload', function(){
//   example  = false;
// });



// !function(e){var o,n,t;n="message",t=function(o){var n=o.data.toString(),t=e.dataLayer||(e.dataLayer=[]);if(n.indexOf("formSend")>-1){var a=JSON.parse(o.data),i=a.location.href;if(console.log(i+"string pass_data.event href"),i.indexOf("sfnew2")>-1)var r=i.split("=true&s=").pop().split("&jsform=").shift();else r=i.split("username-").pop().split(".html?").shift();var s=location.protocol;console.log(a.location.origin+"THIS IS PASSDATA HREF"),console.log(s+"THIS IS PROTOCAL HREF"),"formSend"!==a.event||a.location.origin!==s+"//www.123contactform.com"&&a.location.origin!==s+"//example.com /* placeholder domain */"&&a.location.origin!==s+"//www.123formbuilder.com"||(t.push({event:"formSend"+r,location:a.location.href}),console.log(r+" Push ENDED "+o.data),this.removeEventListener("message",arguments.callee,!1))}},(o=e).addEventListener?o.addEventListener(n,t):o.attachEvent?o.attachEvent("on"+n,function(e){t.call(o,e)}):void 0!==o["on"+n]&&null!==o["on"+n]||(o["on"+n]=function(e){t.call(o,e)})}(window),window.addEventListener("message",function(e){
  if (!isAllowedOrigin(e.origin)) { return; }

  if (!isAllowedOrigin(e.origin)) { return; }
var o=e.data;if("fullPostWindow"===o)for(var n=document.location.href,t=document.getElementsByClassName("forms-wrapper /* update selector to match your DOM */"),a=0;a<t.length;a++){var i=Array.prototype.reduce.call(t[a].children,function(e,o){return"iframe"==o.tagName?e:(e.push(o),e)},[]);console.log(i[0].id+"frame[0]2");var r=i[0].id;document.getElementById(r).contentWindow.postMessage(n,"*"),this.removeEventListener("message",arguments.callee,!1)}else console.log("(NOT A CONSOLE ERROR) log: message does not match 'fullPostWindow' "+o)});


