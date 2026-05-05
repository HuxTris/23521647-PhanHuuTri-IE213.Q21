import { ObjectId } from "mongodb";

// 3.1 - Create a variable to hold the reference to the reviews collection
let reviews;

class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }

    try {
      reviews = await conn
        .db(process.env.MOVIEREVIEWS_NS)
        .collection("reviews");
    } catch (e) {
      console.error(`Unable to establish connection handle in ReviewsDAO: ${e}`);
    }
  }

  // 3.3 - Implement the addReview method
  static async addReview(movieId, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        date,
        review,
        movie_id: new ObjectId(movieId),
      };

      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  // 3.4 - Implement the updateReview method
  static async updateReview(reviewId, userId, review, date) {
    try {
      return await reviews.updateOne(
        {
          _id: new ObjectId(reviewId),
          user_id: userId,
        },
        {
          $set: {
            review,
            date,
          },
        },
      );
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  // 3.5 - Implement the deleteReview method
  static async deleteReview(reviewId, userId) {
    try {
      return await reviews.deleteOne({
        _id: new ObjectId(reviewId),
        user_id: userId,
      });
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
}

export default ReviewsDAO;
