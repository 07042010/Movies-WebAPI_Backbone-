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
        public IEnumerable<Movie> Get()
        {
            return db.Movies.ToList();
        }

        // GET api/values/5
        public IEnumerable<Actor> Get(int id)
        {
            return db.Actors.Where(x=>x.MovieId==id).ToList();
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}