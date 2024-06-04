import { useSetRecoilState } from 'recoil';
import { searchFilterTypeState } from '../../atoms/searchAtom';
import { GENGRES } from '../../constants/movie';
import Select from '../common/Select';

function SearchFilterSelect() {
  const setFilterType = useSetRecoilState(searchFilterTypeState);

  const data = [
    { value: 0, name: '장르별' },
    { value: 878, name: GENGRES.find((item) => item.id === 878)?.name },
    { value: 53, name: GENGRES.find((item) => item.id === 53)?.name },
    { value: 28, name: GENGRES.find((item) => item.id === 28)?.name },
  ];

  return <Select options={data} setter={setFilterType} />;
}

export default SearchFilterSelect;
