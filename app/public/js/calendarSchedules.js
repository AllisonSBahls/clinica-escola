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
    $('#table-day').empty();
    $.ajax({
        url: '/consult/week',
        type: 'GET',
        dataType: 'json',
        success: (data)=>{
            for(var i=0; i < data.length; i++){
                $('#table-day').append('<tr><td>' + data[i].consultPatient.name+'</td><td>'+ moment(data[i].dateStart).format('DD/MM/YYYY')+'</td><td>'+moment(data[i].dateStart).format('HH:mm')+'</td></tr>');
            }
        }
        })

    $('#allConsultDays').click(() => {
    $('#table-day').empty();
    $.ajax({
        url: '/consult/days',
        type: 'GET',
        dataType: 'json',
        success: (data)=>{
            for(var i=0; i < data.length; i++){
                console.log('ajax sucess', data);
                $('#table-day').append('<tr><td>' + data[i].consultPatient.name+'</td><td>'+ moment(data[i].dateStart).format('DD/MM/YYYY')+'</td><td>'+moment(data[i].dateStart).format('HH:mm')+'</td></tr>');
            }
        }
        })
    })
    $('#allConsultWeek').click(() => {
        $('#table-day').empty();
        $.ajax({
            url: '/consult/week',
            type: 'GET',
            dataType: 'json',
            success: (data)=>{
                for(var i=0; i < data.length; i++){
                    $('#table-day').append('<tr><td>' + data[i].consultPatient.name+'</td><td>'+ moment(data[i].dateStart).format('DD/MM/YYYY')+'</td><td>'+moment(data[i].dateStart).format('HH:mm')+'</td></tr>');
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

function showWait() {
    document.getElementById("patientSelect").style.display = 'none';
    document.getElementById("patientWaitSelect").style.display = 'block'; 
}

function showAllPatient(){
    document.getElementById("patientWaitSelect").style.display = 'none';
    document.getElementById("patientSelect").style.display = 'block'; 
}
