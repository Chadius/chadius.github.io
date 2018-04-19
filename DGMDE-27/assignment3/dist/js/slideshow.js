var slideshow = {
  slideIndex: 0,
  document_ready: function (){
    /* Trigger this when the document has finished loading. */

    // Next and previous buttons should be used to scroll through the pictures.
    $(".slideshow-prev").click(
      function(e) {
        slideshow.advanceSlides(-1);
        clearInterval(slideshow.nextSlideInterval);
      }
    );
    $(".slideshow-next").click(
      function(e) {
        slideshow.advanceSlides(1);
        clearInterval(slideshow.nextSlideInterval);
      }
    );

    // Move to the first slide
    slideshow.showSlides(slideshow.slideIndex);

    // Add an automated slider.
    slideshow.nextSlideInterval = setInterval(slideshow.nextSlide, 2000);
  },

  nextSlide: function() {
    // Advance to the next slide.
    slideshow.advanceSlides(1);
  },

  advanceSlides: function(number_of_slides_to_advance) {
    // Advance through the slideshow by these many slides.
    slideshow.showSlides(slideshow.slideIndex + number_of_slides_to_advance);
  },

  showSlides: function(slide_index_to_show) {
    // Show the slide with the given index.

    // Make sure the index is within the total number of slides.
    var total_slides = $(".slide").length;
    if (slide_index_to_show >= total_slides) {
      slide_index_to_show = 0;
    }
    else if (slide_index_to_show < 0) {
      slide_index_to_show = total_slides - 1;
    }

    // Hide all of the slides.
    $(".slide").each(function() {
      $(this).hide();
    });

    // Only reveal the selected slide.
    jquery_slide_index = slide_index_to_show + 1;
    $(".slide:nth-of-type("+jquery_slide_index+")").show();

    // Record the current slide.
    slideshow.slideIndex = slide_index_to_show;
  }
};
