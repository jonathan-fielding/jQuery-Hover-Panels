;(function ( $, window, document, undefined ) {

    var pluginName = "hoverpanels",
        defaults = {
            default_content: '.default',
            hover_content: '.hover',
            fade_level: '0.5',
            effect: 'fadeSiblings'
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function() {
            var $element = $(this.element);

            $element.find(this.options.hover_content).hide();
            $element.on('mouseenter','.panel', this.action);
            $element.on('mouseleave','.panel', this.action);

        },
        action: function(e){
            var plugin = $(e.delegateTarget).data("plugin_" + pluginName), 
                activeEvent = e.type;

            plugin.effect(this, activeEvent);
            
        },
        effect: function(panel, activeEvent){
            if(this.options.effect === "fadeSiblings"){
               if(activeEvent === "mouseenter"){
                    $(panel).stop(true);
                    $(panel).siblings().stop(true)
                    $(panel).siblings().fadeTo('',this.options.fade_level);
                    $(panel).fadeTo('','1');
                    $(panel).find(this.options.default_content).hide();
                    $(panel).find(this.options.hover_content).show();
                }
                else if(activeEvent === "mouseleave"){
                    $(panel).fadeTo('','1');
                    $(panel).siblings().fadeTo('','1');
                    $(panel).find(this.options.default_content).show();
                    $(panel).find(this.options.hover_content).hide();
                }
            }
            else{
                if(activeEvent === "mouseenter"){
                    $(panel).find(this.options.default_content).hide();
                    $(panel).find(this.options.hover_content).show();
                }
                else if(activeEvent === "mouseleave"){
                    $(panel).find(this.options.default_content).show();
                    $(panel).find(this.options.hover_content).hide();
                }
            }
        }
    };
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
