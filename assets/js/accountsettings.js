$(document).ready(function () {
    const userInfoContainer = $('#userInfoContainer');
    const editUserInfoForm = $('#editUserInfoForm');
    const editUserInfoBtn = $('#editUserInfoBtn');
    const cancelEditBtn = $('#cancelEditBtn');
    const token = localStorage.getItem('jwt_token');
    if (!token) {
        console.error('JWT token is missing');
        // Example: Redirect to login page if token is missing
        window.location.href = '#login';
    }


    // $.ajax({
    //     url: 'rest/routes/User/get_user.php',
    //     dataType: 'json',
    //     success: function (data) {
    //         userInfoContainer.html(`
    //       <div class="mb-3">
    //         <label for="name" class="form-label">Full Name:</label>
    //         <p id="name">${data.fullName}</p>
    //       </div>
    //       <div class="mb-3">
    //         <label for="email" class="form-label">Email Address:</label>
    //         <p id="email">${data.email}</p>
    //       </div>
    //       <div class="mb-3">
    //         <label for="password" class="form-label">Password:</label>
    //         <p id="password">${data.password}</p>
    //       </div>
    //     `);
    //     },
    //     error: function (xhr, status, error) {
    //         console.error('Error fetching user information:', error);
    //     }
    // });

    editUserInfoBtn.on('click', function () {
        editUserInfoForm.show();
        editUserInfoBtn.hide();

        $.ajax({
            url: 'rest/routes/User/get_user.php',
            dataType: 'json',
            headers: {'TOKEN' : token},
            success: function (data) {
                $('#name').val(data.fullName);
                $('#email').val(data.email);
                $('#password').val(data.password);
            },
            error: function (xhr, status, error) {
                alert('Invalid or missing token, redirecting...');
                window.location.href = '#login';
                localStorage.removeItem('jwt_token');
            }
        });
    });

    cancelEditBtn.on('click', function () {
        editUserInfoForm.hide();
        editUserInfoBtn.show();
    });

    editUserInfoForm.submit(function (e) {
        e.preventDefault();
        editUserInfoForm.hide();
        editUserInfoBtn.show();
    });
});
