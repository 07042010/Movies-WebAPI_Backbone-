    //Models

    var Movie = Backbone.Model.extend({
        defaults: {
            Id: -1,
            Name: "Movie",
            Genre: "Default",
            Cost: 0
        },
    });

    var Actor = Backbone.Model.extend({
        defaults: {
            id: -1,
            fullname: "Name",
            role: "role",
            movieId: -1
        },
    });

    //Collection

    var MovieList = Backbone.Collection.extend({
        model: Movie,
        url: function () {
            return 'api/values'
        },
    });

    var ActorList = Backbone.Collection.extend({
        model: Actor,
        url: function () {
            return 'api/actors'
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

    var MovieView = Backbone.View.extend({
        tagName: 'li',
        render: function () {
            this.$el.html(this.model.get('Id') + '. ' + this.model.get('Name') + ' ( ' + this.model.get('Genre') + ', $' + this.model.get('Cost') + ' )');
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