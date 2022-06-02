import { Books } from './LikedBooks.styled';
import Book from '../../../components/Book/Book';
import Pagination from '../../../containers/Pagination/Pagination';
import { useSearchParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getPageAction, getLikedBooksRequest } from '../../../store/reducers/bookReducer/thunks';
import { AppDispatch } from '../../../store/index';
import { useEffect } from 'react';
import { useAppSelector } from '../../../utils/hooks/useAppSelector';

const LikedBooks: React.FC = () => {
    const user = useAppSelector((state) => state.user);
    const books = useAppSelector((state) => state.books);
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
        getBooks();
        setSearchParams(searchParams);
        dispatch(getPageAction(+searchParams.getAll("page")[0]));
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
            <Pagination pageCount={Math.ceil(books.booksCount / books.limit)} />
        </div>
    );
}

export default LikedBooks;