async function newFormHandler(event) {
  event.preventDefault();
  const destination = document.querySelector('#destination').value;
  const note = document.querySelector('#note').value;
  const date = document.querySelector('#date').value;
  // The following is a ternary operator. It checks to see if has_nuts is checked. If it is, it will return true, otherwise, it will return false.
  
  // Send fetch request to add a new dish
  const response = await fetch(`/api/travel`, {
    method: 'POST',
    body: JSON.stringify({
      destination,
      note,
      date: date,

    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  //if the dish is added, the 'all' template will be rerendered
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to add comment');
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
  