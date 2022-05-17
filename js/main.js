$(async () => {
    const server = "https://dailyapside-default-rtdb.firebaseio.com";

    let fecha = moment();

    const listarUsuarios = async() => {
        $(".fecha").html(`Fecha: ${fecha.format("DD/MM/YYYY")}`)
        let usuarios = await fetch(`${server}/usuarios.json`);
        usuarios = await usuarios.json();
        usuarios.sort((a,b) => a > b ? 1 : -1);
        usuarios.forEach(usuario => {
            $(".usuarios").append(`
                <div class='mt-2'>
                    <input class="form-check-input input-registro" data-name='${usuario}' type="checkbox" value="">
                        <label class="form-check-label" for="flexCheckChecked">
                        ${usuario}
                    </label>
                </div>
            `)
        });
    }

    await listarUsuarios();

    const registros = async () => {
        let registros = await fetch(`${server}/registro/${fecha.format("YYYYMMDD")}.json`);
        registros = await registros.json();
        registros = registros ? Object.entries(registros) : [];
        

        let checks = $(".input-registro");

        for (const check of checks) {
            $(check).prop('checked', false);
            const name  = $(check).data('name');
            let busqueda = registros.find(([key, value]) => value == name)
            if(busqueda){
                $(check).data("key", busqueda[0]);
                $(check).prop('checked', true);
            }
        }
    }

    registros();

    setInterval(() => {
        registros();
    }, 6000);

    $(document).on("change",".input-registro", async function() {
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
            } catch (error) {
                alert("Ocurrió un error actualizando, intente nuevamente");
                location.reload();
            }
        } else {
            const key = $(this).data('key');
            if(key){
                const response = await fetch(`${server}/registro/${fecha.format("YYYYMMDD")}/${key}.json`,{
                    method: 'DELETE'});
            }
        }
    })

})