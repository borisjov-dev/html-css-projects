document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll('.star-rating .star');
  const ratingValue = document.getElementById('ratingValue');
  const starContainer = document.getElementById('starRating');
  const isLoggedIn = starContainer.getAttribute('data-logged-in') === 'true';

  let selectedRating = 0;

  function highlightStars(rating) {
    stars.forEach(star => {
      const val = Number(star.getAttribute('data-value'));
      star.classList.toggle('selected', val <= rating);
    });
  }

  stars.forEach(star => {
    star.addEventListener('mouseover', () => {
      const val = Number(star.getAttribute('data-value'));
      highlightStars(val);
    });

    star.addEventListener('mouseout', () => {
      highlightStars(selectedRating);
    });

    star.addEventListener('click', () => {
      const rating = Number(star.getAttribute('data-value'));

      if (!isLoggedIn) {
        Swal.fire({
          title: 'Login Required',
          text: 'You must log in to rate this project.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#aaa',
          confirmButtonText: 'Login',
          cancelButtonText: 'Cancel'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = 'login.php'; // change this to your login page
          }
        });
        return;
      }

      selectedRating = rating;
      ratingValue.textContent = rating;
      highlightStars(rating);

  
      fetch('submit-rating.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating: selectedRating })
      })
      .then(res => res.json())
      .then(data => {
        console.log('Rating submitted', data);
      });
      
    });
  });

  highlightStars(0);

    const aboutSection = document.querySelector(".section-about");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target); // Only animate once
            }
          });
        },
        {
          threshold: 0.1,
        }
      );

      observer.observe(aboutSection);
});
