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
                    console.log(returnedData);
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
                                    success: function(data){
                                        const user_id = data.user_id;
                                        console.log('user_id');
                                        $.ajax({
                                            url: 'rest/routes/Instructor/add_instructor.php',
                                            data: {instructor_name: name, user_id : user_id},
                                            method: 'POST',
                                            dataType: 'json',
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
