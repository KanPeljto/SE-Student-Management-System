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
                alert('Successfully logged in');
                localStorage.setItem('jwt_token', response.jwt_token);
                window.location.href = '#home';
                
            }
        })
    });
});

