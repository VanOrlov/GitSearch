const html = document.querySelector('html')
const btnTheme = document.getElementById('btnTheme')
const input = document.getElementById('search')
const btnSearch = document.getElementById('btnSearch')
const alert = document.getElementById('alert')
const firstBlock = document.getElementById('first-block')
const avatar = document.getElementById('avatar')
const grid = document.getElementById('grid')
const avatarImg = document.getElementById('avatar-img')
const nickname = document.getElementById('nickname')
const registration = document.getElementById('registration')
const followers = document.getElementById('followers')
const repositories = document.getElementById('repositories')
const following = document.getElementById('following')
const loading = document.getElementById('loading')
const error = document.getElementById('error')

window.onload = function(){
    if (localStorage.getItem('theme')) {
        html.classList.add(localStorage.getItem('theme'))
    } else {
        html.classList.add('light')
    }
}

btnTheme.addEventListener('click', () => {
    if (html.classList.contains('light')) {
        localStorage.setItem('theme', 'dark')
        html.classList.remove('light')
        html.classList.add(localStorage.getItem('theme'))
    }else if(html.classList.contains('dark')){
        localStorage.setItem('theme', 'light')
        html.classList.remove('dark')
        html.classList.add(localStorage.getItem('theme'))
    }
})

btnSearch.addEventListener('click', () => {
    submitButton()
})

document.querySelector('body').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        // При нажатии "Enter" активируем кнопку
        submitButton()
    }
})

async function submitButton(){
    btnSearch.disabled = true
    error.classList.add('hidden')
    loading.classList.remove('hidden')
    let repos = null
    await fetch(`https://api.github.com/users/${input.value.trim()}/repos`)
        .then(res => res.json())
        .then(data => repos = data.length)
    await fetch(`https://api.github.com/users/${input.value.trim()}`)
        .then(response => {
            if (response.status === 200) {
                // Обработка успешного ответа (status 200)
                return response.json(); // Преобразование ответа в JSON
            } else {
                btnSearch.disabled = false
                firstBlock.classList.add('hidden')
                loading.classList.add('hidden')
                avatar.classList.add('hidden')
                grid.classList.add('hidden')
                error.classList.remove('hidden')
                alert.classList.add('top-5')
                alert.classList.remove('-top-full')
                setTimeout(() => {
                    alert.classList.remove('top-5')
                    alert.classList.add('-top-full')
                }, 2000);
                throw new Error()
            }
        })
        .then(data => {
            loading.classList.add('hidden')
            btnSearch.disabled = false
            nickname.innerText = data.login 
            avatarImg.src = data.avatar_url
            registration.textContent = date(data.created_at)
            nickname.href = data.html_url
            followers.textContent = data.followers
            repositories.textContent = repos
            following.textContent = data.following
            firstBlock.classList.add('hidden')
            avatar.classList.remove('hidden')
            grid.classList.remove('hidden')
            console.log(data);
            
        })
}

function date(date){
    // Создаем объект Date на основе строки
    const dateObject = new Date(date);

    // Получаем год, месяц и день из объекта Date
    const year = dateObject.getFullYear(); // Год
    const month = dateObject.getMonth() + 1; // Месяц (добавляем 1, так как месяцы в JavaScript нумеруются с 0)
    const day = dateObject.getDate(); // День

    // Формируем строку в нужном формате "ГГ:ММ:ДД"
    return `${year}.${month < 10 ? '0' + month : month}.${day < 10 ? '0' + day : day}`;
}

