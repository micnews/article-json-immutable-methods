import test from 'ava';
import 'babel-core/register';
import {filterText, mapText} from './index';
import {mergeDeep} from 'immutable-object-methods';

test('mapText()', t => {
  const input = [{
    type: 'paragraph',
    children: [
      {content: 'foo bar', type: 'text'},
      {type: 'embed', embedType: 'image', imageSrc: 'http://image-source.jpg'}
  ]
  }];
  const actual = mapText(input, (child) => {
    return mergeDeep(child, {bold: true});
  });
  const expected = [{
    type: 'paragraph',
    children: [
      {content: 'foo bar', type: 'text', bold: true},
      {type: 'embed', embedType: 'image', imageSrc: 'http://image-source.jpg'}
    ]
  }];
  t.deepEqual(actual, expected);
  t.is(actual[0].children[1], input[0].children[1]);
});

test('mapText() no change', t => {
  const input = [{
    type: 'paragraph',
    children: [{content: 'foo bar', type: 'text'}]
  }];
  t.is(mapText(input, (child) => child), input);
});

test('filterText(), no text removed', t => {
  const input = [{
    type: 'paragraph',
    children: [{content: 'foo bar', type: 'text'}]
  }];
  const expected = input;
  const actual = filterText(input, () => true);
  t.is(actual, expected);
});

test('filterText(), remove one child', t => {
  const input = [{
    type: 'paragraph',
    children: [{content: 'foo bar', type: 'text'}, {mark: true, type: 'text'}]
  }];
  const expected = [{
    type: 'paragraph',
    children: [{content: 'foo bar', type: 'text'}]
  }];
  const actual = filterText(input, (text) => !text.mark);
  t.deepEqual(actual, expected);
});

test('filterText(), nested, no text removed', t => {
  const input = [{
    type: 'blockquote',
    children: [{
      type: 'paragraph',
      children: [{content: 'foo bar', type: 'text'}]
    }]
  }];
  const expected = input;
  const actual = filterText(input, () => true);
  t.is(actual, expected);
});

test('filterText(), nested, remove one child', t => {
  const input = [{
    type: 'blockquote',
    children: [{
      type: 'paragraph',
      children: [{content: 'foo bar', type: 'text'}, {mark: true, type: 'text'}]
    }]
  }];
  const expected = [{
    type: 'blockquote',
    children: [{
      type: 'paragraph',
      children: [{content: 'foo bar', type: 'text'}]
    }]
  }];
  const actual = filterText(input, (text) => !text.mark);
  t.deepEqual(actual, expected);
});
