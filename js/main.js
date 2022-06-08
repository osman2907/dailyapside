$(async () => {
    const server = "https://dailyapside-default-rtdb.firebaseio.com";

    let fecha = moment();

    const listarUsuarios = async() => {
        $(".fecha").append(`<h3>Información daily  ${fecha.format("DD/MM/YYYY")}</h3>`)
        let usuarios = await fetch(`${server}/usuarios.json`);
        usuarios = await usuarios.json();
        usuarios.sort((a,b) => a > b ? 1 : -1);
        usuarios.forEach((usuario, index) => {
            if(usuario){
                $(".faltantes").append(`
                <div id="${usuario}" style="display:contents;">
                <input id="${index}" class="form-check-input input-registro" data-name='${usuario}' type="checkbox" value="">
                    <label for="${index}" class="form-check-label" for="flexCheckChecked">
                        ${usuario}
                    </label>
                </div>
                `)
            }
        });
    }

    await listarUsuarios();

    const registros = async (firstTime = false) => {
        let registros = await fetch(`${server}/registro/${fecha.format("YYYYMMDD")}.json`);
        registros = await registros.json();
        registros = registros ? Object.entries(registros) : [];

        $(".input-registro").each(function() {
            const check = $(this);

            const name = check.data('name');
            let busqueda = registros.find(([_key, value]) => value == name)
            if(busqueda){
                check.data("key", busqueda[0]);
                check.prop('checked', true);
                $(".listos").append(check.parent());
                $(".faltantes").remove(check.parent());
                ordenarListas();
            }else{
                check.prop('checked', false);
                $(".faltantes").append(check.parent());
                $(".listos").remove(check.parent());
                ordenarListas();
            }

            if(check.is(":checked")){
                // si esta checkeado y esta en faltantes lo saca y lo coloca en listos
                if(check.parent().parent('.faltantes').length){
                    $(".listos").append(check.parent());
                    $(".faltantes").remove(check.parent());
                    ordenarListas();
                }
            }else{
                // si no esta checkeado y esta en listos lo saca y lo coloca en faltantes
                if(check.parent().parent('.listos').length){
                    $(".faltantes").append(check.parent());
                    $(".listos").remove(check.parent());
                    ordenarListas();
                }
            }

        });
    }

    const ordenarListas = () => {
        $(".listos").append($(".listos").children().sort(function(a, b) {
            return $(a).attr("id") > $(b).attr("id")? 1 : -1;
        }));
        $(".faltantes").append($(".faltantes").children().sort(function(a, b) {
            return $(a).attr("id") > $(b).attr("id")? 1 : -1;
        }));
    }

    registros(true);

    setInterval(() => {
        registros();
    }, 6000);

    $(document).on("change",".input-registro", async function() {
        const check = $(this);
        const valor = $(this).prop('checked');
        const name = $(this).data('name');
        
        if(valor){
            try {
                let response = await fetch(`${server}/registro/${fecha.format("YYYYMMDD")}.json`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'applicaton/json'
                    },
                    body: JSON.stringify(name)
                });
                response=await response.json()
                $(this).data("key", response.name);
                $(".listos").append(check.parent());
                $(".faltantes").remove(check.parent());
                ordenarListas();
                
            } catch (error) {
                alert("Ocurrió un error actualizando, intente nuevamente");
                location.reload();
            }
        } else {
            const key = $(this).data('key');
            if(key){
                const response = await fetch(`${server}/registro/${fecha.format("YYYYMMDD")}/${key}.json`,{
                    method: 'DELETE'
                });
                $(".listos").remove(check.parent());
                $(".faltantes").append(check.parent());
                ordenarListas();
            }
        }
    })

})