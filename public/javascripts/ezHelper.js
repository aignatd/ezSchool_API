$(document).ready(function()
{
   function resizeYouTube() 
   {
      var ratio = 16/9;
      var widthViewPort = $(window).width();
      var heightViewPort = $(window).height();
      var width, height;
      var $player = $('#YouTube1');
      if (widthViewPort / ratio < heightViewPort)
      {
         width = Math.ceil(heightViewPort * ratio);
         $player.width(width).height(heightViewPort).css({left: (widthViewPort - width) / 2, top: 0});
      }
      else
      {
         height = Math.ceil(widthViewPort / ratio);
         $player.width(widthViewPort).height(height).css({left: 0, top: (heightViewPort - height) / 2});
      }
   }
   $(window).on('resize', function() 
   {
      resizeYouTube();
   })
   resizeYouTube();
   $("a[href*='#about']").click(function(event)
   {
      event.preventDefault();
      $('html, body').stop().animate({ scrollTop: $('#wb_about').offset().top }, 600, 'easeOutCubic');
   });
   $("a[href*='#services']").click(function(event)
   {
      event.preventDefault();
      $('html, body').stop().animate({ scrollTop: $('#wb_services').offset().top }, 600, 'easeOutCubic');
   });
   $("a[href*='#top']").click(function(event)
   {
      event.preventDefault();
      $('html, body').stop().animate({ scrollTop: $('#wb_top').offset().top }, 600, 'easeOutCubic');
   });
   $("a[href*='#contact']").click(function(event)
   {
      event.preventDefault();
      $('html, body').stop().animate({ scrollTop: $('#wb_contact').offset().top }, 600, 'easeOutCubic');
   });
   $("a[href*='#portfolio']").click(function(event)
   {
      event.preventDefault();
      $('html, body').stop().animate({ scrollTop: $('#wb_portfolio').offset().top }, 600, 'easeOutCubic');
   });
   function Bookmark1Scroll()
   {
      var $obj = $("#wb_Bookmark1");
      if (!$obj.hasClass("in-viewport") && $obj.inViewPort(false))
      {
         $obj.addClass("in-viewport");
         SetStyle('PageHeader', 'NoBackground');
      }
      if ($obj.hasClass("in-viewport") && !$obj.inViewPort(true))
      {
         $obj.removeClass("in-viewport");
         SetStyle('PageHeader', 'GrayBackground');
      }
   }
   Bookmark1Scroll();
   $(window).scroll(function(event)
   {
      Bookmark1Scroll();
   });
   $("a[href*='#Bookmark2']").click(function(event)
   {
      event.preventDefault();
      $('html, body').stop().animate({ scrollTop: $('#wb_Bookmark2').offset().top }, 600, 'easeOutCubic');
   });
});
