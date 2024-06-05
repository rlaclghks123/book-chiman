import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { viewTypeState } from '../../atoms/searchAtom';

function SelectViewRadio() {
  const [curViewType, setCurViewType] = useRecoilState(viewTypeState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurViewType(e.target.value);
  };

  return (
    <Wrapper>
      <Label>
        <input
          type="radio"
          name="view"
          value="card-view"
          onChange={handleChange}
          checked={curViewType === 'card-view'}
        />
        <span>Card View</span>
      </Label>

      <Label>
        <input
          type="radio"
          name="view"
          value="list-view"
          onChange={handleChange}
          checked={curViewType === 'list-view'}
        />
        <span>List View</span>
      </Label>
    </Wrapper>
  );
}

export default SelectViewRadio;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  white-space: nowrap;
`;

const Label = styled.label`
  cursor: pointer;
`;
