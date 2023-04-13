(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });


    // Progress Bar
    $('.pg-bar').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Calender
    $('#calender').datetimepicker({
        inline: true,
        format: 'L'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav : false
    });


    // Chart Global Color
    Chart.defaults.color = "#000000"; // cor dos textos das legendas de todos os graficos
    Chart.defaults.borderColor = "#000000"; //outline das caixas dos graficos(single line chart & multiple line chart)





//-- TELA -> index.html
//-- GRAFICO COLUNA #worldwide-sales
    function fetchData() {
        return fetch('dados.json')
        .then(response => response.json())
        .catch(error => console.error('Error fetching data:', error));
    }

    fetchData().then(data => {
        // Worldwide Sales Chart -> Total de Emissao
        var ctx1 = $("#worldwide-sales").get(0).getContext("2d");
        var myChart1 = new Chart(ctx1, {
            type: "bar",
            data: {
                labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
                datasets: [
                    {
                        label: "CO₂",
                        data: [
                            data.emissao_total.CO.coluna1,
                            data.emissao_total.CO.coluna2,
                            data.emissao_total.CO.coluna3,
                            data.emissao_total.CO.coluna4,
                            data.emissao_total.CO.coluna5,
                            data.emissao_total.CO.coluna6,
                            data.emissao_total.CO.coluna7
                        ],
                        backgroundColor: "#89CFF0" // primeira barra do grafico (multiple bar chart)
                    },
                    {
                        label: "O₃",
                        data: [
                            data.emissao_total.O.coluna1,
                            data.emissao_total.O.coluna2,
                            data.emissao_total.O.coluna3,
                            data.emissao_total.O.coluna4,
                            data.emissao_total.O.coluna5,
                            data.emissao_total.O.coluna6,
                            data.emissao_total.O.coluna7
                        ],
                        backgroundColor: "#0096FF" //segunda barra do grafico (multiple bar chart)
                    },
                    {
                        label: "NO₂",
                        data: [
                            data.emissao_total.NO.coluna1,
                            data.emissao_total.NO.coluna2,
                            data.emissao_total.NO.coluna3,
                            data.emissao_total.NO.coluna4,
                            data.emissao_total.NO.coluna5,
                            data.emissao_total.NO.coluna6,
                            data.emissao_total.NO.coluna7
                        ],
                        backgroundColor: "#0047AB" //terceira barra do grafico (multiple bar chart)
                    }
                ]
            },
            options: {
                responsive: true
            }
        });
    });

//-- TELA -> index.html
//-- GRAFICO LINHA #salve-chart
    fetchData().then(data => {
        // Salse & Revenue Chart -> Media de Emissao
        var ctx2 = $("#salse-revenue").get(0).getContext("2d");
        var myChart2 = new Chart(ctx2, {
            type: "line",
            data: {
                labels: ["04/04", "05/04", "06/04", "07/04", "08/04", "09/04", "10/04"],
                datasets: [{
                        label: "Setor A",
                        data: [
                            data.emissao_semanal.Setor_A.linha1,
                            data.emissao_semanal.Setor_A.linha2,
                            data.emissao_semanal.Setor_A.linha3,
                            data.emissao_semanal.Setor_A.linha4,
                            data.emissao_semanal.Setor_A.linha5,
                            data.emissao_semanal.Setor_A.linha6,
                            data.emissao_semanal.Setor_A.linha7
                        ],
                        backgroundColor: "rgba(137, 207, 240, .5)", // linha setor a (Multiple line chart)
                        fill: true
                    },
                    {
                        label: "Setor B",
                        data: [
                            data.emissao_semanal.Setor_B.linha1,
                            data.emissao_semanal.Setor_B.linha2,
                            data.emissao_semanal.Setor_B.linha3,
                            data.emissao_semanal.Setor_B.linha4,
                            data.emissao_semanal.Setor_B.linha5,
                            data.emissao_semanal.Setor_B.linha6,
                            data.emissao_semanal.Setor_B.linha7
                        ],
                        backgroundColor: "rgba(0, 150, 255, .5)", // linha setor b (Multiple line chart)
                        fill: true
                    },
                    {
                        label: "Setor C",
                        data: [
                            data.emissao_semanal.Setor_C.linha1,
                            data.emissao_semanal.Setor_C.linha2,
                            data.emissao_semanal.Setor_C.linha3,
                            data.emissao_semanal.Setor_C.linha4,
                            data.emissao_semanal.Setor_C.linha5,
                            data.emissao_semanal.Setor_C.linha6,
                            data.emissao_semanal.Setor_C.linha7
                        ],
                        backgroundColor: "rgba(0, 71, 171, .9)", // linha setor c (Multiple line chart)
                        fill: true
                    },
                ]
                },
            options: {
                responsive: true
            }
        });
    });


//-- TELA -> chart.html
//-- 1° Grafico em Linha
    // Single Line Chart -> Emissao Diaria
    fetchData().then(data => {
        var ctx3 = $("#line-chart").get(0)/* .getContext("2d") */;
        var myChart3 = new Chart(ctx3, {
            type: "line",
            data: {
                labels: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"],
                datasets: [{
                    label: "Hora",
                    data: [
                            data.graficoProducaoPorHoras.noveHoras,
                            data.graficoProducaoPorHoras.dezHoras,
                            data.graficoProducaoPorHoras.onzeHoras,
                            data.graficoProducaoPorHoras.dozeHoras,
                            data.graficoProducaoPorHoras.trezeHoras,
                            data.graficoProducaoPorHoras.quatorzeHoras,
                            data.graficoProducaoPorHoras.quinzeHoras,
                            data.graficoProducaoPorHoras.dezesseisHoras,
                            data.graficoProducaoPorHoras.dezesseteHoras,
                            data.graficoProducaoPorHoras.dezoitoHoras,
                            data.graficoProducaoPorHoras.dezenoveHoras,
                        ],
                    fill: false,
                    backgroundColor: "rgba(137, 207, 240)" // cor dos pontos (single line chart)
                }]
            },
            options: {
                responsive: true
            }
        });
    });

//-- Há um Grafico nesse momento na tela, que é o Grafico em Linha da index.html

//-- TELA -> chart.html
//-- Grafico em colunas separadas
    // Single Bar Chart
    var ctx4 = $("#bar-chart").get(0).getContext("2d");
    var myChart4 = new Chart(ctx4, {
        type: "bar",
        data: {
            labels: ["A0101", "B0201", "C0301", "D0401", "E0501"],
            datasets: [
                {
                    label: "Sensor A",
                    fill: false,
                    backgroundColor: [
                        "rgba(0, 71, 171, .9)", // cor das barras (single bar chart)
                        "rgba(0, 150, 255, .9)",
                        "rgba(0, 150, 255, .5)",
                        "rgba(137, 207, 240, .9)",
                        "rgba(137, 207, 240, .4)"
                    ],
                    data: [
                        55,
                        49, 
                        44, 
                        24, 
                        15]
                }],
/* Valores Padrao
                datasets: [{
                label: "Sensor",
                fill: false,
                backgroundColor: [
                    "rgba(0, 71, 171, .9)", // cor das barras (single bar chart)
                    "rgba(0, 150, 255, .9)",
                    "rgba(0, 150, 255, .5)",
                    "rgba(137, 207, 240, .9)",
                    "rgba(137, 207, 240, .4)"
                ],
                data: [55, 49, 44, 24, 15]
                }]
*/
        },
        options: {
            responsive: true
        }
    });

//--Aqui também tem um Grafico na tela. É o Grafico em Colunas da tela index.html

//-- TELA -> chart.html
//-- Grafico em Pizza
    // Pie Chart - Poluentes
    var ctx5 = $("#pie-chart").get(0).getContext("2d");
    var myChart5 = new Chart(ctx5, {
        type: "pie",
        data: {
            labels: ["Monóxido de Carbono", "Dióxido de Carbono","Dióxido de Nitrogênio", "Ozônio"],
            datasets: [{
                backgroundColor: [
                    "rgba(0, 71, 171, .9)",  // cor das fatias (pie chart)
                    "rgba(0, 150, 255, .9)",
                    "rgba(0, 150, 255, .5)",
                    "rgba(137, 207, 240, .9)",
                    "rgba(137, 207, 240, .4)"
                ],
                data: [55, 49, 44, 24]
            }]
        },
        options: {
            responsive: true
        }
    });

//-- TELA -> chart.html
//-- Circular
    // Doughnut Chart
    var ctx6 = $("#doughnut-chart").get(0).getContext("2d");
    var myChart6 = new Chart(ctx6, {
        type: "doughnut",
        data: {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [{
                backgroundColor: [
                    "rgba(0, 71, 171, .9)", // cor das fatias (doughnut chart)
                    "rgba(0, 150, 255, .9)",
                    "rgba(0, 150, 255, .5)",
                    "rgba(137, 207, 240, .9)",
                    "rgba(137, 207, 240, .4)"
                ],
                data: [55, 49, 44, 24, 15]
            }]
        },
        options: {
            responsive: true
        }
    });


})(jQuery);
