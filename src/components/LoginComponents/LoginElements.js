import styled from 'styled-components'

export const Card = styled.div`
    position: relative;
    width: fit-content;
    height: fit-content;
    padding: 2rem;
    border-radius: 0.5rem;
    background: #fff;
    color: #606060;
    margin-top: 4rem;
    box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.025),
        0 9px 46px 8px rgba(0, 0, 0, 0.025),
        0 11px 15px -7px rgba(0, 0, 0, 0.025);
`;

export const CardTitle = styled.div`
    font-size: 1.25rem;
    margin-bottom: 1.75rem;
`;

export const FormGroup = styled.div`
    margin-bottom: 1.25rem;
`;

export const Wrapper = styled.div`
    position: relative;
    z-index: 0;
    margin-bottom: 1.25rem;
    border-bottom: 1px solid #c7c7c7;
`;


export const Container = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 15rem 15rem;
    grid-gap: 0.5rem;
    margin-bottom: 1.50rem;
    border-bottom: 1px;
`;

export const labelProps = { notEmpty: Boolean };
export const TextBoxLabel = styled("div", labelProps)`
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    transform: ${props =>
        props.notEmpty 
            ? "translate(2rem, 1.175rem)"
            : "translate(0, -0.5rem) scale(0.75, 0.75);"};
    transform-origin: top left;
    color: #a7a7a7;
    transition: transform 0.25s;
`;

export const Textbox = styled.input`
    position: relative;
    z-index: 0;
    width: 100%;
    height: 56px;
    line-height: 56px;
    border: 0;
    border-bottom: 1px solid #c7c7c7;
    background: transparent;
    color: #606060;
    text-indent: 2rem;

    &::placeholder {
        color: #a7a7a7;
    }

    &:focus {
        outline: none;
        border-color: #b44ff6;
    }

    &:focus ~ span {
        color: #b44ff6;
    }
    
    &:focus ~ div {
        transform: translate(0, -0.5rem) scale(0.75, 0.75);
        color: #b44ff6; 
    }
`;

export const Icon = styled.span`
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    font-size: 20px;
`;

export const CoolButton = styled.button`
    position: relative;
    width: 100%;
    height: 36px;
    line-height: 36px;
    padding: 0 2rem;
    font-size: 0.875rem;
    border-radius: 18px;
    border: 0;
    background: linear-gradient(45deg, #499be7, #f506ff);
    color: #ffffff;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.12),
        0 1px 5px 0 rgba(0, 0, 0, 0.2);
    margin-bottom: 1.25rem;
`;