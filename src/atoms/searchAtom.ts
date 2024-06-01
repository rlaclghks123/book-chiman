import { atom } from 'recoil';

export const viewTypeState = atom({
  key: 'viewTypeState',
  default: 'card-view',
});

export const searchFilterState = atom({
  key: 'searchFilterState',
  default: 'title',
});

export const searchKeywordState = atom({
  key: 'searchKeywordState',
  default: '',
});

export const searchSortTypeState = atom({
  key: 'searchSortTypeState',
  default: 'release_date',
});
