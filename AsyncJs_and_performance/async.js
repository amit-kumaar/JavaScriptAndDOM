const { useRef } = require("react");

const promise = ((resolve, reject)=>{
    const success = true;
    if(success){
        resolve();
    }
    else{
        reject();
    }
})
.then(()=>console.log('successful'))
.catch(()=>console.log('error'))


///--------------------Async/Await

const fetchUserData= async()=>{
    const responseData= await fetch('https://whateverAPIEndPoint.com')
    const userData = await responseData.json()
    const newElement = document.createElement('p')
    newElement.textContent= userData.bio
}

//--------------------fetch with try/catch blocks--------------------------------


const fetchUserData1 = async()=>{
    try{
        const responseData = await fetch('https://myEndPoint.com')
        if(!responseData.ok){
            throw new error(`Error fetching  data : ${responseData.status}, ${responseData.statusText}`)
        }
        const userData = await responseData.json()
        const newElement=document.createElement('p')
        newElement.textContent=userData.bio
    }
    catch(error){
        console.log(error)
    }
}

//--------------------------Loading indicators---------------------------

const fetchUserData2 = async()=>{
    try{
        const loadingELement=document.querySelector('.loadingIndicator')
        const elementToModify = document.querySelector('.modify')
        const responseData= await fetch('https://whateverAPIendPoint.com')
        if(!responseData.ok){
            throw new Error(`Error fetching data: ${responseData.status}, ${responseData.statusText}`)
        }
        //dom modification
        loadingELement.computedStyleMap.display='none'
        elementToModify.append(DOM, modifications)
    }
    catch(error){
        console.log(error)
    }
}

//------------------DOM Manipulation------------------------
const buttonElement = document.querySelector('.colorbutton')
buttonElement.addEventListener('pointerdown' , handleColorClick)
const handleColorClick = (event)=>{
    event.preventDefault()
    if(event.target.nodeName==='BUTTON'){
        console.log('Congrats! you really clicked a buttion!')
    }
    event.target.style.backgroundColor = `rgb(${Maths.floor(Maths.random() * 256)}, ${Math.floor(Maths.random() * 256)}, ${Maths.floor(Maths.random() * 256)})`;
}


//--------------------Creating and Adding Elements------------------------------


const fetchUserData3 = async()=>{
    try{
        const apiResponse = await fetch('https://someAPIendPoints')
        if(!apiResponse.ok){
            throw new Error(`Error fetching data: ${apiResponse.status}, ${apiResponse.statusText}`)
        }
        const userData= await apiResponse.json()
        const userListContainer = document.querySelector('#listContainer')
        const fragment = document.createDocumentFragment()
        userData.forEach((user)=>{
            const userName = document.createDocumentFragment('p')
            userName.textContent=`${user.name ?? 'No userName'}`
            fragment.append(userName)
        })
        userListContainer.append(fragment)
        userListContainer.addEventListener('pointerdown', handleSelect)
    }
    catch(error){
        console.log(error)
    }
}