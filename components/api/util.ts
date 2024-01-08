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

export function formatJSONQuotes(jsonString: string) {
  // Regular expression to match single quotes at the start and end of strings, 
  // and before and after colons and commas.
  const regex = /'(?=\s*[\]:,})]|(?<=[\[{:,])\s*')/g;
  return jsonString.replace(regex, '"');
}
