function addItem() {
    var e = $("#item").val();
    $("ol").append("<li>" + e + " <button class='remove'>remove</button></li>");
    console.log("element added");
    $("#item").val("");
    $("li:last-child").hide().slideDown(500);
}

function removeItem() {
    $(this).parent().fadeOut(1000, function () {
        $(this).remove();
    });
    console.log("element removed");
}

$(document).ready(function () {
    $("#add").on("click", addItem);
    $("ol").on("click", ".remove", removeItem);
    $("ol").sortable();

    $("#hide").on("click", function () {
        $("ol").fadeOut(500);
    });

    $("#show").on("click", function () {
        $("ol").fadeIn(500);
    });
});
