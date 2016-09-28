import {map, filter as filterArray} from 'immutable-array-methods';
import {set} from 'immutable-object-methods';

const filter = (array, fn) => {
  return map(filterArray(array, fn), obj => {
    return obj.children ? set(obj, 'children', filter(obj.children, fn)) : obj;
  });
};

export const filterText = (array, fn) => filter(array, (obj) => {
  return obj.type === 'text' ? fn(obj) : true;
});
