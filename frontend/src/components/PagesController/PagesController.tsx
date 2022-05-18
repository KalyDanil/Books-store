import { PagesControllerStyle } from './PagesController.styled';
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getPageAction, getBooksRequest } from '../../store/reducers/bookReducer/thunks';
import { RootState } from '../../store/index';
import ControllerPoints from '../ControllerPoints/ControllerPoints';
import { IPageCount } from '../../utils/types';

const PagesController: React.FC<IPageCount> = ({ pageCount }) => {
    const books = useSelector((state: RootState) => state.books);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    const toLeftPage = () => {
        let nextPage = (+searchParams.getAll("page") - 1).toString();
        if (+nextPage <= 0) { nextPage = '1' }
        searchParams.delete('page');
        searchParams.append('page', nextPage);
        setSearchParams(searchParams);
        dispatch(getPageAction(+nextPage))
    }

    const toRightPage = () => {
        let nextPage = (+searchParams.getAll("page") + 1).toString();
        if (+nextPage > pageCount - 1) { nextPage = (pageCount).toString() }
        searchParams.delete('page');
        searchParams.append('page', nextPage);
        setSearchParams(searchParams);
        dispatch(getPageAction(+nextPage))
    }

    return (
        <PagesControllerStyle pageCount={pageCount}>
            <img src="./assets/image/books/left.svg" alt='left' onClick={toLeftPage} />
            <ControllerPoints pageCount={pageCount} />
            <img src="./assets/image/books/right.svg" alt='right' onClick={toRightPage} />
        </PagesControllerStyle>
    );
}

export default PagesController;