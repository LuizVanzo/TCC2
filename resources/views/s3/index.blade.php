@csrf
<script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<div class="col-md-12">
    <input name="nm_arquivo" id="nm_arquivo" required type="file" accept=".apk" class="dropifyApk"/>
</div>

<button onclick="teste()">aaaaaa</button>

<script>
    async function uploadFile(file) {
     var csrf_token = $('meta[name="csrf-token"]').attr("content");
 
     try {
         // Chamada AJAX para obter o presigned URL
         const response = await $.ajax({
             url: '/presigned-url-apk',
             method: "GET",
             data: {
                 '_token': csrf_token,
                 'nomeArquivo': file.name,
                 'contentType': file.type,
             },
         });
 
         console.log(response);
         
         // Enviar o arquivo para o S3 usando o URL presigned
         const result = await fetch(response.url, {
             method: 'PUT',
             headers: {
                 'Content-Type': file.type,
             },
             body: file,
         });
 
         if (result.ok) {
             console.log('Upload concluído com sucesso!');
         } else {
             console.error('Erro ao fazer o upload');
         }
 
     } catch (error) {
         console.error('Erro durante o processo de upload:', error);
     }
 }
 
 function teste() {
     const file = document.getElementById('nm_arquivo');
     console.log(file);
     console.log(file.files[0]);
     if (file && file.files[0]) {
         uploadFile(file.files[0]);
     }
 }
 
 </script>