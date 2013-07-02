jQuery UI Slider addon for sliders with fields

![jquery.ui.slider.filter](https://dl.dropboxusercontent.com/u/1396557/github/jquery.ui.slider.filter.png "jquery.ui.slider.filter")


## Installation:

HTML:

  <div data-min="50" data-max="1000" data-step="50" class="filter-slider">
    <input type="text" value="150" />
    <input type="text" value="900" />
    <div class="slider"></div>
  </fieldset>
  ...
  <script src="jquery.js"></script>
  <script src="jquery.ui.js"></script>
  <script src="jquery.ui.slider.filter.js"></script>

JavaScript:

  $(function(){
    $('.filter-slider').filterSlider();
  });
  
## Settings:

* firstField - First field selector. Default: 'input:eq(0)'
* secondField - Second field selector. Default: 'input:eq(1)'
* slider - Slider selector. Default: '.slider'
* clearQuery - Dont't submit fields if they values equal slider limits? Default: true
* onSlide - on slide callback
* onChange - on change callback
