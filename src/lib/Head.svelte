<script>
    // @ts-nocheck
    import OopsButton from "./OopsButton.svelte";
    import VBadge from "./VBadge.svelte";
</script>

<div class="flex out">
    <div class="left flex">
        <span class="name">board.</span>
    </div>
    <div class="right flex">
        <OopsButton />

        <VBadge />
    </div>
</div>

<style>
    .flex {
        display: flex;
        align-items: center;
    }
    .right {
        gap: 0.5rem;
    }
    .out {
        justify-content: space-between;
        margin: 0;
        padding: 0.2rem 1rem 0.2rem 1rem;
        background-color: rgb(44, 44, 44);
        /* border-bottom: 2px solid violet; */
        border-bottom: 2px solid aquamarine;
    }
    .name {
        color: antiquewhite;
    }
    a {
        align-items: center;
        /* margin: auto; */
        padding: 0;
    }
    img {
        display: block;
    }
</style>
