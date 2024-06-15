$(document).ready(function() {
    $('#regForm').submit(function(event) {
        event.preventDefault();

        const email = $('#email').val();
        const name = $('#name').val();
        const password = $('#password').val();
        const role = $('#role').val();

        $.ajax({
            url: 'rest/routes/User/get_user_email.php',
            dataType: 'json',
            method: 'POST',
            data: { email: email },
            success: function(returnedData) {
                if (returnedData !== null) {
                    alert('User already registered');
                    window.location.reload(); 
                } else {
                    $.ajax({
                        url: 'rest/routes/User/add_user.php',
                        method: 'POST',
                        data: JSON.stringify({
                            'email': email,
                            'name': name,
                            'password': password,
                            'role': role
                        }),
                        dataType: 'json',
                        success: function(data) {
                            if (data.message == 'You have successfully added the user') {
                                    alert('Successfully registered user');
                                    window.location.href = '#login'
                            } else {
                                alert('Failed to register user');
                            }
                        },
                        error: function() {
                            alert('Failed to add user');
                        }
                    });
                }
            },
            error: function() {
                alert('Failed to check user existence');
            }
        });
    });
});
