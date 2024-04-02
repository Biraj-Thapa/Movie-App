import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMovieMutation, useUploadImageMutation } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";

const CreateMovie = () => {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    rating: 0,
    image: null,
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [createMovie, { isLoading: isCreatingMovie, error: createMovieErrorDetail }] = useCreateMovieMutation();

  const [uploadImage, { isLoading: isUploadingImage, error: uploadImageErrorDetails }] = useUploadImageMutation();

  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (genres) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]?._id || "",
      }));
      console.log(genres[0]?._id);
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "genre") {
      const selectedGenre = genres.find((genre) => genre.name === value);

      setMovieData((prevData) => ({
        ...prevData,
        genre: selectedGenre ? selectedGenre._id : "",
      }));
    } else {
      setMovieData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleCreateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast ||
        !selectedImage
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      let uploadedImagePath = null;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          console.error("Failed to upload image: ", uploadImageErrorDetails);
          toast.error("Failed to upload image");
          return;
        }

        await createMovie({
          ...movieData,
          image: uploadedImagePath,
        });

        navigate("/admin/movies-list");

        setMovieData({
          name: "",
          year: 0,
          detail: "",
          cast: [],
          ratings: 0,
          image: null,
          genre: "",
        });

        toast.success("Movie Added To Database");
      }
    } catch (error) {
      console.error("Failed to create movie: ", createMovieErrorDetail);
      toast.error(`Failed to create movie: ${createMovieErrorDetail?.message}`);
    }
  };

  return (
    <div className="container flex justify-center items-center mt-4">
      <form className="w-full max-w-lg">
        <p className="text-green-500 text-2xl mb-4">Create Movie</p>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={movieData.name}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Year:</label>
          <input
            type="number"
            name="year"
            value={movieData.year}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Detail:</label>
          <textarea
            name="detail"
            value={movieData.detail}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Cast (comma-separated):</label>
          <input
            type="text"
            name="cast"
            value={movieData.cast.join(", ")}
            onChange={(e) =>
              setMovieData({ ...movieData, cast: e.target.value.split(", ") })
            }
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Genre:</label>
          <select
            name="genre"
            value={movieData.genre}
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {isLoadingGenres ? (
              <option>Loading genres...</option>
            ) : (
              genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {!selectedImage && "Upload Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: !selectedImage ? "none" : "block" }}
              className="hidden"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleCreateMovie}
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          disabled={isCreatingMovie || isUploadingImage}
        >
          {isCreatingMovie || isUploadingImage ? "Creating..." : "Create Movie"}
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;
