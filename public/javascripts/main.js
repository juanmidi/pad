/**
 * The main page of PAD
 */
!function($, ko, _, window, undefined){
  "use strict";
  var isLoading = ko.observable(true)
    , _baraja
    , $lastElement;

  var barajaPrev = function() {
    if (_baraja === undefined) return;

    _baraja.previous();
  };

  var barajaNext = function() {
    if (_baraja === undefined) return;

    _baraja.next();
  };

  var getCurrent = function () {
    var $li
      , maxz = -9999;

    $('#baraja-el li').each(function(){
      var $this = $(this);

      var zi = $this.css('z-index');
      var i = zi !== undefined ? parseInt(zi) : 0;

      if (i > maxz) {
        $li = $this;
        maxz = i;
      }

    });

    return $li;
  };

  var seleccionarBaraja = function() {
    
    var $el = getCurrent();

    var level = parseInt($el.data('level'));
    var target = $el.data('target');
    var owner = $el.data('owner');

    var uri = '/';
    if (level === 1) {
      var uri = '/bloques/' + level + '/' + target;
    } else {
      var uri = '/tangibles/' + owner + '/' + target;  
    }

    window.location.href = uri;
  };

  // create the context
	var vm = {
		isLoading: isLoading,
    barajaPrev: barajaPrev,
    barajaNext: barajaNext,
    seleccionarBaraja: seleccionarBaraja
	};

	ko.applyBindings(vm);

  $.when(init())
   .then(function(){ 
      isLoading(false);
    });

	return vm;

  function init() {
    return $.Deferred(function(def){

      $(function(){
        // when de DOM is loaded
        _baraja = $('#baraja-el').baraja();
        _baraja.fanSettings.range = 180;
        def.resolve();

        $(document).keydown(function(event) {
          
          if (event.keyCode == 37) {
            // left 
            barajaPrev();
          } else if (event.keyCode == 39) {
            // right
            barajaNext();
          } else if (event.keyCode == 13) {
            // enter
            seleccionarBaraja();
          } else if (event.keyCode == 69) {
            // e
            window.location.href = '/explorar';
          } else if (event.keyCode == 38) {
            // up
            if (_baraja !== undefined && _baraja.closed === true) {
              _baraja.fan();
            }
            
          }

        });

      });

    }).promise();
  }

}(jQuery, ko, _, window);

