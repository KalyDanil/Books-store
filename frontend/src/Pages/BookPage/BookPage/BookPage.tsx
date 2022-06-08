import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch } from '../../../store/index';
import { BookPageStyle } from './BookPage.styled';
import BannerOfAuthorization from '../../../containers/BannerOfAuthorization/BannerOfAuthorization';
import {
    getSelectedBookRequest,
    getRecommendationsRequest,
    changeLikeAction
} from '../../../store/reducers/bookReducer/thunks';
import { useSearchParams, useParams } from "react-router-dom";
import { useAppSelector } from '../../../utils/hooks/useAppSelector';
import { liked } from '../../../utils/constants';
import AllComments from '../../../components/AllComments/AllComments';
import Recommendations from '../../../containers/Recommendations/Recommendations';
import BookBlockInBookPage from '../BookBlockInBookPage/BookBlockInBookPage';

const BookPage: React.FC = () => {
    const user = useAppSelector((state) => state.user);
    const books = useAppSelector((state) => state.books);
    const dispatch = useDispatch<AppDispatch>();
    const [searchParams, setSearchParams] = useSearchParams();
    const params = useParams();
    const id = params.id;

    const getSelectedBook = async () => {
        const reqParams = {
            bookId: id?.slice(1),
            userId: user.id,
        }
        await dispatch(getSelectedBookRequest(reqParams));
        if (books.selectedBook.UserLikedBooks[0] !== undefined) {
            dispatch(changeLikeAction(liked));
        }
    }

    const getRecommendations = async () => {
        const params = {
            limit: books.limit,
            userId: user.id,
            bookId: id?.slice(1),
        }
        dispatch(getRecommendationsRequest(params))
    }

    useEffect(() => {
        getSelectedBook();
        getRecommendations()
        setSearchParams(searchParams);
    }, [books.selectedBook.id, ]);

    return (
        <BookPageStyle isLoggedIn={user.tokenIsValid}>
            <BookBlockInBookPage />
            <AllComments />
            <BannerOfAuthorization />
            <Recommendations />
        </BookPageStyle>
    );
}

export default BookPage;