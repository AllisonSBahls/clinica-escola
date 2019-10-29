$("register").modal('show');


$(document).ready(function () {
    $.fn.modal.Constructor.prototype._enforceFocus = function () {
        $('#patientModal').select2({
            dropdownParent: $('#register')
        });
        $('#patientWaitModal').select2({
            dropdownParent: $('#register')
        });
    };

});

$(document).ready(() => {
    $('#table-day').empty();
    $.ajax({
        url: '/consult/week',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            for (var i = 0; i < data.length; i++) {
                $('#table-day').append('<tr><td>' + data[i].consultPatient.name + '</td><td>' + moment(data[i].dateStart).format('DD/MM/YYYY') + '</td><td>' + moment(data[i].dateStart).format('HH:mm') + '</td></tr>');
            }
        }
    })
    
    // $(document).ready(function(){
    //     $('#search-name-patient').keyup(function(){
    //       $('form').submit(function(){
    //         var dados= $(this).serialize();
    //         $.ajax({
    //           url:'/paciente/search',
    //           type: 'POST',
    //           dataType: 'html',
    //           data: dados,
    //           success: function(data){
    //             console.log(data)
    //         }
    //         });
    //         return false;
    //       });
    //       $('form').trigger('submit');
    //     })
    //   })
      

    $('#allConsultDays').click(() => {
        $('#table-day').empty();
        $.ajax({
            url: '/consult/days',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                for (var i = 0; i < data.length; i++) {
                    console.log('ajax sucess', data);
                    $('#table-day').append('<tr><td>' + data[i].consultPatient.name + '</td><td>' + moment(data[i].dateStart).format('DD/MM/YYYY') + '</td><td>' + moment(data[i].dateStart).format('HH:mm') + '</td></tr>');
                }
            }
        })
    })

    $('#allConsultWeek').click(() => {
        $('#table-complete').empty();
        event.preventDefault();
        $.ajax({
            url: '/consult/week',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                for (var i = 0; i < data.length; i++) {
                    let schedule;
                    let user;
                    if (data[i].typeSchedule == 1) {
                        schedule = 'Consulta'
                    } else if (data[i].typeSchedule == 2) {
                        schedule = 'Agendamento'
                    }

                    if (data[i].consultSecretaryId == null && data[i].consultMasterId == null) {
                        user = 'Portal'

                    } else if (data[i].consultMasterId == null) {
                        user = data[i].consultSecretary.name

                    } else if (data[i].consultSecretaryId == null)  {
                        user = data[i].consultMaster.name
                    }
                    console.log(user)
                    if (data[i].consultTraineeId == null) {
                        trainee = 'Não Informado'
                    } else {
                        trainee = data[i].consultTrainee.name
                    }

                    $('#table-complete').append('<tr><td>' + schedule + '</td><td>' + data[i].consultPatient.name + '</td><td>' + data[i].consultPatient.phone + '</td><td>' + moment(data[i].dateStart).format('DD/MM/YYYY HH:mm') + '</td><td>' + trainee + '</td><td>' + user + '</td></tr>');
                }
            }
        })
    })
})


function getHTML() {
    var vai = $('#patientWaitModal option:selected').html();

    $('#valueIdUpdate').attr('value', vai);
}

function confirmar() {
    document.getElementById("confirmSchedules").submit();
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

function showWait() {
    document.getElementById("patientSelect").style.display = 'none';
    document.getElementById("patientWaitSelect").style.display = 'block';
}

function showAllPatient() {
    document.getElementById("patientWaitSelect").style.display = 'none';
    document.getElementById("patientSelect").style.display = 'block';
}

function showConfirmar() {
    document.getElementById("typeHidden").style.display = 'block';
    document.getElementById("traineeHidden").style.display = 'block';
    document.getElementById("saveHidden").style.display = 'block';
    document.getElementById("confHidden").style.display = 'none';
    document.getElementById("deletarHidden").style.display = 'none';
    document.getElementById("esperaHidden").style.display = 'none';
    document.getElementById("voltarHidden").style.display = 'block';

}

function voltar() {
    document.getElementById("typeHidden").style.display = 'none';
    document.getElementById("traineeHidden").style.display = 'none';
    document.getElementById("saveHidden").style.display = 'none';
    document.getElementById("confHidden").style.display = 'block';
    document.getElementById("deletarHidden").style.display = 'block';
    document.getElementById("esperaHidden").style.display = 'block';
    document.getElementById("voltarHidden").style.display = 'none';


}

function fieldsSchedulesHidden() {
    document.getElementById("traineeSchedulesHidden").style.display = 'none';
    document.getElementById("typeConsultHidden").style.display = 'none';
}

function fieldsSchedulesShow() {
    document.getElementById("traineeSchedulesHidden").style.display = 'block';
    document.getElementById("typeConsultHidden").style.display = 'block';
}

function dropdownSidebar() {
    if (document.getElementById("dropdown-container-sidebar").style.display == 'none') {
        document.getElementById("dropdown-container-sidebar").style.display = 'block';
    } else {
        document.getElementById("dropdown-container-sidebar").style.display = 'none';
    }
}

function showFilter(){
    if (document.getElementById("search-filter-field").style.display == 'none') {
        document.getElementById("search-filter-field").style.display = 'block';
    } else {
        document.getElementById("search-filter-field").style.display = 'none';
    }
}