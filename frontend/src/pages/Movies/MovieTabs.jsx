import { Link } from "react-router-dom";

const MovieTabs = ({ userInfo, submitHandler, comment, setComment, movie }) => {
  return (
    <div>
      <section>
        {userInfo ? (
          <form onSubmit={submitHandler}>
            <div className="my-2">
              <label htmlFor="comment" className="block text-xl mb-2">
                Write Your Review
              </label>

              <textarea
                id="comment"
                rows="3"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="p-2 border rounded-lg w-full md:w-[40rem] text-black"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg"
            >
              Submit
            </button>
          </form>
        ) : (
          <p>
            Please <Link to="/login" className="text-teal-500 hover:underline">Sign In</Link> to write a review
          </p>
        )}
      </section>

      <section className="mt-8">
        <div>{movie?.reviews.length === 0 && <p>No Reviews Yet</p>}</div>

        <div className="space-y-4">
          {movie?.reviews.map((review) => (
            <div
              key={review._id}
              className="bg-teal-100 border-l-4 border-teal-500 p-4 rounded-lg shadow"
            >
              <div className="flex justify-between items-center">
                <strong className="text-teal-700">{review.name}</strong>
                <p className="text-sm text-teal-600">
                  {review.createdAt.substring(0, 10)}
                </p>
              </div>
              <p className="text-teal-800 mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MovieTabs;
