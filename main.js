var submit = document.getElementById("submit");
var output = document.querySelector(".output");

submit.addEventListener("click", () => {
   var langs = document.getElementById("selected-langs");
   var language = langs.selectedOptions[0].value;
   output.innerHTML = "Compiling...";
   compileCode(code.value, language);
});

function compileCode(code, language) {
   
   var request = new XMLHttpRequest();
   request.open("POST", "https://codequotient.com/api/executeCode");
   request.setRequestHeader( "Content-Type", "application/json");

   const data = { "code": `${code}`, "langId": language };
   request.send(JSON.stringify(data));

   
   request.addEventListener("load", function (event) {
      var result = JSON.parse(event.target.responseText);

      if(language == -1){
         output.innerHTML = "Error: Please select a language";
      }
      else if(result.error){
         output.innerHTML = result.error;
      }
      else{
         setTimeout(()=>{
         getOutput(result.codeId);
      }, 5000);
      }
   });
}


function getOutput(codeId){
   var request = new XMLHttpRequest();
   request.open("GET", `https://codequotient.com/api/codeResult/${codeId}`);
   request.setRequestHeader( "Content-Type", "application/json");
   request.send();

   
   request.addEventListener("load", function (event) {
      var response = JSON.parse(JSON.parse(event.target.responseText).data);
      console.log(response)
      
      if(response.errors != ""){
         output.innerHTML = response.errors;
      }else{
         console.log(response)
         output.innerHTML = response.output.replace("OUTPUT:\n", "").trimStart().replaceAll("\n", "<br>");
      }
   });
}