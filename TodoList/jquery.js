$(document).ready(function () {
  $("#input").on("change", function () {
    var input = $(this).val();
    $("ul").append(
      "<li><div>" +
        input +
        '</div><i class="fas fa-trash"></i><i class="fas fa-check"></i></li>'
    );
    $(this).val("");
  });
  $("ul").on("click", ".fa-trash", function () {
    console.log("li clicked");
    $(this).parent("li").fadeOut();
  });
  $("ul").on("click", ".fa-check", function () {
    console.log("li clicked");
    $(this)
      .parent("li")
      .css("background", "rgb(0 0 0)")
      .css("border", "2x solid rgb(61, 126, 61)");
  });
});
