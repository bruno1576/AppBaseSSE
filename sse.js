const eventSource = new EventSource('/events');

eventSource.onmessage = function(event) {
  const data = JSON.parse(event.data);
  document.getElementById('status').innerHTML += `<p>${data.time}: ${data.message}</p>`;
};

eventSource.onerror = function(error) {
  console.error('EventSource failed:', error);
  eventSource.close();
};
