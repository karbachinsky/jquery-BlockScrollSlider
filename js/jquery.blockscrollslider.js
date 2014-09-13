/**
 * ParallaxBlockSlider.js
 * @author Igor Karbachinsky <igorkarbachinsky@mail.ru>
 * @description Creates a semi-parallax slide effect between an array of blocks layers when scrolling.
 * (c) September 2014
 *
 */

(function($) {

    /**
     * Initialize
     * @param {Jquery selector | object} slides
     * @return
     */
    function BlockScrollSlider(slides, params) {
        var self = this;

        self.$slides = slides;

        self.currentSlide = null;
        self.slidesArray = [];
        self.slidesHeights = [];
        self.slidesAbsPositions = [];
        self.initialZIndex = 100;
        self.slidesCnt = self.$slides.length;

        self.params = {
            wrapperClass: 'slide-wrapper',
            initialZIndex: 100,
            changeSlideCallback: function(currentSlide) {}
        };

        if("object" == typeof(params)) {
            $.extend(self.params, params);
        }

        var sum = 0, i = 0;
        self.$slides.each(function() {
            $(this).css({ 'z-index': self.params.initialZIndex + self.$slides.length - i++ });
            self.slidesArray.push($(this));
            self.slidesHeights.push($(this).height());

            sum += $(this).height();
            self.slidesAbsPositions.push(sum);
        });

        self._createWrapper();
        self._activateSlide($(window).scrollTop());

        $(window).scroll(function(e){
            self._activateSlide($(this).scrollTop());
        });

        $(window).resize(function(e) {
            self._activateSlide($(this).scrollTop());
        });
    }

    /**
     * Activates slide corresponding to certain scroll position
     * @param {Number} pos
     * @return
     */
    BlockScrollSlider.prototype._activateSlide = function(pos) {
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

        if (i != self.currentSlideIndex) {
            self.params.changeSlideCallback(self.slidesArray[i]);
            self.currentSlideIndex = i;
        }

        for (var j=0; j<self.slidesCnt; ++j) {
            if (j <= i) {
                self.slidesArray[j].css({
                    position: "absolute",
                    top: ( j > 0 ? self.slidesAbsPositions[j-1] : 0 ) + "px"
                });
            }
            else {
                self.slidesArray[j].css({
                    position: "fixed",
                    top: "0px"
                });
            }
         }
    };

    /**
     * Creates wrapper around slides and set necessary height for it.
     * @return
     */
    BlockScrollSlider.prototype._createWrapper = function() {
        var self = this;

        var wrapperClass = "." + self.params.wrapperClass;
        self.$slides.wrapAll("<div class=\"" + wrapperClass + "\"></div>");
        $(wrapperClass).css({
            height: self.slidesAbsPositions[self.slidesCnt-1] + "px"
        });

    };

    /**
     * Wrapper for JQuery
     * @return BlockScrollSlider object
     */
    $.fn.blockScrollSlider = function(params) {
        return new BlockScrollSlider(this, params);
    };

})(jQuery);
