/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

let navLoaded = false;
let domLoaded = false;

function tryInitIsotopeFilters() {
  if (navLoaded && domLoaded) {
    initIsotopeFilters();
  }
}

fetch('nav.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar').innerHTML = data;
    navLoaded = true;
    tryInitIsotopeFilters();
  });

document.addEventListener('DOMContentLoaded', () => {
  domLoaded = true;
  tryInitIsotopeFilters();
});

function initIsotopeFilters() {
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        if (initIsotope) {
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
        }
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });
}

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
// In your main.js or relevant script file
const glightbox = GLightbox({
  selector: '.glightbox' // This will now also target the main portfolio images
});

// Custom: Show GLightbox at bottom for portfolio images
// This existing code should work as long as the main image has .glightbox class
document.querySelectorAll('.portfolio .glightbox').forEach(link => {
    link.addEventListener('click', function() {
        document.body.classList.add('glightbox-bottom');
    });
});
// Remove the class when GLightbox closes
glightbox.on('close', () => {
    document.body.classList.remove('glightbox-bottom');
});


  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);



  // Portfolio Modal Gallery Functionality
  let currentImageIndex = 0;
  let currentImages = [];

  // Portfolio data with image galleries
  const portfolioGalleries = {
    'portfolio-1': {
      title: 'CAPSTONE PROJECT: HydroSense',
      subtitle: 'Water Quality Monitoring System',
      description: 'A comprehensive IoT solution for real-time water quality monitoring using Arduino and ESP32. Features include pH, temperature, TDS, and turbidity sensors with web-based dashboard and data collection. Awarded 3rd in University Research Expo - Oral Presentation 2025',
      images: [
        'assets/img/portfolio/HS3.jpg',
        'assets/img/portfolio/HS1.jpg',
        'assets/img/portfolio/HS2.jpg',
        'assets/img/portfolio/HS4.jpg',
        'assets/img/portfolio/HS5.jpg',
        'assets/img/portfolio/HS6.jpg',
        'assets/img/portfolio/HS7.jpg'
      ]
    },
    'portfolio-2': {
      title: 'Home of Hope Arduino Workshop',
      subtitle: 'Workshop: Arduino Projects',
      description: 'hands-on Arduino workshops for teens at Home of Hope, teaching basic electronics, programming, and IoT concepts through interactive projects.',
      images: [
        'assets/img/portfolio/HOH3.jpg',
        'assets/img/portfolio/HOH1.jpg',
        'assets/img/portfolio/HOH2.jpg'
      ]
    },
    'portfolio-3': {
      title: 'Ysabelle\'s Bridal Shop',
      subtitle: 'E-commerce Platform',
      description: 'Developed a full-stack e-commerce solution for managing 30,000+ rental items across 5 branches im Visayas. Features include inventory management (RFID), booking system, and multi-branch synchronization.',
      images: [
        'assets/img/portfolio/YSA12.png',
        'assets/img/portfolio/YSA9.JPG',
        'assets/img/portfolio/YSA10.png',
        'assets/img/portfolio/YSA11.png',
        'assets/img/portfolio/YSA12.png',
        'assets/img/portfolio/YSA13.png',
        'assets/img/portfolio/YSA14.png',
        'assets/img/portfolio/YSA15.png',

        'assets/img/portfolio/YSA1.jpg',
        'assets/img/portfolio/YSA2.jpg',
        'assets/img/portfolio/YSA3.jpg',
        'assets/img/portfolio/YSA4.jpg',
        'assets/img/portfolio/YSA5.jpg',
        'assets/img/portfolio/YSA6.jpg',
        'assets/img/portfolio/YSA7.jpg',
        'assets/img/portfolio/YSA8.jpg'
      ]
    },
    'portfolio-4': {
      title: 'Home of Hope Web App',
      subtitle: 'Web Application Workshop',
      description: 'Taught web development fundamentals to Teens in Home of Hope, covering HTML, CSS, JavaScript, and basic web application architecture through practical projects.',
      images: [
        'assets/img/portfolio/2HOH2.jpg',
        'assets/img/portfolio/2HOH1.jpg',
        'assets/img/portfolio/2HOH3.jpg',
        'assets/img/portfolio/2HOH4.jpg'
      ]
    },
    'portfolio-5': {
      title: 'AMEBO',
      subtitle: 'Medicine Dispenser Automation',
      description: 'Automated medicine dispensing system for elders with SMS notifications water dispensing, scheduled dispensing, and alerts.',
      images: [
        'assets/img/portfolio/aMEB1.jpg',
        'assets/img/portfolio/aMEB2.jpg',
        'assets/img/portfolio/aMEB3.jpg',
        'assets/img/portfolio/aMEB4.jpg',
        'assets/img/portfolio/aMEB5.jpg',
        'assets/img/portfolio/aMEB6.jpg',
        'assets/img/portfolio/aMEB7.jpg'
      ]
    },
    'portfolio-6': {
      title: ' IoT Project:',
      subtitle: 'ATmega2560-based IoT Project',
      description: 'Custom IoT solution using ATmega2560 microcontroller. Includes sensor integration, data logging, and remote monitoring capabilities.',
      images: [
        'assets/img/portfolio/andrey3.jpg',
        'assets/img/portfolio/andrey1.jpg',
        'assets/img/portfolio/andrey2.jpg',
        'assets/img/portfolio/andrey4.jpg',
        'assets/img/portfolio/andrey5.jpg'
      ]
    },
    'portfolio-7': {
      title: 'IoT Project',
      subtitle: 'ESP32 Air Quality Monitoring',
      description: 'ESP32-based air quality monitoring system with automatic filtering. Monitors PM2.5, CO2, temperature, and humidity with real-time alerts and data visualization.',
      images: [
        'assets/img/portfolio/1Client1.jpg',
        'assets/img/portfolio/1Client2.jpg',
        'assets/img/portfolio/1Client3.jpg',
        'assets/img/portfolio/1Client4.jpg'
      ]
    },
    'portfolio-8': {
      title: 'IoT Project',
      subtitle: 'Voice Activated Power Outlet',
      description: 'Smart power outlet with voice control capabilities using speech recognition. Enables hands-free control of electrical devices with safety features and scheduling.',
      images: [
        'assets/img/portfolio/2Client1.jpg',
        'assets/img/portfolio/2Client2.jpg'
      ]
    },
    'portfolio-9': {
      title: 'Client IoT Project',
      subtitle: 'Raspberry Pi Air Quality Monitoring',
      description: 'Raspberry Pi-based environmental monitoring system with advanced filtering. Provides detailed air quality analysis and automated air purification control.',
      images: [
        'assets/img/portfolio/3client1.jpg',
        'assets/img/portfolio/3client2.jpg'
      ]
    },
    'portfolio-10': {
      title: 'Web-Controlled RC Car',
      subtitle: 'ESP32 Web-Controlled RC Car with Air Quality Monitoring',
      description: 'College Project: Innovative RC car with web-based control interface, camera, and integrated environmental sensors. Combines robotics with IoT for mobile air quality monitoring.',
      images: [
        'assets/img/portfolio/mecha1.jpg',
        'assets/img/portfolio/mecha2.jpg',
        'assets/img/portfolio/mecha3.jpg'
      ]
    },
    'portfolio-11': {
      title: 'Project Pizza',
      subtitle: 'Pizza Ordering System and Inventory Management',
      description: 'Complete restaurant management system with online ordering, inventory tracking, and point-of-sale integration. Streamlines operations for pizza business.',
      images: [
        'assets/img/portfolio/Project4.jpg',
        'assets/img/portfolio/Project1.jpg',
        'assets/img/portfolio/Project2.jpg',
        'assets/img/portfolio/Project3.jpg',
        'assets/img/portfolio/Project5.jpg'
      ]
    },
    'portfolio-12': {
      title: 'Jetson Orin Nano Case',
      subtitle: 'Custom 3D Printed Enclosure',
      description: '3D printed enclosure for NVIDIA Jetson Orin Nano development board. Features optimized cooling, mounting points, and professional finish for industrial applications.',
      images: [
        'assets/img/portfolio/christian3.jpg',
        'assets/img/portfolio/Christian1.jpg',
        'assets/img/portfolio/Christian2.jpg',
        'assets/img/portfolio/Christian4.jpg'
      ]
    },
    'portfolio-13': {
      title: 'Game Boy Micro Internal Case',
      subtitle: '3D Printed Custom Part',
      description: '3D printed internal case replacement for Game Boy Micro. Custom-designed to fit original specifications with improved durability and material quality.',
      images: [
        'assets/img/portfolio/bern1.jpg',
        'assets/img/portfolio/Bern2.jpg'
      ]
    },
    'portfolio-14': {
      title: 'Various 3D Models',
      subtitle: 'Collection of 3D Printed Models and Prototypes',
      description: 'Diverse collection of 3D printed prototypes, functional parts, and artistic models. Demonstrates expertise in 3D modeling, printing optimization, and rapid prototyping.',
      images: [
        'assets/img/portfolio/3d1.jpg',
        'assets/img/portfolio/3d2.jpg'
      ]
    },
    'portfolio-15': {
      title: 'Laptop/PC Repairs',
      subtitle: 'Repair & Maintenance Services',
      description: 'Computer repair and maintenance services. Specializing in hardware repairs, software troubleshooting, and system optimization for laptops and desktop computers.',
      images: [
        'assets/img/portfolio/Fix1.jpg',
        'assets/img/portfolio/Fix2.jpg',
        'assets/img/portfolio/Fix3.jpg',
        'assets/img/portfolio/Fix4.jpg',
        'assets/img/portfolio/Fix5.jpg',
        'assets/img/portfolio/fix6.jpg'
      ]
    }
  };

  function openPortfolioModal(portfolioId) {
    const portfolioData = portfolioGalleries[portfolioId];
    if (!portfolioData) return;

    currentImages = portfolioData.images;
    currentImageIndex = 0;

    // Set modal content
    document.getElementById('portfolio-modal-title').textContent = portfolioData.title;
    document.getElementById('portfolio-modal-subtitle').textContent = portfolioData.subtitle;
    document.getElementById('portfolio-modal-description').textContent = portfolioData.description;
    
    // Show first image
    updateMainImage();
    
    // Create thumbnails
    createThumbnails();
    
    // Show modal
    document.getElementById('portfolio-modal').style.display = 'block';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  function closePortfolioModal() {
    document.getElementById('portfolio-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  function updateMainImage() {
    const mainImage = document.getElementById('gallery-main-image');
    const counter = document.getElementById('gallery-counter');
    
    if (currentImages.length > 0) {
      // Add loading state
      mainImage.style.opacity = '0.5';
      
      mainImage.onload = function() {
        mainImage.style.opacity = '1';
      };
      
      mainImage.src = currentImages[currentImageIndex];
      mainImage.alt = `Image ${currentImageIndex + 1} of ${currentImages.length}`;
      
      // Update counter
      if (counter) {
        counter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
      }
    }
  }

  function createThumbnails() {
    const thumbnailsContainer = document.getElementById('gallery-thumbnails');
    thumbnailsContainer.innerHTML = '';

    currentImages.forEach((image, index) => {
      const thumbnail = document.createElement('div');
      thumbnail.className = 'gallery-thumbnail';
      if (index === currentImageIndex) {
        thumbnail.classList.add('active');
      }

      const img = document.createElement('img');
      img.src = image;
      img.alt = `Thumbnail ${index + 1}`;
      
      thumbnail.appendChild(img);
      thumbnail.addEventListener('click', () => {
        currentImageIndex = index;
        updateMainImage();
        updateThumbnailActive();
      });

      thumbnailsContainer.appendChild(thumbnail);
    });
  }

  function updateThumbnailActive() {
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    thumbnails.forEach((thumbnail, index) => {
      if (index === currentImageIndex) {
        thumbnail.classList.add('active');
      } else {
        thumbnail.classList.remove('active');
      }
    });
  }

  function changeImage(direction) {
    if (currentImages.length === 0) return;

    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
      currentImageIndex = currentImages.length - 1;
    } else if (currentImageIndex >= currentImages.length) {
      currentImageIndex = 0;
    }

    updateMainImage();
    updateThumbnailActive();
  }

  // Make changeImage function globally accessible
  window.changeImage = changeImage;

  // Event listeners for portfolio modal
  document.querySelector('.portfolio-modal-close').addEventListener('click', closePortfolioModal);
  
  document.getElementById('portfolio-modal').addEventListener('click', function(e) {
    if (e.target === this) {
      closePortfolioModal();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (document.getElementById('portfolio-modal').style.display === 'block') {
      if (e.key === 'Escape') {
        closePortfolioModal();
      } else if (e.key === 'ArrowLeft') {
        changeImage(-1);
      } else if (e.key === 'ArrowRight') {
        changeImage(1);
      }
    }
  });

  // Add click event to portfolio items
  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', function(e) {
      // Prevent click if user selects text or clicks a link inside
      if (e.target.tagName === 'A' || e.target.closest('a')) return;
      
      const portfolioId = this.getAttribute('data-id');
      if (portfolioId) {
        openPortfolioModal(portfolioId);
      }
    });
  });

})();