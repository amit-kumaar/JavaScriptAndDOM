const searchResultsContainer = document.querySelector('.searchResults')
const showUserCard=(users)=>{
  users.forEach((user) => {
    const userCard = document.createElement("p");
    userCard.textContent = `${user.userName}'s profile`;
    userCard.addEventListener("pointerdown", handleUserCLick);
    searchResultsContainer.append(userCard);
  });
}