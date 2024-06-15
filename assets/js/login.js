$(document).ready(function() {
    $('#loginForm').submit(function(event) {
        event.preventDefault();
        
        var email = $('#email').val();
        var password = $('#password').val();

        $.ajax({
            url:'rest/routes/User/login.php',
            method: 'POST',
            data: {
                email: email,
                password: password
            },
            dataType: 'json',
            success: function(response){
                console.log(response.loggedIn);
                if (response.loggedIn === true){
                    alert('Successfully logged in');
                    window.location.href = '#home';
                }
            }
        })
    });
});

