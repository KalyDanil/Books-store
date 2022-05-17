import { propsToClassKey } from '@mui/styles';
import { GenreStyleContainer } from './Genre.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addGenreAction, removeGenreAction } from '../../store/reducers/books';
import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import { RootState } from '../../store/index';

interface IGenre {
    genre: string
    id: number
}

function Genre({ genre, id }: IGenre) {
    const books = useSelector((state: RootState) => state.books);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const genreName = useRef<HTMLSpanElement>(null);
    const genreCheckbox = useRef<HTMLInputElement>(null);
    const genreArr = searchParams.getAll("genre");
    const arr = searchParams.getAll('');

    useEffect(() => {
        if(searchParams.getAll("genre").indexOf(id.toString()) !== -1 && genreCheckbox.current !== null) {
            genreCheckbox.current.checked = true;
        }
    },[]);

    const addGenre: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.checked && genreName.current !== null) {
            dispatch(addGenreAction(genreName.current.innerText));
            searchParams.append('genre', genreName.current.id);
        }

        if (!e.target.checked && genreName.current !== null) {
            dispatch(removeGenreAction(genreName.current.innerText));
            const index = genreArr.indexOf(genreName.current.id);
            genreArr.splice(index, 1);
            searchParams.delete('genre');
            for (let genre of genreArr) {
                searchParams.append('genre', genre)
            }
        }
       
        setSearchParams(searchParams)
        
    }

    return (
        <GenreStyleContainer>
            <input className='select-genre__checkbox' ref={genreCheckbox} type='checkbox' onChange={addGenre} />
            <span id={id.toString()} ref={genreName}>{genre}</span>
        </GenreStyleContainer>
    );
}

export default Genre;