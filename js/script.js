window.addEventListener('DOMContentLoaded', () => {

//Создание Tab
const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'), //картинки
      tabsParent = document.querySelector('.tabheader__items');


function hideTabContent() { //фця которая скрывает контент наших Табов, т.е в начале все скрыто
    tabsContent.forEach(item => {
        item.classList.add('hide'); //добавляем класс скрыть у картинок
        item.classList.remove('show', 'fade');//удаляем класс Показать и класс Анимации у Картинок
        //item.style.display = 'none'; //можно использовать не Классы а display
    });

    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active'); //удаляем класс Активности у названий
    });
}

    function showTabContent(i = 0) { //фця которая добавляет класс Активности у Табов для первого Элемента, первоначальное значение
        tabsContent[i].classList.add('show', 'fade'); //добавление класса Показать и класса Анимации у картинок для ПЕРВОГО элемента
        tabsContent[i].classList.remove('hide');
        //tabsContent[i].style.display = 'block'; //можно использовать не Классы а display
        tabs[i].classList.add('tabheader__item_active');//добавляем класс активности у названий
    }

    hideTabContent();
    showTabContent(); //добавляе класс активности для первого элемента


    tabsParent.addEventListener('click', (event) => { //используем Делигирование событий и назначаем обработчик события клика
        const target = event.target; // вызов event.target заменяем переменной

        if (target && target.classList.contains('tabheader__item')) { //Проверяем в какой таб кликнул пользователь, чтобы скрыть другие
            tabs.forEach((item, i) => {
                if (target == item) { //если тот елемент в который кликнули равен перебираемому элементу
                    hideTabContent(); //скрыть все табы
                    showTabContent(i); //сделать активным только i-тый, на который кликнули
                }
            });
        }
    });

    //Создание Таймера

    const deadline = '2020-12-31';

    function getTimeRemaining(endtime) { //разница между планируемым временем и текущим
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24 )),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) { // добавляет 0 к цифрам например-  09 минут
        if (num >=0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000); //обновление таймера каждую секунду 
        
        updateClock(); //Запускаем чтобы при обновлении станицы таймер не мигал

        function updateClock() {
            const t = getTimeRemaining(endtime); //разница между планируемым временем и текущим

            //заполнение ячеек на странице с учетом добавления 0 - например 09минут
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) { //остановка таймера (не обновляем) если всремя вышло < 0
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);


   //Создание Модального окна

   const modalTrigger = document.querySelectorAll('[data-modal]'),
         modal = document.querySelector('.modal');
        //  modalCloseBtn = document.querySelector('[data-close]');

        modalTrigger.forEach(btn => { //при нажатии на кнопки Связаться открываем модальное
        btn.addEventListener('click', openModal);
    });

    function closeModal() { //закрытие модальных окон
        modal.classList.add('hide');
        modal.classList.remove('show');
        //modal.classList.toggle('show')
        document.body.style.overflow = ''; //восстанавливаем прокрутку сайта при открытом модальном окне
    }    

  function openModal() { //открытие модальных окон
        modal.classList.add('show');
        modal.classList.remove('hide');
        //modal.style.display = 'block';
        //modal.classList.toggle('show')
        document.body.style.overflow = 'hidden'; //блокируем прокрутку сайта при открытом модальном окне
        clearInterval(modalTimerID); //если окно уже было открыто, то сброить интервал чтобы окно не открывалось автоматически
    }
 
    // modalCloseBtn.addEventListener('click', closeModal); //закрытие при нажатии на крестик, вызываем функцию

    modal.addEventListener('click', (event) => { //закрытие модального окна при нажатии на облать в него его
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { //если нажимаем ESC и открыто модальное окно, то Закрыть модальное окно
            closeModal();
        }
    });

    const modalTimerID = setTimeout(openModal, 5000); //для автоматического открыти



    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) { //пользовательский котент + прокрученный контент = полный контент
            openModal();
            window.removeEventListener('scroll', showModalByScroll); //после первого открытия модального окна больше не будет появляться при прокрутке
        }       
    }

    window.addEventListener('scroll', showModalByScroll); //если страницу прокрутили до конца то открываем модальное окно


    //Используем Классы для карточек товаров

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) { //параметры с Rest оператором
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes; //массив возможных будущих свойств
            this.parent = document.querySelector(parentSelector); //ДОМ элемент для вставки в него блока
            this.transfer = 4; //курс валюты
            this.changeToPl(); //метод конвертации вызываем в конструкторе
        }

        changeToPl() { //метод конвертации валюты 
            this.price = this.price * this.transfer;
        }

        render() { //метод верстки
            const element = document.createElement('div'); //добавляем див на страницу
           
            if (this.classes.length === 0) { //если класс небыл задан, то используем дефолтный класс 
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));//проходим по всем классам и подсоединяем их к элементу
            }
            
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> зл/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    // const div = new MenuCard(записываем необходимые параметры); ещё можно использовать такой синтаксис для вызова Рендер
    // div.render();

    const getResource = async (url) => { //для обращения к базе данных чтобы заполнить карточки
        const res = await fetch(url);

        if (!res.ok) { //учитываем ошибки при запросе так как fetch не реагирует на ошибки
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    //Вариант 1. Cоздание карточек из БД с помощью классов-шаблонов
    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    
    //Вариант 1.1 Cоздание карточек из БД с библиотеки axios
    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => { 
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    //Вариант 2. Cоздание карточек из БД через верстку блока див 
    // getResource('http://localhost:3000/menu')
    // .then(data => createCard(data));
    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //         <img src=${img} alt=${altimg}>
    //         <h3 class="menu__item-subtitle">${title}</h3>
    //         <div class="menu__item-descr">${descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${price}</span> зл/день</div>
    //         </div>            
    //         `;
    //     document.querySelector('.menu .container').append(element);
    //     });
    // }

    
    //Заполнение форм передача серверу

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => { //настройка запроса для передачи серверу асинхронно
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };

    function bindPostData(form) { // Постинг данных привязка
        form.addEventListener('submit', (e) => { // событие отправки
            e.preventDefault(); // отменяем стандартное действие браузера

            const statusMessage = document.createElement('img'); //создаем изображение при загрузке
            statusMessage.src = message.loading; //подставляем путь к картинке
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            //form.append(statusMessage); //вставка спинера в конец
            form.insertAdjacentElement('afterend', statusMessage); //вставка спинера другим методом
            
            //устаревший метод XMLHttpRequest() меняем на Fetch
            // const request = new XMLHttpRequest(); 
            // request.open('POST', 'server.php');


            //request.setRequestHeader('Content-type', 'application/json'); //устаревший метод меняем на Fetch !!! для XMLHttpRequest+formData заголовки устанавливать не нужно
            const formData = new FormData(form);

            //Заменяем новой записью:
            const json = JSON.stringify(Object.fromEntries(formData.entries())); //конвертация в JSON
            // const object = {}; //создаем объект для конвертации в JSON данные
            // formData.forEach(function(value, key) {
            //     object[key] = value;
            // });

            postData('http://localhost:3000/requests', json)
            .then(data => {
                    console.log(data); 
                    showThanksModal(message.success);//выводим модальное окно с успехом
                    form.reset();
                    statusMessage.remove();                
            }).catch(() => {
                showThanksModal(message.failure); //модальное окно с ошибкой
            }).finally(() => {
                form.reset();
            });

            //устаревший метод XMLHttpRequest() меняем на Fetch
            // request.addEventListener('load', () => { //устаревший метод меняем на Fetch!!!
            //     if (request.status === 200) { //если састус успешен
            //         console.log(request.response); 
            //         showThanksModal(message.success);//выводим модальное окно с успехом
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure); //модальное окно с ошибкой
            //     }
            // });
        });
    }

    //Работа с модальными окнами 

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide'); //скрываем модальное окно
        openModal(); //открытие модального окна

        const thanksModal = document.createElement('div'); //создаем блок вставки
        thanksModal.classList.add('modal__dialog'); //добавляем стиль
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal); //Добавление созданного блока на страницу
        setTimeout(() => {
            thanksModal.remove(); //удаление блока
            prevModalDialog.classList.add('show'); //снова показываем форму для отправки
            prevModalDialog.classList.remove('hide');
            closeModal();
        },4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));


    //Слайдеры

    let slideIndex = 1;
  
    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current');

    showSlides(slideIndex); //инициализируем, устанавливаем первоначальное значение

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(item => item.style.display = 'none');

        slides[slideIndex - 1].style.display = 'block';

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function plusSlides(n) { //счетчик слайдов при прокрутке
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
    });

    next.addEventListener('click', () => {
        plusSlides(1);
    });

});