import { writable } from 'svelte/store';


export const klassen = writable(JSON.parse(localStorage.getItem('klassen')));
//typ: 0:normale klasse 1:abstract 2:interface

klassen.subscribe((value) => localStorage.klassen = JSON.stringify(value));

export const lineData = writable(JSON.parse(localStorage.getItem('lineData')));

lineData.subscribe((value) => localStorage.lineData = JSON.stringify(value));

export let lines = writable([]);

export let abfallAktiv = writable(false);
export let selecting = writable(false);
export let newLine = writable([null, null]);
export let offset = writable(0);

export let oops = writable([]);