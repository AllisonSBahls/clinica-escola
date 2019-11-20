$("register").modal('show');

function truncar(texto, limite) {
    if (texto.length > limite) {
        limite--;
        last = texto.substr(limite - 1, 1);
        while (last != ' ' && limite > 0) {
            limite--;
            last = texto.substr(limite - 1, 1);
        }
        last = texto.substr(limite - 2, 1);
        if (last == ',' || last == ';' || last == ':') {
            texto = texto.substr(0, limite - 2) + '...';
        } else if (last == '.' || last == '?' || last == '!') {
            texto = texto.substr(0, limite - 1);
        } else {
            texto = texto.substr(0, limite - 1) + '...';
        }
    }
    return texto;
}

function fillTableComplete(data) {
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

        } else if (data[i].consultSecretaryId == null) {
            user = data[i].consultMaster.name
        }
        if (data[i].consultTraineeId == null) {
            trainee = 'Não Informado'
        } else {
            trainee = data[i].consultTrainee.name
        }
        const name = truncar(data[i].consultPatient.name, 20)

        $('#table-complete').append('<tr><td>' + schedule + '</td><td>' + name + '</td><td>' + data[i].consultPatient.phone + '</td><td>' + moment(data[i].dateStart).format('DD/MM/YYYY HH:mm') + '</td><td>' + trainee + '</td><td>' + user + '</td></tr>');
    }
}

function fillTableConsultComplete(data) {
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

        } else if (data[i].consultSecretaryId == null) {
            user = data[i].consultMaster.name
        }
        if (data[i].consultTraineeId == null) {
            trainee = 'Não Informado'
        } else {
            trainee = data[i].consultTrainee.name
        }
        const name = truncar(data[i].consultPatient.name, 20)

        $('#table-complete-all').append('<tr><td>' + schedule + '</td><td>' + name + '</td><td>' + data[i].consultPatient.phone + '</td><td>' + moment(data[i].dateStart).format('DD/MM/YYYY HH:mm') + '</td><td>' + trainee + '</td><td>' + user + '</td></tr>');
    }
}


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
    $.ajax({
        url: '/consult/next',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            fillTableComplete(data);
        }
    })

    $('#table-day').empty();
    $.ajax({
        url: '/consult/next',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            for (var i = 0; i < data.length; i++) {
                if (data[i].typeSchedule == 1) {
                    const name = truncar(data[i].consultPatient.name, 20)
                    $('#table-day').append('<tr><td>' + name + '</td><td>' + moment(data[i].dateStart).format('DD/MM/YYYY') + '</td><td>' + moment(data[i].dateStart).format('HH:mm') + '</td></tr>');
                }
            }
        }
    })

    $('#allConsultDays').click(() => {
        $('#table-day').empty();
        $.ajax({
            url: '/consult/days',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                for (var i = 0; i < data.length; i++) {
                    $('#table-day').append('<tr><td>' + data[i].consultPatient.name + '</td><td>' + moment(data[i].dateStart).format('DD/MM/YYYY') + '</td><td>' + moment(data[i].dateStart).format('HH:mm') + '</td></tr>');
                }
            }
        })
    })




    $('#completeConsultDays').click(() => {
        $('#table-complete').empty();
        $.ajax({
            url: '/consult/days',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                fillTableComplete(data);
            }
        })
    })

    $('#allConsultNext').click(() => {
        $('#table-complete').empty();
        event.preventDefault();
        $.ajax({
            url: '/consult/next',
            type: 'GET',
            dataType: 'json',
            success: (data) => {
                fillTableComplete(data);
            }
        })
    })
})

$(document).ready(function () {
    $('#btn-consult-name').click(() => {
        $('#search-form-name').submit(function () {
            var dados = $(this).serialize();
            $.ajax({
                url: '/consultation/name',
                type: 'POST',
                dataType: 'json',
                data: dados,
                success: (data) => {
                    $('#table-complete-all').empty();
                    fillTableConsultComplete(data);
                }
            })
            return false;
        })
        $('#search-form-name').trigger('submit');
    });

})

function fillTableReports(data){
    for (i=0; i<data.lenght; i++){
    if(user.NivelPermissaoId == 1 ) {
        
           data[i].reportTrainee.name
        
        } else if(user.NivelPermissaoId == 3 ) {
            reports[i].reportMaster.name  
        } 

    $('#table-day').append('<tr><td>' +  moment(data[i].dateSend).format('DD/MM/YYYY') + '</td><td>' + moment(data[i].dataConsult).format('DD/MM/YYYY hh:mm') + '</td><td>' + moment(data[i].dateStart).format('HH:emm') + '</td></tr>');
    }
}

$(document).ready(function () {

    $('#btn-consult-reports').click(() => {
        $('.search-form-reports').submit(function () {
            var dados = $(this).serialize();
            $.ajax({
                url: '/relatorios/date',
                type: 'POST',
                dataType: 'json',
                data: dados,
                success: function (data) {
                    
                }
            })
            return false;
    
        })
        $('.search-form-reports').trigger('submit');
    
    });

})

$(document).ready(function () {

    $('#btn-consult-date').click(() => {
        $('.search-form-date').submit(function () {
            var dados = $(this).serialize();
            $.ajax({
                url: '/consultation/date',
                type: 'POST',
                dataType: 'json',
                data: dados,
                success: (data) => {
                    $('#table-complete-all').empty();
                    fillTableConsultComplete(data);

                }
            })
            return false;
        })

        $('.search-form-date').trigger('submit');

    });
})

// $(document).ready(function () {

//     $('#btn-reports-date').click(() => {
//         $('.search-form-report').submit(function () {
//             var dados = $(this).serialize();
//             $.ajax({
//                 url: '/relatorios/date',
//                 type: 'POST',
//                 dataType: 'json',
//                 data: dados,
//                 success: (data) => {
//                     $('#table-complete-all').empty();
//                     fillTableConsultComplete(data);

//                 }
//             })
//             return false;
//         })

//         $('.search-form-date').trigger('submit');

//     });
// })

$(document).ready(function () {

    $('#btn-consult-name-date').click(() => {
        $('.search-consult-name-date').submit(function () {
            var dados = $(this).serialize();
            $.ajax({
                url: '/consultation/both',
                type: 'POST',
                dataType: 'json',
                data: dados,
                success: (data) => {
                    $('#table-complete-all').empty();
                    fillTableConsultComplete(data);

                }
            })
            return false;
        })

        $('.search-consult-name-date').trigger('submit');

    });
})


function getHTML() {
    var vai = $('#patientWaitModal option:selected').html();
    $('#valueIdUpdate').attr('value', vai);
}

function confirmar() {
    document.getElementById("confirmSchedules").submit();
}


function sendReport() {
    document.getElementById("form-reports").submit();
}
function registerPresence() {
    document.getElementById("form-select").submit();
}

function validatePresence() {
    document.getElementById("val-presence").submit();
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
function registerPatient(){
    document.getElementById("form-register-patient").submit();
}

function updatePatient(){
    document.getElementById("form-update-patient").submit();
}


function showWait() {
    document.getElementById("patientSelect").style.display = 'none';
    document.getElementById("patientWaitSelect").style.display = 'block';
}

function showPresenceInsert() {
    if (document.getElementById("form-select").style.display == 'none') {
        document.getElementById("form-select").style.display = 'block';
    } else {
        document.getElementById("form-select").style.display = 'none';
    }
}

function showAllPatient() {
    document.getElementById("patientWaitSelect").style.display = 'none';
    document.getElementById("patientSelect").style.display = 'block';
}





function fieldsSchedulesHidden() {
    document.getElementById("traineeSchedulesHidden").style.display = 'none';
    document.getElementById("typeConsultHidden").style.display = 'none';
}

function fieldsSchedulesShow() {
    document.getElementById("traineeSchedulesHidden").style.display = 'block';
    document.getElementById("typeConsultHidden").style.display = 'block';
}

$(document).ready(function () {
    $("#dropdown-container-sidebar").hide();
    $("#dropdown-btn").click(function () {
        $("#dropdown-container-sidebar").toggleClass("active").slideToggle("slow");
        return false;
    })

    $("#dropdown-container-settings").hide();
    $("#btn-dropdown-settings").click(function () {
        $("#dropdown-container-settings").toggleClass("active").slideToggle("slow");
        return false;
    })

    $("#search-filter-buttons").hide();
    $("#button-filter").click(function () {
        $(this).toggleClass("active").next().slideToggle("slow");
        return false;
    })

    $(".search-filter-name").hide();
    $("#btn-filter-name").click(function () {
        $(".search-filter-name").toggleClass("active").slideToggle("slow");
        return false;
    })

    $(".search-filter-date").hide();
    $("#btn-filter-date").click(function () {
        $(".search-filter-date").toggleClass("active").slideToggle("slow");
        return false;
    })

    $(".search-filter-reports").hide();
    $("#btn-filter-reports").click(function () {
        $(".search-filter-reports").toggleClass("active").slideToggle("slow")
        return false;
    })

    $(".search-filter-name-date").hide();
    $("#btn-filter-name-date").click(function () {
        $(".search-filter-name-date").toggleClass("active").slideToggle("slow");
        return false;
    })

    $("#campo-buscar").hide();
    $("#btn-search").click(function () {
        $("#campo-buscar").toggleClass("active").slideToggle("slow");
        return false;
    })

    $("#update-form").hide();
    $("#enable-update").click(function () {
        $("#update-form").show();
        $("#enable-update").hide();
        $("#nome").prop( "disabled", false );
        $("#email").prop( "disabled", false );
        $("#telefone").prop( "disabled", false );
        $("#curso").prop( "disabled", false );
        $("#periodo").prop( "disabled", false );
        return false;
    })

    $(".confirm-hidden").hide();
    $("#saveHidden").hide();
    $("#voltarHidden").hide();
    $("#confHidden").click(function () {
        $(".confirm-hidden").toggleClass("active").slideToggle("slow");
        $("#deletarHidden").hide();
        $("#saveHidden").show();
        $("#esperaHidden").hide();
        $("#voltarHidden").show();
        $("#confHidden").hide();
        return false;
    })

    $("#voltarHidden").click(function () {
        $(".confirm-hidden").toggleClass("deactive").slideToggle("slow");
        $("#deletarHidden").show();
        $("#saveHidden").hide();
        $("#esperaHidden").show();
        $("#voltarHidden").hide();
        $("#confHidden").show();
        return false;
    })
})
