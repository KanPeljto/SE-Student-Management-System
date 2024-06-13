$(document).ready(function () {
    const courseId = localStorage.getItem("courseId");
    if (!courseId) {
        console.error("Course ID not found in local storage.");
        return;
    }
    $.ajax({
        url: 'rest/routes/Course/get_course.php' + '?id=' + courseId,
        method: 'POST',
        dataType: 'json',
        data: {
            id: courseId
        },
        success: function (data) {
            if (data) {
                $('#courseTitle').text(data.title);
                $('#courseDescription').text(data.description);
                var instructor_id = data.instructor_id;
                $.ajax({
                    url: 'rest/routes/Instructor/get_instructors.php',
                    success: function(instructorData){
                        instructorData.forEach(function(instructor) {
                            if (instructor.instructor_id == instructor_id) {
                                $('#instructorName').text(instructor.instructor_name);
                            }
                        });
                    }
                });

                const lectureAccordion = $('#lectureAccordion');
                data.lectures.forEach(function (lecture, index) {
                    const accordionItem = $('<div class="accordion-item">');
                    const accordionHeader = $('<h2 class="accordion-header">')
                        .append($('<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse">')
                            .attr('data-bs-target', '#collapse' + index)
                            .attr('aria-expanded', 'false')
                            .attr('aria-controls', 'collapse' + index)
                            .text(lecture.title));
                    const accordionCollapse = $('<div class="accordion-collapse collapse" id="collapse' + index + '">')
                        .append($('<div class="accordion-body">')
                            .append($('<p>').text(lecture.description))
                            .append($('<p>').text('Material: ' + lecture.material))
                            .append($('<div class="dropdown lecture-options">') 
                                .append($('<button class="btn btn-secondary dropdown-toggle" type="button" id="lectureOptionsDropdown' + index + '" data-bs-toggle="dropdown" aria-expanded="false">')
                                    .text('Lecture Options')
                                )
                                .append($('<ul class="dropdown-menu" aria-labelledby="lectureOptionsDropdown' + index + '">')
                                    .append($('<li>')
                                        .append($('<button class="dropdown-item" id="uploadMaterialBtn' + index + '">Upload Material</button>').click(function () {
                                            $('#lectureMaterial').data('lectureIndex', index).trigger('click');
                                        }))
                                    )
                                    .append($('<li>')
                                        .append($('<button class="dropdown-item" id="deleteLectureBtn' + index + '">Delete Lecture</button>').click(function () {
                                            accordionItem.remove();
                                            alert('Lecture ' + lecture.title + ' deleted');
                                        }))
                                    )
                                    .append($('<li>')
                                        .append($('<button class="dropdown-item" id="editLectureBtn' + index + '">Edit Lecture</button>').click(function () {
                                            const lectureIndex = $(this).attr('id').replace('editLectureBtn', '');
                                            const lecture = data.lectures[lectureIndex];
                                            $('#lectureTitle').val(lecture.title);
                                            $('#lectureDescription').val(lecture.description);
                                            $('#addLectureForm button[type="submit"]').text('Edit Lecture').data('lectureIndex', lectureIndex);
                                            addLectureForm.show();
                                        }))
                                    )
                                    .append($('<li>')
                                        .append($('<button class="dropdown-item" id="deleteMaterialBtn' + index + '">Delete Material</button>').click(function () {
                                            const lectureIndex = $(this).attr('id').replace('deleteMaterialBtn', '');
                                            $('#collapse' + lectureIndex).find('.accordion-body p').eq(1).text('Material:');
                                            alert('Material deleted for lecture ' + data.lectures[lectureIndex].title);
                                        }))
                                    )
                                )
                            )
                        );
                    accordionItem.append(accordionHeader, accordionCollapse);
                    lectureAccordion.append(accordionItem);

                    if (data.role === 'student') {
                        accordionItem.find('.lecture-options').hide(); 
                    }
                });

                $('#lectureMaterial').on('change', function () {
                    const lectureIndex = $(this).data('lectureIndex');
                    const material = $(this).val().split('\\').pop(); 
                    $('#collapse' + lectureIndex).find('.accordion-body p').eq(1).text('Material: ' + material);
                    alert('Material uploaded for lecture ' + data.lectures[lectureIndex].title);
                });
            } else {
                console.error("No course data received.");
            }
        },
        error: function (xhr, status, error) {
            console.error('Error fetching course details:', error);
        }
    });
});