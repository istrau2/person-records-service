/**
 * Created by istrauss on 10/14/2016.
 */

const {Container} = require('aurelia-dependency-injection');
let hooksLoaded = 0;

module.exports = function(sails) {
    return {
        initialize: function(next) {
            sails.on('hook:babel:loaded', function() {
                hooksLoaded++;
                startSeeding(next);
            });

            sails.on('hook:orm:loaded', function() {
                hooksLoaded++;
                startSeeding(next);
            });
        }
    };
};

function startSeeding(next) {
    if (hooksLoaded < 2) {
        return;
    }

    const {DBSeederService} = require('../../services');
    const dbSeederService = Container.instance.get(DBSeederService);
    dbSeederService.seed()
        .then(() => {
            next();
        });
}