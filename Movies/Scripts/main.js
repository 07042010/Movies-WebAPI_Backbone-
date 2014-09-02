$(function () {

    //Models

    var Movie = Backbone.Model.extend({

        defaults: function () {
            return {
                id: -1,
                name: "Movie",
                genre: "Default",
                cost: 0
            };
        }
    });

    var Actor = Backbone.Model.extend({

        defaults: function () {
            return {
                id: -1,
                fullname: "Name",
                role: "role",
                movieId: -1
            };
        }
    });

    //Collection

    var MovieList = Backbone.Collection.extend({
        model: Movie,
        url: function () {
            return 'api/movies';
        }
    });

    var ActorList = Backbone.Collection.extend({
        model: Actor,
        url: function () {
            return 'api/actors';
        }
    });

    var Movies = new MovieList;
    var Actors = new ActorList;
});