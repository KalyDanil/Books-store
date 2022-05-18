import { StarStyle } from './StarsToRating.styled';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { changeRatingRequest, getUserRatingAction } from '../../store/reducers/bookReducer/thunks';
import { IStars } from '../../utils/types';

const StarsToRating: React.FC<IStars> = ({ value }) => {
    const user = useSelector((state: RootState) => state.user);
    const books = useSelector((state: RootState) => state.books);
    const dispatch = useDispatch();
    const changeRating = () => {
        const body = {
            rating: value + 1,
            userId: user.id,
            bookId: books.selectedBook.id,
        }
        if (user.tokenIsValid) {
            dispatch<any>(changeRatingRequest(body));
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