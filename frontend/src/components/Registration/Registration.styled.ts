import styled from 'styled-components';

export const Header = styled.header`
    display: flex;
    width: 88%;
    height: 64px;
    margin: auto;
    margin-top: 24px;
    font: 'Poppins';
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
    color: white;
    background-color: #344966;
    border: none;
    width: 18%;
    height: 44px;
    margin-top: 8px;
    margin-left: 7.6%;
    border-radius: 16px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
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
`;

export const RegistrationForm = styled.form<{registrationStarted: boolean}>`
    display: ${props => props.registrationStarted? 'flex' : 'none'};
    width: 28.6%;
    flex-direction: column;
    margin-top: 94px;
    margin-left: 5.5%;
    font-family: Poppins;
    font-style: normal;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 47%;
        margin-left: 15px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 90%;
        margin-left: 4.6%;
    }
    
.registration__header {
    font-weight: 700;
    font-size: 40px;
    line-height: 60px;
    color: #0D1821;
    @media screen and (min-width: 320px) and (max-width:833px) {
        font-size: 18px;
        line-height: 27px;
    }
}

.registration__input {
    width: 100%;
    height: 64px;
    background-color: #F0F4EF;
    border: none;
    border-radius: 16px;
    padding-left: 5.8%;
    margin-top: 30px;
    ::placeholder {
        padding-left: 35px;
        font-weight: 400;
        font-size: 16px;
        line-height: 28px;
        padding-bottom: 5px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 94.2%;
        ::placeholder {
            font-size: 14px;
        }
    }
}

span {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #344966;
    margin-top: 9px;
    @media screen and (min-width: 320px) and (max-width:833px) {
        font-size: 12px;
    }
}

.registration__email {
    ::placeholder {
        background: url(./assets/image/email.svg) no-repeat;
    }
}

.registration__password {
    ::placeholder {
        background: url(./assets/image/hide.svg) no-repeat;
    }
}

.registration__button {
    background: #344966;
    border-radius: 16px;
    width: 40.2%;
    height: 44px;
    margin-top: 60px;
    font-size: 16px;
    color: #F0F4EF;
    @media screen and (min-width: 320px) and (max-width:833px) {
        width: 57.2%;
        margin-top: 40px;
    }
}
`;

export const Picture = styled.div`
    position: absolute;
    top: 178px;
    left: 51.9%;
    width: 42.5%;
    max-width: 1000px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        top: 267px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        position: static;
        width: 90.6%;
        max-width: 434px;
        margin-top: 60px;
        margin-left: auto;
        margin-right: auto;
    }

.registration__picture {
    width: 100%;
    height: auto;
}
`;

export const Footer = styled.footer`
    position: relative;
    width: 100%;
    height: 341px;
    background: #0D1821;
    margin-top: 154px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color: #F0F4EF;
    @media screen and (min-width: 320px) and (max-width:833px) {
        margin-top: 70px;
        height: 650px;
    }

div {
    display: flex;
    flex-direction: column;
}

.footer__firstDiv {
    width: 250px;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        margin-left: 20px;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        margin-left: 5px;
    }
}

.footer__logo {
    width: 88px;
    height: auto;
    margin-top: 73px;
    margin-left: 5.5%;
}

.footer__email {
    color: #F0F4EF;
    margin-left: 5.5%;
    margin-top: 40px;
}

.footer__telephone {
    color: #F0F4EF;
    margin-left: 5.5%;
}

.footer__navigationDiv {
    position: absolute;
    top: 73px;
    left: 35.6%;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        left: 34.7%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        top: 242px;
        left: 15px;
    }
}

.footer__navigation {
    text-decoration: none;
    color: #F0F4EF;
}

.footer__mapDiv {
    position: absolute;
    top: 73px;
    left: 65.7%;
    width: 28.68%;
    @media screen and (min-width: 833px) and (max-width:1439px) {
        width: 47%;
        left: 51.1%;
    }
    @media screen and (min-width: 320px) and (max-width:833px) {
        position: static;
        margin-top: 209px;
        margin-left: auto;
        margin-right: auto;
        width: 90%;
        max-width: 495px;
        top: 242px;
        left: 15px;
    }
}

.footer__map {
    width: 100%;
    max-width: 600px;
    height: auto;
    @media screen and (min-width: 320px) and (max-width:833px) {
        max-width: 495px;
    }
}
`;