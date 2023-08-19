

document.addEventListener('DOMContentLoaded', async () => {
const travelContainer = document.getElementById('travelContainer');

try {
  const response = await fetch(`/api/travel/`);
  const travelData = await response.json();

  travelData.forEach(travel => {
    const travelElement = document.createElement('div');
    travelElement.innerHTML = `
      <div class='travel col-md-5'>
        <p>
          ${travel.destination}.
          ${travel.note}
        </p>
      </div>
      <div class='col-md-7'>
        <p>
          ${travel.date} 
        </p>
      </div>
    `;
    travelContainer.appendChild(travelElement);
  });
} catch (error) {
  console.error('Error fetching travel data:', error);
}

})


async function newFormHandler(event) {
  event.preventDefault();
  const destination = document.querySelector('#destination').value;
  const note = document.querySelector('#note').value;

  let leanNote =  note.trim();
  const date = document.querySelector('#date').value;
  
  // Send post request to add a new tavel information
  let response = await fetch(`/api/travel`, {
    method: 'POST',
    body: JSON.stringify({
      destination: destination,
      date: date,
      note: leanNote,

    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  //if travel is added, the 'all' template will be rerendered
  if (response.ok) {
    window.location.replace('/travelogue');
  } else {
    alert('Failed to add comment');
  }
}


document.querySelector('.new-post-form').addEventListener('click', newFormHandler);
  

