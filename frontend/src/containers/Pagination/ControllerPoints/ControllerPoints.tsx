import { ControllerPointStyle } from './ControllerPoints.styled';
import { useSearchParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getPageAction } from '../../../store/reducers/bookReducer/thunks';
import { IPageCount } from '../../../utils/types';

const ControllerPoints: React.FC<IPageCount> = ({ pageCount }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const pageCountArr: [][] = [];

    for (let i = 0; i < pageCount; i++) {
        pageCountArr.push([]);
    }

    const toPage = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const button = (e.target as HTMLImageElement);
        searchParams.delete('page');
        searchParams.append('page', button.id[1]);
        setSearchParams(searchParams);
        dispatch(getPageAction(+button.id[1]))
    }

    const pointArr = (pageCountArr).map((item, index) => {
        return (<img id={'p' + (index + 1)} key={index} src='./assets/image/books/whitePoint.svg' alt='point' onClick={toPage} />);
    });

    return (
        <ControllerPointStyle page={searchParams.getAll('page')[0]}>
            {pointArr}
        </ControllerPointStyle>
    );
}

export default ControllerPoints;