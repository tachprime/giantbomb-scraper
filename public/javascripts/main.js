$(document).ready(function () {
    $('.button-collapse').sideNav();

    $('#commentModal').modal({
        dismissible: false,
        opacity: .5,
        inDuration: 300,
        outDuration: 100
    });

    $('.commentButton').on('click', function (e) {
        e.stopImmediatePropagation();

        var currentButton = $(this).attr('id');
        console.log("id clicked: ", currentButton);

        populateComments(currentButton);


        $('#commentModal').modal('open');

        $('#commentButton').on('click', function (e) {
            e.preventDefault();
            var userName = $('#userName');
            var commentText = $('#commentText');

            if (userName.val().trim() == '' || userName.val() == ' ' ||
                commentText.val().trim() == '' || commentText.val().trim() == ' ') {

                alert("User name or Comment can't be blank");

            } else {
                $.post("/comments/" + currentButton, $('#commentForm').serialize())
                    .done(function (data) {
                        populateComments(currentButton);
                    })
                    .fail(function (err) {
                        console.log("error posting comment", err);
                    });

            }


            userName.val('');
            commentText.val('');
            return false;
        });
    });

    function populateComments(id) {
        $('.messages').empty();

        $.get("/comments/" + id, function (data) {

            for (var i = 0; i < data.length; i++) {
                var comment = $(
                    '<li class="comment collection-item avatar">'
                    + '<i class="material-icons circle">person</i>'
                    + '<p><strong>User: ' + data[i].userName + '</strong><br>'
                    + 'comment: ' + data[i].commentText + '</p>' +
                    '</li>'
                );

                $('.messages').append(comment);
            }

            console.log(data);
        }).fail(function () {
            console.log("error retrieving comments");
        });
    }
});