import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../../store";
import { changeLikeAction, getSelectedBookRequest } from "../../../store/reducers/bookReducer/thunks";
import { toLikeBookRequest } from "../../../store/reducers/bookReducer/thunks";
import { liked, notLiked } from "../../../utils/constants";
import { useAppSelector } from "../../../utils/hooks/useAppSelector";
import { BookCoverStyle } from "./BookCover.styled";


const BookCover: React.FC = () => {
    const books = useAppSelector((state) => state.books);
    const user = useAppSelector((state) => state.user);
    const [likeLink, setLikeLink] = useState(notLiked);
    const dispatch = useDispatch<AppDispatch>();
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
            setLikeLink(liked)
        }
    }

    useEffect(() => {
        getSelectedBook();
    }, [books.selectedBook.id]);

    const toLikeBook = () => {
        const body = {
            userId: user.id,
            bookId: id?.slice(1),
            like: false,
        }

        if (!user.tokenIsValid) {
            window.location.href = '/authorization';
            return;
        }

        if (likeLink === notLiked && user.id !== 0) {
            body.like = true;
            dispatch(toLikeBookRequest(body));
            dispatch(changeLikeAction(liked));
            setLikeLink(liked);
            return;
        }

        if (likeLink === liked && user.id !== 0) {
            dispatch(toLikeBookRequest(body))
            dispatch(changeLikeAction(notLiked));
            setLikeLink(notLiked)
            return;
        }
    }

    return (
        <BookCoverStyle>
            <img className='bookLike' src={"./assets/image/books/" + likeLink} alt='likeOnBook' onClick={toLikeBook} />
            <img className='bookCover' src={'http://localhost:4000/images/books/' + books.selectedBook.cover} alt='book' />
        </BookCoverStyle>
    );
}

export default BookCover;