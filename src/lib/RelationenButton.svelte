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
    let desc;
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
                    descStart: entA,
                    descEnd: entB,
                    descMain: desc,
                    typ: relType,
                },
            ];
        } else {
            $lineData = [
                ...$lineData,
                {
                    start: $newLine[0].name,
                    end: $newLine[1].name,
                    descStart: entA,
                    descEnd: entB,
                    descMain: desc,
                    typ: relType,
                },
            ];
        }
        $newLine[0] = null;
        $newLine[1] = null;
    }
    function drawLine(s, e, t, ea, eb, em) {
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
                        middleLabel: LeaderLine.captionLabel(
                            em != null ? em : desc
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
                    e.descStart,
                    e.descEnd,
                    e.descMain
                );
            });
        }
    });
</script>

{#if inVis}
    <div class="popup">
        <div class="inner boxShadow">
            <input
                class="inputA nameInput"
                bind:value={entA}
                placeholder="Multiplizität von.."
                on:keypress={nextHandle}
                use:init
            />
            <input
                class="InputB nameInput"
                bind:value={entB}
                bind:this={nextField}
                placeholder="Multiplizität zu.."
                on:keypress={enterHandle}
            />
            <button class="nameButton" on:click={createLine}>[+] </button>
            <input
                class="InputDescription nameInput"
                bind:value={desc}
                placeholder="Beschreibung"
                on:keypress={enterHandle}
            />
        </div>
    </div>
{/if}

<button class="barButton" on:click={createRelation}>[Relation]</button>
<button class="barButton" on:click={createVererbung}>[Vererbung]</button>

<style>
    .popup {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 0.5rem;
        background-color: transparent;
        top: 0;
        left: 0;
    }
    .inner {
        width: fit-content;
        padding: 0.5rem;
        border: 0.2rem solid rgb(59, 59, 59);
        border-radius: 0.5rem;
        background-color: rgb(208, 208, 208);
    }
    .boxShadow {
        -webkit-box-shadow: 0.2rem 0.2rem 0px 0px rgba(0, 0, 0, 0.56);
        -moz-box-shadow: 0.2rem 0.2rem 0px 0px rgba(0, 0, 0, 0.56);
        box-shadow: 0.2rem 0.2rem 0px 0px rgba(0, 0, 0, 0.56);
    }
    .barButton {
        font-size: 1rem;
        background-color: aquamarine;
        border-color: rgb(118, 118, 118);
        border-radius: 0.25rem;
        border-style: outset;
        padding: 0.4rem;
    }
    .nameInput {
        font-size: 1rem;
        border-radius: 0.5rem;
        border-width: 0.2rem;
        background-color: rgb(247, 247, 247);
    }

    .nameButton {
        border-color: rgb(118, 118, 118);
        border-radius: 0.25rem;
        border-style: outset;
        padding: 0.4rem;
        font-size: 1rem;
        background-color: rgb(208, 208, 208);
        padding: 0.1rem;
    }
</style>
