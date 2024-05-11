$(document).ready(function() {
    $('#loginForm').submit(function(event) {
        event.preventDefault();
        
        var email = $('#email').val();
        var password = $('#password').val();
        
        $.ajax({
            url: 'rest/routes/User/get_users.php',
            dataType: 'json',
            success: function(userData) {
                var matchedUser = userData.find(function(user) {
                    return user.email === email && user.password === password;
                });

                if (matchedUser) {
                    window.location.href = '#dashboard';
                } else {
                    alert('Invalid credentials. Please try again.');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error loading user data:', error);
            }
        });
    });
});

