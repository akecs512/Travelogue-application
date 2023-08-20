const logout = async () => {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

const addlogoutButton = () => {
  const logoutButton = document.querySelector('#logout');
  if (logoutButton) {
  logoutButton.addEventListener('click', logout);
  }
  };
  
  document.addEventListener('DOMContentLoaded', addlogoutButton);
  
  addlogoutButton();