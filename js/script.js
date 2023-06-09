window.addEventListener('DOMContentLoaded', function () {
    //Табы и фильтрация
    const list = document.querySelector('.list'),
        items = document.querySelectorAll('.event')
        listItems = document.querySelectorAll('.list_item')
    function filter() {
        list.addEventListener('click', event => {
            const targetId = event.target.dataset.id
            const target = event.target
            if (target.classList.contains('list_item')) {
                listItems.forEach(listItem => listItem.classList.remove('active'))
                target.classList.add('active')
            }
            console.log(targetId)
            switch(targetId) {
                case 'all':
                    getItems('event')
                    break
                case 'soon':
                    getItems(targetId)
                    break
                case 'nearest':
                    getItems(targetId)
                    break
            }
        })
    }
    filter()
    function getItems(className) {
        items.forEach(item => {
            if (item.classList.contains(className)) {
                item.style.display = 'block'
            }
            else {
                item.style.display = 'none'
            }
        })
    }

    //Слайдер
    let slideIndex = 1,
        slides = document.querySelectorAll('.sliderNew-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.sliderNew-dots'),
        dots = document.querySelectorAll('.dot');
        showSlides(slideIndex);
    function showSlides (n) {
        // дополнительно делаем проверку чтобы индекс не вышел за пределы
        if (n > slides.length) {
            // Возвращаемся к первому слайду
            slideIndex = 1;
        }
        if (n < 1) {
            // Возвращаемся к последнему слайду
            slideIndex = slides.length;
        }
        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');  
    }
    function plusSlides(n) {
        showSlides(slideIndex += n); 
    }
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    prev.addEventListener('click', function() {
        plusSlides(-1);
    });
    next.addEventListener('click', function() {
        plusSlides(1);
    });
    //Создаем событие клика на родителя, используя делегирование событий
    dotsWrap.addEventListener('click', function(event) {
        // перебираем все dot и узнаем на какую именно кликнули
        for (let i = 0; i < dots.length + 1; i++) {
            // проверяем элемент на соответствие и узнаем номер точки
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });

    //Модальное окно 1
    const modal = document.getElementById("modal");
	const btn = document.getElementById("open-modal__btn");
	const closeBtn = document.querySelector(".modal__close");
	btn.addEventListener("click", function () {
		modal.classList.add("modal_active");
		closeBtn.addEventListener("click", closeModal);
		function closeModal() {
			modal.classList.remove("modal_active");

			closeBtn.removeEventListener("click", closeModal);

			modal.removeEventListener("click", hideModal);
		}
		modal.addEventListener("click", hideModal);
		//Закрытие при клике вне зоны модального окна
		function hideModal(event) {
			if (event.target === modal) {
				closeModal();
			}
		}
	});

    //Модальное окно 2
    const modal1 = document.getElementById("modal1");
	const btn1 = document.getElementById("open-modal__btn1");
	const closeBtn1 = document.querySelector(".modal__close1");
	btn1.addEventListener("click", function () {
		modal1.classList.add("modal_active1");
		closeBtn1.addEventListener("click", closeModal);
		function closeModal() {
			modal1.classList.remove("modal_active1");

			closeBtn1.removeEventListener("click", closeModal);

			modal1.removeEventListener("click", hideModal);
		}
		modal1.addEventListener("click", hideModal);
		//Закрытие при клике вне зоны модального окна
		function hideModal(event) {
			if (event.target === modal1) {
				closeModal();
			}
		}
	});

    //Аккордеон
    const accordion = () => {
		const btns = document.querySelectorAll(".accordion-head");
		btns.forEach((btn) => {
			btn.addEventListener("click", function () {
				this.classList.toggle("active-style");
				//Следующий элемент
				this.nextElementSibling.classList.toggle("active-content");
				if (this.classList.contains("active-style")) {
					this.nextElementSibling.style.maxHeight =
						this.nextElementSibling.scrollHeight + 50 + "px";
				} else {
					this.nextElementSibling.style.maxHeight = "0px";
				}
			});
		});
    };
	accordion();

    //Бургер меню
    const hamb = document.querySelector("#hamb");
	const popup = document.querySelector("#popup");
    const body = document.body;
	// Глубокое клонирование со всем содержимым
	const menu = document.querySelector("#menu").cloneNode(1);
	hamb.addEventListener("click", hambHandler);
	function hambHandler(e) {
		popup.classList.toggle('open');
		hamb.classList.toggle('active');
		body.classList.toggle('noscroll'); 
        renderPopup();
	}
	function renderPopup() {
		popup.appendChild(menu);
	}
});