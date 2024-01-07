export const fetchAIStreamFromPrompt = async (prompt: string) => {
  fetch('/api/completion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt })
  })
  .then(response => response.json())
  .then(data => {
    return data
  })
  .catch((error) => {
    return error
  });
};
