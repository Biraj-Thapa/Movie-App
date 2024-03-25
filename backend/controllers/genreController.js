import Genre from "../models/Genre.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createGenre = asyncHandler(async (req, res) => {
    try {
      const { name } = req.body;
  
      if (!name) {
        return res.json({ error: "Name is required" });
      }
  
      const existingGenre = await Genre.findOne({ name });
  
      if (existingGenre) {
        return res.json({ error: "Already exists" });
      }
  
      const genre = await new Genre({ name }).save();
      res.json(genre);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  });
  
  export{createGenre};