function handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      goToDifferentLocation();
    }
  }
  
  function goToDifferentLocation() {
    
    window.location.href = './loading.html';
  }
  
  const inputElement = document.querySelector('.login-input');
  inputElement.addEventListener('keydown', handleKeyPress);
  
  