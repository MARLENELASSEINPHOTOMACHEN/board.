<script>
    // @ts-nocheck
    import Klasse from "./Klasse.svelte";
    import Papierkorb from "./Papierkorb.svelte";
    import { klassen } from "./stores.js";
    import { selecting } from "./stores.js";
    import { newLine } from "./stores.js";
</script>

{#if $selecting}
    <div
        class="backer"
        on:keydown={() => {
            $newLine[0] = null;
            $newLine[1] = null;
            $selecting = false;
        }}
        on:click={() => {
            $newLine[0] = null;
            $newLine[1] = null;
            $selecting = false;
        }}
    />
{/if}
<div class="aussen">
    {#if $klassen != null}
        {#each $klassen as item, index}
            {#if item.vis}
                <Klasse name={item.name} />
            {/if}
        {/each}
    {/if}
    <Papierkorb />
</div>

<style>
    .aussen {
        width: 100%;
        height: 100%;
        margin: 0;
        /* padding: 0; */
        padding: 1rem;
        background-image: -webkit-linear-gradient(
                90deg,
                transparent 0%,
                transparent 50%,
                white 50%,
                white 100%
            ),
            -webkit-linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0%, rgba(
                            0,
                            0,
                            0,
                            0.05
                        )
                        50%, white 50%, white 100%);
        background-size: 0.6em 0.6em;
    }
    .backer {
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        background-color: rgb(0, 0, 0);
        opacity: 30%;
    }
</style>
