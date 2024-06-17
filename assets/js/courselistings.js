$(document).ready(() => {
  const courseAccordion = $('#courseAccordion');
  const token = localStorage.getItem('jwt_token');

  $.ajax({
    url: 'rest/routes/Course/get_courses.php',
    method: 'GET',
    success: (response) => {
      if (response && response.length > 0) {
        response.forEach((course) => {
          const accordionItem = $(`
            <div class="accordion-item">
              <h2 class="accordion-header" id="heading${course.course_id}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${course.course_id}" aria-expanded="false" aria-controls="collapse${course.course_id}">
                  ${course.title}
                </button>
              </h2>
              <div class="accordion-collapse collapse" id="collapse${course.course_id}" aria-labelledby="heading${course.course_id}" data-bs-parent="#courseAccordion">
                <div class="accordion-body">
                  <div class="row">
                    <div class="col-md-12 mb-4">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">${course.title}</h5>
                          <p class="card-text">${course.description}</p>
                          <a href="#enroll" id="enroll-btn-${course.course_id}" class="btn btn-primary">Enroll Now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `);

          courseAccordion.append(accordionItem);

          accordionItem.find(`#enroll-btn-${course.course_id}`).click((e) => {
            e.preventDefault();
            localStorage.setItem('course_ID', course.course_id);

            $.ajax({
              url: 'rest/routes/User/get_user.php',
              headers: { 'TOKEN' : token },
              success: function (userData) {
                const user_id = userData.user_id;
                console.log(token);
                $.ajax({
                  url: 'rest/routes/Enrollment/add_enrollment.php',
                  method: 'POST',
                  data: { user_id: user_id, course_id: course.course_id },
                  success: function (response) {
                    alert('You have successfully registered for this course!');
                    localStorage.removeItem('course_ID');
                  },
                  error: function () {
                    alert('Error, please try again');
                    localStorage.removeItem('course_ID');
                  }
                });
              },
              error: function (xhr, status, error) {
                console.error('Error fetching user information:', error);
              }
            });
          });
        });

      } else {
        courseAccordion.html('<p>No courses found.</p>');
      }
    },
    error: () => {
      courseAccordion.html('<p>Error fetching courses data.</p>');
    }
  });
});
