<script>
    // @ts-nocheck
    import { klassen, lineData, oops } from "./stores.js";
    $: aktiv = $oops.length < 1;

    function undoHandle() {
        $oops.forEach((e) => {
            if (e.klassenId != null) {
                $klassen[e.klassenId].vis = true;
            } else {
                $lineData.push(e);
                $lineData = $lineData;
            }
        });
        window.location.reload(true);
    }
</script>

<div>
    <button class:aktiv on:click={undoHandle}> oops </button>
</div>

<style>
    div {
        height: 100%;
        margin: 0;
        padding: 0;
    }
    button {
        display: block;
        background-color: rgb(92, 92, 92);
        font-weight: 0.7rem;
        color: white;
        border: none;
        border-radius: 3px;
        margin: 0;
        height: 100%;
        width: fit-content;
        display: block;
        padding: 0.2rem 0.3rem 0.2rem 0.3rem;
        font-size: 0.7rem;
        text-shadow: 0 1px rgba(1, 1, 1, 0.3);
        font-family: Verdana, Geneva, DejaVu Sans, sans-serif;
        text-rendering: geometricPrecision;
        text-anchor: middle;
        white-space: nowrap;
    }
    .aktiv {
        opacity: 30%;
    }
</style>
