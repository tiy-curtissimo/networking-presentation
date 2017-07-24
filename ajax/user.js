
$('input[type="submit"]').click(function() {
    var name = $("#nameId").val();
    if (name) {
        var api = "https://api.github.com/users/" + name;
      $.getJSON(api)
        .done(function( data ) {
            $("#divId").html("")
            for (var property in data) {
                $("#divId").append(property + ": " + data[property] + "<br>");
            }
        });
    }
});
