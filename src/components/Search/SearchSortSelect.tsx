import { useSetRecoilState } from 'recoil';

import { searchSortTypeState } from '../../atoms/searchAtom';
import Select from '../common/Select';

function SearchSortSelect() {
  const setSortType = useSetRecoilState(searchSortTypeState);

  const data = [
    { value: 'release_date', name: '최신순' },
    { value: 'title', name: '이름순' },
    { value: 'popularity', name: '인기순' },
  ];

  return <Select options={data} setter={setSortType} defaultValue="정렬" />;
}

export default SearchSortSelect;
