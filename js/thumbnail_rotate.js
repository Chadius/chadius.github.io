function rotate_thumbnail () {
  /* Rotate through the numbered thumbnails, based on the thumbnail name
  */

  // Find the image_id
  var thumbnail = $("#tennis-game-thumbnail");

  // Get its image source.
  var image_source = thumbnail.attr('src');

  // Get the next image
  next_image_src = "./tennis_game_thumbnails/thumbs1.png";

  // Set the image id.
  thumbnail.attr('src', next_image_src);
}

window.onload = function () {
  var thumbnail = $("#tennis-game-thumbnail");
  //thumbnail.attr('src', "./tennis_game_thumbnails/thumbs1.png");
  rotate_thumbnail();
}
