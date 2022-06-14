import { useSearchParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getPageAction } from '../../store/reducers/bookReducer/thunks';
import ControllerPoints from './ControllerPoints/ControllerPoints';
import { IPageCount } from '../../utils/types';
import { PaginationStyle } from "./Pagination.styled";

const Pagination: React.FC<IPageCount> = ({ pageCount }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const toLeftPage = () => {
    let nextPage = (+searchParams.getAll('page') - 1).toString();
    if (+nextPage <= 0) { nextPage = '1' }
    searchParams.delete('page');
    searchParams.append('page', nextPage);
    setSearchParams(searchParams);
    dispatch(getPageAction(+nextPage))
  }

  const toRightPage = () => {
    let nextPage = (+searchParams.getAll('page') + 1).toString();
    if (+nextPage > pageCount - 1) { nextPage = (pageCount).toString() }
    searchParams.delete('page');
    searchParams.append('page', nextPage);
    setSearchParams(searchParams);
    dispatch(getPageAction(+nextPage))
  }

  return (
    <PaginationStyle pageCount={pageCount}>
      <img src='./assets/image/books/left.svg' alt='left' onClick={toLeftPage} />
      <ControllerPoints pageCount={pageCount} />
      <img src='./assets/image/books/right.svg' alt='right' onClick={toRightPage} />
    </PaginationStyle>
  );
}

export default Pagination;