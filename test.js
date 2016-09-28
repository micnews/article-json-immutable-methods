import test from 'ava';
import 'babel-core/register';
import {filterText} from './index';

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
