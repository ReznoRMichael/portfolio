jQuery(function($)
	{
		// reset scroll
		$.scrollTo(0);
		$('.scrollup').click(function(e)
			{
				e.preventDefault(); // anti-double in Chrome
				$.scrollTo($('body'), 700);
			});
		$('#go-up').click(function(){ $.scrollTo($('body'), 700); });
	}
	);

	// show scroll
	$(window).scroll(function()
	{
		if ( $(this).scrollTop()>300 )
		{
			$('.scrollup').fadeIn(200);
		}
		else $('.scrollup').fadeOut(200);
	}
	);