<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { klassen, lineData, offset } from "./stores.js";
    import { lines } from "./stores.js";
    import { selecting } from "./stores.js";
    import { newLine } from "./stores.js";
    //musste in leader-line exports .. usw hinzufügen -> readme
    import LeaderLine from "leader-line";

    let lineSize = 5;
    let pathGrid = true;
    let relType = 0;
    let inVis = false;
    let entA;
    let entB;
    let start;
    let end;
    let nextField = ""; // to focus next input on nextHandle()

    function createRelation() {
        relType = 0;
        $selecting = true;
    }
    function createVererbung() {
        relType = 1;
        $selecting = true;
    }
    function enterHandle(e) {
        if (e.key == "Enter") {
            createLine();
            inVis = false;
        }
    }
    function nextHandle(e) {
        if (e.key == "Enter") {
            nextField.focus();
        }
    }
    function init(el) {
        el.focus();
    }
    function createLine() {
        drawLine();

        if ($lineData == null) {
            $lineData = [
                {
                    start: $newLine[0].name,
                    end: $newLine[1].name,
                    entStart: entA,
                    entEnd: entB,
                    typ: relType,
                },
            ];
        } else {
            $lineData = [
                ...$lineData,
                {
                    start: $newLine[0].name,
                    end: $newLine[1].name,
                    entStart: entA,
                    entEnd: entB,
                    typ: relType,
                },
            ];
        }
        $newLine[0] = null;
        $newLine[1] = null;
    }
    function drawLine(s, e, t, ea, eb) {
        if (t != null) {
            relType = t;
        }
        switch (relType) {
            case 0:
                $lines = [
                    ...$lines,
                    new LeaderLine(s != null ? s : start, e != null ? e : end, {
                        size: lineSize,
                        path: pathGrid ? "grid" : "straight",
                        color: "black",
                        endPlug: "behind",
                        startLabel: LeaderLine.captionLabel(
                            ea != null ? ea : entA
                        ),
                        endLabel: LeaderLine.captionLabel(
                            eb != null ? eb : entB
                        ),
                    }),
                ];
                break;
            case 1:
                $lines = [
                    ...$lines,
                    new LeaderLine(s != null ? s : start, e != null ? e : end, {
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
            start = $newLine[0].link;
            end = $newLine[1].link;
            if (relType == 0) {
                inVis = true;
            } else {
                createLine();
            }
        }
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
                start = $klassen[sid].link;
                end = $klassen[eid].link;
                relType = e.typ;
                drawLine(
                    $klassen[sid].link,
                    $klassen[eid].link,
                    e.typ,
                    e.entStart,
                    e.entEnd
                );
            });
        }
    });
</script>

{#if inVis}
    <div class="popup">
        <input
            class="inputA"
            bind:value={entA}
            placeholder="Multiplizität von.."
            on:keypress={nextHandle}
            use:init
        />
        <input
            class="InputB"
            bind:value={entB}
            bind:this={nextField}
            placeholder="Multiplizität zu.."
            on:keypress={enterHandle}
        />
        <button class="nameButton" on:click={createLine}>[+] </button>
    </div>
{/if}

<button class="barButton" on:click={createRelation}>[Relation]</button>
<button class="barButton" on:click={createVererbung}>[Vererbung]</button>

<style>
    .popup {
        position: fixed;
        width: 100%;
        padding: 0.5rem;
        background-color: transparent;
        top: 0;
        left: 0;
    }
    button {
        font-size: 1rem;
        background-color: aquamarine;
        border-color: rgb(118, 118, 118);
        border-radius: 0.25rem;
        border-style: outset;
        padding: 0.4rem;
    }
</style>
