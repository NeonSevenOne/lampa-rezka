(function () {
    'use strict';

    Lampa.Plugins.add('rezka_ag_only', {
        title: 'Rezka.ag UA',
        version: '1.0.0',
        description: 'Тільки Rezka.ag з усіма українськими озвучками',
        icon: 'https://rezka.ag/favicon.ico',
        onReady: function () {
            console.log('Rezka.ag Plugin Loaded');
        }
    });

    // Пряме налаштування домену rezka.ag для Lampa
    Lampa.Storage.set('online_mod_rezka', 'true');
    Lampa.Storage.set('rezka_mirror', 'https://rezka.ag');
})();
