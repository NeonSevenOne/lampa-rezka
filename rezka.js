(function () {
    'use strict';

    function RezkaAgPlugin() {
        var host = 'https://rezka.ag';

        this.init = function () {
            Lampa.Listener.follow('app', function (e) {
                if (e.type == 'ready') {
                    // Фіксація налаштувань для дзеркала Rezka
                    Lampa.Storage.set('online_mod_rezka', 'true');
                    Lampa.Storage.set('rezka_mirror', host);
                }
            });

            // Підключення онлайн-модуля Rezka
            if (window.lampa_settings && window.lampa_settings.online) {
                Lampa.Component.add('online_rezka', function (object) {
                    var comp = new Lampa.InteractionMain(object);
                    
                    comp.create = function () {
                        this.activity.loader(true);
                        var self = this;
                        
                        var title = object.movie.title || object.movie.name;
                        var search_url = host + '/engine/ajax/search.php';

                        $.ajax({
                            url: search_url,
                            type: 'POST',
                            data: { q: title },
                            dataType: 'html',
                            success: function (data) {
                                self.activity.loader(false);
                                if (data) {
                                    self.append($(data));
                                } else {
                                    self.empty('Нічого не знайдено на Rezka.ag');
                                }
                            },
                            error: function () {
                                self.activity.loader(false);
                                self.empty('Помилка з\'єднання з Rezka.ag. Перевірте дзеркало або MSX.');
                            }
                        });
                    };
                    return comp;
                });
            }
        };
    }

    if (!window.plugin_rezka_ag_ready) {
        window.plugin_rezka_ag_ready = true;
        var plugin = new RezkaAgPlugin();
        plugin.init();
    }
})();
