(function ($) {

    $.fn.timeselect = function (options) {
        var settings = $.extend({
            step: 30,
            format: 'h:mm tt',
            maxResults: null,
            autocompleteSettings: {}
        }, options);

        this.filter("input").each(function () {
            var $input = $(this),
                source = [],
                date = new Date(),
                max = new Date();

            date.setHours(0, 0, 0, 0);
            max.setHours(24, 0, 0, 0);

            while (date < max) {
                source.push(date.toString(settings.format));

                date.setTime(date.getTime() + (settings.step * 60 * 1000));
            }

            var autocompleteSettings = $.extend({
                source: function (request, response) {
                    var results = $.grep(source, function (t) {
                        return t.indexOf(request.term) == 0 || t.indexOf("0" + request.term) == 0;
                    });

                    response(settings.maxResults ? results.slice(0, settings.maxResults) : results);
                },
                minLength: 0
            }, settings.autocompleteSettings);

            $input.autocomplete(autocompleteSettings).focus(function () {
                $input.autocomplete("search");
            });
        });

        return this;
    };

}(jQuery));