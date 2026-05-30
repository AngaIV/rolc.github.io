//initialize swiper after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    slidesPerView: 1,
    loop: true,
    effect: 'slide',
    speed: 1000,
    
    //autoplay
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    //navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
  

  let lastScrollY = window.scrollY;
  const header = document.querySelector('.web_header');
  const back2top = document.querySelector('.back2top-btn');
  const notice_container = document.querySelector('.notice-container');

  back2top.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  const moreBtn = document.querySelector(".more_btn");
  const dropdownContent = document.querySelector(".navDropdown .dropdown-content");

  if (moreBtn) {
    moreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dropdownContent.classList.toggle("show");
    });
  }

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navDropdown")) {
      dropdownContent.classList.remove("show");
    }
  });

  window.addEventListener("scroll", () => {
    dropdownContent.classList.remove("show");
  });
});

