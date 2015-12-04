/* controllers.js */
angular.module('RoyAndCo.controllers',[]).controller('home',function($scope,$http,$location,$anchorScroll){$scope.pageClass='page-home';
$.jribbble.setToken('3fa5c258a4f203f9d9fd7404fd99744fd93659f219864c9654e7ca42aeb865f5');
$.jribbble.teams('royandco').shots({per_page: 9}).then(function(shots) {var html = [];shots.forEach(function(shot) {html.push('<li class="shots--shot">');html.push('<a href="' + shot.html_url + '" rel="nofollow" target="_blank">');html.push('<img src="' + shot.images.hidpi + '">');html.push('</a></li>');});$('#dribbble').html(html.join(''));});
$http.get('http://ipinfo.io/json').success(function(response){console.log(response.country);if(response.city=='US'||response.city=='CA'||response.city=='AE'){$scope.showUSD=true;}
else if(response.city=='FR'||response.city=='ES'||response.city=='DE'||response.city=='BE'||response.city=='DK'||response.city=='FI'||response.city=='IE'||response.city=='IT'||response.city=='NL'||response.city=='NO'||response.city=='PT'||response.city=='SE'||response.city=='CH'){$scope.showEUR=true;}
else{$scope.showGBP=true;}}).error(function(){$scope.showGBP=true;});$http.get('http://api.fixer.io/latest?base=GBP').success(function(data){rateEUR=data.rates.EUR;rateUSD=data.rates.USD;}).error(function(){rateEUR=1.4124;rateUSD=1.5548;});var sliderOptions={start:[150],step:1,connect:"lower",range:{min:[0],max:[220]},format:wNumb({decimals:0,thousand:'.',postfix:''})};$('#slider-rangegbp').noUiSlider(sliderOptions);$('#slider-rangegbp').Link('lower').to($('.hoursamonthgbp'));$("#slider-rangegbp").on({slide:function(){var $value=$("#slider-rangegbp").val();if($value<=19){$('.pricegbp').html('45');}
else if($value<=39){$('.pricegbp').html('44');}
else if($value<=59){$('.pricegbp').html('43');}
else if($value<=79){$('.pricegbp').html('42');}
else if($value<=99){$('.pricegbp').html('41');}
else if($value<=119){$('.pricegbp').html('40');}
else if($value<=139){$('.pricegbp').html('39');}
else if($value<=159){$('.pricegbp').html('38');}
else if($value<=179){$('.pricegbp').html('37');}
else if($value<=199){$('.pricegbp').html('36');}
else{$('.pricegbp').html('35');}}});$('#slider-rangeeur').noUiSlider(sliderOptions);$('#slider-rangeeur').Link('lower').to($('.hoursamontheur'));$("#slider-rangeeur").on({slide:function(){var $value=$("#slider-rangeeur").val();if($value<=19){total=45*rateEUR;total=parseInt(total);$('.priceeur').html(total);}
else if($value<=39){total=44*rateEUR;total=parseInt(total);$('.priceeur').html(total);}
else if($value<=59){total=43*rateEUR;total=parseInt(total);$('.priceeur').html(total);}
else if($value<=79){total=42*rateEUR;total=parseInt(total);$('.priceeur').html(total);}
else if($value<=99){total=41*rateEUR;total=parseInt(total);$('.priceeur').html(total);}
else if($value<=119){total=40*rateEUR;total=parseInt(total);$('.priceeur').html(total);}
else if($value<=139){total=39*rateEUR;total=parseInt(total);$('.priceeur').html(total);}
else if($value<=159){total=38*rateEUR;total=parseInt(total);$('.priceeur').html(total);}
else if($value<=179){total=37*rateEUR;total=parseInt(total);$('.priceeur').html(total);}
else if($value<=199){total=36*rateEUR;total=parseInt(total);$('.priceeur').html(total);}
else{total=35*rateEUR;total=parseInt(total);$('.priceeur').html(total);}}});$('#slider-rangeusd').noUiSlider(sliderOptions);$('#slider-rangeusd').Link('lower').to($('.hoursamonthusd'));$("#slider-rangeusd").on({slide:function(){var $value=$("#slider-rangeusd").val();if($value<=19){total=45*rateUSD;total=parseInt(total);$('.priceusd').html(total);}
else if($value<=39){total=44*rateUSD;total=parseInt(total);$('.priceusd').html(total);}
else if($value<=59){total=43*rateUSD;total=parseInt(total);$('.priceusd').html(total);}
else if($value<=79){total=42*rateUSD;total=parseInt(total);$('.priceusd').html(total);}
else if($value<=99){total=41*rateUSD;total=parseInt(total);$('.priceusd').html(total);}
else if($value<=119){total=40*rateUSD;total=parseInt(total);$('.priceusd').html(total);}
else if($value<=139){total=39*rateUSD;total=parseInt(total);$('.priceusd').html(total);}
else if($value<=159){total=38*rateUSD;total=parseInt(total);$('.priceusd').html(total);}
else if($value<=179){total=37*rateUSD;total=parseInt(total);$('.priceusd').html(total);}
else if($value<=199){total=36*rateUSD;total=parseInt(total);$('.priceusd').html(total);}
else{total=35*rateUSD;total=parseInt(total);$('.priceusd').html(total);}}});$scope.gotoAbout=function(){$location.hash('about');$anchorScroll();};}).controller('portfolio',function($scope){$scope.pageClass='page-portfolio';});
