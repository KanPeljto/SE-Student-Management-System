$(document).ready(function() {
    $('#regForm').submit(function(event) {
        event.preventDefault();

        var email = $('#email').val();
        var name = $('#name').val();
        var password = $('#password').val();
        var role = $('#role').val();

        $.ajax({
            url: 'rest/routes/User/get_users.php',
            dataType: 'json',
            success: function(returnedData){
                var userExists = false;
                for (var i = 0; i < returnedData.length; i++) {
                    if (returnedData[i].email === email) {
                        userExists = true;
                        break;
                    }
                }

                if (userExists) {
                    alert('User already registered');
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
                        success: function(data){
                            if (data.message == 'You have successfully added the user'){
                                alert('Successfully registered user');
                                window.location.href= '#login';
                            } else {
                                alert('Failed to register user');
                            }
                        } 
                    });
                }
            }
        });
    });
});
