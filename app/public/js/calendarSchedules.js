$("register").modal('show');


$(document).ready(function () {
    $.fn.modal.Constructor.prototype._enforceFocus = function() {

        $('#patientModal').select2({

            dropdownParent: $('#register')
        });
    
        $('#patientWaitModal').select2({
            dropdownParent: $('#register')
        });
    };

});

function getHTML() {
    var vai=$('#patientWaitModal option:selected').html();
    
    $('#valueIdUpdate').attr('value', vai); 
}

function update() {
    document.getElementById("updateSchedules").submit();
}

function deletar() {
    document.getElementById("deleteSchedules").submit();
}
function cancelar() {
    document.getElementById("cancelSchedules").submit();
}

function wait() {
    document.getElementById("waitPatient").submit();
}


    