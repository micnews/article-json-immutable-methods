import {map as mapArray, filter as filterArray} from 'immutable-array-methods';
import {set} from 'immutable-object-methods';

const filter = (array, fn) => {
  return mapArray(filterArray(array, fn), obj => {
    return obj.children ? set(obj, 'children', filter(obj.children, fn)) : obj;
  });
};

export const filterText = (array, fn) => filter(array, (obj) => {
  return obj.type === 'text' ? fn(obj) : true;
});

const map = (array, fn) => {
  return mapArray(array, (obj) => {
    if (obj.children) {
      obj = set(obj, 'children', map(obj.children, fn));
    }

    if (obj.caption) {
      obj = set(obj, 'caption', map(obj.caption, fn));
    }

    if (obj.attribution) {
      obj = set(obj, 'attribution', map(obj.attribution, fn));
    }

    return fn(obj);
  });
};

export const mapText = (array, fn) => map(array, (obj) => {
  return obj.type === 'text' ? fn(obj) : obj;
});
