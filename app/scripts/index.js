(async function () {
    'use strict';

    require('./global-error-handler');

    const { SimpleDataTable } = require('simple-data-table');

    const $area = document.querySelector('#area');
    const d = new SimpleDataTable($area);
    d.load(BLOCKS);
    d.render();

    const $query = document.querySelector('#query');
    const ENTER_KEY_CODE = 13;

    $query.focus();

    function isEnterKey(evt) {
        return evt.keyCode === ENTER_KEY_CODE;
    }

    function highlightRowsWidth(query) {
        d.clearHighlightedCells();

        new Array(d.getRowsCount())
            .fill(null)
            .forEach((undefined, rowIndex) => {
                d.setInputCellContent(rowIndex, 10, '');
            })

        d.$el.querySelectorAll('.super-highlighted-cell').forEach(($super) => {
            $super.classList.remove('super-highlighted-cell');
        });

        const numbers = query.split(',').map(Number);
        const cellIndexes = d.findCellsByContent(...numbers.map(String));

        cellIndexes.forEach(({ rowIndex, cellIndex }) => {
            d.highlightCell(rowIndex, cellIndex);
        });

        const results = cellIndexes.reduce((mem, i) => {
            if (mem[i.rowIndex] === undefined) {
                mem[i.rowIndex] = 0;
            }
            mem[i.rowIndex]++
            return mem;
        }, {});

        Object.keys(results).forEach((rowIndex) => {
            d.setInputCellContent(rowIndex, 10, results[rowIndex]);
        });

        const biggest = Object.keys(results)
            .map((resultsIndex) => {
                return {
                    rowIndex: resultsIndex,
                    value: results[resultsIndex]
                }
            })
            .sort((c1, c2) => {
                if (c1.value < c2.value) {
                    return 1;
                } else if (c1.value > c2.value) {
                    return -1;
                } else {
                    return 0;
                }
            })
            .filter((item, index, list) => {
                return item.value === list[0].value;
            });

        biggest.forEach((item) => {
            const $biggestCells = d.getCell(item.rowIndex, 10);
            $biggestCells.classList.add('super-highlighted-cell');
        });
    }

    $query.addEventListener('keydown', (evt) => {
        if (!isEnterKey(evt)) {
            return;
        }

        const query = $query.value;

        highlightRowsWidth(query);
    });
})();