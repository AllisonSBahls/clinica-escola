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

// $(document).ready(()=>{
//     $('defaultInline3').click(()=>{
//         document.getElementById("traineeHidden").style.display = 'none';

//     })
// })

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
        $('#table-complete').empty();
        $.ajax({
            url: '/consult/week',
            type: 'GET',
            dataType: 'json',
            success: (data)=>{
                for(var i=0; i < data.length; i++){
                    console.log(data)
                    $('#table-complete').append('<tr><td>' +'teste' +'</td><td>'+ data[i].consultPatient.name +'</td><td>'+ data[i].consultPatient.phone +'</td><td>'+moment(data[i].dateStart).format('DD/MM/YYYY HH:mm')+'</td><td>'+'teste'+'</td><td>'+'teste'+'</td></tr>');
                }
            }
            })
        })
})


function getHTML() {
    var vai=$('#patientWaitModal option:selected').html();
    
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

function showAllPatient(){
    document.getElementById("patientWaitSelect").style.display = 'none';
    document.getElementById("patientSelect").style.display = 'block'; 
}

function confirmar(){
    document.getElementById("typeHidden").style.display = 'block';
    document.getElementById("traineeHidden").style.display = 'block';
    document.getElementById("saveHidden").style.display = 'block';
    document.getElementById("confHidden").style.display = 'none';
    document.getElementById("deletarHidden").style.display = 'none';
    document.getElementById("esperaHidden").style.display = 'none';
    document.getElementById("voltarHidden").style.display = 'block';

}

function voltar(){
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

function fieldsSchedulesShow(){
    document.getElementById("traineeSchedulesHidden").style.display = 'block';
    document.getElementById("typeConsultHidden").style.display = 'block';
}

function dropdownSidebar(){
    if( document.getElementById("dropdown-container-sidebar").style.display == 'none'){
       document.getElementById("dropdown-container-sidebar").style.display = 'block';
    }else{
        document.getElementById("dropdown-container-sidebar").style.display = 'none';

    }
}