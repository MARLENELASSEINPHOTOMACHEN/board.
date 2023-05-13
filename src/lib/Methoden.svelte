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
    let newParam = "";
    function addToList(e) {
        $klassen[kid].methoden = [
            ...$klassen[kid].methoden,
            {
                text: newItem == "" ? "Methode" : newItem,
                type:
                    newType == "" || newType == "void" || newType == "Void"
                        ? ""
                        : newType,
                param: newParam,
                sichtbarkeit: 0,
            },
        ];
        newItem = "";
        newType = "";
        newParam = "";
    }
    function enterHandle(e) {
        if (e.key == "Enter") {
            addToList();
        }
    }
    function removeFromList(index) {
        $klassen[kid].methoden.splice(index, 1);
        $klassen[kid].methoden = $klassen[kid].methoden;
    }
    function rotiereSichtbarkeit(index) {
        $klassen[kid].mehtoden[index].sichtbarkeit =
            ($klassen[kid].methoden[index].sichtbarkeit + 1) % sichtEnum.length;
    }
</script>

<div class="out1" class:quiet={$selecting}>
    {#each $klassen[kid].methoden as item, index}
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
            <span>({item.param})</span>
            <span>{item.type != "" ? ":" : ""}{item.type}</span>
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
            placeholder="Methode.."
        />
        <input
            class="typLaenge"
            bind:value={newType}
            type="text"
            on:keypress={enterHandle}
            placeholder="Rückgabe.."
        />
        <br />
        <input
            class="paramLaenge"
            bind:value={newParam}
            type="text"
            on:keypress={enterHandle}
            placeholder="Parameter: Typ.."
        />
        <button on:click={addToList}>[+] </button>
    </div>
</div>

<style>
    .out1 {
        /* width: fit-content; */
        text-align: left;
        padding: 0.5rem 1rem 0.5rem 1rem;
        border-bottom: 0.1rem solid rgb(59, 59, 59);
        user-select: none;
    }
    .out1 > * {
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
    .out1:hover .eingabe {
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
        width: 4rem;
    }
    .paramLaenge {
        width: 9rem;
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
