﻿    //Models

    var Movie = Backbone.Model.extend({
        defaults: {
            Id: -1,
            Name: "Movie",
            Genre: "Default",
            Cost: 0
        }
    });

    var Actor = Backbone.Model.extend({
        defaults: {
            Id: -1,
            FullName: "Name",
            Role: "role",
            MovieId: -1,
            isVisible: false
        }
    });

    //Collection

    var MovieList = Backbone.Collection.extend({
        model: Movie,
        url: function () {
            return 'api/values/movies'
        }
    });

    var ActorList = Backbone.Collection.extend({
        model: Actor,
        url: function () {
            return 'api/values/actors'
        }
    });

    //Views

    var MovieViews = Backbone.View.extend({
        tagName: 'ul',
        className: 'unstyled',
        render: function () {
            this.collection.each(this.addOne, this);
            return this;
        },
        addOne: function (Movie) {
            var oneView = new MovieView({ model: Movie });
            this.$el.append(oneView.render().el);
        }
    });

    var movId = 0;

    var MovieView = Backbone.View.extend({
        tagName: 'li',
        render: function () {
            this.$el.html(this.model.get('Id') + '. ' + this.model.get('Name') + ' ( ' + this.model.get('Genre') + ', $' + this.model.get('Cost') + ' )');
            return this;
        },
        events:{
            'click': 'movieClick'
        },
        movieClick: function (e) {
            movId = this.model.get('Id');
            Actors.each(this.updateActors);
            
        },
        updateActors: function(item, i, arr)
        {
            if (item.get('MovieId') == movId)
                item.set('isVisible', true)
            else
                item.set('isVisible', false)
        }
    });

    var ActorsViews = Backbone.View.extend({
        tagName: 'ul',
        className: 'unstyled',
        render: function () {
            this.collection.each(this.addOne, this);
            return this;
        },
        addOne: function (Movie) {
            var oneView = new ActorView({ model: Movie });
            this.$el.append(oneView.render().el);
        }
    });

    var ActorView = Backbone.View.extend({
        tagName: 'li',
        render: function () {
            this.$el.html(this.model.get('Id') + '. ' + this.model.get('FullName') + ' ( ' + this.model.get('Role') + ' ) ');
            return this;
        }
    });

    var Movies = new MovieList;

    Movies.fetch({
        success: function (Movies) {
            console.log(Movies.toJSON());
            var tasksView = new MovieViews({ collection: Movies });
            tasksView.render();
            $('div#moviesblock').append(tasksView.el);
        }
    });

    var Actors = new ActorList;

    Actors.fetch({
        success: function (Actors) {
            console.log(Actors.toJSON());
            var tasksView = new ActorsViews({ collection: Actors });
            tasksView.render();
            $('div#actorsblock').append(tasksView.el);
        }
    });