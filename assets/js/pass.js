function viewCourse(id) {
    console.log('Viewing course with id:', id)
    localStorage.setItem('courseId', id);
    window.location.href = "#coursedetails";
};
