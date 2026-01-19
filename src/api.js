const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const api = {
  async generateTodos(sessionType, sessionDate, sessionNotes) {
    const response = await fetch(`${API_BASE_URL}/api/generate-todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionType, sessionDate, sessionNotes })
    });
    if (!response.ok) throw new Error('Failed to generate todos');
    const data = await response.json();
    return data.todos;
  },

  async extractText(base64Image, mimeType) {
    const response = await fetch(`${API_BASE_URL}/api/extract-text`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64Image, mimeType })
    });
    if (!response.ok) throw new Error('Failed to extract text');
    const data = await response.json();
    return data.text;
  },

  async generateInsights(sessions, previousInsight) {
    const response = await fetch(`${API_BASE_URL}/api/generate-insights`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessions, previousInsight })
    });
    if (!response.ok) throw new Error('Failed to generate insights');
    const data = await response.json();
    return data.insights;
  }
};