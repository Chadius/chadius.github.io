var cs_framework_js = {
  slideshow_state: {},

  document_ready: function (){
    // Add event to click-to-reveal elements.
    $(".click-to-reveal").each(
      function (index) {
        // Get the sibling
        var sibling = $( this ).next();
        $( this ).click(
          function(e) {
            cs_framework_js.toggle_reveal_element(sibling);
          }
        )
      }
    );

    // Add event to slide shows.
    $(".slideshow-container").each(
      function(index) {
        cs_framework_js.setup_slideshow(index);
      }
    );
  },

  toggle_reveal_element: function(element_to_toggle) {
    /* Hides or reveals the element. */
    var is_hidden = element_to_toggle.attr("hidden");

    // If the element is hidden, reveal it now
    if (is_hidden) {
      element_to_toggle.attr("hidden", null);
    }
    else {
      // Otherwise hide it.
      element_to_toggle.attr("hidden", "hidden");
    }
  },

  setup_slideshow: function(slideshow_index) {
    /* Given a slideshow container, this will activate the buttons. */

    // Add this container to the state.
    cs_framework_js.slideshow_state[slideshow_index] = {
      'autoslide_interval': null,
      'current_slide_index': 0
    };

    // Tell the previous button to go one slide back.
    slideshow_container = $(".slideshow-container:eq(" + slideshow_index + ")");
    $(slideshow_container).children(".previous-slide").click(
      function(e) {
        cs_framework_js.advanceSlides(slideshow_index, -1);

        // Also stop the automatic process, if it's active.
        if (slideshow_index in cs_framework_js.slideshow_state
          && cs_framework_js.slideshow_state[slideshow_index]['autoslide_interval']) {
          clearInterval(cs_framework_js.slideshow_state[slideshow_index]['autoslide_interval']);
        }
      }
    );

    // Tell the next button to go one slide forward.
    $(slideshow_container).children(".next-slide").click(
      function(e) {
        cs_framework_js.advanceSlides(slideshow_index, 1);

        // Also stop the automatic process, if it's active.
        if (slideshow_index in cs_framework_js.slideshow_state
          && cs_framework_js.slideshow_state[slideshow_index]['autoslide_interval']) {
          clearInterval(cs_framework_js.slideshow_state[slideshow_index]['autoslide_interval']);
        }
      }
    );

    // Move to the first slide
    cs_framework_js.showSlides(
      slideshow_index,
      cs_framework_js.slideshow_state[slideshow_index]['current_slide_index']
    );

    // Add an automated slider if it's requested.
    if ($(slideshow_container).hasClass('automatic')) {
      cs_framework_js.slideshow_state[slideshow_index]['autoslide_interval'] = setInterval(
        function() {
          cs_framework_js.advanceSlides(slideshow_index, 1);
        },
        2000
      );
    }
  },

  advanceSlides: function(slideshow_index, number_of_slides_to_advance) {
    // Advance through the slideshow by these many slides.
    cs_framework_js.showSlides(
      slideshow_index,
      cs_framework_js.slideshow_state[slideshow_index]['current_slide_index']
      + number_of_slides_to_advance
    );
  },

  showSlides: function(slideshow_index, slide_index_to_show) {
    // Show the slide with the given index.
    slideshow_container = $(".slideshow-container:eq(" + slideshow_index + ")");

    // Make sure the index is within the total number of slides.
    var total_slides = $(slideshow_container).children(".slide").length;
    if (slide_index_to_show >= total_slides) {
      slide_index_to_show = 0;
    }
    else if (slide_index_to_show < 0) {
      slide_index_to_show = total_slides - 1;
    }

    // Hide all of the slides.
    $(slideshow_container).children(".slide").each(function() {
      $(this).hide();
    });

    // Only reveal the selected slide.
    jquery_slide_index = slide_index_to_show + 1;
    $(slideshow_container).children(".slide:nth-of-type("+jquery_slide_index+")").show();

    // Record the current slide.
    cs_framework_js.slideshow_state[slideshow_index]['current_slide_index'] = slide_index_to_show;
  }

};
