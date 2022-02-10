export function renderStatic() {
  let statisticGame1 = document.createElement('div');
  statisticGame1.classList.add('statistic-game1');

  const unswers = document.createElement('div');
  unswers.classList.add('table-game1');
  unswers.innerHTML = `
    <div class="results"><h2>Results</h2>
      <table class='statistics-game1'>
        <tbody>
          <tr>
            <td>1</td>
            <td>Vois btn</td>
            <td>Word</td>
            <td>transkription</td>
            <td>translate</td>
            <td>Correct/uncorrect</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Vois btn</td>
            <td>Word</td>
            <td>transkription</td>
            <td>translate</td>
            <td>Correct/uncorrect</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Vois btn</td>
            <td>Word</td>
            <td>transkription</td>
            <td>translate</td>
            <td>Correct/uncorrect</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Vois btn</td>
            <td>Word</td>
            <td>transkription</td>
            <td>translate</td>
            <td>Correct/uncorrect</td>
          </tr>
        </tbody>
      </table>
    </div>`;
  statisticGame1.appendChild(unswers);
  return statisticGame1;
}
