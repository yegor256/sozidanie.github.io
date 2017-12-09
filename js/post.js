/*globals $:false, window:false, document:false */
if (typeof($) != 'undefined') {
  $(function() {
    'use strict';
    function number(num) {
      if (num > 1000) {
        return (num / 1000).toFixed(1) + 'k';
      }
      return num;
    }
    if ($('.buttons').css('display') !== 'none') {
      $('.button').click(
        function (event) {
          event.preventDefault();
          var $this = $(this);
          window.open(
            $this.attr('href'),
            $this.attr('title'),
            'width=640,height=300'
          );
        }
      );
      var url = document.location.href.split('?')[0].split('#')[0],
        eurl = encodeURIComponent(url),
        border = '1px solid #ffa094',
        timeout = 5000;
      if ($('.count-googleplus').length) {
        $.ajax({
          dataType: 'json',
          async: true,
          timeout: timeout,
          url: 'http://free.sharedcount.com/?apikey=d730c518430eabcabc46ab79528c744067afa17e&url=' + eurl,
          success: function (data) {
            if (data.GooglePlusOne !== 0) {
              $('.count-googleplus').html(number(data.GooglePlusOne)).fadeIn();
            }
          },
          error: function() {
            $('.share .icon-googleplus').css('border', border);
          }
        });
      }
      if ($('.count-facebook').length) {
        $.ajax({
          dataType: 'jsonp',
          async: true,
          timeout: timeout,
          url: 'https://graph.facebook.com/?callback=?&ids=' + eurl,
          success: function(json) {
            if (json[url]) {
              var count = json[url].share.share_count;
              if (count > 0) {
                $('.count-facebook').html(number(count)).fadeIn();
              }
            }
          },
          error: function() {
            $('.share .icon-facebook').css('border', border);
          }
        });
      }
      if ($('.count-linkedin').length) {
        $.ajax({
          dataType: 'json',
          async: true,
          timeout: timeout,
          url: 'https://www.linkedin.com/countserv/count/share?format=jsonp&callback=?&url=' + eurl,
          success: function(json) {
            var count = json.count;
            if (count > 0) {
              $('.count-linkedin').html(number(count)).fadeIn();
            }
          },
          error: function() {
            $('.share .icon-linkedin').css('border', border);
          }
        });
      }
      if ($('.count-reddit').length) {
        $.ajax({
          dataType: 'json',
          async: true,
          timeout: timeout,
          url: 'http://www.reddit.com/api/info.json?jsonp=?&url=' + eurl,
          success: function(json) {
            var count = json.data.children.length;
            if (count > 0) {
              $('.count-reddit').html(number(count)).fadeIn();
            }
          },
          error: function() {
            $('.share .icon-reddit').css('border', border);
          }
        });
      }
      if ($('.count-vk').length) {
        VK.Share = {};
        VK.Share.count = function (index, count) {
          if (count > 0) {
            $('.count-vk').html(number(count)).fadeIn();
          }
        };
        $.ajax({
          dataType: 'jsonp',
          async: true,
          timeout: timeout,
          url: 'https://vk.com/share.php?act=count&url=' + eurl
        });
      }
    }
  });
}
