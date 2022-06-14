import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { AppDispatch } from "../../../store";
import { selectFilterButtonAction } from "../../../store/reducers/bookReducer/thunks";
import { sortByConstants } from "../../../utils/constants";
import { useAppSelector } from "../../../utils/hooks/useAppSelector";
import { SortByFilterStyle } from "./SortByFilter.styled";

const SortByFilter: React.FC = () => {
  const books = useAppSelector((state) => state.books);
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setsortBy] = useState('name');

  useEffect(() => {
    if (searchParams.getAll('sortBy')[0] !== null) {
      setsortBy(searchParams.getAll('sortBy')[0]);
    }
  }, [searchParams]);

  const editSort = () => {
    if (books.selectedFilterButton === 'sortBy') {
      dispatch(selectFilterButtonAction(''));
      return
    }
    dispatch(selectFilterButtonAction('sortBy'));
  }

  const editNothing = () => {
    dispatch(selectFilterButtonAction(''));
  }

  const selectSortBy = (value: string) => {
    const arr = value.toLowerCase().split(' ');
    const str = arr.join('');
    setsortBy(str);
    searchParams.delete('sortBy');
    searchParams.append('sortBy', str);
    setSearchParams(searchParams);
  }

  return (
    <SortByFilterStyle selectedFilterButton={books.selectedFilterButton} sortBy={sortBy}>
      <input className='select-sortBy__button' type='button' value='Sort by' onClick={editSort}></input>
      <div className='select-sortBy__ul' onMouseLeave={editNothing}>
        <img src='./assets/image/polygon.svg' alt='' />
        {sortByConstants.map((item, index) => (
          <div id={item.toLowerCase().split(' ').join('')} onClick={() => selectSortBy(item)} key={index}>{item}</div>
        ))}
      </div>
    </SortByFilterStyle>
  );
}

export default SortByFilter;