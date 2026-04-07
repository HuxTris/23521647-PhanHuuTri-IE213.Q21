import MoviesDAO from "../dao/moviesDAO.js";

class MoviesController {
  static async apiGetMovies(req, res) {
    const moviesPerPage = req.query.moviesPerPage
      ? parseInt(req.query.moviesPerPage, 10)
      : 20;

    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};

    if (req.query.rated) {
      filters.rated = req.query.rated;
    } else if (req.query.title) {
      filters.title = req.query.title;
    }

    const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({
      filters,
      page,
      moviesPerPage,
    });

    const response = {
      movies: moviesList,
      page: page,
      filters: filters,
      entries_per_page: moviesPerPage,
      total_results: totalNumMovies,
    };

    res.json(response);
  }

  // 4.2 - Implement the apiGetMovieById method
  static async apiGetMovieById(req, res) {
    try {
      const movie = await MoviesDAO.getMovieById(req.params.id);

      if (!movie) {
        res.status(404).json({ error: "not found" });
        return;
      }

      res.json(movie);
    } catch (e) {
      console.error(`apiGetMovieById, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }

  // 4.2 - Implement the apiGetRatings method
  static async apiGetRatings(req, res) {
    try {
      const ratings = await MoviesDAO.getRatings();
      res.json(ratings);
    } catch (e) {
      console.error(`apiGetRatings, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }
}

export default MoviesController;
