import ReviewsDAO from "../dao/reviewsDAO.js";

// Bai 2: Implement the ReviewsController class for handling review 
class ReviewsController {
  static async apiPostReview(req, res) {
    try {
      const movieId = req.body.movie_id;
      const review = req.body.review;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };
      const date = new Date();

      const reviewResponse = await ReviewsDAO.addReview(movieId, userInfo, review, date);

      if (reviewResponse.error) {
        res.status(500).json({ error: reviewResponse.error.message });
        return;
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // 2.4: Implement method for updating a review
  static async apiUpdateReview(req, res) {
    try {
      const reviewId = req.body.review_id;
      const review = req.body.review;
      const date = new Date();

      // To ensure that the review can only be updated 
      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        req.body.user_id,
        review,
        date,
      );

      if (reviewResponse.error) {
        res.status(500).json({ error: reviewResponse.error.message });
        return;
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error("unable to update review. User may not be original poster");
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // 2.5 Implement method for deleting a review
  static async apiDeleteReview(req, res) {
    try {
      const reviewResponse = await ReviewsDAO.deleteReview(
        req.body.review_id,
        req.body.user_id,
      );

      if (reviewResponse.error) {
        res.status(500).json({ error: reviewResponse.error.message });
        return;
      }

      if (reviewResponse.deletedCount === 0) {
        throw new Error("unable to delete review. User may not be original poster");
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

export default ReviewsController;
