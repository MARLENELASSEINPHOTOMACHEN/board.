<script>
    let version = "v0.1.3";
</script>

<a class="outer" href="https://github.com/MARLENELASSEINPHOTOMACHEN/board.">
    <div class="left">GitHub</div>
    <div class="right">{version}</div>
</a>

<style>
    * {
        transform-origin: 0px 0px;
        transform-box: view-box;
    }
    a {
        width: fit-content;
        text-decoration: none;
        display: flex;
        color: white;
    }
    a > * {
        width: fit-content;
        display: block;
        padding: 0.2rem 0.3rem 0.2rem 0.3rem;
        font-size: 0.7rem;
        text-shadow: 0 1px rgba(1, 1, 1, 0.3);
        font-family: Verdana, Geneva, DejaVu Sans, sans-serif;
        text-rendering: geometricPrecision;
        text-anchor: middle;
        white-space: nowrap;
        text-align: center;
    }
    .left {
        background-color: rgb(92, 92, 92);
        background: linear-gradient(#606060, #525252);
        border-radius: 0.2rem 0 0 0.2rem;
    }
    .right {
        background-color: rgb(154, 154, 154);
        background: linear-gradient(#afafaf, #a0a0a0);
        border-radius: 0 0.2rem 0.2rem 0;
    }
</style>
