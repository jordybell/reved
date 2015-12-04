/**
*	Template Functions
*	Version: 1.0.2;
*	Author: ThemeMountain
*	Copyright: ThemeMountain
*/

$( document ).ready( function(){

	'use strict';

	/**
	*	Template Functions
	*/

	// Equalize
	var equalizeContainer = '.equalize';

	// Parallax
	var parallaxContainer = '.parallax';

	// Fullscreen
	var fsSectionWrapper = '.fullscreen-sections-wrapper';
	var fsSection = '.fullscreen-section';


	// Videos
	var selectors = ['.video-container iframe', '.video-container object'];
	var players = ['www.youtube.com', 'player.vimeo.com'];
	var mejsPlayers = '.mejs-container audio, .mejs-container video';

	// Content Slider
	var contentSlider = '.content-slider';

	// Full Width Slider
	var fullScreenSlider = '.tm-slider-container.fullscreen';

	// Full Width Slider
	var fullWidthSlider = '.full-width-slider';


	// Lightbox
	var lightbox = '#tm-lightbox';
	var ligthboxLink = '.lightbox-link';


	// Transition End
	var transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';

	var templateFunctions = {
		init: function(){
			// Header
			templateFunctions.siteHeader();
			// Retinize
			templateFunctions.retinize();
			// Equalize
			templateFunctions.equalize( 480 );
			// Parallax
			templateFunctions.parallax( '.parallax.fixed-height', true, false, true );
			templateFunctions.parallax( '.parallax.fullscreen', true, true, true );
			// Fullscreen sections
			templateFunctions.fullScreenSection();
			// Masonry
			templateFunctions.masonry();
			// Sliders - seperate calls for
			// ease of use - alternatively merge and pass parameters
			templateFunctions.logoSlider();
			templateFunctions.heroSlider();
			templateFunctions.testimonialSlider();
			templateFunctions.teamThreeSlider();
			templateFunctions.portfolioSixSlider();
			templateFunctions.contentSlider();
			templateFunctions.fullScreenSlider();
			templateFunctions.fullWidthSlider();
			// Lightbox
			templateFunctions.lightbox();

			// Horizon
			templateFunctions.horizon( '.horizon', '.parallax .horizon', 'easeInOutQuint', false, 1 );
			// Video
			templateFunctions.videos();
			templateFunctions.mediaElement();

			// Use images loaded if equalize
			// objects contain iamges
			imagesLoaded( $( equalizeContainer ), function() {
				$( equalizeContainer ).equalizeHeights({
					clearUnder: breakpoint
				});
			});
		},
		parallax: function( container, scale, fullscreen, fade ){
			$( container ).snowBridge({
				scaleContainer: scale,
				scaleUnder: 960,
				scaleMinHeight: 214,
				fullscreen: fullscreen,
				fadeInOut: fade,
				fadeThreshold: 0.5,
				retinaSupport: true,
				parallaxFactor: 0.6,
				onLoaded: function(){
					templateFunctions.horizon( '.horizon', '', 'easeInOutQuint', false, 1 );
				}
			});
		},
		horizon: function( element, exclude, easing, loop, threshold ){
			$( element ).not( exclude ).horizon({
				easing: easing,
				recurring: loop,
				threshold: threshold
			});
		},
		counter: function( container, element, loop ){
			$( element ).counter();
			$( container ).horizon({
				recurring: loop,
				inView: function(){
					$( element ).each( function(){
						var c = $( this ).data( 'counter' );
						c.startCounter();
					});
				},
				outOfView: function(){
					if( !loop ) return false;
					$( element ).each( function(){
						var c = $( this ).data( 'counter' );
						c.clearCounter();
					});
				}
			});
		},
		contentSlider: function(){
			$( contentSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 700,
				autoAdvance: false,
				forceFit: false,
				scaleMinHeight: 'auto',
				carousel: false,
				lazyLoad: true,
				navShowOnHover: false
			});
		},
		fullScreenSlider: function(){
			$( fullScreenSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 700,
				autoAdvance: false,
				fullscreen: true,
				captionScaling: false,
				lazyLoad: true,
				navPagination: false,
				navShowOnHover: true,
				respectRatio: false
			});
		},
		fullWidthSlider: function(){
			$( fullWidthSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 700,
				autoAdvance: false,
				forceFit: false,
				fullwidth: true,
				scaleUnder: 960,
				captionScaling: true,
				lazyLoad: true,
				navPagination: false,
				navShowOnHover: true,
				respectRatio: false
			});
		},
		logoSlider: function(){
			$( logoSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 700,
				autoAdvance: true,
				carousel: true,
				carouselVisible: 5,
				carouselScaleHeight: false,
				navArrows: false,
				navPagination: true,
				showProgressBar: false,
				navShowOnHover: false
			});
		},
		heroSlider: function(){
			$( heroSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 700,
				autoAdvance: false,
				carousel: true,
				carouselVisible: 1,
				captionScaling: false,
				forceFit: true,
				scaleUnder: 480,
				fullwidth: true,
				navArrows: false
			});
		},
		portfolioSixSlider: function(){
			$( portfolioSixSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 900,
				autoAdvance: false,
				carousel: true,
				carouselVisible: 3,
				carouselScaleHeight: true,
				lazyLoad: false,
				navArrows: false,
				navPagination: false,
				navShowOnHover: false,
				retinaSupport: true
			});

			//API call for prev/next buttons
			var portfolioSixSliderAPI = $( portfolioSixSlider ).data( 'avalancheSlider' );
			$( psSliderPrev ).on( 'click', function( event ){
				event.preventDefault();
				portfolioSixSliderAPI.prevSlide();
			});
			$( psSliderNext ).on( 'click', function( event ){
				event.preventDefault();
				portfolioSixSliderAPI.nextSlide();
			});
		},
		lightbox: function(){
			$( ligthboxLink ).summitLightbox({
				lightboxAnimation: 'slideInTop',
				contentAnimation: 'slide',
				slideAmount: 100,
				easing: 'swing',
				speed: 350
			});
		},
		videos: function(){
			fluidvids.init({
			  selector: selectors,
			  players: players
			});
		},
		mediaElement: function(){
			$( mejsPlayers ).each( function(){
				var isAudio = false;
				if( $( this ).is( 'audio' ) ) isAudio = true;
				$( this ).mediaelementplayer({
					features: isAudio ? ['playpause','progress','volume','fullscreen'] : ['playpause','progress','current','duration','tracks','volume','fullscreen'],
					videoWidth: '100%',
					videoHeight: '100%',
					audioWidth: '100%',
					videoVolume: 'vertical',
					audioVolume: 'horizontal'
				});
			});
		},
		siteHeader: function(){
			var winW;
			var winH;
			var headerWrapperH;
			var thresholdBkg;
			var thresholdHeight;
			var thresholdSticky;
			var thresholdHeadIn ;
			var thresholdHeadOut;
			var lastPos = 0;
			var currentPos;
			var breakpoint = 960;
			var headerWrapper = $( header );

			// Strip '.'
			headerAnimated = headerAnimated.split('.').join('');
			headerSticky = headerSticky.split('.').join('');
			headerBackground = headerBackground.split('.').join('');
			headerCompact = headerCompact.split('.').join('');
			headerHeadIn = headerHeadIn.split('.').join('');
			headerHeadOut = headerHeadOut.split('.').join('');
			headerInitPosition = headerInitPosition.split('.').join('');

			// Get data references
			function updateHeaderData(){
				 winW = $( window ).width();
				 winH = $( window ).height();
				 headerWrapperH = Math.ceil( headerWrapper.outerHeight() );
				 thresholdBkg = headerWrapper.data( 'bkg-threshold' ) === 'window-height' ? winH - headerWrapperH : headerWrapper.data( 'bkg-threshold' );
				 thresholdHeight = headerWrapper.data( 'compact-threshold' ) === 'window-height' ? winH - headerWrapperH : headerWrapper.data( 'compact-threshold' );
				 thresholdSticky = headerWrapper.data( 'sticky-threshold' ) === 'window-height' ? winH - headerWrapperH : headerWrapper.data( 'sticky-threshold' );
				 thresholdHeadIn = headerWrapper.data( 'helper-in-threshold' );
				 thresholdHeadOut = headerWrapper.data( 'helper-out-threshold' );
			}
				// Push section IDs into array for later use
				sectionsArray.push( $( this ).attr( 'href' ) );

	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	// MIT license
	(function() {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x ) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
		}
		if ( !window.requestAnimationFrame )
		window.requestAnimationFrame = function( callback, element ) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
				var id = window.setTimeout( function() { callback(currTime + timeToCall); },
				timeToCall);
				lastTime = currTime + timeToCall;
				return id;
		};
		if ( !window.cancelAnimationFrame )
			window.cancelAnimationFrame = function( id ) {
				clearTimeout( id );
			};
	}());

	// Initiate
	templateFunctions.init();
});
