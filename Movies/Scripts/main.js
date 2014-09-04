    //Models

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
        className: 'nav nav-pills nav-stacked',
        render: function () {
            this.collection.each(this.addOne, this);
            return this;
        },
        addOne: function (Movie) {
            var oneView = new MovieView({ model: Movie });
            this.$el.append(oneView.render().el);
        }
    });

    var movId = 1;

    var MovieView = Backbone.View.extend({
        tagName: 'li',
        render: function () {
            this.$el.html('<a href="#" >' + this.model.get('Id') + '. ' + this.model.get('Name') + ' ( ' + this.model.get('Genre') + ', $' + this.model.get('Cost') + ' )' + '</a>');
            return this;
        },
        events:{
            'click': 'movieClick'
        },
        movieClick: function (e) {
            movId = this.model.get('Id');
            updateActors();
            $('div#actorsblock').empty();
            actorView.el.innerHTML = ""
            $('div#actorsblock').html(actorView.render().el);
            delete_li();
            $(e.target.parentNode).addClass('active')
        }
    });

    function updateActors()
    {
        Actors.each(function (item, i, arr) {
            if (item.get('MovieId') == movId)
                item.set('isVisible', true)
            else
                item.set('isVisible', false)
        });
        
    }
    function delete_li() {
        $('li').each(function (i, item) {
            $(item).removeClass('active');
            if ($(item).html().indexOf(")") < 0)
                item.remove();
        })
    };

    var ActorsViews = Backbone.View.extend({
        tagName: 'ul',
        className: 'list-group',
        render: function () {
            Actors.each(this.addOne, this);
            return this;
        },
        addOne: function (actor) {
            var oneView = new ActorView({ model: actor });
            this.$el.append(oneView.render().el);
        }
    });

    var ActorView = Backbone.View.extend({
        tagName: 'li',
        className: 'list-group-item',
        template: '#actors',
        render: function () {
            var template = _.template($(this.template).html());
            this.$el.html(template(this.model.toJSON()));
            return this;
        }
    });

    

    var Actors = new ActorList;
    var actorView = new ActorsViews;

    Actors.fetch({
        success: function (Actors) {
            console.log(Actors.toJSON());
            updateActors();
            actorView = new ActorsViews({ collectiovn: Actors });
            $('div#actorsblock').append(actorView.render().el);
            delete_li();
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