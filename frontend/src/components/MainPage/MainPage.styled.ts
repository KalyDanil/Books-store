import styled from 'styled-components';

export const HeaderBackground = styled.div<{isLoggedIn: boolean}>`
    position: relative;
    width: 88%;
    height: 400px;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    background: #F0F4EF;
    border-radius: 16px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 96%;
        height: 289px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 90%;
        height: 505px;
        margin-top: 105px;
        margin-top: ${props => props.isLoggedIn? '105px' : '70px'};
    }

.headerBackground__books {
    position: absolute;
    width: 42.3%;
    max-width: 536px;
    height: auto;
    max-height: 262px;
    bottom: 0;
    left: 0;
    z-index: -1;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 43.3%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 80%;
        top: 0;
        left: 20%;
        max-width: 374px;
    }
}

.headerBackground__girl{
    position: absolute;
    width: 31.7%;
    height: auto;
    max-height: 400px; 
    right: 98px;
    bottom: 0;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 328px;
        right: 14px;
        top: -35px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 253px;
        bottom: 0;
        left: 6.2%;
    }
}
`;

export const HeaderBackgroundDiv = styled.div`
    position: relative;    
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 40.78%;
    margin-left: 8.4%;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 408px;
        margin-left: 4.9%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 79.3%;
        text-align: center;
    }

h1 {
    font-size: 40px;
    line-height: 60px;
    color: #0D1821;
    margin-bottom: 0;
    margin-top: 80px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        font-size: 32px;
        line-height: 48px;
        margin-top: 45px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        font-size: 18px;
        line-height: 27px;
        margin-top: 20px;
    }
}

span {
    font-size: 20px;
    line-height: 30px;
    color: #344966;
    margin-top: 10px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        line-height: 24px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        font-size: 14px;
        line-height: 21px;
    }
}

input {
    width: 44%;
    height: 44px;
    color: #F0F4EF;
    font-size: 16px;
    line-height: 24px;  
    background: #344966;
    border-radius: 16px;
    border: none;
    margin-top: 50px;
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 0.75px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 56.3%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 86.9%;
        font-size: 12px;
        line-height: 18px;
        margin-top: 30px;
        margin-left: auto;
        margin-right: auto;
    }
}
`;

export const Catalog = styled.div<{genreIsEditing: boolean, sortByIsEditing: boolean, sortBy: string, priceSliderIsEditing: boolean}>`
    width: 88.8%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 110px;
    font-family: Poppins;
    line-height: 27px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 96.4%;
    }

.catalog__header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        position: relative;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        position: relative;;
    }
}

h1 {
    margin-top: 0;
    font-size: 40px;
    line-height: 60px;
    color: #0D1821;
    font-weight: 700;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        position: absolute;
        top: -60px;
        font-size: 32px;
        line-height: 48px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        position: absolute;
        top: -70px;
        font-size: 32px;
        line-height: 48px;
    }
}

.catalog__header-select {
    position: relative;
    width: 49%;
    display: flex;
    justify-content: space-between;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 100%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        flex-direction: column;
        width: 100%;
    }
}

.header-select__genre {
    position: relative;
    width: 31%;
    z-index: 2;
    ::after {
        transform: ${props => props.genreIsEditing? 'rotate(90deg)' : ''};
        z-index: -1;
        content: "";
        position: absolute;
        width: 24px;
        height: 24px;
        background: url(./assets/image/arrow.svg);
        color: #000000;
        background-repeat: no-repeat;
        top: 10px;
        left: 83.6%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 100%;
        margin-bottom: 20px;
    }
}

.select-genre__ul {
        display: ${props => props.genreIsEditing? '' : 'none'};
        position: absolute;
        z-index: 2;
        color: #344966;
        width: 100%;
        list-style-type: none;
        font-size: 16px;
        line-height: 28px;
        font-weight: 500;
        padding-left: 5px;
        padding-top: 15px;
        background: #F0F4EF;
        border-radius: 16px;

        img {
            position: absolute;
            top: -10px;
            left: 10px;
        }

        li {
            padding-bottom: 10px;
            input {
                margin-right: 5px;
            }
        }
}

.select-sortBy__ul{
    display: ${props => props.sortByIsEditing? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    width: 100%;
    padding-left: 5px;
    background: #F0F4EF;
    border-radius: 16px;
    padding-top: 16px;
    margin-top: 13px;
    img {
        position: absolute;
        top: -10px;
        left: 10px;
    }
    div {
        user-select: none;
        cursor: default;
        color: #B9BAC4;
        color: ${props => props.sortBy === ''? 'flex' : 'none'};
        text-align: start;
        border: none;
        margin-bottom: 12px;
        background: transparent;
    }
    #Price {
        color: ${props => props.sortBy === 'price'? ' #344966' : '#B9BAC4'};
    }
    #Name {
        color: ${props => props.sortBy === 'name'? ' #344966' : '#B9BAC4'};
    }
    #Authorname {
        color: ${props => props.sortBy === 'authorname'? ' #344966' : '#B9BAC4'};
    }
    #Rating {
        color: ${props => props.sortBy === 'rating'? ' #344966' : '#B9BAC4'};
    }
    #Dateofissue {
        color: ${props => props.sortBy === 'dateofissue'? ' #344966' : '#B9BAC4'};
    }
}

.select-genre__li {
    position: relative;
    span {
        position: absolute;
        top: 3px;;
        left: 34px;
    }
}

.select-genre__checkbox {
    -webkit-appearance: none;
    display: inline-flex;
    ::after {
        padding-top: 2px;
        content: '';
        width: 24px;
        height: 24px;
        background: url(./assets/image/noChecked.svg);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
    }
}

.select-genre__checkbox:checked::after {
    background-image: url(./assets/image/checked.svg);
  }

.select-genre__button {
    -webkit-appearance: none;
    width: 100%;
    height: 48px;
    background: #F0F4EF;
    background-color: rgb(240, 244, 239, 0.5);
    border: none;
    border-radius: 16px;
    color: #344966;
    font-size: 18px;
    line-height: 28px;
    padding-left: 17px;
    padding-right: 66.3%;
}

.header-select__price {
    position: relative;
    z-index: 1;
    width: 31%;
    height: 48px;
    border: none;
    border-radius: 16px;
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 100%;
        margin-bottom: 20px;
    }
}

.header-select__sortBy {
    position: relative;
    width: 31%;
    z-index: 1;
    ::after {
        transform: ${props => props.sortByIsEditing? 'rotate(90deg)' : ''};
        z-index: -1;
        content: "";
        position: absolute;
        width: 24px;
        height: 24px;
        background: url(./assets/image/arrow.svg);
        color: #000000;
        background-repeat: no-repeat;
        top: 10px;
        left: 83.6%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 100%;
        margin-bottom: 20px;
    }
}
.select-price__slider {
    display: ${props => props.priceSliderIsEditing? '' : 'none'};
    position: relative;
    width: 413px;
    height: 151px;
    background: #F0F4EF;
    border-radius: 16px;
    margin-top: 26px;
    img {
        user-select: none;
        position: absolute;
        top: -10px;
        left: 10px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 100%;
    }
}
  
.price-controls span {
    width: 50px;
    margin: 0;

    color: inherit;
    font: inherit;

    background: none;
    border: none;
    outline: none;
}

.bar {
    position: absolute;
    width: 91.4%;
    height: 12px;
    top: 50px;
    left: 4.3%;
    background: #D6D8E7;
    border-radius: 40px;    
}

.bar2 {
    user-select: none;
    position: absolute;
    height: 12px;
    top: 50px;
    left: 4.3%;
    background: #BFCC94;
    border-radius: 40px;
}
  
.range-toggle {
    user-select: none;
    position: absolute;
    top: 40px;
    width: 32px;
    height: 32px;
    background: #F7F7FC;
    border: 2px solid #BFCC94;
    box-sizing: border-box;
    border-radius: 40px;
}
  
.range-toggle-min {
    left: 4.3%;
}
  
.range-toggle-max {
    left: 88%;
}

.minAndMaxPrice {
    user-select: none;
    position: absolute;
    width: 91%;
    display: flex;
    justify-content: space-between;
    top: 77px;
    left: 4.3%;
    color: #344966;
    font-weight: 400;
    font-size: 16px;
    line-height: 34px;
    user-select: none;
}

.select-price__button {
    width: 100%;
    height: 48px;
    border: none;
    border-radius: 16px;
    background: rgb(240, 244, 239, 0.5);
    color: #344966;
    font-size: 18px;
    line-height: 28px;
    padding-right: 66.3%;
}

.select-price__arrow {
    transform: ${props => props.priceSliderIsEditing? 'rotate(90deg)' : ''};
    z-index: -1;
    position: absolute;
    width: 24px;
    height: 24px;
    left: 83.6%;
    top: 12px;
}

.select-sortBy__button {
    color: #0D1821;
    background: rgb(255, 255, 255, 0.5);
    -webkit-appearance: none;
    width: 100%;
    height: 48px;
    border: none;
    border-radius: 16px;
    font-size: 18px;
    line-height: 28px;
    padding-right: 66.3%;
}
`;

export const Books = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 88.8%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 96.4%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 96.6%;
        margin-top: 40px;
        position: relative;   
    }

    div {
        display: flex;
        flex-direction: column;
    }
`;