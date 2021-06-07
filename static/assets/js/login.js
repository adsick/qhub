function backOn(){
document.getElementById('u78_div').style.backgroundColor="rgba(0, 0, 0, 1)";
  document.getElementById('u78_text').style.color="rgba(255, 255, 255, 0.996078431372549)";
}
function backOut(){
  document.getElementById('u78_div').style.backgroundColor="rgba(255, 255, 255, 0.996078431372549)";
  document.getElementById('u78_text').style.color="#7F7F7F";
}
function getOn(){
  if(b.hasAttribute('onclick')==false){
document.getElementById('u76_div').style.backgroundColor="rgba(0, 0, 0, 1)";
  document.getElementById('u76_text').style.color="rgba(255, 255, 255, 0.996078431372549)";
  }
}
function getOut(){
  if(b.hasAttribute('onclick')==false){
  document.getElementById('u76_div').style.backgroundColor="rgba(127, 127, 127, 0.996078431372549)";
  document.getElementById('u76_text').style.color="gba(255, 255, 255, 0.996078431372549)";
  }
}
jQuery(document).ready(function($) {
  $(function() {
    $('.btn').click(function() {
      $('.switch-form').toggleClass('start-anim');

    });
  });
});

var email = document.getElementById('u47_input');
var email1 = document.getElementById('u71_input');
var pass = document.getElementById('u53_input');
var b = document.getElementById('get');
email.addEventListener("input", function (event) {
  if (email.validity.valid && pass.validity.valid) { document.getElementById('u56').style.display="none";
  } else{document.getElementById('u56').style.display="block"}
}, false);
pass.addEventListener("input", function (event) {
  if (email.validity.valid && pass.validity.valid) { document.getElementById('u56').style.display="none";
  } else{document.getElementById('u56').style.display="block"}
}, false);
email1.addEventListener("input", function (event) {
  if (email1.validity.valid) {
    b.removeAttribute("onclick");
    document.getElementById('u76_div').style.backgroundColor="rgba(127, 127, 127, 0.996078431372549)";
  } else{
    b.setAttribute("onclick", "return false");
    document.getElementById('u76_div').style.backgroundColor="rgba(215, 215, 215, 1)";
  }
}, false);