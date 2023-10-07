const token = document.querySelector('input[name="csrfmiddlewaretoken"]');

async function getEventosCompletados() {
    try {
        activateLoading();
        let response = await fetch("listadoEventoCompletado/", { method: "GET" });

        if (response.ok) {
            const responseJson = await response.json();

            $("#table").DataTable({
                data: responseJson,
                columns: [
                    { data: "nit" },
                    { data: "nombre" },
                    { data: "id_evento" },
                    { data: "nombreEvento" },
                    { data: "placas" },
                    { data: "direccion" },
                    {
                        defaultContent:
                            '<button class="btn mx-1 btn-outline-success btn-completado data-toggle="tooltip" data-placement="top" title="Marcar como entregado"><i class="far fa-check-circle"></i></button>' +
                            '<button class="btn mx-1 btn-outline-danger btn-delete"  data-toggle="tooltip" data-placement="top" title="Anular Evento"><i class="fa-solid fa-delete-left"></i></button>',
                    },
                ],

                ordering: false,
            });
            desactivateLoading();
        } else {
            desactivateLoading();
        }
    } catch (error) {
        alertify.error(error);
        desactivateLoading();
    }
    desactivateLoading();
}


document.addEventListener("DOMContentLoaded", () => {
    getEventosCompletados();

});


$(document).on("click", ".btn-completado", function () {
    const parentBtn = $(this).closest("tr");
    const tabla = $("#table").DataTable();
    const dataRow = tabla.row(parentBtn).data();
    alertify.confirm(
        "Marcar como entregado",
        "Esta seguro de marcar como entregado evento NO." + dataRow.id_evento,
        function () {
            marcarEntregado(dataRow.id_evento);
        },
        function () {
            alertify.error("Cancel");
        }
    );
});


function marcarEntregado(orden) {
    const formData = new FormData();
    formData.append("orden", orden);
    fetch("marcarEntregado/", {
        method: "POST",
        body: formData,
        headers: { "X-CSRFToken": token.value },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.flag) {
                $("#table").DataTable().destroy();
                if (listarEventos) {
                    getEventos();
                } else {
                    getEventosCompletados();
                }
                alertify.success(data.mensaje);
            } else {
                desactivateLoading();
                alertify.error(data.mensaje);
            }
        })
        .catch((error) => {
            alertify.error(error.mensaje);
            desactivateLoading();
        });
    desactivateLoading();
}
