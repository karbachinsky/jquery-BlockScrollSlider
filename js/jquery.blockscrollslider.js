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
     * @param {Jquery selector} slides
     * @return
     */
    function BlockScrollSlider(slides) {
        var self = this;

        self.$slides = slides;
        self.slidesArray = [];
        self.slidesHeights = [];
        self.slidesAbsPositions = [];
        self.initialZIndex = 100;
        self.slidesCnt = self.$slides.length;

        var sum = 0, i = 0;
        self.$slides.each(function() {
            $(this).css({ 'z-index': self.initialZIndex + self.$slides.length - i++ });
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

        self.$slides.wrapAll("<div class=\"slide-wrapper\"></div>");
        $(".slide-wrapper").css({
            height: self.slidesAbsPositions[self.slidesCnt-1] + "px"
        });

    };

    /**
     * Wrapper for JQuery
     * @return BlockScrollSlider object
     */
    $.fn.blockScrollSlider = function() {
        return new BlockScrollSlider(this);
    };

})(jQuery);
