document.querySelector('.pesquisa-formulario').addEventListener('submit', function (e) {
    e.preventDefault();
    searchBooks();
});

function searchBooks() {
    var searchQuery = document.getElementById('campo-pesquisa').value;
    var apiKey = 'AIzaSyAvkiIv8uKC_n05_NqKahfTe0Swg5br6Ng'; 
    var apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=' + searchQuery + '&key=' + apiKey;

    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayResults(data);
        })
        .catch(function(error) {
            console.log('Erro ao buscar livros: ', error);
        });
}

function displayResults(data) {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (!data || !data.items || data.items.length === 0) {
        resultsDiv.innerHTML = 'Nenhum resultado encontrado.';
        return;
    }

    var books = data.items;

    for (var i = 0; i < books.length; i++) {
        var book = books[i].volumeInfo;
        var title = book.title;
        var authors = book.authors ? book.authors.join(', ') : 'Autor desconhecido';
        var description = book.description ? book.description : 'Descrição não disponível';
        var thumbnail = book.imageLinks ? book.imageLinks.thumbnail : '';

        var bookElement = document.createElement('div');
        bookElement.className = 'book-box';
        bookElement.innerHTML = `
            <img class="book-cover" src="${thumbnail}" alt="${title} capa">
            <h2 class="book-title">${title}</h2>
            <div class="book-details">
                <p class="book-authors">Autor(es): ${authors}</p>
                <p class="book-description">${description}</p>
                <i class="book-icon fas fa-info-circle"></i>
            </div>
        `;

        resultsDiv.appendChild(bookElement);
    }

    var bookIcons = document.querySelectorAll('.book-icon');
    bookIcons.forEach(function (icon, index) {
        icon.addEventListener('click', function () {
            var selectedBook = books[index];
            var popup = createPopup(selectedBook.volumeInfo);
            document.body.appendChild(popup);
        });
    });
}

function createPopup(book) {
    var popupContainer = document.createElement('div');
    popupContainer.className = 'popup-container';

    var popupContent = document.createElement('div');
    popupContent.className = 'popup-content';

    var popupClose = document.createElement('span');
    popupClose.className = 'popup-close fas fa-times';
    popupClose.addEventListener('click', function () {
        document.body.removeChild(popupContainer);
    });

    var popupImg = document.createElement('img');
    popupImg.className = 'popup-img';
    popupImg.src = book.imageLinks.thumbnail;
    popupImg.alt = book.title;

    var popupTitle = document.createElement('h2');
    popupTitle.textContent = book.title;

    var popupAuthors = document.createElement('p');
    popupAuthors.textContent = 'Autor(es): ' + (book.authors ? book.authors.join(', ') : 'Autor desconhecido');

    var popupDescription = document.createElement('p');
    popupDescription.textContent = book.description ? book.description : 'Descrição não disponível';

    popupContent.appendChild(popupClose);
    popupContent.appendChild(popupImg);
    popupContent.appendChild(popupTitle);
    popupContent.appendChild(popupAuthors);
    popupContent.appendChild(popupDescription);

    popupContainer.appendChild(popupContent);

    return popupContainer;
}