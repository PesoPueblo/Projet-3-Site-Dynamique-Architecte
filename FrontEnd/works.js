//récupération du token
let token = localStorage.getItem("token");

//gestion de la connexion si token existant
if (token != null){
    //changement du lien login en logout et gestion du comportement
    const linkConnect = document.querySelector("#connect");
    linkConnect.innerHTML='<a href="index.html">logout</a>';
    linkConnect.addEventListener('click', ()=>{localStorage.removeItem("token")});

    //rajout de la bar d'admin
    const toolAdmin = document.querySelector("#Admintoolbarhide");
    toolAdmin.id= "Admintoolbar"  

    //affichage des boutons "modifier"
    const buttonModifier = document.querySelectorAll(".buttonmodifier");
    buttonModifier.forEach(element => {element.removeAttribute("style")});

    //cacher les filtres 
    const filters = document.querySelector("#filtres");
    filters.setAttribute("style", "display:none");

}

//création de la fonction génération travaux pour la modal
async function generateWorkModal(works) {
        for (let i=0;i< works.length;i++) {
            let work = works[i]
            let workElementModal = document.createElement ("figure")
            let imageElementModal = document.createElement('img');
            imageElementModal.setAttribute ("src", work.imageUrl);
            imageElementModal.setAttribute ("crossOrigin" , "anonymous");
            imageElementModal.setAttribute ("alt" , work.title);
            let buttonsuprimmer = document.createElement('i');
            buttonsuprimmer.setAttribute('class',"fa-solid fa-trash-can")
            buttonsuprimmer.setAttribute('id',work.id)
            let titleEditionModal = document.createElement('figcaption');
            titleEditionModal.innerText ="éditer";
            const divGalleryModal= document.querySelector(".gallerymodal");
            divGalleryModal.appendChild(workElementModal);
            workElementModal.appendChild(imageElementModal);
            workElementModal.appendChild(buttonsuprimmer)
            workElementModal.appendChild(titleEditionModal);
        }
}

//déclaration générale
const divGallery = document.querySelector(".gallery");
const filtreTous = document.getElementById("filtre_tous");
const filtreObjets = document.getElementById("filtre_objets");
const filtreAppartements = document.getElementById("filtre_appartements");
const filtreAutres = document.getElementById("filtre_autres");

//déclare la fonction qui génère les travaux
function generateWork(works) {
    for (let i=0;i< works.length;i++) {
        let work = works[i]
        let workElement = document.createElement ("figure");
        let imageElement = document.createElement('img');
        imageElement.setAttribute ("src", work.imageUrl);
        imageElement.setAttribute ("crossOrigin" , "anonymous");
        imageElement.setAttribute ("alt" , work.title);
        let titleElement = document.createElement('figcaption');
        titleElement.innerText =work.title
        divGallery.appendChild(workElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(titleElement);
        
    }
}

// Importation des travaux via l'API 
const travaux=fetch('http://localhost:5678/api/works')
    .then(allWorks => allWorks.json())
    .catch(function(err) {
        console.log("Problème importation des travaux depuis l'API")
    });

//genere les travaux
travaux .then(allWorks =>generateWork(allWorks))
        .catch(function(err) {
            console.log("Erreur dans la génération de tous les travaux")
        });


//pour affichage Tous seulement
filtreTous.addEventListener("click", function() {
    divGallery.innerHTML="";
    //générer les travaux 
    travaux.then(allWorks =>generateWork(allWorks))
    .catch(function(err){
        console.log("Erreur dans la génération de tous les travaux")
    });

    //changement de style des boutons filtre
    filtreTous.classList.add("active");
    filtreObjets.classList.remove("active");
    filtreAppartements.classList.remove("active");
    filtreAutres.classList.remove("active"); 
});

//pour affichage Objets seulement
filtreObjets.addEventListener("click", function() {
    divGallery.innerHTML="";

    //tri des travaux en fonction de la catégorie choisi
    const worksObjets = travaux.then(allWorks=> 
        allWorks.filter(function(work) {
            return work.categoryId == 1 
        })
    );

    //générer les travaux en fonction de la liste obtenue 
    worksObjets.then(worksObjets=>generateWork(worksObjets))
               .catch(function(err) {
                console.log("Erreur dans la génération des travaux objets")
               });

    //changement de style des boutons filtre
    filtreObjets.classList.add("active");
    filtreTous.classList.remove("active");
    filtreAppartements.classList.remove("active");
    filtreAutres.classList.remove("active"); 
});

//pour affichage Appartements seulement
filtreAppartements.addEventListener("click", function() {
    divGallery.innerHTML="";

    //tri des travaux en fonction de la catégorie choisi
    const worksAppartements = travaux.then(allWorks=>
        allWorks.filter(function(work) {
            return work.categoryId == 2
        })
    );

    //générer les travaux en fonction de la liste obtenue
    worksAppartements.then(worksAppartements=>generateWork(worksAppartements))
    .catch(function(err){
        console.log("Erreur dans la génération des travaux Appartements")
    });

    //changement de style des boutons filtre
    filtreAppartements.classList.add("active");
    filtreTous.classList.remove("active");
    filtreObjets.classList.remove("active");
    filtreAutres.classList.remove("active"); 
});

//pour affichage Autres seulement
filtreAutres.addEventListener("click", function(){
    divGallery.innerHTML="";

    //tri des travaux en fonction de la catégorie choisi
    const worksAutres = travaux.then(allWorks=> 
        allWorks.filter(function(work) {
            return work.categoryId == 3
        })
    );

    //générer les travaux en fonction de la liste obtenue 
    worksAutres.then(worksAutres=>generateWork(worksAutres))
    .catch(function(err) {
        console.log("Erreur dans la génération des travaux Autres")
    });
                                                
    //changement de style des boutons filtre
    filtreAutres.classList.add("active");
    filtreTous.classList.remove("active");
    filtreAppartements.classList.remove("active");
    filtreObjets.classList.remove("active");
});

//générer les travaux dans la modal
travaux .then(allWorks =>generateWorkModal(allWorks));    

//ouverture et fermeture de la boite modale
let modal= null;
const stopPropag = function(event){ event.stopPropagation()}

function openModal(event) { 
    event.preventDefault();

    //cible la modal à ouvrir
    const target = document.querySelector(event.target.getAttribute('href'));

    //change les paramètre pour l'afficher
    target.setAttribute('style', 'display: null');
    target.setAttribute('aria-modal', 'true');
    target.removeAttribute('aria-hidden');
    modal=target;

    //gestion de la fermeture de la modal
    modal.addEventListener('click', closeModal);

    let wrappeur = modal.querySelector('.modalwrapeur');
    wrappeur.addEventListener('click', stopPropag) 

    let boutonClose = modal.querySelector('.close'); 
    boutonClose.addEventListener('click',closeModal);

    //ecoute du click poubelle
    const buttonTrash = document.querySelectorAll(".fa-trash-can");
    if (buttonTrash != null){
        buttonTrash.forEach(element => {
            element.addEventListener('click',function() {
                deleteWorks(element)
            })
        })
    }

}

//fonction qui gère la fermeture des modals
const closeModal= function(event) { 
    if (modal == null) return
    event.preventDefault();
    modal.setAttribute('style', 'display: none');
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal', 'true')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.close').removeEventListener('click',closeModal)
    modal.querySelector('.modalwrapeur').removeEventListener('click', stopPropag)
    modal=null
}

//event du click flèche retour 
const boutonReturn = document.querySelector("#return");
if (boutonReturn != null ){
    boutonReturn.addEventListener('click',closeModal);
    boutonReturn.addEventListener('click',openModal);
}

//event du bouton ajout photo
const ajoutphoto= document.querySelector('#ajout');
if (ajoutphoto != null){
    ajoutphoto.addEventListener('click',closeModal);
    ajoutphoto.addEventListener('click',openModal);
}

//ecoute des clicks liens ouverture de modals
document.querySelectorAll('.js-modal')
    .forEach(Element=>{
             Element.addEventListener("click",openModal);
            });

//fonction de suppression de travaux
function deleteWorks (work) {
    console.log(work.id);
    if (confirm('Voulez-vous vraiement supprimé ce tarvail ?')) {
        fetch(`http://localhost:5678/api/works/${work.id}`, {
            method:"DELETE",
            headers:{'Authorization': 'Bearer ' + token}
        })
    }
    else {return}
}

//ajout d'image 

let form = document.querySelector('#ajoutphoto')
form.addEventListener('submit', (ajout)=> {
    ajout.preventDefault();
    let title=document.querySelector('#title').value
    console.log(title)
    let image=document.querySelector('#newfile').files[0]
    console.log(image)
    let categories = document.querySelector('#categories')
    let category = categories.value;
    console.log(category)
    let newWork = new FormData();
    newWork.append('image',image);
    newWork.append('title',title);
    newWork.append('category',category);
    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {'Authorization': 'Bearer ' + token},
        body: newWork
    })
})

function previewFile() {
    const preview = document.querySelector('#preview');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    const buttonfile = document.querySelector('#buttonajout')
    const paramètre = document.querySelector('#parametre')
  
    reader.addEventListener("load", () => {
      preview.src = reader.result;
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
      buttonfile.setAttribute('style', 'display: none')
      paramètre.setAttribute('style', 'display: none')
    }
}