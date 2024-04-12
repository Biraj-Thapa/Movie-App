import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetSpecificMovieQuery, useAddMovieReviewMutation } from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] = useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      refetch();

      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error.data ? error.data.message : error.message);
    }
  };

  return (
    <>
      <div className="bg-gray-800 text-white p-6">
        <Link to="/" className="text-teal-300 hover:text-teal-500">
          ← Go Back
        </Link>
      </div>

      <div className="my-8 mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap justify-center gap-4">
          <img
            src={movie?.image}
            alt={movie?.name}
            className="md:w-1/2 lg:w-1/3 rounded-lg shadow-lg"
          />
          <div className="md:w-1/2 p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4">{movie?.name}</h2>
              <p className="text-gray-400">{movie?.detail}</p>
            </div>
            <div>
              <p className="text-xl">Released Date: {movie?.year}</p>
              <h3 className="text-lg font-semibold mt-4 mb-2">Cast:</h3>
              <div className="flex flex-col">
                {movie?.cast.map((actor, index) => (
                  <span key={index} className="text-gray-300 mt-1">{actor}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <MovieTabs
          loadingMovieReview={loadingMovieReview}
          userInfo={userInfo}
          submitHandler={submitHandler}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          movie={movie}
        />
      </div>
    </>
  );
};

export default MovieDetails;
