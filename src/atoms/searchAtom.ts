import { atom } from 'recoil';

export const viewTypeState = atom({
  key: 'viewTypeState',
  default: 'card-view',
});

export const searchKeywordState = atom({
  key: 'searchKeywordState',
  default: '',
});

export const searchFilterTypeState = atom({
  key: 'searchFilterTypeState',
  default: 0,
});

export const searchSortTypeState = atom({
  key: 'searchSortTypeState',
  default: 'release_date',
});
