<script>
    // @ts-nocheck
    import KlassenButton from "./KlassenButton.svelte";
    import Relationen from "./Relationen.svelte";
    import ClearButton from "./ClearButton.svelte";
</script>

<div class="outer boxShadow">
    <KlassenButton />
    <Relationen />
    <ClearButton />
</div>

<style>
    .outer {
        position: absolute;
        margin: 1rem;
        padding: 0.3rem;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        float: left;
        border: 0.2rem solid rgb(59, 59, 59);
        border-radius: 0.5rem;
        background-color: rgb(208, 208, 208);
    }

    .boxShadow {
        -webkit-box-shadow: 0.2rem 0.2rem 0px 0px rgba(0, 0, 0, 0.56);
        -moz-box-shadow: 0.2rem 0.2rem 0px 0px rgba(0, 0, 0, 0.56);
        box-shadow: 0.2rem 0.2rem 0px 0px rgba(0, 0, 0, 0.56);
    }
</style>
