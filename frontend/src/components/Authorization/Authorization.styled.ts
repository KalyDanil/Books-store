import styled from 'styled-components';

export const AuthorizationForm = styled.form<{registrationStarted: boolean}>`
    display: ${props => props.registrationStarted? 'none' : 'flex'};
    width: 28.6%;
    flex-direction: column;
    margin-top: 100px;
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

.authorization__header {
    font-weight: 700;
    font-size: 40px;
    line-height: 60px
    color: #0D1821;
    @media screen and (min-width: 320px) and (max-width:833px) {
        font-size: 18px;
        line-height: 27px;
    }
}

.authorization__input {
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

.authorization__email {
    ::placeholder {
        background: url(./assets/image/email.svg) no-repeat;
    }
}

.authorization__password {
    ::placeholder {
        background: url(./assets/image/hide.svg) no-repeat;
    }
}

.authorization__button {
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