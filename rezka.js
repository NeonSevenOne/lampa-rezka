(function () {
    'use strict';

    Lampa.Plugins.add('rezka_only', {
        title: 'HDRezka UA',
        description: 'Пошук та перегляд з Rezka.ag',
        icon: 'https://rezka.ag/favicon.ico',
        version: '1.0.1',
        author: 'Neonsevenone',
        onInit: function () {
            console.log('Rezka plugin loaded');
        }
    });

    Lampa.Listener.follow('full', function (e) {
        if (e.type === 'complite') {
            var render = e.object.activity.render();
            var movie = e.data.movie;

            if (!render.find('.button--rezka-only').length) {
                var button = $(
                    '<div class="full-start__button selector button--rezka-only">' +
                        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                            '<polygon points="5 3 19 12 5 21 5 3"></polygon>' +
                        '</svg>' +
                        '<span>Rezka UA</span>' +
                    '</div>'
                );

                button.on('hover:enter', function () {
                    // Беремо оригінальну назву (напр. англійську) або звичайну
                    var searchQuery = movie.original_title || movie.title || movie.name;
                    Lampa.Noty.show('Шукаємо на Rezka: ' + searchQuery);
                });

                render.find('.full-start__buttons').append(button);
            }
        }
    });
})();
