// scripts.js
$(document).ready(function() {
    // Функция для загрузки комментариев с сервера
    function loadComments() {
        $.ajax({
            url: 'http://jsonplaceholder.typicode.com/comments',
            method: 'GET',
            success: function(data) {
                $('#comments').empty();
                data.slice(0, 10).forEach(function(comment) { // Загрузим только 10 комментариев для примера
                    $('#comments').append(
                        `<div class="comment" data-id="${comment.id}">
                            <p class="comment-name">${comment.name}</p>
                            <p class="comment-body">${comment.body}</p>
                            <button onclick="deleteComment(${comment.id})">Удалить</button>
                        </div>`
                    );
                });
            }
        });
    }

    // Функция для добавления нового комментария
    $('#comment-form').on('submit', function(event) {
        event.preventDefault();
        const name = $('#comment-name').val();
        const body = $('#comment-body').val();

        $.ajax({
            url: 'http://jsonplaceholder.typicode.com/comments',
            method: 'POST',
            data: JSON.stringify({
                name: name,
                body: body
            }),
            contentType: 'application/json; charset=UTF-8',
            success: function(data) {
                $('#comments').append(
                    `<div class="comment" data-id="${data.id}">
                        <p class="comment-name">${data.name}</p>
                        <p class="comment-body">${data.body}</p>
                        <button onclick="deleteComment(${data.id})">Удалить</button>
                    </div>`
                );
                $('#comment-name').val('');
                $('#comment-body').val('');
            }
        });
    });

    // Функция для удаления комментария
    window.deleteComment = function(id) {
        $.ajax({
            url: `http://jsonplaceholder.typicode.com/comments/${id}`,
            method: 'DELETE',
            success: function() {
                $(`.comment[data-id=${id}]`).remove();
            }
        });
    }

    // Загрузить комментарии при загрузке страницы
    loadComments();
});
