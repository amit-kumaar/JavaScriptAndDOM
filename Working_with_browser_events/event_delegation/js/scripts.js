const handleClick = async(event)=>{
    const productCard = event.target.closest('.product-card')
    const selectedCard = productCard.querySelector('.product-name').textContent
    alert(`you selected the ${selectedCard}. Good Choice!`)
}

const cardListner = async()=>{
    const cardContainer = document.querySelector('.product-grid')
    cardContainer.addEventListener('pointerdown', handleClick)
}

cardListner();