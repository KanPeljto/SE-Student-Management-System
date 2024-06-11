const courseId = localStorage.getItem("courseId");
$(document).ready(function () {
   /* $.ajax({
        url: 'http://localhost/OLP/data/userRole.json',
        dataType: 'json',
        success: function (data) {
            if (data.role === 'professor') {
                $('#professorOptions').show();
                $('#enrollOptions').hide();
            } else if (data.role === 'student') {
                $('#professorOptions').hide();
                $('#enrollOptions').show();
                $('.lecture-options').hide();
                $('#dropdownMenuButton').hide();
                
            }
        },
        error: function (xhr, status, error) {
            console.error('Error fetching user role:', error);
        }
    });
*/
    $.ajax({
        url: 'rest/routes/Course/get_course.php' + '?id=' + localStorage.getItem('courseId'),
        dataType: 'json',
        data: {
            id: courseId
        },
        method:'POST',
        success: function (data) {
            console.log(data);
            $('#courseTitle').text(data.title);
            $('#courseDescription').text(data.description);
            var instructor_id = data.instructor_id;
            $.ajax({
                url: 'rest/routes/Instructor/get_instructors.php',
                success: function(data){
                    for (i of data){
                        if (i.instructor_id == instructor_id){
                            $('#instructorName').text(i.instructor_name);
                        }
                    }
                }
            })

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

        },
        error: function (xhr, status, error) {
            console.error('Error fetching course details:', error);
        }
    });

    const addLectureBtn = $('#addLectureBtn');
    const addLectureForm = $('#addLectureForm');
    const closeFormBtn = $('#closeFormBtn');

    addLectureBtn.on('click', function () {
        addLectureForm.show();
        $('#addLectureForm button[type="submit"]').text('Add Lecture');
    });

    closeFormBtn.on('click', function () {
        addLectureForm.hide();
    });

    $(document).on('click', function (event) {
        if (!$(event.target).closest('#addLectureForm') && !$(event.target).closest('#addLectureBtn') && !$(event.target).closest('#editLectureBtn')) {
            addLectureForm.hide();
        }
    });

    $('#addLectureForm').submit(function (e) {
        e.preventDefault();
        const lectureIndex = $(this).data('lectureIndex');
        const lectureTitle = $('#lectureTitle').val();
        const lectureDescription = $('#lectureDescription').val();
        if ($(this).find('button[type="submit"]').text() === 'Add Lecture') {
            alert('Lecture added successfully');
        } else {
            const accordionHeader = $('#collapse' + lectureIndex).find('.accordion-button');
            accordionHeader.text(lectureTitle);
            $('#collapse' + lectureIndex).find('.accordion-body p').eq(0).text(lectureDescription);
            alert('Lecture edited successfully');
        }
        addLectureForm.hide();
    });
});

