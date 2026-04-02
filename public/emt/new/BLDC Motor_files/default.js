var $wbr =getBrowsertInfo();
var wsize = null;	
var psize = null;
var lowIeChk = {old_w:0,old_h:0 }
function getWindowSizeObj(){
		var sizeObj = {
		scr : {w:screen.width,h:screen.height},
		availscr : {w:screen.availWidth,h:screen.availHeight},
		win : (_isLowBr_)? {w:$(window).width(),h:$(window).height()}: {w:window.innerWidth,h:window.innerHeight}
	}
	return sizeObj;
}
function getPageSizeObj(){
	var sizeObj = {
		doc : {w:document.documentElement.scrollWidth,h:document.documentElement.scrollHeight},
		scroll : {x:document.documentElement.scrollLeft,y:document.documentElement.scrollTop,top:$(window).scrollTop(),left:$(window).scrollLeft()}
		, header:{h:$("#header-wrap").height()}, footer:{h:$("#footer-wrap").height() + 1}
	};
	return sizeObj;
}
function getWindowSize(){
	wsize =getWindowSizeObj();
}
function getPageSize(){
	psize = getPageSizeObj();
	printWinSizeInfo();
}
function printWinSizeInfo(){
	var str = "";
	str +="window [w : "+wsize.win.w+", h:"+wsize.win.h+"] ";		
	str +="doc [w : "+psize.doc.w+", h:"+psize.doc.h+"]<br/>";
}
var docChkTimer = null;var DOC_COMPLET = null;
function docLoading(loadFunc){
	clearTimeout(docChkTimer);
	if(document.readyState=="loaded" || document.readyState=="complete"){
		DOC_COMPLET = true;
		if(loadFunc!=undefined) loadFunc();
	}
	else{
		docChkTimer = setTimeout(function(){docLoading(loadFunc);},500);
	}
}
function getBrowsertInfo(){
	var $agent = navigator.userAgent;
	var $s = "";
	var $br = {browser:"",browserType:"",browserVer:[]};
		
    if ((/msie 5.0[0-9]*/i).test($agent))         { $s = "MSIE 5.0"; }
    else if((/msie 5.5[0-9]*/i).test($agent))     { $s = "MSIE 5.5"; }
    else if((/msie 6.0[0-9]*/i).test($agent))     { $s = "MSIE 6.0"; }
    else if((/msie 7.0[0-9]*/i).test($agent))     { $s = "MSIE 7.0"; }
    else if((/msie 8.0[0-9]*/i).test($agent))     { $s = "MSIE 8.0"; }
    else if((/msie 9.0[0-9]*/i).test($agent))     { $s = "MSIE 9.0"; }
	else if((/msie 10.0[0-9]*/i).test($agent))     { $s = "MSIE 10.0"; }
	else if((/windows*/i).test($agent) && (/rv:11.0[0-9]*/i).test($agent))     { $s = "MSIE 11.0"; }
    else if((/msie 4.[0-9]*/i).test($agent))      { $s = "MSIE 4.x"; }
    else if((/firefox/i).test($agent))            { $s = "FireFox"; }
    else if((/safari/i).test($agent))            { $s = "FireFox"; }
    else if((/x11/i).test($agent))                { $s = "Netscape"; }
    else if((/opera/i).test($agent))              { $s = "Opera"; }
    else if((/gec/i).test($agent))                { $s = "Gecko"; }
    else if((/bot|slurp/i).test($agent))          { $s = "Robot"; }
    else if((/internet explorer/i).test($agent))  { $s = "IE"; }
    else if((/mozilla/i).test($agent))            { $s = "Mozilla"; }
    else { $s = ""; }
	$br.browser = $s;
	if((/msie/i).test($s)){
		$br.browserType = "IE";
		$br.browserVer =  $s.replace("MSIE " ,"").split(".");
	}
	return $br;
}

function checkPop(pop_id) {
	if ( getCookie(pop_id) != "done" ) {
		document.getElementById(pop_id).style.display = "";
	}else{
		document.getElementById(pop_id).style.display = "none";
	}
}
function getCookie( name )
{
	var nameOfCookie = name + "=";
	var x = 0;
	while ( x <= document.cookie.length )
	{
		var y = (x+nameOfCookie.length);
		if ( document.cookie.substring( x, y ) == nameOfCookie ) {
			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
				endOfCookie = document.cookie.length;
			return unescape( document.cookie.substring( y, endOfCookie ) );
		}
		x = document.cookie.indexOf( " ", x ) + 1;
		if ( x == 0 )
			break;
	}
	return "";
}

function setCookie( name, value, expiredays ){ 
	var todayDate = new Date(); 
	todayDate.setDate( todayDate.getDate() + expiredays ); 
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" +		todayDate.toGMTString() + ";" 
}

//로딩화면 보이기
function maskShow(){
	$('#menuLoading-mask').show();
	$(document).keydown(function(e){
		var display = document.getElementById('menuLoading-mask').style.display;
		if(display != 'none'){
			
			if(e.keyCode == "13" || e.keyCode == "32"){
				e.preventDefault();
			}
		}
	});
}
//로딩화면 숨기기
function maskHide(){
	$('#menuLoading-mask').hide();
	$(document).keydown(function(e){
		return true;
	});
}


$(function(){
				
	//탭 메뉴
	function utab_Fn(){
		
		var utab = $('.u-tab');
		var utab_a = $('.u-tab a');
		
		if(!utab.length) return;
		
		var thisA = utab_a;

		// 초기 컨텐츠 show
		utab_a.each(function(){
			
			var thisParent =  $(this).parent('li');
			
			if(thisParent.hasClass('over')){
				
				$(this).parents('.u-tabWrap').find('.utc' + (thisParent.index()+1)).show();
			};
		});
		
		utab_a.on('click',function(){
			
			var thisHref = $(this).attr('href');
			var thisParent =  $(this).parent('li');
			var thisIndex = thisParent.index();
			var thisWrap =  $(this).parents('.u-tabWrap');
			var thisWrapLi =  $(this).parents('.u-tab').find('li');
			
			thisWrapLi.removeClass('over');
			thisParent.addClass('over');
			
			if(!(thisHref == "#none" || thisHref == "#n" || thisHref == "")) return; //url 있을 시 컨텐츠 구동 안함
			
			thisWrap.find('.u-tabCont').hide();
			thisWrap.find('.utc' + (thisIndex+1)).show();
		});
	};
	
	
	//인풋 파일 커스텀
	function inputFile_Fn(){
		
		$(document).on('change','.inputFile input[type="file"]',function(){
			var fileName = $(this).val();
			$(this).siblings(".fileNm").val(fileName);
		});
	};
	
	//파일 추가
	function fileLstAdd_Fn(){
		
		var fileinput = '<div class="inputFile">'+
						'	<input type="file" title="파일을 선택해주세요.">'+
						'	<input type="text" class="fileNm" readonly title="파일 첨부">'+
						'	<label class="btn file-label"><span class="a11y">첨부</span></label>'+
						'	<button type="button" class="icoBtn del"><span class="a11y">파일 삭제</span></button>'+
						'</div>'
		
		$(document).on('click','.input-file .icoBtn.add',function(){
			var idArr = [];
			
			var parent = $(this).parents('.input-file');
			var thisInputFileId = $(this).parent('.inputFile').find('input[type="file"]').attr('id');
			var siblingsFile = parent.find('input[type="file"]');
			
			parent.append(fileinput);
			
			//id값 다르게 만들기
			siblingsFile.each(function(){
				var fileIdori = $(this).attr('id');
				var fileId = fileIdori.split('_').reverse()[0];

				if(isNaN(fileId) == true){
					idArr.push('1');
				}else{
					idArr.push(fileId);
				}
			});
			console.log(idArr);
			
			setTimeout(function(){
				
				var idNum = Math.max.apply(null, idArr)+1;
				
				parent.find('.inputFile:last-child input[type="file"]').attr('id', thisInputFileId+'_'+idNum);
				parent.find('.inputFile:last-child .file-label').attr('for', thisInputFileId+'_'+idNum);
	
			},0);
		});
	};
	
	//파일 삭제
	function fileLstDel_Fn(){
		
		$(document).on('click','.input-file .icoBtn.del',function(){
			
			$(this).siblings('input').val('');
			
			if($(this).parent('.inputFile').hasClass('first')) return;
			
			$(this).parent('.inputFile').remove();
		});
	};
				
	//trLink 안 버튼 이벤트 전이 막기
	function trLink_Fn(){
		var btns = $('.trLink button, .trLink a, .trLink input, .trLink select, .trLink label');
		
		if(!btns.length) return;
		btns.on('click',function(e){
			
			e.stopPropagation();
		});
	}
	
	// 가로스크롤 테이블 실행
	function hscrTbl_Fn(){
    	var hscrWrap = $('.h-scroll-wrapper')
    	
    	if(!hscrWrap.length) return;
    	
    	hscrWrap.each(function(){
    		
    		new hScrollDrag($(this), {
	            acc : 1,
	            scrollBar : false
	        });
    	});
	}
	
	// 메뉴 아이콘 선택 팝업 
	function menuIconSelectlist_Fn(){
		
		$(document).on('click','.menuIconSelect-list li a',function(){

			$('.menuIconSelect-list li').removeClass('over');
			$(this).parents('li').addClass('over');
		})
		
		$(document).on('click','.menuIconSelect-btn',function(){
			
			var iconClass = $(this).parents('.layerpop').find('.mn_l1.over a').attr('data-iconclass');
			var mniconResult = $('.mniconResult')
			var resultClass = $.trim(mniconResult.attr('class').split('mn_l1')[1]);
			mniconResult.removeClass(resultClass);
			mniconResult.addClass(iconClass);
			$("#icon").val(iconClass);
		})
	}
	
	(function default_init(){
		
		utab_Fn();
		inputFile_Fn();
		fileLstAdd_Fn();
		fileLstDel_Fn();
		trLink_Fn();
		hscrTbl_Fn();
		menuIconSelectlist_Fn();
	})();
});

// 메뉴 아이콘 선택 팝업 초기값 
function menuIconSelectPop_default_Fn(){
	var mniconResult = $('.mniconResult')
	var resultClass = $.trim(mniconResult.attr('class').split('mn_l1')[1]);
	var selectIcon = $('.menuIconSelect-list li');

	selectIcon.each(function(){
		
		console.log(resultClass + '123123123')
		console.log($(this).find('a').attr('data-iconclass'));
		
		if($(this).find('a').attr('data-iconclass') == resultClass){
			
			
			
			selectIcon.removeClass('over');
			$(this).addClass('over');
		}
	})
	
}

//로딩화면 보이기
function maskShow(){
	$('#menuLoading-mask').show();
	$(document).keydown(function(e){
		var display = document.getElementById('menuLoading-mask').style.display;
		if(display != 'none'){

			if(e.keyCode == "13" || e.keyCode == "32"){
				e.preventDefault();
			}
		}
	});
}
//로딩화면 숨기기
function maskHide(){
	$('#menuLoading-mask').hide();
	$(document).keydown(function(e){
		return true;
	});
}

//한글 입력막기	
function noHangul(obj){
	obj.value = obj.value.replace(/[\ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
}
//영어 입력막기
function noEng(obj){
	obj.value = obj.value.replace(/[\a-zA-Z]/g, '');
}
function noNum(obj){
	obj.value = obj.value.replace(/[0-9]/g, '');
}
//한글, 영어, 숫자 빼고 입력 안받기
function noEtc(obj){
	obj.value = obj.value.replace(/[^0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
}
//한글 영어 입력막기
function noHangulEng(obj){
	noHangul(obj);
	noEng(obj);
}

//숫자만 입력	
function onlyNum(obj){
	obj.value = obj.value.replace(/[^0-9]/g,"");
}

//숫자,소수점만 입력	
function onlyNum2(obj){
	obj.value = obj.value.replace(/[^-\.0-9]/g,"");
	if(Number(obj.value) < 1){
		obj.value = "1";
	}
}
//숫자, 영어만 입력
function onlyEngNum(obj){
	obj.value = obj.value.replace(/[^a-zA-Z0-9]/g,"");
}
function onlyEngEtc(obj){
	noHangul(obj);
	noNum(obj);
}
	
//리사이징 디바운스
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};