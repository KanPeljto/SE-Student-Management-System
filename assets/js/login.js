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
                console.log(response);
                alert('Successfully logged in');
                localStorage.setItem('jwt_token', response.jwt_token);
                window.location.href = '#home';
            },
            error: function(xhr, status, error){
                console.error('AJAX request error:', error);
                console.log(xhr.responseText); // 
            
                var response = JSON.parse(xhr.responseText);
                if(response.jwt_token === 'Incorrect password'){
                    alert('Incorrect password');
                    window.location.reload();
                } else {
                    
                    alert('Login failed');
                }
            }
        })
    });
});

