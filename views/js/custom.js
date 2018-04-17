$(function () {
    $(document).on("click", "a#paciente_list", function () {
        getPacienteList(this);
    });
    $(document).on("click", "a#consulta_list", function () {
        getConsultaList(this);
    });
    $(document).on("click", "a#medico_list", function () {
        getMedicoList(this);
    });


    $(document).on("click", "a#create_paciente_form", function () {
        getCreatePacienteForm(this);
    });
    $(document).on("click", "a#create_consulta_form", function () {
        getCreateConsultaForm(this);
    });
    $(document).on("click", "a#create_medico_form", function () {
        getCreateMedicoForm(this);
    });

    $(document).on("click", "button#add_paciente", function () {
        addPaciente(this);
    });
    $(document).on("click", "button#add_consulta", function () {
        addConsulta(this);
    });
    $(document).on("click", "button#add_medico", function () {
        addMedico(this);
    });
    $(document).on("click", "button#filtrar", function () {
        getConsultaFilter(this);
    });

    $(document).on("click", "a.delete_paciente_confirm", function () {
        deletePacienteConfirmation(this);
    });
    $(document).on("click", "a.delete_consulta_confirm", function () {
        deleteConsultaConfirmation(this);
    });
    $(document).on("click", "a.delete_medico_confirm", function () {
        deleteMedicoConfirmation(this);
    });


    $(document).on("click", "button.delete_paciente", function () {
        deletePaciente(this);
    });
    $(document).on("click", "button.delete_consulta", function () {
        deleteConsulta(this);
    });
    $(document).on("click", "button.delete_medico", function () {
        deleteMedico(this);
    });


    $(document).on("dblclick", "td.edit", function () {
        makeEditable(this);
    });
    $(document).on("blur", "input#editbox", function () {
        removeEditable(this)
    });

});

function removeEditable(element) {

    $('#indicator').show();

    if ($('.current').attr('medico_id') != null) {

        var Medico = new Object();
        Medico.id = $('.current').attr('medico_id');
        Medico.field = $('.current').attr('field');
        Medico.newvalue = $(element).val();

        var MedicoJson = JSON.stringify(Medico);

        $.post('controllers/MedicoController.php',
            {
                action: 'update',
                medico: MedicoJson
            },
            function (data, textStatus) {
                $('td.current').html($(element).val());
                $('.current').removeClass('current');
                $('#indicator').hide();
            },
            "json"
        );
    }

    if ($('.current').attr('paciente_id') != null) {
        var Paciente = new Object();
        Paciente.id = $('.current').attr('paciente_id');
        Paciente.field = $('.current').attr('field');
        Paciente.newvalue = $(element).val();

        var PacienteJson = JSON.stringify(Paciente);

        $.post('controllers/PacienteController.php',
            {
                action: 'update',
                paciente: PacienteJson
            },
            function (data, textStatus) {
                $('td.current').html($(element).val());
                $('.current').removeClass('current');
                $('#indicator').hide();
            },
            "json"
        );
    }
    if ($('.current').attr('consulta_id') != null) {
        var Consulta = new Object();
        Consulta.id = $('.current').attr('consulta_id');
        Consulta.field = $('.current').attr('field');
        Consulta.newvalue = $(element).val();

        var ConsultaJson = JSON.stringify(Consulta);

        $.post('controllers/ConsultaController.php',
            {
                action: 'update',
                consulta: ConsultaJson
            },
            function (data, textStatus) {
                $('td.current').html($(element).val());
                $('.current').removeClass('current');
                $('#indicator').hide();
            },
            "json"
        );
    }


}

function makeEditable(element) {
    $(element).html('<input id="editbox" size="' + $(element).text().length + '" type="text" value="' + $(element).text() + '">');
    $('#editbox').focus();
    $(element).addClass('current');
}

function deleteMedicoConfirmation(element) {
    $("#delete_medico_confirm_modal").modal("show");
    $("#delete_medico_confirm_modal input#medico_id").val($(element).attr('medico_id'));
}


function deletePacienteConfirmation(element) {
    $("#delete_paciente_confirm_modal").modal("show");
    $("#delete_paciente_confirm_modal input#paciente_id").val($(element).attr('paciente_id'));
}

function deleteConsultaConfirmation(element) {
    $("#delete_consulta_confirm_modal").modal("show");
    $("#delete_consulta_confirm_modal input#consulta_id").val($(element).attr('consulta_id'));
}

// **************************************************
// DELETAR DADOS
// ==================================================

function deleteMedico(element) {

    var Medico = new Object();
    Medico.id = $("#delete_medico_confirm_modal input#medico_id").val();

    var MedicoJson = JSON.stringify(Medico);

    $.post('controllers/MedicoController.php',
        {
            action: 'delete',
            medico: MedicoJson
        },
        function (data, textStatus) {
            getMedicoList(element);
            $("#delete_medico_confirm_modal").modal("hide");
        },
        "json"
    );
}

function deletePaciente(element) {

    var Paciente = new Object();
    Paciente.id = $("#delete_paciente_confirm_modal input#paciente_id").val();

    var PacienteJson = JSON.stringify(Paciente);

    $.post('controllers/PacienteController.php',
        {
            action: 'delete',
            paciente: PacienteJson
        },
        function (data, textStatus) {
            getPacienteList(element);
            $("#delete_paciente_confirm_modal").modal("hide");
        },
        "json"
    );
}

function deleteConsulta(element) {

    var Consulta = new Object();
    Consulta.id = $("#delete_consulta_confirm_modal input#consulta_id").val();

    var ConsultaJson = JSON.stringify(Consulta);

    $.post('controllers/ConsultaController.php',
        {
            action: 'delete',
            consulta: ConsultaJson
        },
        function (data, textStatus) {
            getConsultaList(element);
            $("#delete_consulta_confirm_modal").modal("hide");
        },
        "json"
    );
}

// ==================================================
// FIM DELETAR DADOS
// **************************************************

// **************************************************
// GERAR LISTA
// ==================================================
function getPacienteList(element) {

    $('#indicator').show();

    $.post('controllers/PacienteController.php',
        {
            action: 'get'
        },
        function (data, textStatus) {
            renderPacienteList(data);
            $('#indicator').hide();
        },
        "json"
    );
}

function getMedicoList(element) {

    $('#indicator').show();

    $.post('controllers/MedicoController.php',
        {
            action: 'get'
        },
        function (data, textStatus) {
            renderMedicoList(data);
            $('#indicator').hide();
        },
        "json"
    );
}

function getConsultaList(element) {

    $('#indicator').show();

    $.post('controllers/ConsultaController.php',
        {
            action: 'get'
        },
        function (data, textStatus) {
            renderConsultaList(data);
            $('#indicator').hide();
        },
        "json"
    );
}

function getConsultaFilter(element) {

    $('#indicator').show();
    var Filter = new Object();
    Filter.data_filtro = $('#data_consulta_filter').val();

    var FilterJson = JSON.stringify(Filter);

    $.post('controllers/ConsultaController.php',
        {
            action: 'filter',
            consulta: FilterJson
        },
        function (data, textStatus) {
            renderConsultaList(data);
            $('#indicator').hide();
        },
        "json"
    );
}

// ==================================================
// FIM GERAR LISTA
// **************************************************

function renderPacienteList(jsonData) {

    var table = '<table width="600" cellpadding="5" class="table table-hover table-bordered"><thead><tr><th scope="col">Name</th><th scope="col">Email</th><th scope="col">Ações</th></th></tr></thead><tbody>';

    $.each(jsonData, function (index, paciente) {
        table += '<tr>';
        table += '<td class="edit" field="name" paciente_id="' + paciente.id + '">' + paciente.name + '</td>';
        table += '<td class="edit" field="email" paciente_id="' + paciente.id + '">' + paciente.email + '</td>';
        table += '<td><a href="javascript:void(0);" paciente_id="' + paciente.id + '" class="delete_paciente_confirm btn btn-danger">X</a></td>';
        table += '</tr>';
    });

    table += '</tbody></table>';

    $('div#content').html(table);
}


function renderMedicoList(jsonData) {

    var table = '<table width="600" cellpadding="5" class="table table-hover table-bordered"><thead><tr><th scope="col">Name</th><th scope="col">Email</th><th scope="col">Ações</th></th></tr></thead><tbody>';

    $.each(jsonData, function (index, medico) {
        table += '<tr>';
        table += '<td class="edit" field="name" medico_id="' + medico.id + '">' + medico.name + '</td>';
        table += '<td class="edit" field="email" medico_id="' + medico.id + '">' + medico.email + '</td>';
        table += '<td><a href="javascript:void(0);" medico_id="' + medico.id + '" class="delete_medico_confirm btn btn-danger">X</a></td>';
        table += '</tr>';
    });

    table += '</tbody></table>';

    $('div#content').html(table);
}

function renderConsultaList(jsonData) {

    var table = '<table width="600" cellpadding="5" class="table table-hover table-bordered"><thead><tr><th scope="col">Medico</th><th scope="col">Paciente</th><th scope="col">Data</th><th scope="col">Ações</th></th></tr></thead><tbody>';

    console.log(jsonData);

    $.each(jsonData, function (index, consulta) {
        table += '<tr>';
        table += '<td field="medico_id" consulta_id="' + consulta.id + '">' + consulta.medico + '</td>';
        table += '<td field="paciente_id" consulta_id="' + consulta.id + '">' + consulta.paciente + '</td>';
        table += '<td class="edit" field="data_consulta" consulta_id="' + consulta.id + '">' + consulta.data_consulta + '</td>';
        table += '<td><a href="javascript:void(0);" consulta_id="' + consulta.id + '" class="delete_consulta_confirm btn btn-danger">X</a></td>';
        table += '</tr>';
    });

    table += '</tbody></table>';

    table += '<div class="form-group">';
    table += '<label for="data_consulta_filter">Filtrar data:</label>';
    table += '<input type="date" class="form-control" name="data" id="data_consulta_filter" required>';
    table += '</div>';
    table += '<button type="button" id="filtrar" class="btn btn-primary"> Filtrar</button>';

    $('div#content').html(table);
}

function addMedico(element) {

    $('#indicator').show();

    var Medico = new Object();
    Medico.name = $('input#name').val();
    Medico.email = $('input#email').val();

    var MedicoJson = JSON.stringify(Medico);

    $.post('controllers/MedicoController.php',
        {
            action: 'add',
            medico: MedicoJson
        },
        function (data, textStatus) {
            getMedicoList(element);
            $('#indicator').hide();
        },
        "json"
    );
}


function addPaciente(element) {

    $('#indicator').show();

    var Paciente = new Object();
    Paciente.name = $('input#name').val();
    Paciente.email = $('input#email').val();

    var PacienteJson = JSON.stringify(Paciente);

    $.post('controllers/PacienteController.php',
        {
            action: 'add',
            paciente: PacienteJson
        },
        function (data, textStatus) {
            getPacienteList(element);
            $('#indicator').hide();
        },
        "json"
    );
}


function addConsulta(element) {

    $('#indicator').show();

    var Consulta = new Object();
    Consulta.medico_id = $('select#medico_id option:selected').val();
    Consulta.paciente_id = $('select#paciente_id option:selected').val();
    Consulta.data_consulta = $('input#data_consulta').val();

    var ConsultaJson = JSON.stringify(Consulta);

    $.post('controllers/ConsultaController.php',
        {
            action: 'add',
            consulta: ConsultaJson
        },
        function (data, textStatus) {
            getConsultaList(element);
            $('#indicator').hide();
        },
        "json"
    );
}

function getCreatePacienteForm(element) {
    var form = '<div class="form-group">';
    form += '<label for="name"> Nome</label>';
    form += '<input type="text" class="form-control" id="name" name="name" value="" />';
    form += '</div>';

    form += '<div class="form-group">';
    form += '<label for="email"> Email</label>';
    form += '<input type="text" class="form-control" id="email" name="email" value="" />';
    form += '</div>';
    form += '<button type="button" id="add_paciente" class="btn btn-primary"> Adicionar Paciente</button>';

    $('div#content').html(form);
}

function getCreateMedicoForm(element) {
    var form = '<div class="form-group">';
    form += '<label for="name">Nome</label>';
    form += '<input type="text" class="form-control" id="name" name="name" value="" />';
    form += '</div>';

    form += '<div class="form-group">';
    form += '<label for="name">Email</label>';
    form += '<input type="text" class="form-control" id="email" name="email" value="" />';
    form += '</div>';
    form += '<button type="button" id="add_medico" class="btn btn-primary"> Adicionar Medico</button>';

    $('div#content').html(form);
}

function getCreateConsultaForm(element) {


    var form = '<div class="form-group">';
    form += '<label for="medico_id">Médico: </label>';
    form += '<select name="medico_id" id="medico_id" class="form-control" required>';
    form += '</select>';
    form += '</div>';

    form += '<div class="form-group">';
    form += '<label for="paciente_id">Paciente: </label>';
    form += '<select name="paciente_id" id="paciente_id" class="form-control" required>';
    form += '</select>';
    form += '</div>';

    form += '<div class="form-group">';
    form += '<label for="date">Data: </label>';
    form += '<input type="date" name="data" id="data_consulta" class="form-control" required>';
    form += '</div>';

    form += '<button type="button" id="add_consulta" class="btn btn-primary"> Adicionar Consulta</button>';

    $('div#content').html(form);

    var medicos = '<option value="">Selecionar</option>';
    $.post('controllers/MedicoController.php',
        {
            action: 'get'
        },
        function (data, textStatus) {

            $.each(data, function (index, medico) {
                medicos += '<option value="' + medico.id + '">' + medico.name + '</option>';
            });
            $('#medico_id').html(medicos);
        },
        "json"
    );


    var pacientes = '<option value="">Selecionar</option>';
    $.post('controllers/PacienteController.php',
        {
            action: 'get'
        },
        function (data, textStatus) {

            $.each(data, function (index, paciente) {
                pacientes += '<option value="' + paciente.id + '">' + paciente.name + '</option>';
            });
            $('#paciente_id').html(pacientes);
        },
        "json"
    );


}