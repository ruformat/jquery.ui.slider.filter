(function($){

	$.fn.filterSlider = function(options){
	
		// settings
		var settings = $.extend({
			firstField:	'input:eq(0)',
			secondField: 'input:eq(1)',
			slider: '.slider',
			clearQuery: true,
			onSlide: $.noop,
			onChange: $.noop
		}, options);

		// install filterSlider for each items
		this.each(function(){
	
			// root block
			var $block = $(this);
	
			// slider block
			var $slider = $block.find(settings.slider).first();

			// inputs
			var $inputs = {
				min: $block.find(settings.firstField).first(),
			    max: $block.find(settings.secondField).first()
			};

			// limits
			var limits = {
				min: parseFloat($block.attr('data-min')) || 0,
				max: parseFloat($block.attr('data-max')) || 100
			};

			// defaults
			var defaults = {
				min: parseFloat($inputs.min.val()) || 0,
				max: parseFloat($inputs.max.val()) || 100
			};

			// step
			var step = parseFloat($block.attr('data-step')) || 1;
	
			// Init jQuery UI Slider
			$slider.slider({
			    min: limits.min,
			    max: limits.max,
			    step: step,
			    range: true,
			    animate: true,
			    values: [defaults.min, defaults.max],
			    slide:	function(e,ui){
			    	$inputs.min.val(ui.values[0]);
			    	$inputs.max.val(ui.values[1]);
			    	settings.onSlide(e,ui);
			    },
			    change: function(e,ui){
			    	settings.onChange(e,ui);
			    }
			});

			// event: keypress in inputs
			$inputs.min.add($inputs.max).keypress(function(e){
				if (e.which!=8 && e.which!=0 && e.which!=46 && (e.which<48 || e.which>57) || (e.which==46 && $(this).val().indexOf('.')!=-1)) return false;
			});

			// event: change min input
			$inputs.min.change(function(){
				var value = parseFloat($inputs.min.val());
				value = Math.max(value,limits.min);
				value = Math.min($inputs.max.val(),value);
				$inputs.min.val(value);
				$slider.slider('values', 0, value);
			});

			// event: change max input
			$inputs.max.change(function(){
				var value = parseFloat($inputs.max.val());
				value = Math.min(value, limits.max);
				value = Math.max($inputs.min.val(), value);
				$inputs.max.val(value);
				$slider.slider('values', 1, value);
			});

			// don't submit unnecessary data
			if (settings.clearQuery) {

				// save "name" attr values
				$inputs.min.attr('data-name', $inputs.min.attr('name'));
				$inputs.max.attr('data-name', $inputs.max.attr('name'));

				// fn: dont't submit fields if they values equal slider limits
				var removeFromQuery = function(){
					var minInputValue = new Number($inputs.min.val());
					var maxInputValue = new Number($inputs.max.val());
					if (limits.min.toString()==minInputValue.toString() && limits.max.toString()==maxInputValue.toString()) $inputs.min.add($inputs.max).removeAttr('name');
				};

				// fn: return "name" attr values
				var returnInQuery = function(){
					$inputs.min.attr('name', $inputs.min.attr('data-name'));
					$inputs.max.attr('name', $inputs.max.attr('data-name'));
				};

				// query api
				$block.data('filterSlider', {
					removeFromQuery: removeFromQuery,
					returnInQuery: returnInQuery
				});

				// event: form submit
				$block.closest('form').submit(function(){
					removeFromQuery();
				});

			};

		});

		return this;

	};

})(jQuery);