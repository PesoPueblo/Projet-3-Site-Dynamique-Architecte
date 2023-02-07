
fetch('http://localhost:5678/api/works')
.then((response) => response.json())
.then((data) =>

    {console.log(data);
        for (let i=0 ; i<=data.length; i++)
        {
        let work = data[i]
         const divGallery = document.querySelector(".gallery");
        const workElement = document.createElement ("figure")
        const imageElement = document.createElement('img');
            imageElement.src = work.imageUrl;
            imageElement.setAttribute ("crossOrigin" , "anonymous");
            imageElement.setAttribute ("alt" , work.title);
        const titleElement = document.createElement('figcaption');
            titleElement.innerText =work.title;
    divGallery.appendChild(workElement);
    workElement.appendChild(imageElement);
    workElement.appendChild(titleElement);
        }}
)
