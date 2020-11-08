window.addEventListener('DOMContentLoaded', () => {

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

});
