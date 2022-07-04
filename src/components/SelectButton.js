import styled from 'styled-components';

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <Contain
    onClick={onClick}
    >
        {children}
    </Contain>
  )
}
export default SelectButton;

const Contain = styled.div`
    border: 1px solid gold;
    border-radius: 5px;
    padding: 10px 20px 10px 20px;
    font-family: "Montserrat";
    cursor: pointer;
    background: ${({selected}) => (selected ? "gold" : "")};
    color: ${({selected}) => (selected ? "black" : "")};
    font-weight: bold;
    width:22%;
    color:#fff;
`