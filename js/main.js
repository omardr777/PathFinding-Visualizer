//use delay to stop playing while running
const maxNumber = Math.pow(10, 1000);
const container = document.getElementById('container');
const sContainer1 = document.getElementById("sContainer1");
const sContainer2 = document.getElementById("sContainer2");
const splitContainer = document.getElementById('splitContainer');
var aStarBtn = document.getElementById('aStarBtn');
var dijkstraBtn = document.getElementById('dijkstraBtn');
var bfsBtn = document.getElementById('bfsBtn');
var dfsBtn = document.getElementById('dfsBtn');
var clearBtn = document.getElementById('clearBtn');
var clearWallBtn = document.getElementById('clearWallBtn');
var mazeBtn = document.getElementById('mazeBtn');
var stairMazeBtn = document.getElementById('stairMazeBtn');
var fastSpeed = document.getElementById('fastSpeed');
var slowSpeed = document.getElementById('slowSpeed');
var gridMazeBtn = document.getElementById("gridMazeBtn");
var splitBtn = document.getElementById("splitBtn");
var algoDropBtn = document.getElementById('algoDropBtn');
var splitAStarBtn = document.getElementById('splitAStar');
var splitDijkstraBtn = document.getElementById('splitDijkstra');
var splitDijkstraBtn2 = document.getElementById('splitDijkstra2');
var splitBfs = document.getElementById('splitBfs');
var splitAStarBtn2 = document.getElementById('splitAStar2');
var splitBfs2 = document.getElementById('splitBfs2');
var splitDfsBtn = document.getElementById('splitDfsBtn');
var splitDfsBtn2 = document.getElementById('splitDfsBtn2');
var runBtn = document.getElementById('runBtn');
var span1 = document.getElementById('span1');
var span2 = document.getElementById('span2');
var primMazeBtn = document.getElementById('primMazeBtn');
var root = document.documentElement;
var maze = document.getElementById('maze');

var splitBtbHasClicked = false;
var splitAStarClicked = false;
var splitAStarClicked2 = false;
var splitDijkstraClicked = false;
var splitDijkstraClicked2 = false;
var splitBfsClicked = false;
var splitBfsClicked2 = false;
var splitDfsClicked = false;
var splitDfsClicked2 = false;
var selectedBtn = '';
var selectedBtn2 = '';



/*
//var splitBtn = document.getElementById("splitBtn");
//var algoDropBtn = document.getElementById('algoDropBtn');
//var splitAStarBtn = document.getElementById('splitAStar');
//var splitAStarBtn2 = document.getElementById('splitAStar2');
//var splitBfs2 = document.getElementById('splitBfs2');
//var splitDijkstraBtn = document.getElementById('splitDijkstra');
//var splitAStarClicked = false;
//var splitAStarClicked2 = false;
//var splitDijkstraClicked = false;
//var splitBfsClicked2 = false;*/
var cols = 63;
var rows = 21;
var delay = 0;
var delay_time = 10;
var grid = new Array(cols);

var sStartSpot;
var sEndSpot;
var sGrid1 = new Array(cols / 3);
var sDGrid1 = new Array(cols / 3);
var sGrid2 = new Array(cols / 3);
var sDGrid2 = new Array(cols / 3);
var finishAlgoS = false;
var finishAlgoD = false;
var finishAlgoB = false;
var finishAlgoDE = false;
var hasClickedW = false;
var algoRunning = false;
var hasStartClicked = false;
var hasEndClicked = false;
var hasSolution = false;
var wantMaze = false;
//var splitBtnClicked = false;
var path = [];
var tempClassName = '';
// open and closed sets
var openSet = [];
var colsedSet = [];
var startSpot;
var endSpot;
var mazeComplixty = 400;

var sStartDiv;
var sEndDiv;

var sStartDiv2;
var sEndDiv2;
//vars for coloring
var divGrid = new Array(cols);
var openSetD = [];
var closedSetD = [];
var startDiv;
var endDiv;
var divPath = [];
var finished = false;

var timeToEdit = 0;

function Spot(i, j) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.previous = undefined;
    this.wall = false;
    this.isVisited = false;
    this.neighbors = [];
    this.neighborsM = [];
    this.addNeighvors = function (grid, cols) {
        var i = this.i;
        var j = this.j;
        // console.log(cols);
        if (i < cols - 1)
            this.neighbors.push(grid[i + 1][j]);
        if (i > 0)
            this.neighbors.push(grid[i - 1][j]);
        if (j < rows - 1)
            this.neighbors.push(grid[i][j + 1]);
        if (j > 0)
            this.neighbors.push(grid[i][j - 1]);
    }
    //console.log(this.neighbors);
    this.addNeighvorsVisited = function (grid) {
        var i = this.i;
        var j = this.j;

        if (i < cols - 2)
            this.neighborsM.push(grid[i + 2][j]);
        if (i > 1)
            this.neighborsM.push(grid[i - 2][j]);
        if (j < rows - 2)
            this.neighborsM.push(grid[i][j + 2]);
        if (j > 0)
            this.neighborsM.push(grid[i][j - 2]);
    }


}



//creating the main grid
createGrid(cols, rows, grid, divGrid, container);

/*
//cols = cols / 3;
//creating second grid
//createGrid(cols, rows, sGrid1, sDGrid1, sContainer1);
//creating third grid
//createGrid(cols, rows, sGrid2, sDGrid2, sContainer2);*/
creatNeighbours(grid, cols, rows);
//creatNeighbours(sGrid1, cols, rows);
//creatNeighbours(sGrid2, cols, rows);
//addingSAD(startDiv, endSpot, grid, startDiv, endDiv, divGrid);
startSpot = grid[15][10];
endSpot = grid[45][10];
startSpot.wall = false;
endSpot.wall = false;
startDiv = divGrid[15][10];
endDiv = divGrid[45][10];
createGrid((cols / 3), rows, sGrid1, sDGrid1, sContainer1);
createGrid((cols / 3), rows, sGrid2, sDGrid2, sContainer2);
cols = cols / 3;
//console.log('testst');
creatNeighbours(sGrid1, cols, rows);
creatNeighbours(sGrid2, cols, rows);
cols = cols * 3;
console.log(cols)
sStartSpot = sGrid1[0][0];
sEndSpot = sGrid1[(cols / 3) - 8][rows - 1];
sStartDiv = sDGrid1[0][0];
sEndDiv = sDGrid1[(cols / 3) - 8][rows - 1];
sStartDiv2 = sDGrid2[0][0];
sEndDiv2 = sDGrid2[(cols / 3) - 8][rows - 1];

sStartDiv.className = 'block start';
sEndDiv.className = 'block end';
sStartDiv2.className = 'block start';
sEndDiv2.className = 'block end';

startDiv.className = 'block start';
endDiv.className = 'block end';
openSet.push(startSpot);
openSetD.push(startDiv);

aStarBtn.addEventListener('click', aStarPlayer);
clearBtn.addEventListener('click', () => {

    if (splitBtbHasClicked) {
        clearAlgo(sGrid1, sDGrid1, sStartSpot, sStartDiv, sEndDiv);
        clearAlgo(sGrid2, sDGrid2, sStartSpot, sStartDiv2, sEndDiv2);
    } else {
        clearAlgo(grid, divGrid, startSpot, startDiv, endDiv);
    }

});
maze.addEventListener('click', () => {
    var list = document.getElementById('mazeContent');
    list.classList.toggle('show');
})
mazeBtn.addEventListener('click', mazeNormal);
stairMazeBtn.addEventListener('click', stairMazrPlayer);
clearWallBtn.addEventListener('click', clearWallPlayer);
dijkstraBtn.addEventListener('click', dijkstraPlayer);
bfsBtn.addEventListener('click', bfsPlayer);
dfsBtn.addEventListener('click', dfsPlayer);
runBtn.addEventListener('click', () => {
    clearAlgo(sGrid1, sDGrid1, sStartSpot, sStartDiv, sEndDiv);
    clearAlgo(sGrid2, sDGrid2, sStartSpot, sStartDiv2, sEndDiv2);
    if (selectedBtn.length > 0 && selectedBtn2.length > 0) {
        switch (selectedBtn) {
            case "aStar":
                aStarPlayer();
                span1.textContent = "aStar";
                break;
            case "dijkstra":
                dijkstraPlayer();
                span1.textContent = "dijkstra";
                break;
            case 'bfs':
                bfsPlayer();
                span1.textContent = "bfs";
                break;
            case "dfs":
                dfsPlayer();
                span1.textContent = "dfs";
                break;
        }
        switch (selectedBtn2) {
            case "aStar2":
                aStarPlayer();
                span2.textContent = "   aStar";
                break;
            case "dijkstra2":
                dijkstraPlayer();
                span2.textContent = "   dijkstra2";
                break;
            case 'bfs2':
                bfsPlayer();
                span2.textContent = "   bfs";

                break;
            case "dfs2":
                dfsPlayer();
                span2.textContent = "   dfs";

        }
    }
})
gridMazeBtn.addEventListener('click', () => finishAlgoS = false);
fastSpeed.addEventListener('click', () => delay_time = 8)
slowSpeed.addEventListener('click', () => delay_time = 50)
gridMazeBtn.addEventListener('click', mazeBTPlayer);
splitBtn.addEventListener('click', () => {
    if (splitBtbHasClicked) {
        splitBtbHasClicked = false;
    } else {
        splitBtbHasClicked = true;
        clearWall(sGrid1, sDGrid1);
        clearWall(sGrid2, sDGrid2);
    }
    clearWall(grid, divGrid);

    algoDropBtn.disabled = splitBtbHasClicked;
    container.classList.toggle('unShow');
    splitContainer.classList.toggle('unShow');
    sContainer1.classList.toggle('unShow');
    sContainer2.classList.toggle('unShow');
    runBtn.classList.toggle('unShow');
    span1.classList.toggle('unShow');
    span2.classList.toggle('unShow');
    selectedBtn2 = '';
    selectedBtn = '';
    splitDijkstraClicked = false;
    finishAlgoB = false;
    finishAlgoS = false;
    finishAlgoDE = false;
    finishAlgoD = false;

});
splitAStarBtn.addEventListener('click', () => {
    selectedBtn = '';
    splitAStarClicked = true;
    splitAStarClicked2 = false;
    selectedBtn = 'aStar';
    console.log(selectedBtn)
    // aStarPlayer();
})
splitDijkstraBtn.addEventListener('click', () => {
    selectedBtn = '';
    splitDijkstraClicked = true;
    splitDijkstraClicked2 = false;
    console.log('clicked')
    selectedBtn = 'dijkstra';
    console.log(selectedBtn)

    // dijkstraPlayer();
});
splitDijkstraBtn2.addEventListener('click', () => {
    selectedBtn2 = '';
    splitDijkstraClicked2 = true;
    splitDijkstraClicked1 = false;
    console.log('clicked')
    selectedBtn2 = 'dijkstra2';
    console.log(selectedBtn2)

    // dijkstraPlayer();
});
splitBfs.addEventListener('click', () => {
    selectedBtn = '';
    splitBfsClicked = true;
    selectedBtn = 'bfs';
    console.log(selectedBtn)
    //bfsPlayer();

})
splitDfsBtn.addEventListener('click', () => {
    selectedBtn = '';
    splitDfsClicked = true;

    selectedBtn = 'dfs';
    console.log(selectedBtn)
    // dfsPlayer();
})
splitBfs2.addEventListener('click', () => {
    // console.log('tt')
    selectedBtn2 = '';
    splitBfsClicked2 = true;
    // for (let i = 0; i < sGrid2.length; i++) {
    //     for (let j = 0; j < sGrid2[0].length; j++) {
    //         sGrid2[i][j].isVisited = false;

    //     }

    // }
    selectedBtn2 = 'bfs2';
    console.log(selectedBtn2)

    //   bfsPlayer();

})
splitAStarBtn2.addEventListener('click', () => {
    selectedBtn2 = '';
    splitAStarClicked2 = true;
    splitAStarClicked = false;
    selectedBtn2 = 'aStar2';
    console.log(selectedBtn2)

    // aStarPlayer();
})
splitDfsBtn2.addEventListener('click', () => {
    selectedBtn2 = '';
    splitDfsClicked2 = true;

    selectedBtn2 = 'dfs2';
    console.log(selectedBtn2)
    //dfsPlayer();
})
primMazeBtn.addEventListener('click', () => {
    primMazePlayer();
});
/*
// splitAStarBtn.addEventListener('click', () => {
//     splitAStarClicked = true;
//     splitAStarClicked2 = false;
//     aStarPlayer();
// })
// splitAStarBtn2.addEventListener('click', () => {
//     splitAStarClicked2 = true;
//     splitAStarClicked = false;
//     aStarPlayer();
// })
// splitDijkstraBtn.addEventListener('click', () => {
//     splitDijkstraClicked = true;
//     console.log('clicked')
//     dijkstraPlayer();
// });
// splitBfs2.addEventListener('click', () => {
//     splitBfsClicked2 = true;
//     splitAStarClicked = false;
//     splitAStarClicked2 = false;
//     splitDijkstraClicked = false;
//     bfsPlayer();
// })
splitBtn.addEventListener('click', () => {
    container.classList.toggle('unShow');
    splitContainer.classList.toggle('unShow');
    sContainer1.classList.toggle('unShow');
    sContainer2.classList.toggle('unShow');
    if (splitBtnClicked) {
        splitBtnClicked = false;
    } else {
        splitBtnClicked = true;
    }
    algoDropBtn.disabled = splitBtnClicked;
});
*/

var blocks = document.querySelectorAll(".block").forEach(item => {
    var tempIdString = item.id.split('-');
    var ii = parseInt(tempIdString[0]);
    var jj = parseInt(tempIdString[1]);
    var lastDiv = undefined;

    item.addEventListener('click', () => {

        if (item.className.includes("rDiv") ||
            item.className.includes("pathDiv") ||
            item.className.includes("closedSet") ||
            item.className.includes("sDiv")) {
            item.className = 'block wDiv';
            grid[ii][jj].wall = true;
            if (splitBtbHasClicked) {
                sGrid1[ii][jj].wall = true;
                sDGrid1[ii][jj].className = 'block wDiv';
                sDGrid2[ii][jj].className = 'block wDiv';
                sGrid2[ii][jj].wall = true;
            }
        } else if (item.className.includes("wDiv") || item.className.includes("wallT")) {
            item.className = 'block rDiv';
            grid[ii][jj].wall = false;
            if (splitBtbHasClicked) {
                sDGrid1[ii][jj].className = 'block rDiv';
                sGrid1[ii][jj].wall = false;
                sDGrid2[ii][jj].className = 'block rDiv';
                sGrid2[ii][jj].wall = false;
            }
        }
    });
    item.addEventListener('mousedown', () => {

        if (item.className.includes("start")) {
            hasStartClicked = true;
            // hasEndClicked = false;
            // hasClickedW = false;
            lastDiv = item;
            if (splitBtbHasClicked) {
                sDGrid1[ii][jj].className = 'block rDiv';
                sDGrid2[ii][jj].className = 'block rDiv';

            }
            item.className = 'block rDiv';



        } else if (item.className.includes("end")) {
            hasEndClicked = true;
            // hasStartClicked = false;
            // hasClickedW = false;
            //console.log('here')
            item.className = 'block rDiv';
        } else {
            tempClassName = item.className;
            hasClickedW = true;
        }

    });
    item.addEventListener('mouseup', () => {
        hasClickedW = false;
        if (hasStartClicked) {
            if (splitBtbHasClicked) {
                sStartSpot = sGrid1[ii][jj];
                sStartDiv = sDGrid1[ii][jj];
                sDGrid1[ii][jj].className = 'block start';
                sStartDiv2 = sDGrid2[ii][jj];
                sDGrid2[ii][jj].className = 'block start';
            }

            item.className = "block start";
            startSpot = grid[ii][jj];
            startDiv = divGrid[ii][jj];

            //             sStartDiv = sDGrid[ii][jj];
            //             sDGrid[ii][jj].className = 'block startDiv';
            //             sEndDiv = sDGrid[ii][jj];
            //             sStartDiv2 = sDGrid2[ii][jj];
            //             sDGrid2[ii][jj].className = 'block startDiv';
            //             sEndDiv2 = sDGrid2[ii][jj];
            hasStartClicked = false;
            // hasEndClicked = false;
        }
        else if (hasEndClicked) {
            //  hasClickedW = false;
            ///hasStartClicked = false;
            item.className = "block end";
            endSpot = grid[ii][jj];
            endDiv = divGrid[ii][jj];
            endSpot.wall = false;
            // sStartSpot = sGrid1[ii][jj];
            // sEndSpot = sGrid1[ii][jj];
            // sStartDiv = sDGrid1[ii][jj];
            // sDGrid1[ii][jj].className = 'block end';
            // sStartDiv2 = sDGrid2[ii][jj];
            // sDGrid2[ii][jj].className = 'block end';
            // sEndDiv2 = sDGrid2[ii][jj];
            if (splitBtbHasClicked) {
                sEndSpot = sGrid1[ii][jj];
                sEndDiv = sDGrid1[ii][jj];
                sDGrid1[ii][jj].className = 'block end';
                sEndDiv2 = sDGrid2[ii][jj];
                sDGrid2[ii][jj].className = 'block end';
                sEndSpot.wall = false;
            }
            hasEndClicked = false;
        }

    });
    item.addEventListener('mouseenter', () => {
        tempClassName = 'block rDiv';
        switch (item.className) {
            case 'block start':
                tempClassName = 'block rDiv';
                break;
            case 'block end':
                tempClassName = 'block rDiv';
                break;
            default: tempClassName = 'block rDiv';
        }
        if (item.className.includes('wDiv')) {
            tempClassName = 'block wDiv';
        }
        if (item.className.includes("wallT")) {
            tempClassName = 'block wallT';
        }


        if (hasStartClicked) {
            item.className += " start";
            // if (hasStartClicked) {
            startSpot = grid[ii][jj];
            startDiv = divGrid[ii][jj];
            if (splitBtbHasClicked) {
                sStartSpot = sGrid1[ii][jj];
                sStartDiv = sDGrid1[ii][jj];
                sStartDiv2 = sDGrid2[ii][jj];
            }


            if (finishAlgoS) {

                if (selectedBtn == 'aStar') {
                    aStarFinish(sGrid1, sDGrid1, sEndSpot, sStartSpot, sStartDiv, sEndDiv);
                }
                //  else if (selectedBtn2 == 'aStar2') {
                //     aStarFinish(sGrid2, sDGrid2, sEndSpot, sStartSpot, sStartDiv2, sEndDiv2);
                // } else
                //     aStarFinish(grid, divGrid, endSpot, startSpot, startDiv, endDiv);

            } if (finishAlgoD) {
                if (selectedBtn == 'dijkstra') {
                    dijkstraF(sGrid1, sDGrid1, sStartSpot, sEndSpot, sStartDiv, sEndDiv);
                }
                //  else if (selectedBtn2 == 'dijkstra2') {
                //     dijkstraF(sGrid2, sDGrid2, sStartSpot, sEndSpot, sStartDiv2, sEndDiv2);
                // } else
                //     dijkstraF(grid, divGrid, startSpot, endSpot, startDiv, endDiv);
            }
            if (finishAlgoB) {
                if (selectedBtn == 'bfs') {
                    bfsF(sGrid1, sDGrid1, sStartSpot, sEndSpot, sStartDiv, sEndDiv);
                }

                // if (selectedBtn2 == 'bfs2') {
                //     bfs(sGrid2, sDGrid2, sStartSpot, sEndSpot, sStartDiv2, sEndDiv2);
                // } else
                //     bfs(grid, divGrid, startSpot, endSpot, startDiv, endDiv);
            }
            if (finishAlgoDE) {
                if (selectedBtn == 'dfs') {
                    dfsF(sGrid1, sDGrid1, sStartSpot, sEndSpot, sStartDiv, sEndDiv);
                }
                // else if (selectedBtn2 == 'dfs2') {
                //     dfs(sGrid2, sDGrid2, sStartSpot, sEndSpot, sStartDiv2, sEndDiv2);
                // } else
                //     dfs(grid, divGrid, startSpot, endSpot, startDiv, endDiv);
            }
            if (finishAlgoS) {
                if (selectedBtn2 == 'aStar2') {
                    aStarFinish(sGrid2, sDGrid2, sEndSpot, sStartSpot, sStartDiv2, sEndDiv2);
                } else
                    aStarFinish(grid, divGrid, endSpot, startSpot, startDiv, endDiv);
            }
            if (finishAlgoD) {
                if (selectedBtn2 == 'dijkstra2') {
                    dijkstraF(sGrid2, sDGrid2, sStartSpot, sEndSpot, sStartDiv2, sEndDiv2);
                } else
                    dijkstraF(grid, divGrid, startSpot, endSpot, startDiv, endDiv);
            }
            if (finishAlgoB) {
                if (selectedBtn2 == 'bfs2') {
                    bfsF(sGrid2, sDGrid2, sStartSpot, sEndSpot, sStartDiv2, sEndDiv2);
                } else
                    bfsF(grid, divGrid, startSpot, endSpot, startDiv, endDiv);
            }
            if (finishAlgoDE) {
                if (selectedBtn2 == 'dfs2') {
                    dfsF(sGrid2, sDGrid2, sStartSpot, sEndSpot, sStartDiv2, sEndDiv2);
                } else
                    dfsF(grid, divGrid, startSpot, endSpot, startDiv, endDiv);
            }

            //}
        }

        else if (hasEndClicked) {
            item.className += " end";
            endSpot = grid[ii][jj];
            endDiv = divGrid[ii][jj];
            endSpot.wall = false;
            if (splitBtbHasClicked) {
                sEndSpot = sGrid1[ii][jj];
                sEndDiv = sDGrid1[ii][jj];
                sEndDiv2 = sDGrid2[ii][jj];
                sEndSpot.wall = false;
                sGrid1[sEndSpot.i][sEndSpot.j].wall = false;
                sGrid2[sEndSpot.i][sEndSpot.j].wall = false;
            }

            if (finishAlgoS) {

                if (selectedBtn == 'aStar') {
                    aStarFinish(sGrid1, sDGrid1, sEndSpot, sStartSpot, sStartDiv, sEndDiv);
                }
                //  else if (selectedBtn2 == 'aStar2') {
                //     aStarFinish(sGrid2, sDGrid2, sEndSpot, sStartSpot, sStartDiv2, sEndDiv2);
                // } else
                //     aStarFinish(grid, divGrid, endSpot, startSpot, startDiv, endDiv);

            } if (finishAlgoD) {
                if (selectedBtn == 'dijkstra') {
                    dijkstraF(sGrid1, sDGrid1, sStartSpot, sEndSpot, sStartDiv, sEndDiv);
                }
                //  else if (selectedBtn2 == 'dijkstra2') {
                //     dijkstraF(sGrid2, sDGrid2, sStartSpot, sEndSpot, sStartDiv2, sEndDiv2);
                // } else
                //     dijkstraF(grid, divGrid, startSpot, endSpot, startDiv, endDiv);
            }
            if (finishAlgoB) {
                if (selectedBtn == 'bfs') {
                    bfsF(sGrid1, sDGrid1, sStartSpot, sEndSpot, sStartDiv, sEndDiv);
                }

                // if (selectedBtn2 == 'bfs2') {
                //     bfs(sGrid2, sDGrid2, sStartSpot, sEndSpot, sStartDiv2, sEndDiv2);
                // } else
                //     bfs(grid, divGrid, startSpot, endSpot, startDiv, endDiv);
            }
            if (finishAlgoDE) {
                if (selectedBtn == 'dfs') {
                    dfsF(sGrid1, sDGrid1, sStartSpot, sEndSpot, sStartDiv, sEndDiv);
                }
                // else if (selectedBtn2 == 'dfs2') {
                //     dfs(sGrid2, sDGrid2, sStartSpot, sEndSpot, sStartDiv2, sEndDiv2);
                // } else
                //     dfs(grid, divGrid, startSpot, endSpot, startDiv, endDiv);
            }
            if (finishAlgoS) {
                if (selectedBtn2 == 'aStar2') {
                    aStarFinish(sGrid2, sDGrid2, sEndSpot, sStartSpot, sStartDiv2, sEndDiv2);
                } else
                    aStarFinish(grid, divGrid, endSpot, startSpot, startDiv, endDiv);
            }
            if (finishAlgoD) {
                if (selectedBtn2 == 'dijkstra2') {
                    dijkstraF(sGrid2, sDGrid2, sStartSpot, sEndSpot, sStartDiv2, sEndDiv2);
                } else
                    dijkstraF(grid, divGrid, startSpot, endSpot, startDiv, endDiv);
            }
            if (finishAlgoB) {
                if (selectedBtn2 == 'bfs2') {
                    bfsF(sGrid2, sDGrid2, sStartSpot, sEndSpot, sStartDiv2, sEndDiv2);
                } else
                    bfsF(grid, divGrid, startSpot, endSpot, startDiv, endDiv);
            }
            if (finishAlgoDE) {
                if (selectedBtn2 == 'dfs2') {
                    dfsF(sGrid2, sDGrid2, sStartSpot, sEndSpot, sStartDiv2, sEndDiv2);
                } else
                    dfsF(grid, divGrid, startSpot, endSpot, startDiv, endDiv);
            }
        }

    });
    item.addEventListener('mouseout', () => {

        if (hasStartClicked || hasEndClicked) {
            item.className = tempClassName;
            if (splitBtbHasClicked) {
                sDGrid1[ii][jj].className = tempClassName;
                sDGrid2[ii][jj].className = tempClassName;
            }
            if (tempClassName.includes('w')) {
                grid[ii][jj].wall = true;
                if (splitBtbHasClicked) {
                    sGrid1[ii][jj].wall = true;
                    sGrid2[ii][jj].wall = true;
                }
            } else {
                grid[ii][jj].wall = false;
                if (splitBtbHasClicked) {
                    sGrid1[ii][jj].wall = false;
                    sGrid2[ii][jj].wall = false;
                }
            }
        }
        // else if (hasEndClicked) {
        //     item.className = tempClassName;
        // }

    });
    item.addEventListener('mouseover', () => {
        if (hasClickedW) {
            if (item.className.includes("rDiv") ||
                item.className.includes("pathDiv") ||
                item.className.includes("closedSet") ||
                item.className.includes("sDiv")) {
                item.className = 'block wDiv';
                grid[ii][jj].wall = true;
                if (splitBtbHasClicked) {
                    sGrid1[ii][jj].wall = true;
                    sDGrid1[ii][jj].className = 'block wDiv';
                    sDGrid2[ii][jj].className = 'block wDiv';
                    sGrid2[ii][jj].wall = true;
                }
            } else if (item.className.includes("wDiv")) {
                item.className = 'block rDiv';
                grid[ii][jj].wall = false;
                if (splitBtbHasClicked) {
                    sGrid1[ii][jj].wall = false;
                    sDGrid1[ii][jj].className = 'block rDiv';
                    sDGrid2[ii][jj].className = 'block rDiv';
                    sGrid2[ii][jj].wall = false;
                }
            }
        }

    });


});

function createGrid(cols, rows, grid, divGrid, container) {
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
        divGrid[i] = new Array(rows);


    }
    for (let i = 0; i < cols; i++) {
        var cDiv = document.createElement('div');
        cDiv.className = "cDiv";
        divGrid[i] = cDiv;
        container.appendChild(cDiv);
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j);
            grid[i][j].isVisited = false;
            var rDiv = document.createElement('div');
            //rDiv.addEventListener('click', nodeFunction);
            rDiv.className = 'block';
            rDiv.id = `${i}-${j}`;
            if (!grid[i][j].wall) {
                rDiv.className += " rDiv";
            } else {
                rDiv.className += ' wDiv';
            }
            divGrid[i][j] = rDiv;
            cDiv.appendChild(rDiv);
        }
    }
}
function creatNeighbours(grid, cols, rows) {
    //adding neighbors to all blocks
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].addNeighvors(grid, cols);
            const ele = grid[i][j].neighbors;
            //  console.log(ele)
            //grid[i][j].addNeighvorsVisited(grid);
        }

    }

}
function addingSAD(startSpot, endSpot, grid, startDiv, endDiv, divGrid) {
    startSpot = grid[0][0];
    endSpot = grid[cols - 1][rows - 1];
    startSpot.wall = false;
    endSpot.wall = false;
    startDiv = divGrid[0][0];
    endDiv = divGrid[cols - 1][rows - 1];
    // sStartDiv = sDGrid[0][0];
    // sEndDiv = sDGrid[(cols / 3) - 1][rows - 1];
    // sStartDiv2 = sDGrid2[0][0];
    // sEndDiv2 = sDGrid2[(cols / 3) - 1][rows - 1];
    startDiv.className = 'block start';
    endDiv.className = 'block end';
    // sStartDiv.className = 'block start';
    // sEndDiv.className = 'block end';
    // sStartDiv2.className = 'block start';
    // sEndDiv2.className = 'block end';
    openSet.push(startSpot);
    openSetD.push(startDiv);
}
function myFunction() {
    document.getElementById("algoContentId").classList.toggle("show");
}
function myFunction2() {
    console.log('speed');
    document.getElementById("speedConten").classList.toggle('show');
} function myFunction3() {
    document.getElementById("mazeContent").classList.toggle('show');
}
function runAlgo(algo) {
    if (algo == 'wall') {
        aStar();
    }
}
function clearWall(grid, divGrid) {
    delay = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            grid[i][j].wall = false;
        }
    }
    //console.log(grid);
    if (splitBtbHasClicked) {
        cols /= 3;
    }
    for (let i = 0; i < cols; i++) {
        //console.log("i " + i);
        for (let j = 0; j < rows; j++) {
            //console.log("i " + j);
            divGrid[i][j].className = 'block rDiv';

        }
    }
    if (splitBtbHasClicked) {
        cols *= 3;
    }
    finished = true;
    startDiv.className = 'block start';
    endDiv.className = 'block end';
    if (splitBtbHasClicked) {
        sStartDiv.className = 'block start';
        sStartDiv2.className = 'block start';
        sEndDiv.className = 'block end';
        sEndDiv2.className = 'block end';
    }
    //console.log(divGrid);
}
function mazeNormal() {
    clearWall(grid, divGrid);
    for (let i = 0; i < mazeComplixty; i++) {
        //console.log(i);
        var ii = randomRange(0, cols - 1);
        var jj = randomRange(0, rows - 1);
        //if (ii != startSpot.i && jj != startSpot.j) {
        // if (ii != endSpot.i && jj != endSpot.j) {
        grid[ii][jj].wall = true;
        startSpot.wall = false;
        endSpot.wall = false;
        divGrid[ii][jj].className = 'block wDiv';
        startDiv.className = 'block start';
        endDiv.className = 'block end';
        //}
        // }

    }
}
function clearAlgo(grid, divGrid, startSpot, startDiv, endDiv) {

    delay = 0;
    finished = false;
    // startDiv.className = 'block start';
    // sStartDiv.className = 'block start';
    // sStartDiv2.className = 'block start';
    openSetD = [];
    openSet = [];
    closedSetD = [];
    colsedSet = [];
    path = [];
    divPath = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            grid[i][j].f = 0;
            grid[i][j].h = 0;
            grid[i][j].g = 0;
            grid[i][j].previous = undefined;
            grid[i][j].isVisited = false;

        }

    }

    // var pth = document.querySelectorAll('.pathDiv').forEach(item => {
    //     item.className = ('block rDiv');
    // });
    // var pth = document.querySelectorAll('.closedSet').forEach(item => {
    //     item.className = ('block rDiv');
    // });
    // var pth = document.querySelectorAll('.closedSetT').forEach(item => {
    //     item.className = ('block rDiv');
    // });
    // var pth = document.querySelectorAll('.pathDivT').forEach(item => {
    //     item.className = ('block rDiv');
    // });
    for (let i = 0; i < divGrid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            console.log('test');
            if (divGrid[i][j].className.includes("w")) {
                continue;
            } else {
                divGrid[i][j].className = 'block rDiv';
            }
        }
    }
    startDiv.className = 'block start';
    endDiv.className = 'block end';
    openSet.push(startSpot);
    openSetD.push(startDiv);
    // divGrid.forEach(item => {
    //     item.className = 'block rDiv';
    // })

    // if (splitBtbHasClicked) {
    //     openSet.push(sStartSpot);
    //     openSetD.push(sStartDiv);
    // } else {
    //     openSetD.push(startDiv);
    //     openSet.push(startSpot);
    // }
}
function stairMazrPlayer() {
    stairMaze(grid, divGrid);
}
function stairMaze(grid, divGrid) {
    clearWall(grid, divGrid);
    let i = 0;
    let j = grid[0].length - 1;
    while (j >= 0) {
        grid[i][j].wall = true;
        // divGrid[i][j].className = 'block wDiv'
        renderDiv(divGrid[i][j], 'block wDiv', delay_time);
        i++;
        j--;
    }
    i--;
    console.log(i);
    j = 0;
    while (j < grid[0].length - 2) {
        grid[i][j].wall = true;
        // divGrid[i][j].className = 'block wDiv'
        renderDiv(divGrid[i][j], 'block wDiv', delay_time);
        i++;
        j++;
    }

    console.log(i);
    while (i < grid.length - 2 && j >= 2) {
        grid[i][j].wall = true;
        // divGrid[i][j].className = 'block wDiv'
        renderDiv(divGrid[i][j], 'block wDiv', delay_time);
        i++;
        j--;
    }
}
function nodeFunction() {

}
function remove(arr, current) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == current) {
            arr.splice(i, 1);
        }

    }
}
function dist(a, b) {
    return getDistanc(a.i, a.j, b.i, b.j);
}
function getDistanc(x1, y1, x2, y2) {
    // return Math.abs(Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)));
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
function renderDiv(cDiv, color, delayTime) {
    //if (!cDiv.className == "wDiv") {
    window.setTimeout(() => {
        cDiv.className = color;
    }, delay += delayTime);
    algoRunning = false;
    //}
}
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function clearWallPlayer() {
    finishAlgoS = false;
    finishAlgoD = false;
    finishAlgoB = false;
    finishAlgoDE = false;
    if (splitBtbHasClicked) {
        clearWall(sGrid1, sDGrid1);
        clearWall(sGrid2, sDGrid2);
    }
    clearWall(grid, divGrid);
}
function algoBtnsDisable() {
    var btns = document.querySelectorAll('.button');
    console.log(btns);
    btns.forEach(item => {
        item.disabled = true;
    })
    var blocks2 = document.querySelectorAll('.block');
    blocks2.forEach(item => {
        item.style.pointerEvents = "none";
    })

}
function algoBtnsEnable() {
    window.setTimeout(() => {
        algoRunning = true;
        var btns = document.querySelectorAll('.button');
        console.log(btns);
        btns.forEach(item => {
            item.disabled = false;
        })
        var blocks2 = document.querySelectorAll('.block');
        blocks2.forEach(item => {
            item.style.pointerEvents = "auto";
        })
        if (splitBtbHasClicked) {
            var algoBtn = document.getElementById('algoDropBtn');
            algoBtn.disabled = true;
        }
    }, delay += delay_time)


}

//algorithms function
function aStarPlayer() {
    algoBtnsDisable();
    if (splitAStarClicked) {
        //cols = cols / 3;
        //console.log(cols);
        console.log(splitAStarClicked)
        //openSet = [];
        openSet.push(sStartSpot);
        //openSetD = [];
        openSetD.push(sStartDiv);
        aStar(sGrid1, sDGrid1, sEndSpot, sStartSpot, sStartDiv, sEndDiv);
        splitAStarClicked = false;
    }
    else if (splitAStarClicked2) {
        openSet.push(sStartSpot);
        //openSetD = [];
        openSetD.push(sStartDiv2);
        aStar(sGrid2, sDGrid2, sEndSpot, sStartSpot, sStartDiv2, sEndDiv2);
        splitAStarClicked2 = false;
    }
    else
        aStar(grid, divGrid, endSpot, startSpot, startDiv, endDiv);

    algoBtnsEnable();
}
function aStar(grid, divGrid, endSpot, startSpot, startDiv, endDiv) {
    // console.log(grid);
    if (!splitBtbHasClicked) {
        finishAlgoS = false;
        finishAlgoD = false;
        finishAlgoB = false;
        finishAlgoDE = false;

    }
    // if (!splitAStarClicked1 || !splitAStarClicked2) {
    //     clearAlgo();
    // }
    //algoRunning = true;
    clearAlgo(grid, divGrid, startSpot, startDiv, endDiv);
    while (openSet.length > 0) {
        var lowestF = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f <= openSet[lowestF].f) {
                lowestF = i;
            }
        }
        // track the current block
        //keep track of the current spot and div;
        var current = openSet[lowestF];
        var currentDiv = openSetD[lowestF];
        // if we reach the end 
        // check if the current block == end block
        if (finished) {

            return;
        }

        if (current == endSpot) {
            hasSolution = true;
            finished = true;
            path = [];
            divPath = [];
            var temp = current;
            var tempDiv = currentDiv;
            path.push(temp);
            divPath.push(tempDiv);
            while (temp.previous) {
                path.push(temp.previous);
                divPath.push(divGrid[temp.previous.i][temp.previous.j])
                temp = temp.previous;
                //closedSetD[0].className = "block start";
            }
            divPath.shift();
            divPath.pop();
            divPath.reverse();
            //closedSetD[0].className = "block start";
            //closedSetD.shift();
            break;
        }

        //if (!closedSetD[i].className == 'block start') {
        // if (closedSetD.length > 1) {
        //     renderDiv(closedSetD[closedSetD.length - 1], 'block openSet', delay_time);
        //     // renderDiv(closedSetD[closedSetD.length - 1], 'block closedSet', delay_time);

        // }
        // /}


        // renderDiv(closedSetD[closedSetD.length - 1], 'block pathDiv', delay_time)
        // renderDiv(closedSetD[closedSetD.length - 1], 'block rDiv', delay_time)
        // renderDiv(openSetD[openSetD.length - 1], 'block rDiv', delay_time)
        // openSet.reomve(current)
        remove(openSet, current);
        colsedSet.push(current);
        remove(openSetD, currentDiv);
        closedSetD.push(currentDiv);

        //for (all neighbors in current) {
        var neighbors = current.neighbors;

        for (var i = 0; i < neighbors.length; i++) {
            var element = neighbors[i];
            //if it is not in the close set(can eva luate it)
            //console.log(element.neighbors);
            if (colsedSet.includes(element) || element.wall) {
                continue;
            }

            if (!colsedSet.includes(element) && !element.wall) {
                var tempG = current.g + 1;
                var newPath = false;
                //if it is in the open set
                if (openSet.includes(element)) {
                    if (tempG < element.g) {
                        element.g = tempG;
                        newPath = true;

                    }
                } else {
                    element.g = tempG;
                    newPath = true;
                    openSet.push(element);
                    openSetD.push(divGrid[element.i][element.j]);

                }
                // if (!openSet.includes(element)) {
                //     openSet.push(element);
                //     openSetD.push(divGrid[element.i][element.j]);
                // }
                // else if (tempG >= current.g) {
                //     continue;
                // }
                if (newPath) {

                    element.h = dist(element, endSpot);
                    element.f = element.g + element.h;
                    element.previous = current;
                    //console.log(element);
                }
                // element.g = tempG;
                // element.h = dist(element, endSpot);
                // element.f = element.g + element.h;
                // element.previous = current;
                // console.log(element);

                // console.log(element.neighbors);
            }

        }

    }
    //rendering
    closedSetD.shift();

    for (let i = 0; i < closedSetD.length; i++) {
        //if (!closedSetD[i].className == 'block start') {

        renderDiv(closedSetD[i], 'block closedSet', delay_time);
        // /}

    }
    // for (let i = 0; i < openSetD.length; i++) {
    //     renderDiv(openSetD[i], 'green');

    // }

    for (let i = 0; i < divPath.length; i++) {

        renderDiv(divPath[i], 'block pathDiv', delay_time);
        algoRunning = true;
    }

    console.log('finish')
    closedSetD[0].className = "block start";
    if (!hasSolution && openSet.length == 0) {
        console.log("NO SOLUTION");
        //closedSetD[0].className = "block start";
        path = [];
    }
    if (hasSolution) {
        // renderDiv(startDiv,'block start',delay_time);
        // /startDiv.style.backgroundColor = '#ffd400';
    }
    closedSetD.shift();
    finishAlgoS = true;
    console.log(finishAlgoS)
}
function aStarFinish(grid, divGrid, endSpot, startSpot, startDiv, endDiv) {
    clearAlgo(grid, divGrid, startSpot, startDiv, endDiv);
    //algoRunning = true;
    startSpot.previous = undefined;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            grid[i][j].previous = undefined;

        }

    }
    while (openSet.length > 0) {
        var lowestF = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f <= openSet[lowestF].f) {
                lowestF = i;
            }
        }

        var current = openSet[lowestF];
        var currentDiv = openSetD[lowestF];

        if (finished) {

            return;
        }
        if (current == endSpot) {
            hasSolution = true;
            finished = true;
            path = [];
            divPath = [];
            var temp = current;
            var tempDiv = currentDiv;
            path.push(temp);
            divPath.push(tempDiv);
            while (temp.previous) {
                path.push(temp.previous);
                divPath.push(divGrid[temp.previous.i][temp.previous.j])
                temp = temp.previous;

            }
            divPath.shift();
            divPath.pop();
            divPath.reverse();

            break;
        }
        remove(openSet, current);
        colsedSet.push(current);
        remove(openSetD, currentDiv);
        closedSetD.push(currentDiv);


        var neighbors = current.neighbors;
        for (var i = 0; i < neighbors.length; i++) {
            var element = neighbors[i];

            if (colsedSet.includes(element) || element.wall) {
                continue;
            }

            if (!colsedSet.includes(element) && !element.wall) {
                var tempG = current.g + 1;
                var newPath = false;

                if (openSet.includes(element)) {
                    if (tempG < element.g) {
                        element.g = tempG;
                        newPath = true;

                    }
                } else {
                    element.g = tempG;
                    newPath = true;
                    openSet.push(element);
                    openSetD.push(divGrid[element.i][element.j]);

                }

                if (newPath) {

                    element.h = dist(element, endSpot);
                    element.f = element.g + element.h;
                    element.previous = current;
                    //console.log(element);
                }

            }

        }

    }
    closedSetD.shift();



    for (let i = 0; i < closedSetD.length; i++) {
        closedSetD[i].className = 'block closedSetT';
    }
    for (let i = 0; i < divPath.length; i++) {
        divPath[i].className = 'block pathDivT';
    }
    finishAlgoS = true;
    startSpot.previous = undefined;
}
function dijkstraPlayer() {
    algoRunning = true;
    algoBtnsDisable();
    if (splitDijkstraClicked) {
        dijkstra(sGrid1, sDGrid1, sStartSpot, sEndSpot, sStartDiv, sEndDiv); splitDijkstraBtn = false;

    }
    else if (splitDijkstraClicked2) {
        dijkstra(sGrid2, sDGrid2, sStartSpot, sEndSpot, sStartDiv2, sEndDiv2);
    } else
        dijkstra(grid, divGrid, startSpot, endSpot, startDiv, endDiv);

    algoBtnsEnable();
}
function dijkstra(grid, divGrid, startSpot, endSpot, startDiv, endDiv) {
    var finishDij = false;
    if (!splitBtbHasClicked) {
        finishAlgoS = false;
        finishAlgoD = false;
        finishAlgoB = false;
        finishAlgoDE = false;
    }
    //if (!splitAStarClicked2 || !splitAStarClicked2) {
    clearAlgo(grid, divGrid, startSpot, startDiv, endDiv);
    //}
    // if (splitBtbHasClicked) {
    //     cols /= 3;
    // }


    openSet = [];
    openSetD = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            grid[i][j].g = maxNumber;
            openSet.push(grid[i][j]);
            openSetD.push(divGrid[i][j]);
        }
    }
    console.log(grid)

    // if (splitBtbHasClicked) {
    //     cols *= 3;
    // }
    grid[startSpot.i][startSpot.j].g = 0;
    while (openSet.length > 0) {
        var min = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].g <= openSet[min].g) {
                min = i;
            }
        }

        var cur = openSet[min];
        var curDiv = openSetD[min];
        if (cur.g == Infinity) {
            break;
        }
        remove(openSet, cur);
        remove(openSetD, curDiv);
        colsedSet.push(cur);
        closedSetD.push(curDiv);
        if (finishDij) {
            return;
        }
        if (openSet.length == 0) {
            return
        }
        if (cur.i === endSpot.i && cur.j === endSpot.j) {
            closedSetD.pop();//if there is a path
            path = [];
            divPath = [];
            var tempCur = cur;
            var tempCurDiv = curDiv;
            path.push(tempCur);
            divPath.push(tempCurDiv);
            while (tempCur.previous) {
                path.push(tempCur.previous);
                divPath.push(divGrid[tempCur.previous.i][tempCur.previous.j]);
                tempCur = tempCur.previous;
            }
            divPath.shift();
            divPath.pop();
            divPath.reverse();

            break;
        }

        var neighbours = cur.neighbors;
        for (let i = 0; i < neighbours.length; i++) {
            var neighbour = neighbours[i];
            var newG = cur.g + 1;
            if (!colsedSet.includes(neighbour) && !neighbour.wall) {//if it is in the openSet
                if (newG <= neighbour.g) {
                    neighbour.g = newG;
                    neighbour.previous = cur;
                }
            }
            // try if all neighbours are walls 
        }
    }
    if (openSet.length == 0) {
        path = [];
        divPath = [];
        closedSetD.shift();
        closedSetD.pop();
        for (let i = 0; i < closedSetD.length; i++) {
            //if (closedSetD[i].className == 'block start') {
            renderDiv(closedSetD[i], 'block closedSet', delay_time);

        }
        return;
    }
    closedSetD.shift();

    //rendering
    for (let i = 0; i < closedSetD.length; i++) {
        //if (closedSetD[i].className == 'block start') {
        renderDiv(closedSetD[i], 'block closedSet', delay_time);

    }

    for (let i = 0; i < divPath.length; i++) {
        renderDiv(divPath[i], 'block pathDiv', delay_time);
    }


    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            grid[i][j].g = 0;

        }
    }
    finishAlgoD = true;
}
function dijkstraF(grid, divGrid, startSpot, endSpot, startDiv, endDiv) {
    clearAlgo(grid, divGrid, startSpot, startDiv, endDiv);
    openSet = [];
    openSetD = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            grid[i][j].g = maxNumber;
            openSet.push(grid[i][j]);
            openSetD.push(divGrid[i][j]);
        }
    }
    grid[startSpot.i][startSpot.j].g = 0;
    while (openSet.length > 0) {
        var min = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].g <= openSet[min].g) {
                min = i;
            }
        }
        var cur = openSet[min];
        var curDiv = openSetD[min];
        if (cur.g == Infinity) {
            break;
        }
        remove(openSet, cur);
        remove(openSetD, curDiv);
        colsedSet.push(cur);
        closedSetD.push(curDiv);
        if (cur.i === endSpot.i && cur.j === endSpot.j) {
            closedSetD.pop();//if there is a path
            path = [];
            divPath = [];
            var tempCur = cur;
            var tempCurDiv = curDiv;
            path.push(tempCur);
            divPath.push(tempCurDiv);
            while (tempCur.previous) {
                path.push(tempCur.previous);
                divPath.push(divGrid[tempCur.previous.i][tempCur.previous.j]);
                tempCur = tempCur.previous;
            }
            divPath.shift();
            divPath.pop();
            divPath.reverse();
            break;
        }
        var neighbours = cur.neighbors;
        for (let i = 0; i < neighbours.length; i++) {
            var neighbour = neighbours[i];
            var newG = cur.g + 1;
            if (!colsedSet.includes(neighbour) && !neighbour.wall) {//if it is in the openSet
                if (newG <= neighbour.g) {
                    neighbour.g = newG;
                    neighbour.previous = cur;
                }
            }
        }
    }
    if (openSet.length == 0) {
        path = [];
        divPath = [];
        closedSetD.shift();
        closedSetD.pop();
        for (let i = 0; i < closedSetD.length; i++) {
            //if (closedSetD[i].className == 'block start') {
            renderDiv(closedSetD[i], 'block closedSet', delay_time);

        }
        return;
    }
    closedSetD.shift();

    //rendering
    for (let i = 0; i < closedSetD.length; i++) {
        closedSetD[i].className = 'block closedSetT';
    }
    for (let i = 0; i < divPath.length; i++) {
        divPath[i].className = 'block pathDivT';
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            grid[i][j].g = 0;
        }
    }
    finishAlgoD = true;
}
function bfsPlayer() {
    algoBtnsDisable();
    if (splitBfsClicked) {
        bfs(sGrid1, sDGrid1, sStartSpot, sEndSpot, sStartDiv, sEndDiv);
        splitBfsClicked = false;
        splitBfsClicked2 = false;
    } else if (splitBfsClicked2) {
        bfs(sGrid2, sDGrid2, sStartSpot, sEndSpot, sStartDiv2, sEndDiv2);
        splitBfsClicked2 = false;
        splitBfsClicked = false;
    } else if (!splitBfsClicked2 || !splitBtbClicked) {
        splitBfsClicked2 = false;
        splitBfsClicked = false;
        bfs(grid, divGrid, startSpot, endSpot, startDiv, endDiv);
    }
    algoBtnsEnable();
}
function bfs(grid, divGrid, startSpot, endSpot, startDiv, endDiv) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            grid[i][j].isVisited = false;

        }

    }
    if (colsedSet.length)
        for (let i = 0; i < colsedSet.length; i++) {

            colsedSet[i].isVisited = false;

        }
    if (!splitBtbHasClicked) {
        finishAlgoS = false;
        finishAlgoD = false;
        finishAlgoB = false;
        finishAlgoDE = false;
    }
    clearAlgo(grid, divGrid, startSpot, startDiv, endDiv);
    openSet = [];
    openSetD = [];
    closedSetD = [];
    startSpot.isVisited = true;
    openSet.push(startSpot);
    openSetD.push(startDiv);
    while (openSet.length > 0) {
        var cur = openSet.shift();
        let curDiv = openSetD.shift();
        //console.log(curDiv);
        if (cur == endSpot) {
            path = [];
            divPath = [];
            var tempCur = cur;
            var tempCurDiv = curDiv;
            path.push(tempCur);
            divPath.push(tempCurDiv);
            while (tempCur.previous) {
                path.push(tempCur.previous);
                divPath.push(divGrid[tempCur.previous.i][tempCur.previous.j]);
                tempCur = tempCur.previous;
            }

            divPath.shift();
            divPath.pop();
            divPath.reverse();
            break;
        } else {
            var neighbours = cur.neighbors;
            for (let i = 0; i < neighbours.length; i++) {
                var neighbour = neighbours[i];
                if (!neighbour.wall) {
                    if (!neighbour.isVisited) {
                        neighbour.isVisited = true;
                        neighbour.previous = cur;
                        openSet.push(neighbour);
                        openSetD.push(divGrid[neighbour.i][neighbour.j]);
                    }
                }
            }
            //console.log(curDiv);
            colsedSet.push(cur);
            closedSetD.push(curDiv);
        }
    }
    colsedSet.shift();
    closedSetD.shift();
    //closedSetD.pop();
    //console.log(closedSetD);
    //rendering
    // if (finishAlgoB) {
    //     for (let i = 0; i < closedSetD.length; i++) {
    //         closedSetD[i].className = 'block closedSetT';
    //     }
    //     for (let i = 0; i < divPath.length; i++) {
    //         divPath[i].className = 'block pathDivT';
    //     }
    // }
    // else {

    for (let i = 0; i < closedSetD.length; i++) {
        //if (closedSetD[i].className == 'block start') {
        //console.log("test");
        renderDiv(closedSetD[i], 'block closedSet', delay_time);

    }
    for (let i = 0; i < divPath.length; i++) {
        renderDiv(divPath[i], 'block pathDiv', delay_time);
    }
    // }
    finishAlgoB = true;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            grid[i][j].isVisited = false;
        }

    }
    if (colsedSet.length)
        for (let i = 0; i < colsedSet.length; i++) {

            colsedSet[i].isVisited = false;

        }
}
function bfsF(grid, divGrid, startSpot, endSpot, startDiv, endDiv) {
    if (colsedSet.length)
        for (let i = 0; i < colsedSet.length; i++) {

            colsedSet[i].isVisited = false;

        }
    clearAlgo(grid, divGrid, startSpot, startDiv, endDiv);
    openSet = [];
    openSetD = [];
    closedSetD = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            grid[i][j].isVisited = false;

        }

    }
    startSpot.isVisited = true;
    openSet.push(startSpot);
    openSetD.push(startDiv);
    while (openSet.length > 0) {
        var cur = openSet.shift();
        let curDiv = openSetD.shift();
        //console.log(curDiv);
        if (cur == endSpot) {
            path = [];
            divPath = [];
            var tempCur = cur;
            var tempCurDiv = curDiv;
            path.push(tempCur);
            divPath.push(tempCurDiv);
            while (tempCur.previous) {
                path.push(tempCur.previous);
                divPath.push(divGrid[tempCur.previous.i][tempCur.previous.j]);
                tempCur = tempCur.previous;
            }

            divPath.shift();
            divPath.pop();
            divPath.reverse();
            break;
        } else {
            var neighbours = cur.neighbors;
            for (let i = 0; i < neighbours.length; i++) {
                var neighbour = neighbours[i];
                if (!neighbour.wall) {
                    if (!neighbour.isVisited) {
                        neighbour.isVisited = true;
                        neighbour.previous = cur;
                        openSet.push(neighbour);
                        openSetD.push(divGrid[neighbour.i][neighbour.j]);
                    }
                }
            }
            //console.log(curDiv);
            colsedSet.push(cur);
            closedSetD.push(curDiv);
        }
    }
    colsedSet.shift();
    closedSetD.shift();
    //closedSetD.pop();
    //console.log(closedSetD);
    //rendering
    for (let i = 0; i < closedSetD.length; i++) {
        closedSetD[i].className = 'block closedSetT';
    }
    for (let i = 0; i < divPath.length; i++) {
        divPath[i].className = 'block pathDivT';
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            grid[i][j].isVisited = false;
        }
    }
    if (colsedSet.length)
        for (let i = 0; i < colsedSet.length; i++) {

            colsedSet[i].isVisited = false;

        }
}
function dfsPlayer() {
    algoBtnsDisable();
    if (splitDfsClicked) {
        dfs(sGrid1, sDGrid1, sStartSpot, sEndSpot, sStartDiv, sEndDiv);
        splitDfsClicked = false;
        splitDfsClicked2 = false;
    }
    else if (splitDfsClicked2) {
        dfs(sGrid2, sDGrid2, sStartSpot, sEndSpot, sStartDiv2, sEndDiv2);
        splitDfsClicked2 = false;
        splitDfsClicked = false;
    }
    else {
        dfs(grid, divGrid, startSpot, endSpot, startDiv, endDiv);
        splitDfsClicked2 = false;
        splitDfsClicked = false;
    }
    algoBtnsEnable();
}
function dfs(grid, divGrid, startSpot, endSpot, startDiv, endDiv) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            grid[i][j].isVisited = false;

        }

    }
    if (!splitBtbHasClicked) {
        finishAlgoS = false;
        finishAlgoD = false;
        finishAlgoB = false;
        // finishAlgoDE = false;
    }
    clearAlgo(grid, divGrid, startSpot, startDiv, endDiv);
    openSet = [];
    openSetD = [];
    if (splitDfsClicked2) {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                grid[i][j].isVisited = false;

            }

        }
    }
    startSpot.isVisited = true;
    openSet.push(startSpot);
    openSetD.push(startDiv);
    while (openSet.length > 0) {
        let cur = openSet.pop();
        let curDiv = openSetD.pop();
        if (cur == endSpot) {
            path = [];
            divPath = [];
            var tempCur = cur;
            var tempCurDiv = curDiv;
            path.push(tempCur);
            divPath.push(tempCurDiv);
            while (tempCur.previous) {
                path.push(tempCur.previous);
                divPath.push(divGrid[tempCur.previous.i][tempCur.previous.j]);
                tempCur = tempCur.previous;
            }

            divPath.shift();
            divPath.pop();
            divPath.reverse();
            break;
        }
        else {

            var neighbours = cur.neighbors;
            for (let i = 0; i < neighbours.length; i++) {
                var neighbour = neighbours[i];
                if (!neighbour.wall) {
                    if (!neighbour.isVisited) {
                        neighbour.isVisited = true;
                        neighbour.previous = cur;
                        openSet.push(neighbour);
                        openSetD.push(divGrid[neighbour.i][neighbour.j]);
                    }
                }
            }
            colsedSet.push(cur);
            closedSetD.push(curDiv);
        }
    }


    colsedSet.shift();
    closedSetD.shift();
    //closedSetD.pop();
    //console.log(closedSetD);
    if (finishAlgoDE) {
        for (let i = 0; i < closedSetD.length; i++) {
            closedSetD[i].className = 'block closedSetT';
        }
        for (let i = 0; i < divPath.length; i++) {
            divPath[i].className = 'block pathDivT';
        }
    } else {
        for (let i = 0; i < closedSetD.length; i++) {
            //if (closedSetD[i].className == 'block start') {
            console.log("test");
            renderDiv(closedSetD[i], 'block closedSet', delay_time);

        }
        for (let i = 0; i < divPath.length; i++) {
            renderDiv(divPath[i], 'block pathDiv', delay_time);
        }
    }
    finishAlgoDE = true;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            grid[i][j].isVisited = false;

        }

    }
}
function dfsF(grid, divGrid, startSpot, endSpot, startDiv, endDiv) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            grid[i][j].isVisited = false;

        }

    }
    clearAlgo(grid, divGrid, startSpot, startDiv, endDiv);
    openSet = [];
    openSetD = [];
    startSpot.isVisited = true;
    openSet.push(startSpot);
    openSetD.push(startDiv);
    while (openSet.length > 0) {
        var cur = openSet.pop();
        let curDiv = openSetD.pop();
        if (cur == endSpot) {
            path = [];
            divPath = [];
            var tempCur = cur;
            var tempCurDiv = curDiv;
            path.push(tempCur);
            divPath.push(tempCurDiv);
            while (tempCur.previous) {
                path.push(tempCur.previous);
                divPath.push(divGrid[tempCur.previous.i][tempCur.previous.j]);
                tempCur = tempCur.previous;
            }

            divPath.shift();
            divPath.pop();
            divPath.reverse();
            break;
        }
        else {
            var neighbours = cur.neighbors;
            for (let i = 0; i < neighbours.length; i++) {
                var neighbour = neighbours[i];
                if (!neighbour.wall) {
                    if (!neighbour.isVisited) {
                        neighbour.isVisited = true;
                        neighbour.previous = cur;
                        openSet.push(neighbour);
                        openSetD.push(divGrid[neighbour.i][neighbour.j]);
                    }
                }
            }
            colsedSet.push(cur);
            closedSetD.push(curDiv);
        }
    }


    colsedSet.shift();
    closedSetD.shift();
    closedSetD.pop();
    //console.log(closedSetD);
    for (let i = 0; i < closedSetD.length; i++) {
        closedSetD[i].className = 'block closedSetT';
    }
    for (let i = 0; i < divPath.length; i++) {
        divPath[i].className = 'block pathDivT';
    }
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            grid[i][j].isVisited = false;

        }

    }
}
function mazeBTPlayer() {
    algoBtnsDisable();
    if (splitBtbHasClicked) {
        mazeBT(sGrid1, sDGrid1, sGrid2, sDGrid2);
    } else {
        mazeBT(grid, divGrid, undefined, undefined);
    }
    algoBtnsEnable();
}
function mazeBT(grid, divGrid, grid2, divGrid2) {
    // startSpot = grid[0][0];
    // endSpot = grid[cols - 1][rows - 1];
    delay = 0;
    var delay_time2 = 4;
    for (let i = 0; i < grid.length; ++i) {
        for (let j = 0; j < grid[i].length; ++j) {

            grid[i][j].wall = true;
            divGrid[i][j].className = "block wallT";
            if (splitBtbHasClicked) {
                grid2[i][j].wall = true;
                divGrid2[i][j].className = "block wallT";
            }

        }
    }

    // startSpot.wall = false;
    // divGrid[startSpot.i][startSpot.j].className = "block start";
    // endSpot.wall = false;
    // divGrid[endSpot.i][endSpot.j].className = "block end";
    let cell = grid[Math.floor(Math.random() * grid.length)][Math.floor(Math.random() * grid[0].length)];
    cell.wall = false;
    divGrid[cell.i][cell.j].className = 'block rDiv';


    let choices = [[-2, 0], [0, 2], [2, 0], [0, -2]];
    let neighboursFM = neighboursForMaze(grid, cell, choices);
    let s = [];
    let rand = Math.floor(Math.random() * neighboursFM.length);
    s.push(neighboursFM[rand]);
    while (s.length) {
        let batch = s[s.length - 1];
        //  console.log(batch);
        let frontier = batch[1];
        let inBetween = batch[0];
        frontier.wall = false;
        inBetween.wall = false;
        renderDiv(divGrid[frontier.i][frontier.j], 'block sDiv', delay_time2);
        renderDiv(divGrid[inBetween.i][inBetween.j], 'block sDiv', delay_time2);
        if (splitBtbHasClicked) {
            divGrid2[cell.i][cell.j].className = 'block rDiv';
            grid2[frontier.i][frontier.j].wall = false;
            grid2[inBetween.i][inBetween.j].wall = false;
            renderDiv(divGrid2[frontier.i][frontier.j], 'block sDiv', delay_time);
            renderDiv(divGrid2[inBetween.i][inBetween.j], 'block sDiv', delay_time);
        }

        neighboursFM = neighboursForMaze(grid, frontier, choices);
        if (neighboursFM.length) {
            rand = Math.floor(Math.random() * neighboursFM.length);
            s.push(neighboursFM[rand]);
        } else {
            s.pop();
        }
    }
    let endAndStart = false;
    let startAndEnd = false;
    let ii, jj;

    if (!splitBtbHasClicked) {

        startSpot = grid[15][10];
        startSpot.wall = false;
        startDiv = divGrid[15][10];
        renderDiv(startDiv, 'block start', delay_time2);
        endSpot = grid[45][10];
        endDiv = divGrid[45][10];
        renderDiv(endDiv, 'block end', delay_time2);
        endSpot.wall = false;
    } else {
        sStartSpot = grid[3][2];
        sStartSpot.wall = false;
        sStartDiv = divGrid[3][2];
        sStartDiv2 = divGrid2[3][2];
        renderDiv(sStartDiv, 'block start', delay_time2);
        renderDiv(sStartDiv2, 'block start', delay_time2);
        sEndSpot = grid[15][2];
        sEndDiv = divGrid[15][2];
        sEndDiv2 = divGrid2[15][2];
        sEndSpot.wall = false;
        renderDiv(sEndDiv, 'block end', delay_time2);
        renderDiv(sEndDiv2, 'block end', delay_time2);


    }


}
function primMazePlayer() {
    algoBtnsDisable();
    if (splitBtbHasClicked) {
        primMaze(sGrid1, sDGrid1, sGrid2, sDGrid2);
    } else {
        primMaze(grid, divGrid, undefined, undefined);
    }
    algoBtnsEnable();
}
function primMaze(grid, divGrid, grid2, divGrid2) {
    delay = 0;
    var delay_time2 = 4;
    for (let i = 0; i < grid.length; ++i) {
        for (let j = 0; j < grid[i].length; ++j) {

            grid[i][j].wall = true;
            divGrid[i][j].className = "block wallT";
            if (splitBtbHasClicked) {
                grid2[i][j].wall = true;
                divGrid2[i][j].className = "block wallT";
            }

        }
    }
    let cell = grid[Math.floor(Math.random() * grid.length)][Math.floor(Math.random() * grid[0].length)];
    cell.wall = false;
    divGrid[cell.i][cell.j].className = 'block rDiv';
    let choices = [[-2, 0], [0, 2], [2, 0], [0, -2]];

    let frontierList = [];

    neighboursForMazePrim(grid, frontierList, cell, choices);

    console.log(frontierList)
    while (frontierList.length) {
        let rnd = Math.floor(Math.random() * frontierList.length);
        let batch = frontierList[rnd];
        frontierList.splice(rnd, 1);
        console.log(batch);
        let inBetween = batch[0];
        let frontier = batch[1];

        if (frontier.wall) {
            frontier.wall = false;
            inBetween.wall = false;
            renderDiv(divGrid[frontier.i][frontier.j], 'block sDiv', delay_time2);
            renderDiv(divGrid[inBetween.i][inBetween.j], 'block sDiv', delay_time2);
            neighboursForMazePrim(grid, frontierList, frontier, choices);
            if (splitBtbHasClicked) {
                divGrid2[cell.i][cell.j].className = 'block rDiv';
                grid2[frontier.i][frontier.j].wall = false;
                grid2[inBetween.i][inBetween.j].wall = false;
                renderDiv(divGrid2[frontier.i][frontier.j], 'block sDiv', delay_time);
                renderDiv(divGrid2[inBetween.i][inBetween.j], 'block sDiv', delay_time);
            }
        }



    }
    if (!splitBtbHasClicked) {

        startSpot = grid[15][10];
        startSpot.wall = false;
        startDiv = divGrid[15][10];
        renderDiv(startDiv, 'block start', delay_time2);
        endSpot = grid[45][10];
        endDiv = divGrid[45][10];
        renderDiv(endDiv, 'block end', delay_time2);
        endSpot.wall = false;
    } else {
        sStartSpot = grid[3][2];
        sStartSpot.wall = false;
        sStartDiv = divGrid[3][2];
        sStartDiv2 = divGrid2[3][2];
        renderDiv(sStartDiv, 'block start', delay_time2);
        renderDiv(sStartDiv2, 'block start', delay_time2);
        sEndSpot = grid[15][2];
        sEndDiv = divGrid[15][2];
        sEndDiv2 = divGrid2[15][2];
        sEndSpot.wall = false;
        renderDiv(sEndDiv, 'block end', delay_time2);
        renderDiv(sEndDiv2, 'block end', delay_time2);


    }

}
function neighboursForMaze(grid, cell, choices) {
    let neighboursFM = [];
    for (let i = 0; i < choices.length; i++) {
        let row = cell.i + choices[i][0];
        let col = cell.j + choices[i][1];
        if (grid[row] && grid[row][col] && grid[row][col].wall && grid[row][col] != startSpot) {
            if (grid[row][col] != endSpot) {
                //if (grid[row][col]) {


                // if (grid[row][col] != startSpot || grid[row][col] != endSpot) {

                let frontire = grid[row][col];
                let inBetween = null;

                if (choices[i][0] === -2) {
                    inBetween = grid[(cell.i - 1)][cell.j];
                } else if (choices[i][0] === 2) {
                    inBetween = grid[(cell.i + 1)][cell.j];
                } else if (choices[i][1] === -2) {
                    inBetween = grid[cell.i][(cell.j - 1)];
                } else if (choices[i][1] === 2) {
                    inBetween = grid[cell.i][(cell.j + 1)];
                }
                neighboursFM.push([inBetween, frontire]);

                //  }

                //}/
            }
        }

    }
    return neighboursFM;
}
function neighboursForMazePrim(grid, frontierList, cell, choices) {
    let neighboursFM = [];
    for (let i = 0; i < choices.length; i++) {
        let row = cell.i + choices[i][0];
        let col = cell.j + choices[i][1];
        if (grid[row] && grid[row][col] && grid[row][col].wall && grid[row][col] != startSpot) {
            if (grid[row][col] != endSpot) {
                //if (grid[row][col]) {


                // if (grid[row][col] != startSpot || grid[row][col] != endSpot) {

                let frontire = grid[row][col];
                let inBetween = null;

                if (choices[i][0] === -2) {
                    inBetween = grid[(cell.i - 1)][cell.j];
                } else if (choices[i][0] === 2) {
                    inBetween = grid[(cell.i + 1)][cell.j];
                } else if (choices[i][1] === -2) {
                    inBetween = grid[cell.i][(cell.j - 1)];
                } else if (choices[i][1] === 2) {
                    inBetween = grid[cell.i][(cell.j + 1)];
                }
                frontierList.push([inBetween, frontire]);

            }
        }

    }
}
window.onclick = function (event) {
    if (!event.target.matches('.algoDropBtn')) {
        var dropdowns = document.getElementsByClassName("algoContent");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
    //test2
}


function biAstar(grid, divGrid, endSpot, startSpot, startDiv, endDiv) {
    var openSet2 = [];
    var openSetD2 = [];
    var closedSet2 = [];
    var closedSetD2 = [];
    var path2 = [];
    var divPath2 = [];
    openSet2.push(endSpot);
    openSetD2.push(endDiv);

    clearAlgo(grid, divGrid, startSpot, startDiv, endDiv);
    //algoRunning = true;
    while (openSet.length && openSet2.length) {

        var lowestF = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f <= openSet[lowestF].f) {
                lowestF = i;
            }
        }
        var lowestF2 = 0;
        for (let i = 0; i < openSet2.length; i++) {
            if (openSet2[i].f <= openSet2[lowestF2].f) {
                lowestF2 = i;
            }
        }

        var current = openSet[lowestF];
        var currentDiv = openSetD[lowestF];
        var current2 = openSet2[lowestF2];
        var currentDiv2 = openSetD2[lowestF2];

        if (closedSet2.includes(current) || current == endSpot) {
            hasSolution = true;
            finished = true;
            path = [];
            divPath = [];
            var temp = current;
            var tempDiv = currentDiv;
            path.push(temp);
            divPath.push(tempDiv);
            while (temp.previous) {
                path.push(temp.previous);
                divPath.push(divGrid[temp.previous.i][temp.previous.j])
                temp = temp.previous;

            }
            divPath.shift();
            divPath.pop();
            divPath.reverse();

            break;
        } if (colsedSet.includes(current2) || current2 == startSpot) {
            hasSolution = true;
            finished = true;
            path2 = [];
            divPath2 = [];
            var temp = current;
            var tempDiv = currentDiv;
            path2.push(temp);
            divPath2.push(tempDiv);
            while (temp.previous) {
                path2.push(temp.previous);
                divPath2.push(divGrid[temp.previous.i][temp.previous.j])
                temp = temp.previous;

            }
            divPath2.shift();
            divPath2.pop();
            divPath2.reverse();

            break;
        }
        remove(openSet, current);
        colsedSet.push(current);
        remove(openSetD, currentDiv);
        closedSetD.push(currentDiv);
        remove(openSet2, current2);
        closedSet2.push(current2);
        remove(openSetD2, currentDiv2);
        closedSetD2.push(currentDiv2);

        var neighbors = current.neighbors;
        for (var i = 0; i < neighbors.length; i++) {
            var element = neighbors[i];

            if (colsedSet.includes(element) || element.wall) {
                continue;
            }

            if (!colsedSet.includes(element) && !element.wall) {
                var tempG = current.g + 1;
                var newPath = false;

                if (openSet.includes(element)) {
                    if (tempG < element.g) {
                        element.g = tempG;
                        newPath = true;

                    }
                } else {
                    element.g = tempG;
                    newPath = true;
                    openSet.push(element);
                    openSetD.push(divGrid[element.i][element.j]);

                }

                if (newPath) {

                    element.h = dist(element, endSpot);
                    element.f = element.g + element.h;
                    element.previous = current;
                    //console.log(element);
                }

            }

        }
        var neighbors2 = current2.neighbors;
        for (var i = 0; i < neighbors2.length; i++) {
            var element = neighbors2[i];

            if (closedSet2.includes(element) || element.wall) {
                continue;
            }

            if (!closedSet2.includes(element) && !element.wall) {
                var tempG = current.g + 1;
                var newPath = false;

                if (openSet2.includes(element)) {
                    if (tempG < element.g) {
                        element.g = tempG;
                        newPath = true;

                    }
                } else {
                    element.g = tempG;
                    newPath = true;
                    openSet2.push(element);
                    openSetD2.push(divGrid[element.i][element.j]);

                }

                if (newPath) {

                    element.h = dist(element, endSpot);
                    element.f = element.g + element.h;
                    element.previous = current;
                    //console.log(element);
                }

            }

        }

    }
    closedSetD.shift();

    for (let i = 0; i < closedSetD.length; i++) {
        renderDiv(closedSetD[i], 'block closedSet', delay_time);
    }
    for (let i = 0; i < closedSetD2.length; i++) {
        renderDiv(closedSetD2[i], 'block closedSet', delay_time);
    } for (let i = 0; i < divPath.length; i++) {
        renderDiv(divPath[i], 'block pathDiv', delay_time);
    }
    // for (let i = 0; i < divPath.length; i++) {
    //     renderDiv(divPath[i], 'block pathDiv', delay_time);
    // }


    finishAlgoS = true;
    startSpot.previous = undefined;

}
// let freezeClic = false; // just modify that variable to disable all clics events


/**function recursiveBacktracker(grid, s, choices){
  if(s.length){
    let batch = s[s.length - 1];
    let frontier = batch[1];
    let inBetween = batch[0];
    frontier.isWall = false;
    frontier.divReference.classList.remove("node-wall");
    frontier.divReference.classList.add("node-passage");
    inBetween.isWall = false;
    inBetween.divReference.classList.remove("node-wall");
    inBetween.divReference.classList.add("node-passage");
    neighbours = computeFrontierCellsRBT(grid,frontier,choices);
    if(neighbours.length){
      rnd = Math.floor(Math.random () * neighbours.length);
      s.push(neighbours[rnd]);
    }else{
      s.pop();
    }
    setTimeout(recursiveBacktracker,0,grid,s,choices);
  }else{
    chooseRndStartEnd();
    document.querySelector("#clear").disabled = false;
    document.querySelector("#size-slider").disabled = false;
  document.querySelector("#path-finding-grp-btn").disabled = false;
  document.querySelector("#maze-generation-grp-btn").disabled = false;
  }
}
 */

/**function computeFrontierCellsRBT(grid, cell,choices){
  let neighbours = [];
  for(let i = 0 ; i < choices.length ; ++i){
    let row = cell.row + choices[i][0];
    let col = cell.col + choices[i][1];
    if(grid[row] && grid[row][col] && grid[row][col].isWall){
        let frontier = grid[row][col];
        let inBetween = null;
        if(choices[i][0] === -2){
          inBetween = grid[cell.row-1][cell.col];
        }else if(choices[i][0] === 2){
          inBetween = grid[cell.row+1][cell.col];
        }else if(choices[i][1] === -2){
          inBetween = grid[cell.row][cell.col - 1];
        }else if(choices[i][1] === 2){
          inBetween = grid[cell.row][cell.col + 1];
        }
        neighbours.push([inBetween, frontier]);
    }
  }
  return neighbours;
} */
//test
function GreedyBfs(grid, divGrid, startSpot, endSpot, startDiv, endDiv) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            grid.f = maxNumber;

        }

    }
    // clearAlgo(grid, divGrid, startSpot, startDiv, endDiv);
    //startSpot.isVisited = true;
    startSpot.g = 0;
    openSet.push(startSpot);
    openSetD.push(startDiv);
    while (openSet.length > 0) {
        var lowestF = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f <= openSet[lowestF].f) {
                lowestF = i;
            }
        }
        var cur = openSet[lowestF];
        let curDiv = openSetD[lowestF];
        remove(openSet, cur);
        remove(openSetD, curDiv);
        //console.log(curDiv);
        if (cur == endSpot) {
            path = [];
            divPath = [];
            var tempCur = cur;
            var tempCurDiv = curDiv;
            path.push(tempCur);
            divPath.push(tempCurDiv);
            while (tempCur.previous) {
                path.push(tempCur.previous);
                divPath.push(divGrid[tempCur.previous.i][tempCur.previous.j]);
                tempCur = tempCur.previous;
            }

            divPath.shift();
            divPath.pop();
            divPath.reverse();
            break;
        } else {
            cur.isVisited = true;
            colsedSet.push(cur);
            closedSetD.push(curDiv);
            var neighbours = cur.neighbors;
            for (let i = 0; i < neighbours.length; i++) {
                var neighbour = neighbours[i];
                let tempG = neighbour.g + 1;
                if (!openSet.includes(neighbour)) {
                    openSet.unshift(neighbour);
                    openSetD.push(divGrid[neighbour.i][neighbour.j]);
                    neighbour.g = tempG;
                    neighbour.f = dist(neighbour, endSpot);
                    neighbour.previous = cur;
                } else if (tempG < neighbour.g) {
                    neighbour.g = tempG;
                    neighbour.f = dist(neighbour, endSpot);
                    neighbour.previous = cur;
                }

                // if (!neighbour.wall) {
                //     if (!neighbour.isVisited) {
                //         neighbour.isVisited = true;
                //         neighbour.previous = cur;
                //         openSet.push(neighbour);
                //         openSetD.push(divGrid[neighbour.i][neighbour.j]);
                //     }
                // }
            }
        }
        // colsedSet.shift();
        // closedSetD.shift();
        for (let i = 0; i < closedSetD.length; i++) {
            //if (closedSetD[i].className == 'block start') {
            //console.log("test");
            renderDiv(closedSetD[i], 'block closedSet', delay_time);

        }
        for (let i = 0; i < divPath.length; i++) {
            renderDiv(divPath[i], 'block pathDiv', delay_time);
        }
    }
}
//test
// /GreedyBfs(grid,divGrid,startSpot,endSpot,startDiv,endDiv);