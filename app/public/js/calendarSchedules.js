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

$(document).ready(()=>{
    $('#allConsultDays').click(() => {
    $.ajax({
        url: '/consult/days',
        type: 'GET',
        dataType: 'json',
        success: (data)=>{
            for(var i=0; i <= data.length; i++){
                console.log('ajax sucess', data);
                $('#labelName').append('Paciente: ' + data[i].consultPatient.name);
                $('#labelDate').append('Data: ' + data[i].dateStart);
            }
        }
        })
    })
})


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


    