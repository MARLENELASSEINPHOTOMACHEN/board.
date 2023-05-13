<script>
    import { klassen } from "./stores.js";
    import { selecting } from "./stores.js";

    export let kid;
    let newItem = "";
    let newType = "";
    let sichtEnum = [
        { help: "private", sym: "-", i: 0 },
        { help: "public", sym: "+", i: 1 },
        { help: "protected", sym: "#", i: 2 },
    ];
    function addToList(e) {
        $klassen[kid].attribute = [
            ...$klassen[kid].attribute,
            {
                text: newItem == "" ? "Attribut" : newItem,
                type: newType == "" ? "type" : newType,
                sichtbarkeit: 0,
            },
        ];
        newItem = "";
        newType = "";
    }
    function enterHandle(e) {
        if (e.key == "Enter") {
            addToList();
        }
    }
    function removeFromList(index) {
        $klassen[kid].attribute.splice(index, 1);
        $klassen[kid].attribute = $klassen[kid].attribute;
    }
    function rotiereSichtbarkeit(index) {
        $klassen[kid].attribute[index].sichtbarkeit =
            ($klassen[kid].attribute[index].sichtbarkeit + 1) %
            sichtEnum.length;
    }
</script>

<div class="out2" class:quiet={$selecting}>
    {#each $klassen[kid].attribute as item, index}
        <div class="hider">
            <span
                tabindex="0"
                role="button"
                on:keydown={() => rotiereSichtbarkeit(index)}
                class="pointer"
                on:click={() => rotiereSichtbarkeit(index)}
                >{sichtEnum[item.sichtbarkeit].sym}</span
            >
            <span>{item.text}</span>
            <span>:{item.type}</span>
            <span
                tabindex="0"
                role="button"
                on:keydown={() => removeFromList(index)}
                class="pointer hidden"
                on:click={() => removeFromList(index)}>x</span
            >
            <br />
        </div>
    {/each}
    <div class="eingabe">
        <input
            class="attributLaenge"
            bind:value={newItem}
            type="text"
            on:keypress={enterHandle}
            placeholder="Attribut.."
        />
        <input
            class="typLaenge"
            bind:value={newType}
            type="text"
            on:keypress={enterHandle}
            placeholder="Typ.."
        />
        <button on:click={addToList}>[+] </button>
    </div>
</div>

<style>
    .out2 {
        /* width: fit-content; */
        text-align: left;
        padding: 0.5rem 1rem 0.5rem 1rem;
        border-bottom: 0.1rem solid rgb(59, 59, 59);
        border-top: 0.1rem solid rgb(59, 59, 59);
        user-select: none;
    }
    .out2 > * {
        user-select: none;
    }
    .pointer {
        cursor: pointer;
    }
    .hidden {
        opacity: 0;
    }
    .hider {
        padding: 0;
        margin: 0;
    }
    .hider:hover .hidden {
        opacity: 100;
    }
    .eingabe {
        padding: 0;
        margin: 0;
        display: none;
    }
    .out2:hover .eingabe {
        display: block;
    }
    button {
        background-color: transparent;
        padding: 0.1rem;
        border: none;
        border-bottom: 0.1rem outset buttonface;
        border-right: 0.1rem outset buttonface;
    }
    input {
        background-color: transparent;
        border: none;
        border-bottom: 0.1rem outset buttonface;
    }
    .attributLaenge {
        width: 6rem;
    }
    .typLaenge {
        width: 3rem;
    }
    input:focus {
        outline: none;
        outline: 0.2rem solid rgba(0, 0, 0, 0.309);
        outline-offset: 1px;
        /* border: 0.2rem solid rgba(0, 0, 0, 0.309);
        border-radius: 0.1rem; */
    }
    .quiet {
        pointer-events: none;
    }
</style>
