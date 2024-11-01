document.addEventListener('DOMContentLoaded', function() {
    // Проверка страницы входа
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const errorMessage = document.getElementById('login-error');

            if (email && password) {
                // Отправка данных на сервер для проверки
                //console.log(token)
                fetch('http://127.0.0.1:8000/api/users/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    user:{
                        email: email,
                        password: password
                    }

                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        const token=data.user.token.split("'")[1]

                        localStorage.setItem('token',token);
                        window.location.href = '/';
                    } else {
                        errorMessage.textContent = 'Ошибка входа: ' + data.message;
                    }
                })
                .catch(error => {
                    errorMessage.textContent = 'Произошла ошибка: ' + error.message;
                });
            } else {
                errorMessage.textContent = 'Пожалуйста, заполните все поля.';
            }
        });
    }

    // Проверка страницы регистрации
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('registration-name').value;
            const email = document.getElementById('registration-email').value;
            const password = document.getElementById('registration-password').value;
            const errorMessage = document.getElementById('registration-error');
            const emailPattern = /^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(email)) {
                errorElement.textContent = "Пожалуйста, введите действительный адрес электронной почты.";
            }

            else if (password.length < 8) {
                errorElement.textContent = "Пароль должен быть не менее 8 символов.";
            }

            else if (name && email && password) {
                // Отправка данных на сервер
                fetch('http://127.0.0.1:8000/api/users/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    user:{
                        username: name,
                        email: email,
                        password: password
                    }
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.user) {
                        // Перенаправление на страницу входа после успешной регистрации

                        window.location.href = '/log';
                    } else {
                        errorMessage.textContent = 'Ошибка регистрации: ' + data.message;
                    }
                })
                .catch(error => {
                    errorMessage.textContent = 'Произошла ошибка: ' + error.message;
                });
            } else {
                errorMessage.textContent = 'Пожалуйста, заполните все поля.';
            }
        });
    }
});
