<script>
    import { abfallAktiv } from "./stores.js";
    function hoverHandle() {
        $abfallAktiv = true;
    }
    function mouseLeave() {
        $abfallAktiv = false;
    }
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
    on:mouseenter={hoverHandle}
    on:mouseleave={mouseLeave}
    class:stark={$abfallAktiv}
>
    🗑️
</div>

<style>
    div {
        position: absolute;
        top: 2.5rem;
        right: 2rem;
        font-size: 3rem;
        opacity: 30%;
        user-select: none;
    }
    .stark {
        opacity: 100%;
        cursor: move; /* fallback if grab cursor is unsupported */
        cursor: grab;
        cursor: -moz-grab;
        cursor: -webkit-grab;
    }
</style>
