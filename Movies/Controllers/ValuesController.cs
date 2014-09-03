using Movies.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Routing;
using System.Web.Http;

namespace Movies.Controllers
{
    public class ValuesController : ApiController
    {
        MovieContext db = new MovieContext();
        // GET api/values
        [HttpGet]
        public Dictionary<string, object>[] Movies()
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
        [HttpGet]
        public Dictionary<string, object>[] Actors()
        {
            Actor[] array = db.Actors.ToArray();
            Dictionary<string, object>[] dict = new Dictionary<string, object>[array.Length];
            for (int i = 0; i < array.Length; i++)
            {
                var tempdict = new Dictionary<string, object>();
                tempdict.Add("Id", array[i].Id);
                tempdict.Add("FullName", array[i].FullName);
                tempdict.Add("Role", array[i].Role);
                tempdict.Add("MovieId", array[i].MovieId);
                dict[i] = tempdict;
            }
            return dict;
        }

    }
}