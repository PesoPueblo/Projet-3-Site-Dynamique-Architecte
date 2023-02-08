//appel de l'API pour générer les travaux

const divGallery = document.querySelector(".gallery");
function generateWork(){ fetch('http://localhost:5678/api/works')
.then((works) => works.json())
.then(function generateWork(works) 
   {
    for (let i=0 ; i<=works.length; i++)
    {
        let work = works[i];
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
        }}
)};
generateWork();


//mis en place des filtres
const filtreTous = document.getElementById("filtre_tous");
const filtreObjets = document.getElementById("filtre_objets");
const filtreAppartements = document.getElementById("filtre_appartements");
const filtreAutres = document.getElementById("filtre_autres");


filtreTous.addEventListener("click", function()
{
    filtreTous.classList.add("active");
    filtreObjets.classList.remove("active");filtreAppartements.classList.remove("active");filtreAutres.classList.remove("active");
    generateWork();
});
filtreObjets.addEventListener("click", function()
{
        filtreObjets.classList.add("active");
        filtreTous.classList.remove("active");filtreAppartements.classList.remove("active");filtreAutres.classList.remove("active");
        generateWork();
});
filtreAppartements.addEventListener("click", function()
{
        filtreAppartements.classList.add("active");
        filtreTous.classList.remove("active");filtreObjets.classList.remove("active");filtreAutres.classList.remove("active");
        generateWork();
});
filtreAutres.addEventListener("click", function()
{
        filtreAutres.classList.add("active");
        filtreTous.classList.remove("active");filtreAppartements.classList.remove("active");filtreObjets.classList.remove("active");
        generateWork();
});