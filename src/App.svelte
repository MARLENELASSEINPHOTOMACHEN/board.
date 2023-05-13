<script>
  // @ts-nocheck

  import Bar from "./lib/Bar.svelte";
  import Canvas from "./lib/Canvas.svelte";
  import { klassen } from "./lib/stores";

  function clearStorage() {
    if ($klassen != null) {
      let keep = [];
      $klassen.forEach((e) => {
        if (e.vis == true) {
          keep.push(e);
        }
      });
      $klassen = keep;
    }
  }
  clearStorage();
</script>

<main>
  <Bar />
  <Canvas />
</main>

<style>
  main {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
