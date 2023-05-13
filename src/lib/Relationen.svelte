<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { klassen, lineData, offset } from "./stores.js";
    import { lines } from "./stores.js";
    import { selecting } from "./stores.js";
    import { newLine } from "./stores.js";
    //musste in leader-line exports .. usw hinzufügen
    import LeaderLine from "leader-line";

    let lineSize = 5;
    let pathGrid = true;
    let relType = 0;

    function createRelation() {
        relType = 0;
        $selecting = true;
    }
    function createVererbung() {
        relType = 1;
        $selecting = true;
    }
    function drawLine(start, end, typ) {
        switch (typ) {
            case 0:
                $lines = [
                    ...$lines,
                    new LeaderLine(start, end, {
                        size: lineSize,
                        path: pathGrid ? "grid" : "straight",
                        color: "black",
                    }),
                ];
                break;
            case 1:
                $lines = [
                    ...$lines,
                    new LeaderLine(start, end, {
                        size: lineSize,
                        path: pathGrid ? "grid" : "straight",
                        color: "black",
                        endPlug: "arrow3",
                        endPlugColor: "white",
                        endPlugSize: 2,
                        endPlugOutline: true,
                        endPlugOutlineColor: "black",
                        endPlugOutlineSize: 1.5,
                    }),
                ];
                break;
            default:
            // code block
        }
    }
    $: if ($selecting && $newLine[0] != null && $newLine[1] != null) {
        if ($newLine[0] != $newLine[1]) {
            let start = $newLine[0].link;
            let end = $newLine[1].link;
            drawLine(start, end, relType);
            if ($lineData == null) {
                $lineData = [
                    {
                        start: $newLine[0].name,
                        end: $newLine[1].name,
                        typ: relType,
                    },
                ];
            } else {
                $lineData = [
                    ...$lineData,
                    {
                        start: $newLine[0].name,
                        end: $newLine[1].name,
                        typ: relType,
                    },
                ];
            }
        }
        $newLine[0] = null;
        $newLine[1] = null;
        $selecting = false;
    }
    onMount(() => {
        if ($lineData != null) {
            $lineData.forEach((e) => {
                function findstart(em) {
                    if (em.name == e.start) {
                        return true;
                    } else {
                        return false;
                    }
                }
                function findend(em) {
                    if (em.name == e.end) {
                        return true;
                    } else {
                        return false;
                    }
                }
                let sid = $klassen.findIndex(findstart);
                console.log(sid);
                let eid = $klassen.findIndex(findend);
                console.log(eid);
                drawLine($klassen[sid].link, $klassen[eid].link, e.typ);
            });
        }
    });
</script>

<button class="barButton" on:click={createRelation}>[Relation]</button>
<button class="barButton" on:click={createVererbung}>[Vererbung]</button>

<style>
    button {
        font-size: 1rem;
        background-color: aquamarine;
        border-color: rgb(118, 118, 118);
        border-radius: 0.25rem;
        border-style: outset;
        padding: 0.4rem;
    }
</style>
