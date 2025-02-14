const input = document.getElementById('movie-input');
const button = document.getElementById('search-button');
const movieList = document.getElementById('movie-area');

button.addEventListener('click', async () => {
  const value = input.value;
  // https://www.omdbapi.com/?s=naruto&apikey=7d871d91

  try {
    const request = await fetch(
      `http://universities.hipolabs.com/search?country=${value}`
    );
    if (request.status != 200) {
      return;
    }
    const data = await request.json();

    if (data.Response === 'False') {
      alert(data.Error);
      return;
    }

    const dataMap = data.map((item) => {
      return `
      <div class="col mt-3">
      <div class="card border-dark mb-3" style="max-width: 18rem;">
        <div class="card-header" style="background-color: rgb(65, 89, 121);"
        >
          <div class="row">
              <div class="col">
                  <p class="card-text">${item['state-province']} -${item.country}</p>
              </div>
          </div>
        </div>
        <div class="card-body text-dark" style="background-color: rgb(215, 232, 253);">
          <h5 class="card-title">${item.name}</h5>
          <div class="row">
              <div class="col">
                  <p class="card-text">Web Page:</p>
              </div>
              <div class="col">
                  <p class="card-text">${item.web_pages[0]}</p>
              </div>
          </div>
        </div>
      </div>
</div>
      `;
    });

    movieList.innerHTML = dataMap.join('');

    console.log(data);
  } catch (error) {
    console.log(error);
  }
});
