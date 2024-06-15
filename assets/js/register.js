
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
                if (returnedData.length !== 0) {
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
                            if(role === 'instructor'){
                                $.ajax({
                                    url: 'rest/routes/User/get_user_email.php',
                                    data: {email: email},
                                    method: 'POST',
                                    success: function(response){
                                        const user = JSON.parse(response);
                                        console.log(user);
                                        $.ajax({
                                            url: 'rest/routes/Instructor/add_instructor.php',
                                            data: {
                                                instructor_name: name,
                                                user_id : user[0].user_id},
                                            method: 'POST',
                                            success: function(){
                                                console.log('instructor successfully added to table');
                                            }
                                        })
                                    }
                                });
                            }
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
