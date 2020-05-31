import {writable} from 'svelte/store';

export const quiz = writable(undefined);
export const poll = writable(undefined);
export const share = writable(undefined);

let foo = 1;
export function setFoo(f) {
  foo = f;
}
export function getFoo() {
  return foo;
}
