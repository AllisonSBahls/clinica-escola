$("register").modal('show');


$(document).ready(function () {
    $.fn.modal.Constructor.prototype._enforceFocus = function() {

        $('#patientModal').select2({
            dropdownParent: $('#register')
        });
    };
});

function update() {
    document.getElementById("updateSchedules").submit();
}

function deletar() {
    document.getElementById("deleteSchedules").submit();
}
function cancelar() {
    document.getElementById("cancelSchedules").submit();
}



    