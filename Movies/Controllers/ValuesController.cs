using Movies.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Movies.Controllers
{
    public class ValuesController : ApiController
    {
        MovieContext db = new MovieContext();
        // GET api/values
        public Dictionary<string, object>[] GetMovies()
        {
            Movie[] array = db.Movies.ToArray();
            Dictionary<string, object>[] dict = new Dictionary<string, object>[array.Length];
            for(int i=0; i < array.Length; i++)
            {
                var tempdict = new Dictionary<string,object>();
                tempdict.Add("Id", array[i].Id);
                tempdict.Add("Name", array[i].Name);
                tempdict.Add("Genre", array[i].Genre);
                tempdict.Add("Cost", array[i].Cost);
                dict[i] = tempdict;
            }
            return dict;
        }

        // GET api/values/5
        public IEnumerable<Actor> Get(int id)
        {
            return db.Actors.Where(x=>x.MovieId==id).ToList();
        }
    }
}