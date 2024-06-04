import { ChangeEvent } from 'react';
import styled from 'styled-components';

interface Props {
  options: { [key: string]: string | number | undefined }[];
  setter: any;
  defaultValue?: number | string;
  required?: boolean;
}

function Select({ options, setter, defaultValue, required = false }: Props) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setter(isNaN(Number(value)) ? value : Number(value));
  };

  return (
    <Wrapper onChange={handleChange} required={required}>
      {defaultValue && <Option value="">{defaultValue}</Option>}

      {options?.map((option, idx) => (
        <Option key={idx} value={option.value}>
          {option.name}
        </Option>
      ))}
    </Wrapper>
  );
}

export default Select;

const Wrapper = styled.select`
  height: 70%;

  background-color: black;
  border-radius: 5px;
  color: white;
  margin: 0px 10px;
  padding: 5px;
`;

const Option = styled.option`
  background: grey;
  color: grey;
`;
