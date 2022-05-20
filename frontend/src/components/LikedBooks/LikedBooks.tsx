import { Books } from './LikedBooks.styled';
import Book from '../Book/Book';
import PagesController from '../PagesController/PagesController';
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getPageAction, getLikedBooksRequest } from '../../store/reducers/bookReducer/thunks';
import { RootState, AppDispatch } from '../../store/index';
import { useState, useEffect, useRef } from 'react';

const LikedBooks: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const books = useSelector((state: RootState) => state.books);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();

    const getBooks = async () => {
        const params = {
            page: searchParams.get("page"),
            limit: books.limit,
            userId: user.id,
        }
        await dispatch(getLikedBooksRequest(params));
    }

    useEffect(() => {
        setSearchParams(searchParams);
        dispatch(getPageAction(+searchParams.getAll("page")[0]));
        getBooks();
    }, []);

    useEffect(() => {
        getBooks();
    }, [books.page]);

    const page = (books.books).map((item, index) => {
        return (<Book book={item} key={item.id} />);
    });

    return (
        <div>
            <Books>
                {page}
            </Books>
            <PagesController pageCount={Math.ceil(books.booksCount / books.limit)} />
        </div>
    );
}

export default LikedBooks;