if (!window.__PERSIST) {
    // for pre-rendered abstract pages
    require(['jquery'], function ($) {

        var alert = $('div[data-widget="AlertsWidget"]')[0];
        if (alert && alert.outerText && alert.outerText.toLowerCase().indexOf('error') > -1)
            throw Error(location.href + ": Encountered exception:" + alert.outerText);

        var abs = $('div[data-widget="ShowAbstract"]')[0];
        if (abs && abs.outerText.indexOf('Loading...') > -1)
            throw Error(location.href + " was not loaded fully");
        
        window.__PERSIST = function () {
        var $head = $('head').clone(true);
        var $body = $('body').clone(true);
        var toRemove = [
            '#toggle-aff',
            '#toggle-more-authors',
            'div.navbar-collapse',
            '.popover',
            '.back-button',
            '.s-library-area',
            '.icon-clear',
            '.alert-banner'
        ];
        

        $('script', $head).remove();
        $(toRemove.join(', '), $body).remove();
        $('#authors-and-aff', $body).prepend('<div style="height:20px;"></div>')
        $('.s-nav-container nav>[data-widget-id]>div', $body)
        .not('[data-widget-id~="ShowAbstract"]>div', $body)
        .addClass('s-nav-inactive')
        .attr('href', '#');
        $('form[name="main-query"] input', $body).addClass('disabled');
        $('form[name="main-query"] button[type="submit"]>i', $body).addClass('disabled fa-spin fa-spinner');
        
        $head.append('<script>window.__PRERENDERED = true;</script>');
        
        $('base', $head).remove();
        $head.prepend($('<base href="/">'));

        var $dom = $('<html></html>').append($head).append($body);
        var html = $dom[0].outerHTML.replace('var progressValue = 0', 'var progressValue = 100');
        var i = html.indexOf('// Progress Bar');
        var j = html.indexOf('})()', i);
        if (i > -1 && j > -1 && j - i < 2000)
          html = html.substring(0, i) + "\nwindow.__PAGE_LOAD_TIMESTAMP = new Date();\n" + html.substring(j+4);

        return html;
        }
    });
}
