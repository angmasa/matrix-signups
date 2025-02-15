document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results-container');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        resultsContainer.innerHTML = '';

        if (query) {
            fetch('/path/to/knowledge-base-data.json')
                .then(response => response.json())
                .then(data => {
                    const results = data.filter(item => item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query));
                    displayResults(results);
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    });

    function displayResults(results) {
        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>No results found.</p>';
            return;
        }

        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `<h3>${result.title}</h3><p>${result.content}</p>`;
            resultsContainer.appendChild(resultItem);
        });
    }
});