import { useState } from 'react';
import styled from 'styled-components';

interface Props {
  options: { [key: string]: string | number | undefined }[];
  setter: any;
  required?: boolean;
}

function Select({ options, setter }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [curName, setCurName] = useState(options[0].name);

  const handleClick = (option: { [key: string]: string | number | undefined }) => {
    setIsOpen((prev) => !prev);
    setCurName(option.name);
    setter(option.value);
  };

  return (
    <Wrapper>
      {!isOpen && <SelectButton onClick={() => setIsOpen(true)}>{curName}</SelectButton>}
      {isOpen && (
        <Ul>
          {options?.map((option, idx) => (
            <Li key={idx}>
              <OptionButton onClick={() => handleClick(option)}>{option.name}</OptionButton>
            </Li>
          ))}
        </Ul>
      )}
    </Wrapper>
  );
}

export default Select;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 5rem;
`;

const Ul = styled.ul`
  position: absolute;
  left: -2.5rem;
  top: -1rem;

  display: flex;
  flex-direction: column;

  width: 7rem;
  border-radius: 5px;

  background-color: grey;
  z-index: 99;
`;

const Li = styled.li`
  padding: 2.5px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.6);
`;

const Button = styled.button`
  border: none;
  outline: none;
  background-color: inherit;
`;

const SelectButton = styled(Button)`
  width: 4rem;
  margin: 2px 0px;
  border: 1px solid white;
  border-radius: 5px;
  padding: 5px;

  color: white;
  opacity: 0.8;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const OptionButton = styled(Button)`
  width: 100%;
  margin: 5px 0px;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;
