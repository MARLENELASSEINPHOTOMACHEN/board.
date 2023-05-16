# board

hi this is a personal project to learn svelte and github

# how to install

1. navigate to folder
2. run:

        npm install

3. in case you get SyntaxError: `... requested module ../leader-line.js.. does not provide an export named default`:
    - you can try adding **export** *var LeaderLine = fun...* to the second line in *node_modules/leader-line/leader-line.min.js*
    - and **export default LeaderLine;** in line 3 (at the end of the file)
    
    ***This does not always fix the error for*** `npm run dev` ***and i dont know why, if you know how to fix this properly let me know :)***

## how to run

run dev on local server:

        npm run dev

build the app & run:

        npm run build
        npm run preview
