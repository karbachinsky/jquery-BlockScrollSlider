cal block slider on scroll event in parallax style.


##HOWTO


Add HTML:
```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="../js/jquery.blockscrollslider.js"></script>

<div class="slide slide1">Slide1</div>
<div class="slide slide2">Slide2</div>
<div class="slide slide3">Slide3</div>
<div class="slide slide4">Slide4</div>
```

Add JS:
```javascript
$(function() {
    var slider =$('.slide').blockScrollSlider();
});
```

Or

```javascript
$(function() {
    var slider = $('.slide').blockScrollSlider({
        changeSlideCallback: function(slide) {
            console.log('Slide changed!');
        }
    });
});
```
Also you can specify additional params: 
   - initialZIndex
   - wrapperClass
   - changeSlideCallback

Therea a fiew publick methods you can call:
```javascript
slider.getSlide(index);
slider.scrollTo(index);

