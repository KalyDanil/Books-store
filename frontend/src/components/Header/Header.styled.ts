import styled from 'styled-components';

export const HeaderStyled = styled.header<{isLoggedIn: string | null, headerButton: string | null}>`
    display: flex;
    width: 88%;
    height: 64px;
    margin: auto;
    margin-top: 24px;
    font-style: normal;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 96.4%;
    }

    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 90%;
        justify-content: space-between;
    }

img {
    width: 88px;
    height: auto;
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 66px;
    }
}

.header__catalog {
    cursor: pointer;
    margin-left: 16.8%;
    margin-top: 20px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;  
    @media screen and (min-width: 320px) and (max-width:833px) {
        font-size: 14px;
        line-height: 21px;
    }
}

.header__search {
    width: 49%;
    height: 100%;
    margin-left: 3.3%;
    border-radius: 16px;
    font-size: 16px;
    border: none;
    padding-left: 10px;
    background: #F0F4EF;
    ::placeholder {
        font-size: 16px;
        Line height: 24px;
        padding-left: 30px;
        background: url(./assets/image/search.svg) no-repeat;
    }
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 30.7%;
        margin-left: 9%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        position: absolute;
        top: 88px;
        margin-left: 0;
        padding-left: 0;
        left: 15px;
        height: 47px;
        width: calc(100% - 30px);
    } 
}

.header__button {
    display: ${props => props.isLoggedIn === 'true'? 'none' : ''};
    color: white;
    text-decoration: none;
    background-color: #344966;
    border: none;
    width: 18%;
    height: 44px;
    margin-top: 8px;
    margin-left: 7.6%;
    text-align: center;
    border-radius: 16px;
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 0.75px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 28.7%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 46.5%;
        font-size: 12px;
        line-height: 18px;
    }
}

.logIn {
    display: ${props => props.headerButton === ''? '' : 'none'};
}

.singUp {
    display: ${props => props.headerButton === ''? 'none' : ''};
}

.header__menu {
    display: ${props => props.isLoggedIn === 'true'? 'flex' : 'none'};
    justify-content: space-between;
    margin-left: 9.9%;
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 41%;
    }
    img {
        cursor: pointer;
        @media screen and (min-width: 320px) and (max-width:833px) {
            width: 32px;
        }
    }
}
`;