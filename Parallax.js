$(window).bind('scroll', function() {
    requestAnimationFrame(parallaxScroll);
});

function parallaxScroll() {
    var scrolled = $(window).scrollTop();
    
    // Background city layers moving at different speeds
    $('.layer-1').css('top', (0 - (scrolled * .25)) + 'px');
    $('.layer-2').css('top', (0 - (scrolled * .50)) + 'px');
    $('.layer-3').css('top', (0 - (scrolled * .75)) + 'px');
    
    // Floating objects moving up at various speeds
    $('.rock-1').css('top', (400 - (scrolled * .85)) + 'px');
    $('.rock-2').css('top', (200 - (scrolled * .65)) + 'px');
    $('.rock-3').css('top', (500 - (scrolled * .45)) + 'px');
    $('.rock-4').css('top', (600 - (scrolled * .55)) + 'px');
    $('.rock-5').css('top', (600 - (scrolled * .75)) + 'px');
    $('.rock-6').css('top', (400 - (scrolled * .75)) + 'px');
    $('.rock-7').css('top', (600 - (scrolled * .55)) + 'px');
    $('.rock-8').css('top', (200 - (scrolled * .25)) + 'px');
    $('.rock-9').css('top', (200 - (scrolled * .45)) + 'px');
}
