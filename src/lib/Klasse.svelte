<script>
    // @ts-nocheck
    import Attribute from "./Attribute.svelte";
    import Methoden from "./Methoden.svelte";
    import { abfallAktiv, lineData, newLine, offset, oops } from "./stores.js";
    import { klassen } from "./stores.js";
    import { lines } from "./stores.js";
    import { selecting } from "./stores.js";
    import { onMount } from "svelte";

    export let name;
    let cname = false;
    let nameFieldBind;
    //old position before trashing class
    let oldX;
    let oldY;
    let lock = false; //ausgewählt in relationen overlay
    $: if (!$selecting) {
        lock = false;
    }
    //TODO: hier vielleicht noch name als schlüssel weg zu kid :)
    $: kid = $klassen.findIndex(findName);

    onMount(() => {
        $klassen[kid].ref = this;
    });

    function findName(e) {
        if (e.name == name) {
            return true;
        } else {
            return false;
        }
    }

    let moving = false;

    function onDbClick(e) {
        //vielleviht if moving == false?
        cname = true;
    }

    function onMouseDown() {
        $offset = 0;
        moving = true;
        oldX = $klassen[kid].left;
        oldY = $klassen[kid].top;
    }

    function onMouseMove(e) {
        if (moving) {
            $lines.forEach((e) => {
                e.position();
            });
            //falls performance bringt: lokal speichern und nur bei mouseup synchronisieren?
            $klassen[kid].left += e.movementX;
            $klassen[kid].top += e.movementY;
        }
    }
    function changeName(neu) {
        //sehr wichtig hier sind die meisten not found fehler weil NAME = KEY
        cname = false;
        if ($lineData != null) {
            for (let i = 0; i < $lineData.length; i++) {
                if ($lineData[i].start == name) {
                    $lineData[i].start = neu;
                } else if ($lineData[i].end == name) {
                    $lineData[i].end = neu;
                }
            }
        }
        name = neu;
        $klassen[kid].name = neu;
    }

    function enterHandle(e) {
        if (e.key == "Enter") {
            if (
                $klassen.findIndex(checkName) < 0 &&
                nameFieldBind.innerText != null &&
                nameFieldBind.innerText != ""
            ) {
                changeName(nameFieldBind.innerText);
            } else {
                cname = false;
                nameFieldBind.innerText = name;
            }
        }
    }
    function checkName(e) {
        if (e.name === nameFieldBind.innerText) {
            return true;
        } else {
            return false;
        }
    }

    function onMouseUp() {
        // nochmal überarbeiten das vllt check nicht auf mooving ist
        if ($abfallAktiv && moving) {
            moving = false;
            //reset "trash" oops
            $oops = [];
            let temp = [];
            $lines.forEach((e) => {
                if (
                    $klassen[kid].link == e.end ||
                    $klassen[kid].link == e.start
                ) {
                    e.remove();
                } else {
                    $oops.push(e);
                }
            });
            $lines = temp;
            temp = [];
            if ($lineData != null) {
                $lineData.forEach((e) => {
                    if (e.start != name && e.end != name) {
                        temp.push(e);
                    } else {
                        $oops.push(e);
                    }
                });
                $lineData = temp;
            }
            $klassen[kid].vis = false;
            $klassen[kid].left = oldX;
            $klassen[kid].top = oldY;
            $oops.push({ klassenId: kid });
        }
        moving = false;
    }
</script>

<!-- TODO: vielleicht efiizientere und oder schönere lösung finden für :mousemove -->
<div
    class="aussen draggable"
    class:blass={$abfallAktiv && moving}
    class:fix={$selecting}
    class:locked={lock}
    style="left: {$klassen[kid].left}px; top: {$klassen[kid].top}px;"
    bind:this={$klassen[kid].link}
    on:click={() => {
        if ($selecting) {
            $newLine[$newLine[0] == null ? 0 : 1] = $klassen[kid];
            lock = true;
        }
    }}
    on:keydown={() => {
        if ($selecting) {
            $newLine[$newLine[0] == null ? 0 : 1] = $klassen[kid];
            lock = true;
        }
    }}
    on:mouseleave={() => {
        $lines.forEach((e) => {
            e.position();
        });
    }}
>
    <div
        class="name"
        class:edit={cname}
        on:mousedown={onMouseDown}
        on:dblclick={onDbClick}
        on:keypress={enterHandle}
        contenteditable={cname}
        bind:this={nameFieldBind}
    >
        {name}
    </div>
    <Attribute {kid} />
    <Methoden {kid} />
</div>
<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
    .aussen {
        width: fit-content;
        border: 0.1rem solid rgb(59, 59, 59);
        background-color: antiquewhite;
        -webkit-box-shadow: 0.2rem 0.2rem 0px 0px rgba(0, 0, 0, 0.56);
        -moz-box-shadow: 0.2rem 0.2rem 0px 0px rgba(0, 0, 0, 0.56);
        box-shadow: 0.2rem 0.2rem 0px 0px rgba(0, 0, 0, 0.56);
        opacity: 100%;
    }
    .name {
        user-select: none;
        font-weight: bold;
        margin: 0;
        padding: 0.3rem 0.5rem 0.3rem 0.5rem;
        /* border-bottom: 0.1rem solid rgb(59, 59, 59); */
        cursor: move; /* fallback if grab cursor is unsupported */
        cursor: grab;
        cursor: -moz-grab;
        cursor: -webkit-grab;
    }
    .name:active {
        cursor: grabbing;
        cursor: -moz-grabbing;
        cursor: -webkit-grabbing;
    }
    .draggable {
        user-select: none;
        position: absolute;
    }
    .draggable > * {
        user-select: none;
    }
    .blass {
        opacity: 50%;
    }
    .fix:hover {
        cursor: pointer;
        -webkit-box-shadow: 0.2rem 0.2rem aquamarine;
        -moz-box-shadow: 0.2rem 0.2rem aquamarine;
        box-shadow: 0.2rem 0.2rem aquamarine;
    }
    .fix > .name {
        cursor: pointer;
    }
    .locked {
        -webkit-box-shadow: 0.2rem 0.2rem aquamarine;
        -moz-box-shadow: 0.2rem 0.2rem aquamarine;
        box-shadow: 0.2rem 0.2rem aquamarine;
    }
    .edit {
        cursor: text;
        animation: blinker 1s ease infinite;
    }
    .edit:focus {
        animation: none;
    }

    @keyframes blinker {
        50% {
            opacity: 0%;
        }
    }
</style>
