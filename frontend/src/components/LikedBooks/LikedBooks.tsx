import {Books} from './LikedBooks.styled';
import Book from '../Book/Book'; 
import PagesController from '../PagesController/PagesController'; 
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {getPageAction, getLikedBooksRequest} from '../../store/reducers/books';
import {RootState} from '../../store/index';
import {useState, useEffect, useRef} from 'react'; 

interface IBooks {
    id: number
    name: string,
    authorname: string,
    description1: string,
    description2: string,
    description3: string,
    price: number,
    paperBackPrice: number,
    rating: number,
    dateofissue: string,
    cover: string,
    status: string,
    genre: string,
    Users: Array<UserBook>, 
    UserLikedBooks: Array<{id: number} | undefined>,
}

interface UserBook {
    UserBook: {
        rating: number,
        isLiked: boolean,
    }
}

function LikedBooks () {
    const user = useSelector((state: RootState) => state.user);
    const books = useSelector((state: RootState) => state.books);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();  

    const getBooks = async () => {
        const params = {
            page: searchParams.get("page"),
            limit: books.limit,
            userId: user.id,
        }
        await dispatch<any>(getLikedBooksRequest(params));
    }

    useEffect(() => {
        setSearchParams(searchParams);
        dispatch(getPageAction(+searchParams.getAll("page")[0]));
        getBooks();
    },[]);

    useEffect(() => {
        getBooks();
    },[books.page]);
   
    const page = (books.books).map((item, index) => {
        return (<Book book={item} key={item.id}/>);
    });

    return (
        <div>
        <Books>
           {page}
        </Books>
        <PagesController pageCount={Math.ceil(books.booksCount / books.limit)}/>
        </div>
    );
}

export default LikedBooks;