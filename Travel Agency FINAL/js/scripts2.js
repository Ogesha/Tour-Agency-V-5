// scripts2.js
$(document).ready(function() {
    // Модальное окно для галереи изображений
    function openModal(element) {
        var modal = document.getElementById("modal");
        var modalImg = document.getElementById("modal-image");
        var captionText = document.getElementById("caption");

        modal.style.display = "block";
        modalImg.src = element.src;
        captionText.innerHTML = element.alt;
        showNotification("Вы открыли изображение: " + element.alt);
    }

    function closeModal() {
        var modal = document.getElementById("modal");
        modal.style.display = "none";
    }

    // Всплывающие уведомления
    function showNotification(message) {
        var container = document.getElementById("notification-container");
        var notification = document.createElement("div");
        notification.className = "notification";
        notification.innerHTML = message + '<span class="close" onclick="closeNotification(this)">&times;</span>';

        container.appendChild(notification);

        setTimeout(function() {
            if (container.contains(notification)) {
                container.removeChild(notification);
            }
        }, 4000);
    }

    window.closeNotification = function(element) {
        var notification = element.parentElement;
        notification.parentElement.removeChild(notification);
    };

    // Модальное окно для FAQ
    function showPopup() {
        $('#popup').show();
    }

    function closePopup() {
        $('#popup').hide();
    }

    // Пример использования уведомлений
    showNotification("Добро пожаловать в галерею!");

    // Привязка событий к кнопкам и элементам
    $('.gallery-item').on('click', function() {
        openModal(this);
    });

    $('.close').on('click', function() {
        closeModal();
        closePopup();
    });

    $('#faq-button').on('click', function() {
        showPopup();
    });

    // Закрытие модального окна при нажатии вне его
    $(window).on('click', function(event) {
        if (event.target.id === 'modal') {
            closeModal();
        }
        if (event.target.id === 'popup') {
            closePopup();
        }
    });
});
