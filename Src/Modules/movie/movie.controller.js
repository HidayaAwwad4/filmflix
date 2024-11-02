import movieModel from '../../../DB/models/Movie.model.js';
import { AppError } from '../../../AppError.js'
import cloudinary from '../../Utils/cloudinary.js';


export const createMovie = async (req, res, next) => {
    const { title, genre, director, releaseYear, cast, description, duration, language } = req.body;
    //let imageUrl, videoUrl;
    //try {
        /*if (req.files.poster) {
            const { poster_url } = await cloudinary.uploader.upload(req.files.poster.path, {
                folder: `${process.env.APPNAME}/movies/poster`
            });
            imageUrl = poster_url; 
        }
        if (req.files.videoUrl ) {
            const { video_url} = await cloudinary.uploader.upload(req.files.videoUrl.path, {
                folder: `${process.env.APPNAME}/movies/videos`
            });
            videoUrl = video_url; 
        }*/
        const newMovie = await movieModel.create({
            title,
            genre,
            director,
            releaseYear,
            cast,
            description,
            duration,
            language,
            //poster: imageUrl, 
            //videoUrl  
        });

        res.status(201).json({ message: "Movie created successfully", movie: newMovie });
    /*} catch (error) {
        console.error("Error uploading files:", error);
        return res.status(500).json({ message: "File upload failed", error: error.message });
    }*/
};

export const getAllMovies = async (req, res, next) => {
    const { genre, year, sortBy } = req.query;
    let query = {};
    if (genre) query.genre = genre;
    if (year) query.year = year;
    let movies = movieModel.find(query);

    if (sortBy) {
        movies = movies.sort(sortBy);
    }
    
    const result = await movies;
    res.status(200).json({ message: "Movies retrieved successfully", movies: result });
};

export const getMovieById = async (req, res, next) => {

    const { id } = req.params;
    const movie = await movieModel.findById(id);
    
    if (!movie) {
        return next(new AppError("Movie not found", 404));
    }
    
    res.status(200).json({ message: "Movie retrieved successfully", movie });
};

export const updateMovie = async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedMovie = await movieModel.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedMovie) {
        return next(new AppError("Movie not found", 404));
    }
    
    res.status(200).json({ message: "Movie updated successfully", movie: updatedMovie });
};

export const deleteMovie = async (req, res, next) => {
    const { id } = req.params;
    
    const movie = await movieModel.findByIdAndDelete(id);
    
    if (!movie) {
        return next(new AppError("Movie not found", 404));
    }
    
    res.status(200).json({ message: "Movie deleted successfully" });
};
