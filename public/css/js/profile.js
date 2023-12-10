document.addEventListener('DOMContentLoaded', function () {
  const userProfile = {
    Name: 'John Doe', 
  };

  displayUserProfile(userProfile);
  setupLogoutButton();
});

const displayUserProfile = (userProfile) => {
  const profileInfoContainer = document.getElementById('account-info');
  const profileList = document.createElement('ul');

  for (const [key, value] of Object.entries(userProfile)) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${key}:</strong> ${value}`;
    profileList.appendChild(listItem);
  }

  profileInfoContainer.appendChild(profileList);
};

const setupLogoutButton = () => {
  const logoutButton = document.getElementById('logout-btn');
  logoutButton.addEventListener('click', () => {
    alert('Logout button clicked. Implement your logout logic here.');
    const logout = async () => {
      const response = await fetch ('/api/users/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
              document.location.replace('/');
              } else {
                  alert(response.statusText);
          }
  };
  });
};

function search() {
  const searchTerm = document.getElementById('searchInput').value;
  console.log('Search term:', searchTerm);
  addToHistory(searchTerm);
  document.getElementById('searchInput').value = '';
}

function addToHistory(term) {
  const listItem = document.createElement('li');
  listItem.textContent = term;

  listItem.addEventListener('click', () => {
    document.getElementById('searchInput').value = term;
  });

  document.getElementById('historyList').appendChild(listItem);
}