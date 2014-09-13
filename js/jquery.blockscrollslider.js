/**
 * ParallaxBlockSlider.js
 * @author Igor Karbachinsky <igorkarbachinsky@mail.ru>
 * @description Creates a semi-parallax effect between an array of blocks layers.
 * (c) September 2014
 *
 */

(function($) {

    var BlockScrollSlider = {
        $slides: undefined,
        slidesArray: [],
        slidesCnt: 0,
        slidesHeights: [],
        slidesAbsPositions: [],
        initialZIndex: 100,

        init: function(slides) {
            var self = this;

            self.$slides = slides;
            self.slidesCnt = self.$slides.length;

            var sum = 0, i = 0;
            self.$slides.each(function() {
                $(this).css({ 'z-index': self.initialZIndex + self.$slides.length - i++ });
                self.slidesArray.push($(this));
                self.slidesHeights.push($(this).height());

                sum += $(this).height();
                self.slidesAbsPositions.push(sum);
            });

            self.createWrapper();
            self.activateSlide($(window).scrollTop());

            $(window).scroll(function(e){
                self.activateSlide($(this).scrollTop());
            });

            $(window).resize(function(e) {
                self.activateSlide($(this).scrollTop());
            });
        },

        activateSlide: function(pos) {
            var self = this;

            var i;
            for (var j=0; j<self.slidesCnt; ++j) {
                if (pos < self.slidesAbsPositions[j]) {
                    i = j;
                    break;
                }
            }

            if (i == null)
                return;

            for (var j=0; j<self.slidesCnt; ++j) {
                if (j <= i) {
                    self.slidesArray[j].css({
                        "position": "absolute",
                        "top": ( j > 0 ? self.slidesAbsPositions[j-1] : 0 ) + "px"
                    });
                }
                else {
                    self.slidesArray[j].css({
                        "position": "fixed",
                        "top": "0px"
                    });
                }
            }

        },

        createWrapper: function() {
            var self = this;

            self.$slides.wrapAll("<div class=\"slide-wrapper\"></div>");
            $(".slide-wrapper").css({
                height: self.slidesAbsPositions[self.slidesCnt-1] + "px"
            });
        }
    };

    $.fn.blockScrollSlider = function() {
        BlockScrollSlider.init(this);
    };


})(jQuery);


