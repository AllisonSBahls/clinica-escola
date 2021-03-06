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

        $('#table-complete').append('<tr><td>' + schedule + '</td><td>' + name + '</td><td>' + data[i].consultPatient.phone + '</td><td>' + moment.parseZone(data[i].dateStart).format('DD/MM/YYYY HH:mm') + '</td><td>' + trainee + '</td><td>' + user + '</td></tr>');
    }
}

function funcao_pdf_consultas() {
    var table = document.getElementById('table-complete-all').innerHTML
    var janela = window.open('', '', 'width=1000px; height=728px');
    janela.document.write('<html><head>')
    janela.document.write('<title>Relatório dos Atendimentos</title></head>')
    janela.document.write('<h1 style="text-align:center">Relátorio dos Atendimentos</h1>')
    janela.document.write('<p style="font-size:1em">Data: </p>')
    janela.document.write('<p style="font-size:1em">Usuário: </p>')
    janela.document.write('<body >')
    janela.document.write('<table style="width: 100%;>')
    janela.document.write('<thead ><tr>')
    janela.document.write('<th scope="col">SITUAÇÃO</th>')
    janela.document.write('<th scope="col">NOME</th>')
    janela.document.write('<th scope="col">TELEFONE</th>')
    janela.document.write('<th scope="col">HORÁRIO</th>')
    janela.document.write('<th scope="col">ESTAGIÁRIO</th>')
    janela.document.write('<th scope="col">USUÁRIO</th>')
    janela.document.write('<tbody style="font-size: 1em; line-height: 150%">' + table + '</tbody>')
    janela.document.write('<table>')
    janela.document.write('</body></html>')
    janela.document.close();
    janela.print();

}

function docpage(url, namepage) {
    window.open(url, namepage, 'resizable, height=800,width=600'); return false;
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
         if (data[i].statusSchedules == 1) {
            status= 'Pendente'
            } else if (data[i].statusSchedules == 2) { 
            status = 'Confirmado'
            } else if (data[i].statusSchedules == 4) { 
            status = 'Concluido'
            } 
         const name = truncar(data[i].consultPatient.name, 20)

        $('#table-complete-all').append('<tr><td>' + schedule + '</td><td>' + name + '</td><td>' + data[i].consultPatient.phone + '</td><td>' + moment.parseZone(data[i].dateStart).format('DD/MM/YYYY HH:mm') + '</td><td>' + trainee + '</td><td>' + user + '</td><td>' + status + '</td></tr>');
    }
}

function fillTableReports(data) {
    for (i = 0; i < data.length; i++) {

        $('#table-reports').append('<tr><th>' + moment(data[i].dateSend).format('DD/MM/YYYY') + '</th><td>' + moment(data[i].dataConsult).format.parseZone('DD/MM/YYYY HH:mm') + '</td><td>' + data[i].reportTrainee.name + '</td><td>' + '</td><td>' + data[i].reportMasterId + '</td><td>' + '<a class="btn btn-primary btn-sm" href="relatorios/report/' + data[i].id + '"><img src="img/icons/common/eye.svg">Visualizar </a>       ' + '</td></tr>');
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
                    $('#table-day').append('<tr><td>' + name + '</td><td>' + moment(data[i].dateStart).local().format('DD/MM/YYYY') + '</td><td>' + moment.parseZone(data[i].dateStart).format("HH:mm") + '</td></tr>');
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
                    $('#table-day').append('<tr><td>' + data[i].consultPatient.name + '</td><td>' + moment(data[i].dateStart).format('DD/MM/YYYY') + '</td><td>' + moment.parseZone(data[i].dateStart).format('HH:mm') + '</td></tr>');
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
                    $('#table-reports').empty();
                    fillTableReports(data)
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
function updateConsultation() {
    document.getElementById("update-consultation").submit();
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
    if (confirm("Deseja mesmo deletar a solicitação?")) {
        document.getElementById("deleteSchedules").submit();
    }
}

function cancelar() {
    if (confirm("Deseja mesmo deletar a solicitação?")) {
        document.getElementById("cancelSchedules").submit();
    }
}

function finalizarConsulta() {
    document.getElementById("end-consultation").submit();
}
function updateReport() {
    document.getElementById("update-form-report").submit();
}


function wait() {
    document.getElementById("waitPatient").submit();
}
function registerPatient() {
    document.getElementById("form-register-patient").submit();
}

function updatePatient() {
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
    document.getElementById("registerHoursInit").style.display = 'none';
    document.getElementById("registerHoursInitEnd").style.display = 'flex';


}

function fieldsSchedulesShow() {
    document.getElementById("traineeSchedulesHidden").style.display = 'block';
    document.getElementById("typeConsultHidden").style.display = 'block';
    document.getElementById("registerHoursInit").style.display = 'block';
    document.getElementById("registerHoursInitEnd").style.display = 'none';
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
        $(".search-filter-name-date").hide("slow");
        $(".search-filter-date").hide("slow");
        $(".search-filter-name").hide("slow");

        return false;
    })

    $(".search-filter-name").hide();
    $("#btn-filter-name").click(function () {
        $(".search-filter-name").toggleClass("active").slideToggle("slow");
        $(".search-filter-name-date").hide("slow");
        $(".search-filter-date").hide("slow");

        return false;
    })
    $("#form-select").hide();
    $("#btn-register-presence").click(function () {
        $("#form-select").toggleClass("active").slideToggle("slow");
        return false;
    })



    $(".search-filter-date").hide();
    $("#btn-filter-date").click(function () {
        $(".search-filter-date").toggleClass("active").slideToggle("slow");
        $(".search-filter-name-date").hide("slow");
        $(".search-filter-name").hide("slow");

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
        $(".search-filter-date").hide("slow");
        $(".search-filter-name").hide("slow");

        return false;
    })

    $("#campo-buscar").hide();
    $("#btn-search").click(function () {
        $("#campo-buscar").toggleClass("active").slideToggle("slow");
        return false;
    })


    $("#update-reports").hide();
    $("#edit-reports").click(function () {
        $("#update-reports").show();
        $("#edit-reports").hide();
        $("#report").prop("disabled", false);
        $("#namePatient").prop("disabled", false);
        $("#dateConsult").prop("disabled", false);
        return false;

    })



    $("#update-form").hide();
    $("#enable-update").click(function () {
        $("#update-form").show();
        $("#enable-update").hide();
        $("#nome").prop("disabled", false);
        $("#email").prop("disabled", false);
        $("#telefone").prop("disabled", false);
        $("#curso").prop("disabled", false);
        $("#periodo").prop("disabled", false);
        $("#dataNasc").prop("disabled", false);
        $("#gender").prop("disabled", false);
        $("#schooling").prop("disabled", false);
        $("#maritalstatus").prop("disabled", false);
        $("#spouse").prop("disabled", false);
        $("#cep").prop("disabled", false);
        $("#number").prop("disabled", false);
        $("#rua").prop("disabled", false);
        $("#bairro").prop("disabled", false);
        $("#cidade").prop("disabled", false);
        $("#uf").prop("disabled", false);
        $("#cidade").prop("disabled", false);

        return false;
    })


    $(".confirm-hidden").hide();
    $("#saveHidden").hide();
    $("#voltarHidden").hide();
    $("#time-begin").hide();

    $("#confHidden").click(function () {
        $(".confirm-hidden").toggleClass("active").slideToggle("slow");
        $("#deletarHidden").hide();
        $("#saveHidden").show();
        $("#esperaHidden").hide();
        $("#voltarHidden").show();
        $("#confHidden").hide();
        $("#time-hour-start").hide();
        $("#time-hour-end").hide();
        $("#time-begin").show();
        $('#dateInit').attr('disabled', false);

    })

    $("#update-consult").hide();
    $("#voltar-consult").hide();
    $("#updateHidden").click(function () {
        $(".confirm-hidden").toggleClass("active").slideToggle("slow");
        $("#updateHidden").hide();
        $("#update-consult").show();
        $("#Finalizar").hide();
        $("#updateHidden").hide();
        $("#Cancelar").hide();
        $("#voltar-consult").show();


        $('#typeProcedure').attr('disabled', false);
        $('#traineeId').attr('disabled', false);
        $('#dateStart').attr('disabled', false);
        $('#timeStart').attr('disabled', false);
        $('#patientId').attr('disabled', false);
        $('#description').attr('disabled', false);

    })

    $("#voltar-consult").click(function () {
        $(".confirm-hidden").toggleClass("active").slideToggle("slow");
        $("#updateHidden").show();
        $("#update-consult").hide();
        $("#Finalizar").show();
        $("#updateHidden").show();
        $("#Cancelar").show();
        $("#voltar-consult").hide();

        $('#typeProcedure').attr('disabled', true);
        $('#traineeId').attr('disabled', true);
        $('#dateStart').attr('disabled', true);
        $('#timeStart').attr('disabled', true);
        $('#patientId').attr('disabled', true);
        $('#description').attr('disabled', true);

    })

    $("#voltarHidden").click(function () {
        $(".confirm-hidden").toggleClass("deactive").slideToggle("slow");
        $("#deletarHidden").show();
        $("#saveHidden").hide();
        $("#esperaHidden").show();
        $("#voltarHidden").hide();
        $("#confHidden").show();
        $("#time-end").show();
        $("#time-hour-start").show();
        $("#time-hour-end").show();
        $("#time-begin").hide();
        $('#dateInit').attr('disabled', true);

        return false;
    })
})

