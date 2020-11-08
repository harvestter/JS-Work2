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
});