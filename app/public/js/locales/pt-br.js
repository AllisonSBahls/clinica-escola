(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, (global.FullCalendarLocales = global.FullCalendarLocales || {}, global.FullCalendarLocales['pt-br'] = factory()));
}(this, function () { 'use strict';

    var ptBr = {
        code: "pt-br",
        buttonText: {
            September: "Setembro",
            prev: "Anterior",
            next: "Próximo",
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia",
            list: "Consultas"
        },
        weekLabel: "Sm",
        allDayText: "Dia Inteiro",
        eventLimitText: function (n) {
            return "mais +" + n;
        },
        noEventsMessage: "Não há eventos para mostrar"
    };

    return ptBr;

}));
