const Movie=require("../models/movie");
let movieCount=0;
exports.home=(req,res)=>{
    res.status(200).json({ message: 'Welcome to the movie API' });
}

exports.getAll=(req,res)=>{
    Movie.find({}, (err, movies) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Error getting all movies' });
        } else {
            res.status(200).json(movies);
        }
    });
}

exports.getMovie=(req,res)=>{
    const id = req.params.id;
    Movie.findOne({id}, (err, movie) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Error getting movie' });
        } else {
            if(!movie){
                movie= {message: 'Movie not found'};
            }
            res.status(200).json(movie);
        }
    });
}
exports.postMovie=(req,res)=>{
    Movie.countDocuments({},(err, count) => {
        movieCount = count;
    })
    const {name, year} = req.body
    movieCount++;
    const movie = new Movie({ id:movieCount, name, year});
    movie.save((err) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Error saving movie details' });
        } else {
            res.status(200).json({message: 'Movie saved successfully'});
        }
    });
}