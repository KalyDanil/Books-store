const db = require("../../database/models/index");

async function getAllBooks (req, res){
    try {
        const selectedGenres = req.query.genres;
        const minPrice = Number(req.query.minPrice);
        const maxPrice = Number(req.query.maxPrice);
        const sortBy = req.query.sortBy;
        const books = await db.sequelize.models.Book.findAll({raw:true});
        books.sort(function(a,b) {
            if(sortBy === 'price') {
                return a[sortBy] - b[sortBy];
            }
            if(sortBy === 'rating') {
                return -a[sortBy] + b[sortBy];
            }
            const x = a['dateofissue'].toLowerCase();
            const y = b['dateofissue'].toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });
        if(selectedGenres === undefined) {
            const shownBooks = books.filter(item => (item.price >= minPrice && item.price <= maxPrice));
            res.send(shownBooks);
            return
        }
        const shownBooksbyGenre = books.filter(item => selectedGenres.indexOf(item.genre) !== -1);
        const shownBooks = shownBooksbyGenre.filter(item => (item.price >= minPrice && item.price <= maxPrice));
        res.send(shownBooks);
    } catch(err) {
        console.log(err);
        res.status(500);
    }   
}

async function getAllGenres (req, res){
    try {
        const genres = await db.sequelize.models.Genre.findAll({raw:true});
        res.send(genres);
    } catch(err) {
        console.log(err);
        res.status(500);
    }   
}

module.exports = {
    getAllBooks,
    getAllGenres
}