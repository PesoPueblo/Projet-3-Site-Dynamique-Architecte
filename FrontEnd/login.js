const submit=document.querySelector('#submit');
//ecouter l'envoie du form
submit.addEventListener('click', (e) =>{
    e.preventDefault();

    //localiser les valeurs des différents input
    const email = document.querySelector('#email').value;
    const password= document.querySelector('#password').value;

    //créer un objet user avec les paramètre à étudier
    let user = {
    email: email,
    password: password,};
    console.log(user);

    //Faire appel à l'API pour récupérer le token
    fetch('http://localhost:5678/api/users/login',{
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify (user)})
    .then(result=>result.json())
    //créer une condition pour soit redirigé soit mettre un message d'erreur 
    .then(result =>{ console.log(result);
                   if (result.token){localStorage.setItem("token", result.token);
                                    window.location.assign("index.html")} 
                   else{alert("Erreur dans l’identifiant ou le mot de passe")} })
    .catch((err)=>{console.log(err)})
  });
