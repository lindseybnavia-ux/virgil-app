/**
 * Google Calendar integration service for Virgil.
 *
 * Usage:
 *   import { googleCalendar } from './google-calendar';
 *
 *   // Check connection
 *   const connected = await googleCalendar.isConnected(userId);
 *
 *   // Connect account
 *   googleCalendar.connect(userId);
 *
 *   // Sync a single action item
 *   const result = await googleCalendar.addEvent(userId, todo, sessionType);
 *
 *   // Sync multiple action items at once
 *   const results = await googleCalendar.addEvents(userId, todos, sessionType);
 *
 *   // Remove an event
 *   await googleCalendar.removeEvent(userId, googleEventId);
 */

const API_BASE = process.env.REACT_APP_API_URL || 'https://virgil-backend-theta.vercel.app';

export const googleCalendar = {
  /**
   * Redirect the user to Google OAuth consent screen.
   */
  connect(userId) {
    window.location.href = `${API_BASE}/api/google-auth?userId=${encodeURIComponent(userId)}`;
  },

  /**
   * Check if the user's Google Calendar is connected.
   */
  async isConnected(userId) {
    try {
      const res = await fetch(`${API_BASE}/api/google-calendar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action: 'status' })
      });

      if (res.status === 401) return false;

      const data = await res.json();
      return data.connected === true;
    } catch {
      return false;
    }
  },

  /**
   * Add a single action item to Google Calendar.
   * Returns { todoId, googleEventId, htmlLink }
   */
  async addEvent(userId, todo, sessionType) {
    const res = await fetch(`${API_BASE}/api/google-calendar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        action: 'create',
        todos: [todo],
        sessionType
      })
    });

    if (res.status === 401) {
      const data = await res.json();
      throw new Error(data.error || 'NOT_CONNECTED');
    }

    if (!res.ok) {
      throw new Error('Failed to add event to Google Calendar');
    }

    const data = await res.json();
    return data.events[0];
  },

  /**
   * Add multiple action items to Google Calendar in one call.
   * Returns array of { todoId, googleEventId, htmlLink }
   */
  async addEvents(userId, todos, sessionType) {
    const res = await fetch(`${API_BASE}/api/google-calendar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        action: 'create',
        todos,
        sessionType
      })
    });

    if (res.status === 401) {
      const data = await res.json();
      throw new Error(data.error || 'NOT_CONNECTED');
    }

    if (!res.ok) {
      throw new Error('Failed to add events to Google Calendar');
    }

    const data = await res.json();
    return data.events;
  },

  /**
   * Remove an event from Google Calendar.
   */
  async removeEvent(userId, googleEventId) {
    const res = await fetch(`${API_BASE}/api/google-calendar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        action: 'delete',
        googleEventId
      })
    });

    if (!res.ok) {
      throw new Error('Failed to remove event from Google Calendar');
    }

    return true;
  },

  /**
   * Update an existing event in Google Calendar.
   */
  async updateEvent(userId, todo, sessionType, googleEventId) {
    const res = await fetch(`${API_BASE}/api/google-calendar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        action: 'update',
        todo,
        sessionType,
        googleEventId
      })
    });

    if (res.status === 401) {
      const data = await res.json();
      throw new Error(data.error || 'NOT_CONNECTED');
    }

    if (!res.ok) {
      throw new Error('Failed to update event in Google Calendar');
    }

    return await res.json();
  }
};
