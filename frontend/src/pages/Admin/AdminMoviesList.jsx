import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery();

  return (
    <div className="container mx-[9rem]">
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          <div className="ml-[2rem] text-xl font-bold h-12">
            All Movies ({movies?.length})
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-[2rem]">
            {movies?.map((movie) => (
              <Link
                key={movie._id}
                to={`/admin/movies/update/${movie._id}`}
                className="flex flex-col justify-between rounded-lg overflow-hidden shadow-lg border border-gray-300"
              >
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full h-48 object-cover"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{movie.name}</div>
                  <p className="text-gray-700 text-base">{movie.detail}</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <Link
                    to={`/admin/movies/update/${movie._id}`}
                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded w-full text-center"
                  >
                    Update Movie
                  </Link>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMoviesList;
