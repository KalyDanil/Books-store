import { StarStyle } from './StarsToRating.styled';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/index';
import { changeRatingRequest, getUserRatingAction } from '../../store/reducers/bookReducer/thunks';
import { IStars } from '../../utils/types';
import { useAppSelector } from '../../utils/hooks/useAppSelector';

const StarsToRating: React.FC<IStars> = ({ value }) => {
    const user = useAppSelector((state) => state.user);
    const books = useAppSelector((state) => state.books);
    const dispatch = useDispatch<AppDispatch>();
    const changeRating = () => {
        const body = {
            rating: value + 1,
            userId: user.id,
            bookId: books.selectedBook.id,
        }
        if (user.tokenIsValid) {
            dispatch(changeRatingRequest(body));
            dispatch(getUserRatingAction(value + 1))
            return
        }
        window.location.href = '/authorization';
    }

    return (
        <StarStyle>
            <img src="./assets/image/books/star.svg" alt='star' onClick={changeRating} />
        </StarStyle>
    );
}

export default StarsToRating;