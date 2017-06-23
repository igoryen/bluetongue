

jQuery(document).ready(function($){ 
	console.log("loaded");


    // ====== Open EMAIL section ===
    $("#applicant").on('change', function () {
        if( ( this ).checked ){
            console.log("Checked: " + ( this ).checked );
            // $('.singer_profile_overview').removeClass('visible');
            // $('#' + $(this).attr("id") + "_block").css("display", "flex"); 
            // $("#applicant_block").css("display", "flex"); 
            $("#applicant_block").slideToggle( function() {
                if( $( this ).is(':visible')) {
                    $( this ).css( { display: "flex"});
                }
            }); 

        }   
         
    }); 
    $("#creditcard").on('change', function () {
        if( ( this ).checked ){
            console.log("Checked: " + ( this ).checked );
            // $('.singer_profile_overview').removeClass('visible');
            // $('#' + $(this).attr("id") + "_block").css("display", "flex"); 
            // $("#applicant_block").css("display", "none"); 
            $("#applicant_block").slideToggle(); 

        }   
         
    });     

    // ============================


    // ===== TOOL TIPS =====

        var targets = $( '[rel~=tooltip]' );
        var target  = false;
        var tooltip = false;
        var title   = false;


        targets.on( 'mouseenter', function()  {
            target  = $( this );
            tip     = target.attr( 'title' );
            tooltip = $( '<div id="tooltip"></div>' );
     
            if( !tip || tip == '' ) {
                return false;
            }
     
            target.removeAttr( 'title' );
            tooltip.css( 'opacity', 0 ).html( tip ).appendTo( 'body' );
     
            var init_tooltip = function()   {
                if( $( window ).width() < tooltip.outerWidth() * 1.5 ){
                    tooltip.css( 'max-width', $( window ).width() / 2 );
                }
                else{
                    tooltip.css( 'max-width', 340 );
                }
     
                var pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 ),
                    pos_top  = target.offset().top - tooltip.outerHeight() - 20;
     
                if( pos_left < 0 )
                {
                    pos_left = target.offset().left + target.outerWidth() / 2 - 20;
                    tooltip.addClass( 'left' );
                }
                else
                    tooltip.removeClass( 'left' );
     
                if( pos_left + tooltip.outerWidth() > $( window ).width() )
                {
                    pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
                    tooltip.addClass( 'right' );
                }
                else
                    tooltip.removeClass( 'right' );
     
                if( pos_top < 0 )
                {
                    var pos_top  = target.offset().top + target.outerHeight();
                    tooltip.addClass( 'top' );
                }
                else
                    tooltip.removeClass( 'top' );
     
                tooltip.css( { left: pos_left, top: pos_top } )
                       .animate( { top: '+=10', opacity: 1 }, 50 );
            };
     
            init_tooltip();
            $( window ).resize( init_tooltip );
     
            var remove_tooltip = function() {
                tooltip.animate( { top: '-=10', opacity: 0 }, 50, function() {
                    $( this ).remove();
                });
     
                target.attr( 'title', tip );
            };
     
            target.bind( 'mouseleave', remove_tooltip );
            tooltip.bind( 'click', remove_tooltip );
        });

    // ===== end of TOOL TIPS =====





});


(function($) {
    $.fn.menumaker = function(options) {  
        var cssmenu = $(this), settings = $.extend({
            format: "dropdown",
            sticky: false
        }, options);
        return this.each(function() {
            $(this).find(".button").on('click', function(){
                $(this).toggleClass('menu-opened');
                var mainmenu = $(this).next('ul');
                if (mainmenu.hasClass('open')) { 
                    mainmenu.slideToggle().removeClass('open');
                }
                else {
                    mainmenu.slideToggle().addClass('open');
                    if (settings.format === "dropdown") {
                        mainmenu.find('ul').show();
                    }
                }
            });
            cssmenu.find('li ul').parent().addClass('has-sub');
            multiTg = function() {
                cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
                cssmenu.find('.submenu-button').on('click', function() {
                    $(this).toggleClass('submenu-opened');
                    if ($(this).siblings('ul').hasClass('open')) {
                        $(this).siblings('ul').removeClass('open').slideToggle();
                    }
                    else {
                        $(this).siblings('ul').addClass('open').slideToggle();
                    }
                });
            };
            if (settings.format === 'multitoggle') multiTg();
            else cssmenu.addClass('dropdown');
            if (settings.sticky === true) cssmenu.css('position', 'fixed');
            resizeFix = function() {
                var mediasize = 1000;
                if ($( window ).width() > mediasize) {
                    cssmenu.find('ul').show();
                }
                if ($(window).width() <= mediasize) {
                    cssmenu.find('ul').hide().removeClass('open');
                }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);
        });
    };
})(jQuery);

(function($){
    $(document).ready(function(){
        $("#cssmenu").menumaker({
            format: "multitoggle"
        });
    });
})(jQuery);
