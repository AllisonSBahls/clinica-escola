
   document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'pt-br',
        plugins: ['interaction', 'dayGrid'],
        //defaultDate: '2019-04-12',
        editable: true,
        eventLimit: true, // allow "more" link when too many events

        events: [
            '<% if (consultation.length > 0) {%>',
            '<% for (var i = 0; i < consultation.length; i++) {%>',
            {
                title: '<%= consultation[i].consultPatient.name  %>',
                start: '<%= moment(consultation[i].dateStart).add(4, "hours").format()  %>',

            },

            '<% } %>',
            '<% } %>',
        ],

        eventClick: function (info) {
            info.jsEvent.preventDefault();
            $('#viewConsult').modal('show');
        }

    });

    calendar.render();
});