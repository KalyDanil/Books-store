import {BookStyledContainer} from './Book.styled';

interface Book {
    book: {
        id: number
        name: string,
        authorname: string,
        price: number,
        rating: number,
        dateofissue: string,
        cover: string,
        status: string,
    }
}

function Book ({book}: Book) {
    return (
        <BookStyledContainer>
            <img className='likeOnBook' src="./assets/image/books/likeOnBook.svg" alt='likeOnBook'/>
            <img className='book' src={'http://localhost:4000/images/books/'+book.cover} alt='book'/>
            <span className='bookName'>{book.name}</span>  
            <span className='author'>{book.authorname}</span>
            <div className='books__stars'>
                <img src="./assets/image/books/star.svg" alt='star'/>
                <img src="./assets/image/books/star.svg" alt='star'/>
                <img src="./assets/image/books/star.svg" alt='star'/>
                <img src="./assets/image/books/star.svg" alt='star'/>
                <img src="./assets/image/books/star.svg" alt='star'/>
                <span>{book.rating}</span>
            </div>
            <input className={book.status} type='button' value={'$ '+book.price+' USD'}/>   
        </BookStyledContainer>
    );
}

export default Book;