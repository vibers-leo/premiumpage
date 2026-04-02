function safeRun(fn, name = "anonymous") {
  try {
    fn();
  } catch (error) {
    console.log(`Init Error : Error in function ${name}:`, error);
  }
}

function openCenterPopup(url, name, width, height) {
  const left = (window.screen.width / 2) - (width / 2);
  const top = (window.screen.height / 2) - (height / 2);
  
  window.open(url, name, `width=${width}, height=${height}, left=${left}, top=${top}, resizable=no, scrollbars=yes`);
}

//로딩화면 보이기
function maskShow(){
	var height = $(document).scrollTop();
	$('#menuLoading-mask').css('height', document.body.scrollHeight);
	$('#menuLoading-mask').show();
}
//로딩화면 숨기기
function maskHide(){
	$('#menuLoading-mask').hide();
}