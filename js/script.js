// mouse cursor
const custom_cursor = document.getElementById('cursor');
const pointer = document.getElementById('pointer');

const animateCursor = (event, interacting, interactable) => {
  let cursorX = `calc(${event.clientX}px - 1.125rem)`,
    cursorY = `calc(${event.clientY}px - 1.125rem)`;

  let pointerX = `calc(${event.clientX}px - 0.25rem)`,
    pointerY = `calc(${event.clientY}px - 0.25rem)`;

  pointer.style.transform = `translate(${pointerX}, ${pointerY})`;

  const dimensions = interacting ? interactable.getBoundingClientRect() : null;
  const radius = interacting ? '0px' : '50%';

  if (interacting) {
    cursorX = (dimensions.x - 2) + 'px';
    cursorY = (dimensions.y - 2) + 'px';
  };

  const cursor_keyframes = {
    transform: `translate(${cursorX}, ${cursorY})`,
    width: interacting ? `${dimensions.width}px` : '2rem',
    height: interacting ? `${dimensions.height}px` : '2rem',
    borderRadius: radius,
  };

  custom_cursor.animate(cursor_keyframes, {
    duration: 400,
    fill: 'forwards'
  });
};

window.onmousemove = (event) => {
  const interactable = event.target.closest('.interactable'),
    interacting = (interactable !== null);

  animateCursor(event, interacting, interactable);
};

window.onmousedown = (event) => {
  cursor.style.backgroundColor = '#A5A6FF';
};

window.onmouseup = (event) => {
  cursor.style.backgroundColor = '#F5F74900';
};


// counter section
(function($) {  
  $.fn.countTo = function(options) {  
    optionsoptions = options || {};  
    return $(this).each(function() {    
      var settings = $.extend(  
        {},  
        $.fn.countTo.defaults,  
        {  
          from: $(this).data("from"),  
          to: $(this).data("to"),  
          speed: $(this).data("speed"),  
          refreshInterval: $(this).data("refresh-interval"),  
          decimals: $(this).data("decimals")  
        },  
        options  
      );  
        var loops = Math.ceil(settings.speed / settings.refreshInterval),  
        increment = (settings.to - settings.from) / loops;  
        var self = this,  
        $self = $(this),  
        loopCount = 0,  
        value = settings.from,  
        data = $self.data("countTo") || {};  
      $self.data("countTo", data);  
      if (data.interval) {  
        clearInterval(data.interval);  
      }  
      data.interval = setInterval(updateTimer, settings.refreshInterval);  
      render(value);  
      function updateTimer() {  
        value += increment;  
        loopCount++;  
        render(value);  
        if (typeof settings.onUpdate == "function") {  
          settings.onUpdate.call(self, value);  
        }  
        if (loopCount >= loops) {  
          $self.removeData("countTo");  
          clearInterval(data.interval);  
          value = settings.to;  
          if (typeof settings.onComplete == "function") {  
            settings.onComplete.call(self, value);  
          } } }  
      function render(value) {  
        var formattedValue = settings.formatter.call(self, value, settings);  
        $self.html(formattedValue);  
      }  
    });  
  };  
  $.fn.countTo.defaults = {  
    from: 0,  
    to: 0,   
    speed: 1000,   
    refreshInterval: 100,  
    decimals: 0,   
    formatter: formatter,   
    onUpdate: null,   
    onComplete: null   
  };  
  function formatter(value, settings) {  
    return value.toFixed(settings.decimals);  
  }  
}) (jQuery);  
jQuery(function($) {  
  $(".count-number").data("countToOptions", {  
    formatter: function(value, options) {  
      return value  
        .toFixed(options.decimals)  
        .replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");  
    }  
  });  
    $(".timer").each(count);  
  function count(options) {  
    var $this = $(this);  
    options = $.extend({}, options || {}, $this.data("countToOptions") || {} );  
    $this.countTo(options);  
  }  
});  

