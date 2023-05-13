<script>
    // @ts-nocheck
    function clearHandle() {
        localStorage.clear();
        window.location.reload(true);
    }
</script>

<button class="barButton" on:click={clearHandle}>[Clear]</button>

<style>
    button {
        font-size: 1rem;
        background-color: cyan;
        border-color: rgb(118, 118, 118);
        border-radius: 0.25rem;
        border-style: outset;
        padding: 0.4rem;
    }
</style>
