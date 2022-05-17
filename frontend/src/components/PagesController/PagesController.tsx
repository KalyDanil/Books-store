import {PagesControllerStyle} from './PagesController.styled';
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import books, {getPageAction, getBooksRequest} from '../../store/reducers/books';
import {RootState} from '../../store/index';
import ControllerPoints from '../ControllerPoints/ControllerPoints';

interface IPageCount {
    pageCount: number
}

const PagesController: React.FC<IPageCount> = ({pageCount}) => {
    const books = useSelector((state: RootState) => state.books);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();  

    const toLeftPage = () => {
        let nextPage = (+searchParams.getAll("page") - 1).toString();
        if(+nextPage <= 0 ) {nextPage = '1'}
        searchParams.delete('page');
        searchParams.append('page', nextPage);
        setSearchParams(searchParams);
        dispatch(getPageAction(+nextPage))
    }

    const toRightPage = () => {
        let nextPage = (+searchParams.getAll("page") + 1).toString();
        if(+nextPage > pageCount -1 ) {nextPage = (pageCount).toString()}
        searchParams.delete('page');
        searchParams.append('page', nextPage);
        setSearchParams(searchParams);
        dispatch(getPageAction(+nextPage))
    }

    return (
        <PagesControllerStyle>
            <img src="./assets/image/books/left.svg" alt='left' onClick={toLeftPage}/>
            <ControllerPoints pageCount={pageCount}/>
            <img src="./assets/image/books/right.svg" alt='right' onClick={toRightPage}/>
        </PagesControllerStyle>
    );
}

export default PagesController;