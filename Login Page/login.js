function handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default form submission behavior
      goToDifferentLocation();
    }
  }
  
  function goToDifferentLocation() {
    // Replace this URL with the destination URL you want to go to
    window.location.href = '../Loading Page/loading.html';
  }
  
  const inputElement = document.querySelector('.login-input');
  inputElement.addEventListener('keydown', handleKeyPress);
  
