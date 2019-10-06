$("register").modal('show');


$(document).ready(function () {
    $.fn.modal.Constructor.prototype._enforceFocus = function() {

        $('#patientModal').select2({
            dropdownParent: $('#register')
        });
    };
});



    