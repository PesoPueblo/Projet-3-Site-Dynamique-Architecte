//localiser les différents input
const email = document.querySelector('#email').value;
const password= document.querySelector('#password').value;
const submit=document.querySelector('#submit');
const loginform = document.querySelector('#loginform')
//créer un objet user avec les paramètre à étudier
let user = {
    email: email,
    password: password,};
//Faire appel à l'API pour récupérer le token


//Valider le resultat 
submit.addEventListener('click', (e) =>{
    e.preventDefault();
    fetch('http://localhost:5678/api/users/login',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  })
  .then(result=>result.json())
  .then(result =>{ console.log(result);
                   if (result.error){alert("Erreur dans l’identifiant ou le mot de passe")} 
                   else {window.location.assign("index.html");}})
  .catch((err)=>{console.log(err)});

});
