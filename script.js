document.addEventListener('DOMContentLoaded', function() {
    const orgaoSelect = document.getElementById('orgao');
    const codigoSelect = document.getElementById('codigo');
    const comentarioTextarea = document.getElementById('comentarios');
    const impressaoDiagnosticaTextarea = document.getElementById('impressao_diagnostica');

    fetch('codes.json')
        .then(response => response.json())
        .then(data => {
            const orgaos = new Set(data.map(item => item.orgao));
            orgaos.forEach(orgao => {
                const option = document.createElement('option');
                option.value = orgao;
                option.textContent = orgao;
                orgaoSelect.appendChild(option);
            });

            orgaoSelect.addEventListener('change', function() {
                const selectedOrgao = this.value;
                codigoSelect.innerHTML = '<option value="">Selecione...</option>';
                data.filter(item => item.orgao === selectedOrgao).forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.codigo;
                    option.textContent = item.codigo;
                    codigoSelect.appendChild(option);
                });
            });

            codigoSelect.addEventListener('change', function() {
                const selectedCodigo = this.value;
                const item = data.find(item => item.codigo === selectedCodigo);
                comentarioTextarea.value = item ? item.comentario : '';
                impressaoDiagnosticaTextarea.value = item ? item.impressao_diagnostica : '';
            });

            data.push({
                "codigo": "ADDANDN",
                "comentario": "aumentada de tamanho, medindo <var1> cm x <var2> cm x <var3> cm (polo caudal x polo cranial x comprimento).",
                "impressao_diagnostica": "Adrenomegalia direita, não podendo descartar por completo processo neoplásico.",
                "status": "ANORMAL",
                "orgao": "ADRENAL DIREITA"
            });
        })
        .catch(error => console.error('Error loading the JSON data:', error));
});