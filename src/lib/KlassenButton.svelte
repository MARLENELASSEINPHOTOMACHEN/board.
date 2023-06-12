<script>
  // @ts-nocheck
  import { klassen, offset } from "./stores.js";

  let inputVisible = false;
  let neueName = "";
  let abstractCheck;
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
            typ: abstractCheck.checked ? 1 : 0,
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
            typ: abstractCheck.checked ? 1 : 0,
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
    <div class="inner">
      <input
        class="nameInput"
        bind:value={neueName}
        placeholder="Name.."
        on:keypress={enterHandle}
        use:init
      />
      <button class="nameButton" on:click={neueKlasse}>[+] </button>
      <br />
      <label class="container">
        abstract
        <input
          type="checkbox"
          id="abstractCheckBox"
          bind:this={abstractCheck}
        />
        <span class="checkmark" />
      </label>
    </div>
  </div>
{/if}

<button class="barButton" on:click={toggleName}>[Klasse]</button>

<style>
  .popup {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
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
    background-color: rgb(247, 247, 247);
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
  .container {
    margin-top: 0.5rem;
    display: block;
    position: relative;
    /* padding-left: 35px; */
    /* margin-bottom: 12px; */
    cursor: pointer;
    /* font-size: 22px; */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 2px;
    left: 20%;
    height: 1em;
    width: 1em;
    background-color: #eee;
  }

  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: #ffffff;
  }

  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: #474747;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 0.25em;
    /* top: 5px; */
    width: 0.35em;
    height: 0.7em;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .inner {
    width: fit-content;
    padding: 0.5rem;
    border: 0.2rem solid rgb(59, 59, 59);
    border-radius: 0.5rem;
    background-color: rgb(208, 208, 208);
  }
</style>
