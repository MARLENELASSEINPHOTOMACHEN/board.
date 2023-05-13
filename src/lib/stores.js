import { writable } from 'svelte/store';


export const klassen = writable(JSON.parse(localStorage.getItem('klassen')));

klassen.subscribe((value) => localStorage.klassen = JSON.stringify(value));

export const lineData = writable(JSON.parse(localStorage.getItem('lineData')));

lineData.subscribe((value) => localStorage.lineData = JSON.stringify(value));

export let lines = writable([]);

// export let klassen = writable([
//     {
//         vis: true,
//         name: "BeispielKlasse", attribute: [
//             {
//                 text: "Attribut",
//                 type: "type",
//                 sichtbarkeit: 0,
//             },
//         ], methoden: [
//             {
//                 text: "Methode",
//                 type: "int",
//                 param: "",
//                 sichtbarkeit: 0,
//             },
//         ], left: 100, top: 100, ref: null, link: null
//     },
//     {
//         vis: true,
//         name: "MeineKlasse", attribute: [
//             {
//                 text: "Attribut",
//                 type: "type",
//                 sichtbarkeit: 0,
//             },
//         ], methoden: [
//             {
//                 text: "Methode",
//                 type: "int",
//                 param: "",
//                 sichtbarkeit: 0,
//             },
//         ], left: 100, top: 100, ref: null, link: null
//     },
// ]);
export let abfallAktiv = writable(false);
export let selecting = writable(false);
export let newLine = writable([null, null]);
export let offset = writable(0);