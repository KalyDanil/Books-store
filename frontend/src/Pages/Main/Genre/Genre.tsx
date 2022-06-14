import { GenreStyleContainer } from './Genre.styled';
import { useDispatch } from 'react-redux';
import { addGenreAction, removeGenreAction } from '../../../store/reducers/bookReducer/thunks';
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { IGenre } from '../../../utils/types';

const Genre: React.FC<IGenre> = ({ genre, id }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [checked, setChecked] = useState(false);
  const genreArr = searchParams.getAll('genre');

  useEffect(() => {
    if (searchParams.getAll('genre').indexOf(id.toString()) !== -1) {
      setChecked(true);
    }
  }, []);

  const addGenre: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!checked) {
      dispatch(addGenreAction(genre));
      setChecked(true);
      searchParams.append('genre', id.toString());
    }

    if (checked) {
      dispatch(removeGenreAction(genre));
      const index = genreArr.indexOf(id.toString());
      genreArr.splice(index, 1);
      searchParams.delete('genre');
      for (let genre of genreArr) {
        searchParams.append('genre', genre)
      }
      setChecked(false);
    }

    setSearchParams(searchParams)

  }

  return (
    <GenreStyleContainer>
      <input className='select-genre__checkbox' checked={checked} type='checkbox' onChange={addGenre} />
      <span>{genre}</span>
    </GenreStyleContainer>
  );
}

export default Genre;