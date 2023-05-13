<script>
    // @ts-nocheck
    import { klassen, offset } from "./stores.js";

    let inputVisible = false;
    let neueName = "";
    function neueKlasse() {
        if (neueName == "") {
            neueName = "Neue Klasse";
        }
        if ($klassen == null || $klassen.findIndex(checkName) < 0) {
            if ($klassen == null) {
                $klassen = [
                    {
                        vis: true,
                        name: neueName,
                        attribute: [
                            {
                                text: "Attribut",
                                type: "type",
                                sichtbarkeit: 0,
                            },
                        ],
                        methoden: [
                            {
                                text: "Methode",
                                type: "int",
                                param: "",
                                sichtbarkeit: 0,
                            },
                        ],
                        left: 100 + $offset,
                        top: 100 + $offset * 0.5,
                        ref: null,
                        link: null,
                    },
                ];
            } else {
                $klassen = [
                    ...$klassen,
                    {
                        vis: true,
                        name: neueName,
                        attribute: [
                            {
                                text: "Attribut",
                                type: "type",
                                sichtbarkeit: 0,
                            },
                        ],
                        methoden: [
                            {
                                text: "Methode",
                                type: "int",
                                param: "",
                                sichtbarkeit: 0,
                            },
                        ],
                        left: 100 + $offset,
                        top: 100 + $offset * 0.5,
                        ref: null,
                        link: null,
                    },
                ];
            }
            toggleName();
            neueName = "";
            $offset = $offset + 100;
        } else {
            neueName = neueName + " 1";
            neueKlasse();
        }
    }
    function toggleName() {
        inputVisible = !inputVisible;
    }

    function checkName(e) {
        if (e.name === neueName) {
            return true;
        } else {
            return false;
        }
    }
    function enterHandle(e) {
        if (e.key == "Enter") {
            neueKlasse();
        }
    }

    function init(el) {
        el.focus();
    }
</script>

{#if inputVisible}
    <div class="popup">
        <input
            class="nameInput"
            bind:value={neueName}
            placeholder="Name.."
            on:keypress={enterHandle}
            use:init
        />
        <button class="nameButton" on:click={neueKlasse}>[+] </button>
    </div>
{/if}

<button class="barButton" on:click={toggleName}>[Klasse]</button>

<style>
    .popup {
        position: fixed;
        width: 100%;
        padding: 0.5rem;
        background-color: transparent;
        top: 0;
        left: 0;
    }
    .nameInput {
        font-size: 1rem;
        border-radius: 0.5rem;
        border-width: 0.2rem;
        background-color: rgb(227, 227, 227);
    }
    button {
        font-size: 1rem;
        border-color: rgb(118, 118, 118);
        border-radius: 0.25rem;
        border-style: outset;
        background-color: violet;
        padding: 0.4rem;
    }

    .nameButton {
        font-size: 1rem;
        background-color: rgb(208, 208, 208);
        padding: 0.1rem;
    }
</style>
