$(document).ready(function() {
    $('#regForm').submit(function(event) {
        event.preventDefault();

        var email = $('#email').val();
        var name = $('#name').val();
        var password = $('#password').val();
        var role = $('#role').val();
        var full_name = $('#full_name').val();

        $.ajax({
            url: 'rest/routes/User/add_user.php',
            method: 'POST',
            data: JSON.stringify({
                'email': email,
                'name': name,
                'password': password,
                'role': role,
                'full_name' : full_name
            }),
            dataType: 'json',
            success: function(data){
                if (data.message == 'You have successfully added the user'){
                    alert('Successfully registered user');
                    window.location.href= '#login';
                } else {
                    alert('Failed to register user');
                }
            } 
        });
    });
});
