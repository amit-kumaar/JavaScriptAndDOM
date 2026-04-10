async function fetchData(){
    const[aboutRes, projectsRes] = await Promise.all([
        fetch("./data/aboutMeData.json"),
        fetch("./data/projectsData.json")
    ]);

    aboutMeData= await aboutRes.json();
    projectsData= await projectsRes.json();
}

function buildAboutMe(){
    const container = document.querySelector("#aboutMe");

    const p = document.createElement("p");
    p.textContent = aboutMeData.aboutMe;

    const headshotContainer = document.createElement("div");
    headshotContainer.classList.add("headshotContainer");

    const img = document.createElement("img");
    img.src = aboutMeData.headshot.replace("../images/", "./images/");
    img.alt = "Headshot";

    headshotContainer.appendChild(img);
    container.appendChild(p);
    container.appendChild(headshotContainer);
}

fetchData().then(()=>{
    buildAboutMe();
    buildProjectCards();
    updateSpotlight(projectsData[0]);
    setupProjectListeners();
});

function buildProjectCards(){
    const projectList = document.querySelector("#projectList");
    const fragment = document.createDocumentFragment();

    projectsData.forEach(project=>{
        const card = document.createElement("div");
        card.classList.add("projectCard");
        card.id= project.project_id;
        card.style.backgroundImage = `url('${project.card_image ? project.card_image.replace("../images/", "./images/") : "./images/card_placeholder_bg.webp"}')`;
        card.style.backgroundSize="cover";
        card.style.backgroundPosition = "center";

        const h4 = document.createElement("h4");
        h4.textContent = project.project_name ?? "Untitled Project";

        const p = document.createElement("p");
        p.textContent = project.short_description ?? "No description availble.";

        card.appendChild(h4);
        card.appendChild(p);
        fragment.appendChild(card);
    });

    projectList.appendChild(fragment);

}

function updateSpotlight(project){
    const spotlight = document.querySelector("#projectSpotlight");
    spotlight.style.backgroundImage = `url('${project.spotlight_image ? project.spotlight_image.replace("../images/", "./images/") : "./images/spotlight_placeholder_bg.webp"}')`;
    spotlight.style.backgroundSize = "cover";
    spotlight.style.backgroundPosition = "center";

    spotlight.replaceChildren();

    const h3 = document.createElement("h3");
    h3.id = "spotlightTitles";
    h3.textContent = project.project_name ?? "Untitled Project";

    const p = document.createElement("p");
    p.textContent = project.long_description ?? "No description available.";

    const a = document.createElement("a");
    a.textContent = "Click here to see more...";
    a.href = project.url ?? "#";
    a.target = "_blank";

    spotlight.appendChild(h3);
    spotlight.appendChild(p);
    spotlight.appendChild(a);
}

function setupProjectListeners(){
    document.querySelector("#projectList").addEventListener("click", (e)=>{
        const card =e.target.closest(".projectCard");
        if(!card)
             return
        const project = projectsData.find(p=>p.project_id === card.id);
        if(project)
             updateSpotlight(project);
    });

    const projectList = document.querySelector("#projectList");
    const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

    document.querySelector(".arrow-left").addEventListener("click",()=>{
        isDesktop()
            ? projectList.scrollBy({top:-300, behavior:"smooth"})
            : projectList.scrollBy({left: -300, behavior: "smooth"});
    });

    document.querySelector(".arrow-right").addEventListener("click", ()=>{
        isDesktop()
            ? projectList.scrollBy({top:300, behavior:"smooth"})
            : projectList.scrollBy({left: 300, behavior: "smooth"});
    });
}

document.querySelector("#contactMessage").addEventListener("input", (e) => {
  const count = e.target.value.length;
  document.querySelector("#charactersLeft").textContent =
    `Characters: ${count}/300`;
});

const illegalChars = /[^a-zA-Z0-9@._-]/;
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.querySelector("#formSection").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector("#contactEmail").value.trim();
  const message = document.querySelector("#contactMessage").value.trim();
  const emailError = document.querySelector("#emailError");
  const messageError = document.querySelector("#messageError");

  emailError.textContent = "";
  messageError.textContent = "";

  let isValid = true;

  if (!email) {
    emailError.textContent = "Email is required.";
    isValid = false;
  } else if (illegalChars.test(email)) {
    emailError.textContent = "Email contains illegal characters.";
    isValid = false;
  } else if (!validEmail.test(email)) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  if (!message) {
    messageError.textContent = "Message is required.";
    isValid = false;
  } else if (illegalChars.test(message)) {
    messageError.textContent = "Message contains illegal characters.";
    isValid = false;
  } else if (message.length > 300) {
    messageError.textContent = "Message must be 300 characters or less.";
    isValid = false;
  }

  if (isValid) alert("Form validation passed!");
});
