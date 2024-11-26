// Оновлення профілю
document.getElementById('edit-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = localStorage.getItem('token');
  const username = document.getElementById('edit-username').value;
  const email = document.getElementById('edit-email').value;

  if (!token) {
    alert('You need to be logged in to edit your profile.');
    return;
  }

  try {
    const response = await fetch('/auth/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ username, email }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Profile updated successfully!');
    } else {
      alert(data.error || 'Failed to update profile');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('An error occurred while updating profile.');
  }
});
