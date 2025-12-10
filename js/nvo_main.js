jQuery(function($) {
    // Portfolio Single View
    $('#portfolio').on('click','.folio-read-more',function(event){
        event.preventDefault();
        var link = $(this).data('single_url');
        var full_url = '#portfolio-single-wrap',
        parts = full_url.split("#"),
        trgt = parts[1],
        target_top = $("#"+trgt).offset().top;

        $('html, body').animate({scrollTop:target_top}, 600);
        $('#portfolio-single').slideUp(500, function(){
            $(this).load(link,function(){
                $(this).slideDown(500);
            });
        });
    });

    // Close Portfolio Single View
    $('#portfolio-single-wrap').on('click', '.close-folio-item',function(event) {
        event.preventDefault();
        var full_url = '#portfolio',
        parts = full_url.split("#"),
        trgt = parts[1],
        target_offset = $("#"+trgt).offset(),
        target_top = target_offset.top;
        $('html, body').animate({scrollTop:target_top}, 600);
        $("#portfolio-single").slideUp(500);
    });
});