//déclaration générale
const divGallery = document.querySelector(".gallery");
const filtreTous = document.getElementById("filtre_tous");
const filtreObjets = document.getElementById("filtre_objets");
const filtreAppartements = document.getElementById("filtre_appartements");
const filtreAutres = document.getElementById("filtre_autres");
//déclare la fonction qui génère les travaux
function generateWork(a)
{console.table(a);
    for (let i=0;i<= a.length;i++)
    {
        let work = a[i];
        let workElement = document.createElement ("figure");
        let imageElement = document.createElement('img');
        imageElement.setAttribute ("src", work.imageUrl);
        imageElement.setAttribute ("crossOrigin" , "anonymous");
        imageElement.setAttribute ("alt" , work.title);
        let titleElement = document.createElement('figcaption');
        titleElement.innerText =work.title;
        divGallery.appendChild(workElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(titleElement);
    }

};
// création affichage accueil 
const travaux=fetch('http://localhost:5678/api/works')
    .then(allWorks => allWorks.json())
    .catch(function(err){console.log("dommage1")});
//genere les travaux
travaux .then(allWorks =>generateWork(allWorks))
        .catch(function(err){console.log("dommage2")});
//pour affichage Objets seulement
filtreObjets.addEventListener("click", function()
{divGallery.innerHTML="";
const worksObjets = travaux
                    .then(allWorks=> allWorks.filter(function(work){
                                                                            return work.categoryId == 1
                                                                            }));
worksObjets.then(worksObjets=>generateWork(worksObjets)).catch(function(err){console.log("dommage3")});
filtreObjets.classList.add("active");
filtreTous.classList.remove("active");
filtreAppartements.classList.remove("active");
filtreAutres.classList.remove("active"); 
});
//pour affichage Appartements seulement
filtreAppartements.addEventListener("click", function()
{divGallery.innerHTML="";
const worksAppartements = travaux
                    .then(allWorks=> allWorks.filter(function(work){
                                                                    return work.categoryId == 2
                                                                     }));
worksAppartements.then(worksAppartements=>generateWork(worksAppartements)).catch(function(err){console.log("dommage4")});
        filtreAppartements.classList.add("active");
        filtreTous.classList.remove("active");
        filtreObjets.classList.remove("active");
        filtreAutres.classList.remove("active");
        
});
//pour affichage Autres seulement
filtreAutres.addEventListener("click", function()
{divGallery.innerHTML="";
const worksAutres = travaux
                    .then(allWorks=> allWorks.filter(function(work){
                                                                    return work.categoryId == 3
                                                                     }));
worksAutres.then(worksAutres=>generateWork(worksAutres)).catch(function(err){console.log("dommage5")});
        filtreAutres.classList.add("active");
        filtreTous.classList.remove("active");
        filtreAppartements.classList.remove("active");
        filtreObjets.classList.remove("active");
        
});