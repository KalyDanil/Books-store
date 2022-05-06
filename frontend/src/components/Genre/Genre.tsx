import { propsToClassKey } from '@mui/styles';
import { GenreStyleContainer } from './Genre.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addGenreAction, removeGenreAction } from '../../store/reducers/books';
import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import { RootState } from '../../store/index';

interface IGenre {
    genre: string
}

function Genre({ genre }: IGenre) {
    const books = useSelector((state: RootState) => state.books);
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const genreName = useRef<HTMLSpanElement>(null);
    const genreArr = searchParams.getAll("genre");

    const addGenre: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.checked && genreName.current !== null) {
            dispatch(addGenreAction(genreName.current.innerText));
            genreArr.push(genreName.current.innerText);
        }

        if (!e.target.checked && genreName.current !== null) {
            dispatch(removeGenreAction(genreName.current.innerText));
            const index = genreArr.indexOf(genreName.current.innerText);
            genreArr.splice(index, 1);
        }

        setSearchParams({genre: genreArr, sortBy: searchParams.getAll("sortBy"), minPrice: searchParams.getAll("minPrice"), maxPrice: searchParams.getAll("maxPrice")})
    }

    return (
        <GenreStyleContainer>
            <input className='select-genre__checkbox' type='checkbox' onChange={addGenre} />
            <span ref={genreName}>{genre}</span>
        </GenreStyleContainer>
    );
}

export default Genre;