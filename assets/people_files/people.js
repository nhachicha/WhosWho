$(function(){

	/*
	 *     Let's Identify that the user has Javascript Enabled
	 *     If the user has javascript enabled remove class 'no-js'
	 */
	$('body').removeClass();


	/*
	 *     Let's dynamically add a DIV behind the Navigation items for
	 *     fade in and out animations on hover
	 */
	$('#header .navigation ul li').each(function(){    $(this).append('<div class="fade"></div>'); });


	/*
	 *     Click event for Arrow in the footer of the website, animates to
	 *     top of screen if JS is on, otherwise will just snap to #header
	 */
	$('#top').click(function(){    $('html,body').animate({scrollTop: 0}, 1000, "easeInOutExpo"); return false; });


	/*
	 *     Animate on mouse over, the header navigation
	 */
	$('#header .navigation li').hover(
			function(){
				if(!($(this).hasClass('current-menu-item'))){
					$(this).find('.fade').stop(true, true).fadeIn(300);
				}
			},
			function(){
				$(this).find('.fade').stop(true, true).fadeOut(300);
			});

	/*
	 *  If on work nojs pages, redirect to home page
	 */

	if($('#content.work.worksub').is(':visible')){
		window.location = "/work/";
	}

	/*
	 *     Website Slider
	 */

	/* Only allow interaction with the active slide */
	$('.slide').click(function() {
		if( !$mo.is(":animated") ){
			if(!$(this).hasClass('active')){    return false;    }
		}
	});

	var $mo = $('#mover');    /* Animation Div (Container) */
	$mo.children().first().addClass('active');    /* Make the first child element the active Element */

	var _sIndex = $mo.children().length;
	var _cIndex = $mo.children().length;
	var img = $('#mover img');

	var theImage = new Image();
	theImage.src = img.attr("src");

	var ratio = theImage.width / theImage.height;
	var _window = $('#header').width();

	var _img_length = $('#mover img').length;

	$('#mover img').each(function(index){
		$(this).width(_window);
		$(this).parent().parent().width(_window);
		$(this).height(Math.round(_window/ratio));
		$(this).parent().parent().height(Math.round(_window/ratio));
		if(index == (_img_length - 1)){
			$('.overflow').height(Math.round(_window/ratio));
			$('#mover').width(_window * _img_length);
			$('#slider').height(Math.round(_window/ratio));
			$('#content.home').css({'margin-top' : (Math.round(_window/ratio)) + 40 });
			$('.overlay').each(function(){
				$(this).width(_window - 40);
			});
		}
	});

	$mo.children().clone().removeClass('active').prependTo($mo);

	$mo.children().css({ 'opacity' : 0.2 });    /* Make all children 70% Opacity */
	$mo.find('.active').css({ 'opacity' : 1 });    /* Make the active element 100% */

	var imgW = _window,    /* Default Image Width */
			imgN = $('.slide').length,    /* Number of Individual instances within the slider */
			winW = $(window).width(),    /* The width of the window (Browser Window) */
	//conW = $('#header').width(),    /* Define the current width of the container */
			eleH = -(imgW * (imgN / 2)) + ((winW - imgW)/2),    /* Work out Horizontal left css value */
			timeOut,    /* define a blank timeout */
			isStopped = false;    /* do not stop until interaction */

	$mo.width(imgW * imgN).css({'left' : eleH });    /*    Calculate the width of the top level #Mover container and the css position */

	$(window).resize(function(){    /* Window Resize Function */
		if( !$mo.is(":animated") ){    /* Make sure that there is no animation currently going on */
			isStopped=true;
			clearTimeout(timeOut);
			var img = $('#mover img');
			var theImage = new Image();
			var winW = $(window).width();
			theImage.src = img.attr("src");

			var ratio = theImage.width / theImage.height;
			var _window = $('#header').width();
			var _img_length = $('#mover img').length;

			$('#mover img').each(function(index){
				$(this).width(_window);
				$(this).parent().parent().width(_window);
				$(this).height(_window/ratio);
				$(this).parent().parent().height(_window/ratio);
				if(index == (_img_length - 1)){
					$('.overflow').height(_window/ratio);
					$('#mover').width(_window * _img_length);
					$('#slider').height(_window/ratio);
					$('#content.home').css({'margin-top' : (_window/ratio) + 40 });
					$('.overlay').each(function(){
						$(this).width(_window - 40);
					});
				}
			});
			imgW = $('#header').width();
			eleH = -(imgW * (imgN / 2)) + ((winW - imgW)/2),    /* Work out Horizontal left css value */

					$mo.css({'left' : -(_window * (_img_length / 2)) + ((winW - _window)/2)});

		}
	});

	$('.btn_right').click(function() {
		if( !$mo.is(":animated") ){    /* Make sure that there is no animation currently going on */
			$mo.animate({ left: eleH - imgW }, 900, "easeInOutExpo", function(){
				$mo.css({'left' : eleH });
			});
			$mo.find('.active').next().animate({ opacity : 1 }, 900, "easeInOutExpo").find('.overlay').fadeIn(900, "easeInOutExpo");
			$mo.find('.active').animate({ opacity: 0.1 },900, "easeInOutExpo").find('.overlay').fadeOut(900, "easeInOutExpo", function(){
				$(this).parent().removeClass('active').next().addClass('active');
				$('.slide:eq(0)').remove().clone().appendTo($mo);
			});
		}
	});

	$('.btn_left').click(function() {
		if( !$mo.is(":animated") ){    /* Make sure that there is no animation currently going on */
			$mo.animate({ left: eleH + imgW }, 900, "easeInOutExpo", function(){
				$mo.css({'left' : eleH });
			});
			$mo.find('.active').prev().animate({ opacity : 1 }, 900, "easeInOutExpo").find('.overlay').fadeIn(900, "easeInOutExpo");
			$mo.find('.active').animate({ opacity: 0.1 },900, "easeInOutExpo").find('.overlay').fadeOut(900, "easeInOutExpo", function(){
				$(this).parent().removeClass('active').prev().addClass('active');
				$('.slide:eq('+(imgN-1)+')').remove().clone().prependTo($mo);
			});
		}
	});

	function auto() {
		if (imgN>1){     /* Ensure we have more than one slide, otherwise dont do squat */
			if(isStopped){return;}    /* Are you supposed to be stopped? Well then you dont need to pass this stage */
			clearTimeout(timeOut);    /* Clear our animation timer, and start from 0 again */
			timeOut = setTimeout(function() {
				$mo.animate({ left: eleH - imgW }, 900, "easeInOutExpo", function(){
					$mo.css({'left' : eleH });
					auto();    /* Call self for contineous loop */
				});
				$mo.find('.active').next().animate({ opacity : 1 }, 900, "easeInOutExpo").find('.overlay').fadeIn(900, "easeInOutExpo");
				$mo.find('.active').animate({ opacity: 0.1 },900, "easeInOutExpo").find('.overlay').fadeOut(900, "easeInOutExpo", function(){
					$(this).parent().removeClass('active').next().addClass('active');
					$('.slide:eq(0)').remove().clone().appendTo($mo);
				});
			}, 6000);
		}
	}
	auto();     /*Call the first instance of the animation loop */

	/* Stop the sequnece if the mouse is over the slide */
	$('#slider').bind('mouseenter mouseleave', function(e) {
		( e.type === 'mouseenter' ) ?
				( isStopped=true, clearTimeout(timeOut) ) :
				( isStopped=false, auto() );
	});

	/* Enable the swipping of slides with the arrow keys */
	$(document).keydown(function(e){
		if (e.keyCode == 37) {
			$('.btn_left').click();
			return false;
		} else if (e.keyCode == 39) {
			$('.btn_right').click();
			return false;
		}
	});



	/*
	 *     Work Page
	 *     Dynamically Call data from off positioned DIVs to load into the viewport
	 */

	/* Copy Data from Content to Work */
	/*var _pIndex = $('#content.work .project').length;
	 $('#content.work .project').each(function(index){
	 if(index < _pIndex){
	 $(this).clone().appendTo('#jQueryData');
	 }
	 });
	 $('#content.work .tagz').each(function(index){
	 if(index < _pIndex){
	 $(this).clone().appendTo('#jQueryData');
	 }
	 });
	 */

	var _fpIndex = $('#featured .featuredProject').length;
	$('#featured .featuredProject').each(function(index){
		if(index < _fpIndex){
			$(this).clone().appendTo('#jQueryFeatured');
		}
	});

	$('#content.work > div').clone().appendTo('#jQPH');

	/* Remove the Post ID */
	var _postNumber = 1;
	$('#jQueryData > div, #jQueryFeatured > div').each(function(){ $(this).removeClass('post' + _postNumber);    _postNumber++;    });
	$('#jQueryMiniFeatured > div').each(function(){    $(this).removeClass('post1'); $(this).removeClass('post2'); _postNumber++;    });

	/* Disable Clicking of <a> tags */
	$('#content.work .project .tags a').click(function(){ return false;    });

	/* Add Classes to the post item */
	$('#jQueryData .project').each(function(){    var _classes = $(this).find('.tags a').html();    $(this).addClass(_classes);    });

	/* Fix Margins with jQuery, a fallback is present in the CSS */
	function _marginFix(){
		$('#content.work .project:nth-child(5n)').each(function(index){
			$(this).css({'margin-right' : '0px'});
		});
	}
	_marginFix();    /* fix the margins fn */

	/* Switching between the various fliter headings to show their associated options */
	$('ul#menu-filters li').click(function(){
		if(!$(this).hasClass('current-menu-item')){
			$('ul#menu-filters li').removeClass('current-menu-item');    /* remove active class */
			$(this).addClass('current-menu-item');    /* add active class */

			var _activeClass = $(this).text().split(' ')[1];

			if($('#blurb.filters .list_items .active').is(':visible')){
				$('#blurb.filters .list_items .active').removeClass('active').slideUp(500, function(){
					$('#blurb.filters .list_items .list_' + _activeClass).addClass('active').slideDown(500);
					$('#blurb.filters h1').css({'border-bottom' : '2px solid #222222'});
				});

			} else {
				$('#blurb.filters .list_items .active').hide().removeClass('active');
				$('#blurb.filters .list_items .list_' + _activeClass).addClass('active').show(0, function(){
					$('#blurb.filters .list_items').slideDown(500);
					$('#blurb.filters h1').css({'border-bottom' : '2px solid #222222'});
				});

			}

			if(_activeClass == 'Work'){
				$('#blurb.filters .list_items > div ul li').removeClass('current-cat');
				$('#blurb.filters .list_items').slideUp();
				$('#blurb.filters h1').css({'border-bottom' : 'none'});
				$('#featured').fadeIn(800, "easeInOutCubic");
				$('#content.work').html('');
				$('#jQPH > div').clone(true).hide().appendTo('#content.work').fadeIn(500);
				$('#content.work .project').fadeIn(500);
			}
		}
		return false;
	});

	/* Clicking the lists that are visible when you select a filter heading, to show the associated posts to that category */
	$('#blurb.filters .list_items > div ul li a').click(function(){
		$('#blurb.filters .list_items > div ul li').removeClass('current-cat');
		$(this).parent().addClass('current-cat');
		$('#featured').fadeOut(800, "easeInOutCubic");    /*    Hide the featured category    */
		$('#content.work').children().fadeOut(800, "easeInOutCubic").parent().html('');    /* Clear the Content Div */
		var _aClass = $(this).html().split(' ')[0];    /* the clicked class */
		var tagz = 0;
		$('#jQueryData .project.' + _aClass + ', #jQueryMiniFeatured .project.' + _aClass).each(function(index){
			if(index % 3 == 0){
				$('#content.work .row:last .project:last').css({'margin-right' : '0%'});
				$('#content.work').append('<div class="row" style="position:relative;">');
			}
			$(this).clone().css({'margin-right' : '3.8%'}).appendTo('#content.work .row:last').hide().fadeIn(800, "easeInOutCubic");
		});
		$('#content.work .row:last .project:last').css({'margin-right' : '0%'});

		return false;

	});

	$('#content.work > div, #featured > div').children().fadeIn(800, "easeInOutCubic"); /* FadeIn work pages on first instance load */


	/*
	 *  Work Page Slider
	 */



	if($('#crossfade').children().length == 0){
		$('#Gallery').hide();
	}



	$.fn.preload = function() {
		this.each(function(){
			$('<img/>')[0].src = this;
		});
	}

	var el_length = $('#crossfade > div img').length -1;

	$('#crossfade > div img').each(function(index){
		var _src = $(this).attr('src');
		$(_src).preload();
		if(el_length == index){
			var t=0;
			var t_elem;
			$("#crossfade > div").each(function () {
				$this = $(this);
				if ( $this.outerHeight() > t ) {
					t_elem=this;
					t=$this.outerHeight();
				}
			});
			$('#crossfade').height(t);
			$('#crossfade div').fadeOut(500, function(){
				$('#crossfade div:eq(0)').addClass('active').fadeIn(500);
			});
		}
	});


	$('#crossfade div').each(function(index){
		if(!(index == $('body div').length)){
			$('ul.imgNav').append('<li></li>');
		}
		if(index === 0){
			$('ul.imgNav li').first().addClass('current');
		}
	});


	$('#imgNext').click(function(){
		if(!$('#crossfade .active').is(':animated')){
			var _index = $('#crossfade .active').index();
			var _length = $('#crossfade div').length - 1;
			if(_index == _length){
				$('ul.imgNav li.current').removeClass('current');
				$('ul.imgNav li:eq(0)').addClass('current');
				$('#crossfade .active').fadeOut(1500).removeClass('active');
				$('#crossfade div:eq(0)').fadeIn(1500).addClass('active');
			} else {
				$('ul.imgNav li.current').removeClass('current');
				$('ul.imgNav li:eq('+(_index + 1)+')').addClass('current');
				$('#crossfade .active').fadeOut(1500).removeClass('active');
				$('#crossfade div:eq('+(_index + 1)+')').fadeIn(1500).addClass('active');
			}
		}
	});

	$('#imgPrev').click(function(){
		if(!$('#crossfade .active').is(':animated')){
			var _index = $('#crossfade .active').index();
			var _length = $('#crossfade div').length - 1;
			if(_index == 0){
				$('ul.imgNav li.current').removeClass('current');
				$('ul.imgNav li:eq('+(_length)+')').addClass('current');
				$('#crossfade .active').fadeOut(1500).removeClass('active');
				$('#crossfade div:eq('+(_length )+')').fadeIn(1500).addClass('active');

			} else {
				$('ul.imgNav li.current').removeClass('current');
				$('ul.imgNav li:eq('+(_index - 1)+')').addClass('current');
				$('#crossfade .active').fadeOut(1500).removeClass('active');
				$('#crossfade div:eq('+(_index - 1)+')').fadeIn(1500).addClass('active');

			}
		}
	});

	$('ul li').click(function(){
		var _index = $(this).index();
		$('.current').removeClass('current');
		$(this).addClass('current');
		$('#crossfade .active').fadeOut(1500).removeClass('active');
		$('#crossfade div:eq('+(_index)+')').fadeIn(1500).addClass('active');
	});


	/*
	 *     News Filters
	 */


	var IE7 = (navigator.appVersion.indexOf("MSIE 7.")==-1) ? false : true;
	if(IE7 == false){
		$('#blurb.news ul.titles li').removeClass();
	}

	$('#content.news .row .news').each(function(){
		$(this).clone().appendTo('#jqNews');
	});

	$('#blurb.news ul.titles li').click(function(){
		if(!$(this).hasClass('active')){
			$(this).addClass('active');
			$('#blurb.news .list_categories ul').slideDown(800);
			$('#blurb.news h1').css({'border-bottom' : '2px solid #222222'});
		} else {
			$(this).removeClass('active');
			$('#blurb.news .list_categories ul').slideUp(800);
			$('#blurb.news h1').css({'border-bottom' : 'none'});
		}
	});
	$('#blurb.news .list_categories ul li').click(function(){
		$('#blurb.news .list_categories ul li').removeClass('current-cat');
		$(this).addClass('current-cat');
		$('#content.news').html('');
		var _class = $(this).find('a').attr('href').match(/blog\/(.+)/)[1].replace(/\//g,'');
		$('#jqNews .' + _class).each(function(index){
			if(index % 4 == 0){
				$('#content.news .row:last .news:last').css({'margin-right' : '0%'});
				$('#content.news').append('<div class="row">');
			}
			$(this).clone().css({'margin-right' : '3.8%'}).appendTo('#content.news .row:last').hide().fadeIn(800, "easeInOutCubic");
		});
		$('#content.news .row:last .news:last').css({'margin-right' : '0%'});

		return false;
	});



});