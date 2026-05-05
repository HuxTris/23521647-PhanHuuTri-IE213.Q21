import { ObjectId } from "mongodb";

let movies;

class MoviesDAO {
  static async injectDB(conn) {
    if (movies) {
      return;
    }

    try {
      movies = await conn
        .db(process.env.MOVIEREVIEWS_NS)
        .collection("movies");
    } catch (e) {
      console.error(`Unable to establish collection handles in MoviesDAO: ${e}`);
    }
  }

  static async getMovies({
    filters = null,
    page = 0,
    moviesPerPage = 20,
  } = {}) {
    let query = {};

    if (filters) {
      if ("title" in filters) {
        query = { title: { $regex: filters.title, $options: "i" } };
      } else if ("rated" in filters) {
        query = { rated: filters.rated };
      }
    }

    try {
      const cursor = await movies
        .find(query)
        .limit(moviesPerPage)
        .skip(moviesPerPage * page);

      const moviesList = await cursor.toArray();
      const totalNumMovies = await movies.countDocuments(query);

      return { moviesList, totalNumMovies };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { moviesList: [], totalNumMovies: 0 };
    }
  }

  // 4.3 - Implement the getMovieById method
  static async getMovieById(id) {
    try {
      return await movies
        .aggregate([
          {
            $match: {
              _id: new ObjectId(id),
            },
          },
          {
            $lookup: {
              from: "reviews",
              localField: "_id",
              foreignField: "movie_id",
              as: "reviews",
            },
          },
        ])
        .next();
    } catch (e) {
      console.error(`Something went wrong in getMovieById: ${e}`);
      throw e;
    }
  }

  static async getRatings() {
    let ratings = [];

    try {
      ratings = await movies.distinct("rated");
      return ratings;
    } catch (e) {
      console.error(`Unable to get ratings, ${e}`);
      return ratings;
    }
  }
}

export default MoviesDAO;
