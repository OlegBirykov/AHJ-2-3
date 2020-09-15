/* eslint no-nested-ternary: 0 */
export default class SortingTable {
  constructor(table, data) {
    this.table = table;
    this.data = JSON.parse(data);
    this.timerStep = -1;
  }

  init() {
    this.outputTable();
    setInterval(() => this.timer(), 2000);
  }

  outputTable() {
    this.table.innerHTML = `
      <tr>
        <td>id</td>
        <td>title</td>
        <td>year</td>
        <td>imdb</td>
      </td>
    `;

    if ((this.timerStep >= 0) && (this.timerStep <= 7)) {
      this.table
        .getElementsByTagName('td')[Math.trunc(this.timerStep / 2)]
        .textContent += this.timerStep % 2 ? '\u2191' : '\u2193';
    }

    this.data.forEach(({
      id, title, year, imdb,
    }) => {
      this.table.innerHTML += `
        <tr>
          <td>${id}</td>
          <td>${title}</td>
          <td>(${year})</td>
          <td>imdb: ${imdb.toFixed(2)}</td>
        </tr>
      `;
    });
  }

  sortTable() {
    this.data.sort((a, b) => {
      const {
        id: idA,
        title: titleA,
        year: yearA,
        imdb: imdbA,
      } = a;

      const {
        id: idB,
        title: titleB,
        year: yearB,
        imdb: imdbB,
      } = b;

      switch (this.timerStep) {
        case 0:
          return +idA - +idB;
        case 1:
          return +idB - +idA;
        case 2:
          return titleA > titleB ? 1
            : titleA < titleB ? -1 : 0;
        case 3:
          return titleB > titleA ? 1
            : titleB < titleA ? -1 : 0;
        case 4:
          return +yearA - +yearB;
        case 5:
          return +yearB - +yearA;
        case 6:
          return +imdbA - +imdbB;
        case 7:
          return +imdbB - +imdbA;
        default:
          return 0;
      }
    });
  }

  timer() {
    this.timerStep++;
    this.timerStep %= 8;
    this.sortTable();
    this.outputTable();
  }
}
