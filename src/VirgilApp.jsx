import React, { useState, useEffect } from 'react';
import { firebaseStorage } from './firebase-storage';
import { api } from './api';
import { Plus, Brain, CheckCircle2, Circle, Trash2, Calendar, Sparkles, TrendingUp, MessageSquare, ChevronLeft, ChevronRight, ChevronDown, Edit2, Check, X, Mic, MicOff, Upload, User, Lightbulb } from 'lucide-react';

export default function VirgilApp({ userId, userEmail }) {
  const [sessions, setSessions] = useState([]);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);
  const [newSession, setNewSession] = useState({ type: '', date: '', notes: '' });
  const [generatingTodosForSession, setGeneratingTodosForSession] = useState(null);
  const [customSessionTypes, setCustomSessionTypes] = useState([]);
  const [isAddingCustomType, setIsAddingCustomType] = useState(false);
  const [customTypeInput, setCustomTypeInput] = useState('');
  const [sessionTypeFilter, setSessionTypeFilter] = useState('all');
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingDate, setEditingDate] = useState('');
  const [editingTodoDetails, setEditingTodoDetails] = useState(null);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const [userProfile, setUserProfile] = useState(null);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', email: '' });
  const [expandedSessionId, setExpandedSessionId] = useState(null);
  const [sessionError, setSessionError] = useState('');
  const [celebratingTodoId, setCelebratingTodoId] = useState(null);
  const [showInsightsUnlock, setShowInsightsUnlock] = useState(false);
  const [insights, setInsights] = useState([]);
  const [generatingInsights, setGeneratingInsights] = useState(false);
  const [selectedInsightIndex, setSelectedInsightIndex] = useState(0);

  useEffect(() => {
    loadData();
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const profileResult = await firebaseStorage.get('virgil-user-profile').catch(() => null);
      if (profileResult?.value) {
        setUserProfile(JSON.parse(profileResult.value));
      } else {
        setShowProfileSetup(true);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const [sessionsResult, todosResult, customTypesResult, insightsResult] = await Promise.all([
        firebaseStorage.get('virgil-sessions').catch(() => null),
        firebaseStorage.get('virgil-todos').catch(() => null),
        firebaseStorage.get('virgil-custom-session-types').catch(() => null),
        firebaseStorage.get('virgil-insights').catch(() => null)
      ]);

      if (sessionsResult?.value) {
        setSessions(JSON.parse(sessionsResult.value));
      }
      if (todosResult?.value) {
        setTodos(JSON.parse(todosResult.value));
      }
      if (customTypesResult?.value) {
        setCustomSessionTypes(JSON.parse(customTypesResult.value));
      }
      if (insightsResult?.value) {
        const loadedInsights = JSON.parse(insightsResult.value);
        setInsights(Array.isArray(loadedInsights) ? loadedInsights : []);
        setSelectedInsightIndex(Array.isArray(loadedInsights) ? loadedInsights.length - 1 : 0);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveData = async (newSessions, newTodos) => {
    try {
      await Promise.all([
        firebaseStorage.set('virgil-sessions', JSON.stringify(newSessions || sessions)),
        firebaseStorage.set('virgil-todos', JSON.stringify(newTodos || todos))
      ]);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const saveUserProfile = async () => {
    if (!profileForm.name.trim() || !profileForm.email.trim()) {
      alert('Please fill in both name and email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileForm.email)) {
      alert('Please enter a valid email address');
      return;
    }

    const profile = {
      name: profileForm.name.trim(),
      email: profileForm.email.trim(),
      createdAt: new Date().toISOString()
    };

    try {
      await firebaseStorage.set('virgil-user-profile', JSON.stringify(profile));
      setUserProfile(profile);
      setShowProfileSetup(false);
      setProfileForm({ name: '', email: '' });
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    }
  };

  const editProfile = () => {
    setProfileForm({ name: userProfile.name, email: userProfile.email });
    setShowProfileSetup(true);
  };

  const updateProfile = async () => {
    if (!profileForm.name.trim() || !profileForm.email.trim()) {
      alert('Please fill in both name and email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileForm.email)) {
      alert('Please enter a valid email address');
      return;
    }

    const updatedProfile = {
      ...userProfile,
      name: profileForm.name.trim(),
      email: profileForm.email.trim(),
      updatedAt: new Date().toISOString()
    };

    try {
      await firebaseStorage.set('virgil-user-profile', JSON.stringify(updatedProfile));
      setUserProfile(updatedProfile);
      setShowProfileSetup(false);
      setProfileForm({ name: '', email: '' });
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const addCustomSessionType = async () => {
    if (!customTypeInput.trim()) return;
    
    const newType = customTypeInput.trim();
    if (customSessionTypes.includes(newType)) {
      alert('This session type already exists');
      return;
    }

    const updatedTypes = [...customSessionTypes, newType];
    setCustomSessionTypes(updatedTypes);
    
    try {
      await firebaseStorage.set('virgil-custom-session-types', JSON.stringify(updatedTypes));
    } catch (error) {
      console.error('Error saving custom types:', error);
    }

    setNewSession({ ...newSession, type: newType });
    setCustomTypeInput('');
    setIsAddingCustomType(false);
  };

  const startRecording = async () => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      let finalTranscript = '';

      recognition.onstart = () => {
        console.log('Speech recognition started');
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        const currentNotes = newSession.notes || '';
        const baseNotes = currentNotes.split('[Recording...]')[0];
        const updatedNotes = baseNotes + finalTranscript + (interimTranscript ? '[Recording...] ' + interimTranscript : '');
        
        setNewSession(prev => ({
          ...prev,
          notes: updatedNotes
        }));
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        if (event.error === 'not-allowed') {
          alert('Microphone access was denied. Please allow microphone access in your settings and try again.');
        } else if (event.error === 'no-speech') {
          console.log('No speech detected');
        } else {
          alert(`Recording error: ${event.error}. Please try again.`);
        }
      };

      recognition.onend = () => {
        console.log('Speech recognition ended');
        setIsRecording(false);
        setNewSession(prev => ({
          ...prev,
          notes: (prev.notes || '').replace(/\[Recording...\]\s*/g, '').trim()
        }));
      };

      console.log('Starting speech recognition...');
      recognition.start();
      setMediaRecorder(recognition);
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
      alert('Could not start voice recording. Please check your browser permissions and try again.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setIsProcessingPhoto(true);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const base64Image = reader.result;
        setUploadedPhoto(base64Image);

        try {
          const extractedText = await api.extractText(
  base64Image.split(',')[1],
  file.type
);

          setNewSession(prev => ({
            ...prev,
            notes: prev.notes 
              ? `${prev.notes}\n\n--- Extracted from photo ---\n${extractedText}`
              : `--- Extracted from photo ---\n${extractedText}`
          }));
        } catch (error) {
          console.error('Error extracting text from image:', error);
          alert('Failed to extract text from the image. The photo has been uploaded but text extraction failed.');
        } finally {
          setIsProcessingPhoto(false);
        }
      };

      reader.onerror = () => {
        alert('Failed to read the image file');
        setIsProcessingPhoto(false);
      };
    } catch (error) {
      console.error('Error processing photo:', error);
      alert('Failed to process the photo');
      setIsProcessingPhoto(false);
    }
  };

  const removePhoto = () => {
    setUploadedPhoto(null);
    setNewSession(prev => ({
      ...prev,
      notes: prev.notes.split('--- Extracted from photo ---')[0].trim()
    }));
  };

  const addSession = async () => {
    // Clear any previous errors
    setSessionError('');
    
    // Trim and validate session type
    if (!newSession.type || newSession.type.trim() === '') {
      setSessionError('Please select a session type');
      return;
    }
    
    // Validate date
    if (!newSession.date || newSession.date.trim() === '') {
      setSessionError('Please select a date for this session');
      return;
    }
    
    // Validate notes
    if (!newSession.notes || newSession.notes.trim() === '') {
      setSessionError('Please add some notes about this session');
      return;
    }

    const session = {
      id: Date.now(),
      ...newSession,
      createdAt: new Date().toISOString()
    };

    const updatedSessions = [...sessions, session];
    setSessions(updatedSessions);
    await saveData(updatedSessions, todos);
    
    setNewSession({ type: '', date: '', notes: '' });
    setUploadedPhoto(null);
    setIsProcessingPhoto(false);
    setShowNewSessionModal(false);
    setSessionError('');
    
    // Check if this unlocks insights (every 10 sessions: 10, 20, 30, etc)
    const canGenerateInsights = updatedSessions.length % 10 === 0 && updatedSessions.length > 0;
    const alreadyGenerated = insights.some(i => i.sessionCount === updatedSessions.length);
    
    if (canGenerateInsights && !alreadyGenerated) {
      setShowInsightsUnlock(true);
    }
  };

  const generateTodosFromSession = async (session) => {
    setGeneratingTodosForSession(session.id);
    try {
      const generatedTodos = await api.generateTodos(
  session.type,
  session.date,
  session.notes
);



      const newTodos = generatedTodos.map(todo => ({
        ...todo,
        id: Date.now() + Math.random(),
        sessionId: session.id,
        completed: false,
        createdAt: new Date().toISOString()
      }));

      const updatedTodos = [...todos, ...newTodos];
      setTodos(updatedTodos);
      await saveData(sessions, updatedTodos);
      
    } catch (error) {
      console.error('Error generating todos:', error);
      alert('Failed to generate to-dos. Please try again.');
    } finally {
      setGeneratingTodosForSession(null);
    }
  };

  const toggleTodo = async (todoId) => {
    const todo = todos.find(t => t.id === todoId);
    
    // Trigger celebration only when marking as complete (not when uncompleting)
    if (todo && !todo.completed) {
      setCelebratingTodoId(todoId);
      setTimeout(() => setCelebratingTodoId(null), 2000);
    }
    
    const updatedTodos = todos.map(todo =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    await saveData(sessions, updatedTodos);
  };

  const deleteTodo = async (todoId) => {
    const updatedTodos = todos.filter(todo => todo.id !== todoId);
    setTodos(updatedTodos);
    await saveData(sessions, updatedTodos);
  };

  const updateTodoDueDate = async (todoId, newDate) => {
    const updatedTodos = todos.map(todo =>
      todo.id === todoId ? { ...todo, dueDate: newDate } : todo
    );
    setTodos(updatedTodos);
    await saveData(sessions, updatedTodos);
    setEditingTodoId(null);
    setEditingDate('');
  };

  const startEditingDate = (todoId, currentDate) => {
    setEditingTodoId(todoId);
    setEditingDate(currentDate);
  };

  const cancelEditingDate = () => {
    setEditingTodoId(null);
    setEditingDate('');
  };

  const startEditingTodoDetails = (todo) => {
    setEditingTodoDetails({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      priority: todo.priority
    });
  };

  const cancelEditingTodoDetails = () => {
    setEditingTodoDetails(null);
  };

  const saveTodoDetails = async () => {
    if (!editingTodoDetails.title.trim()) {
      alert('Title cannot be empty');
      return;
    }

    const updatedTodos = todos.map(todo =>
      todo.id === editingTodoDetails.id
        ? {
            ...todo,
            title: editingTodoDetails.title,
            description: editingTodoDetails.description,
            priority: editingTodoDetails.priority
          }
        : todo
    );
    
    setTodos(updatedTodos);
    await saveData(sessions, updatedTodos);
    setEditingTodoDetails(null);
  };

  const deleteSession = async (sessionId) => {
    const updatedSessions = sessions.filter(s => s.id !== sessionId);
    const updatedTodos = todos.filter(t => t.sessionId !== sessionId);
    setSessions(updatedSessions);
    setTodos(updatedTodos);
    await saveData(updatedSessions, updatedTodos);
  };

  const getStats = () => {
    const completed = todos.filter(t => t.completed).length;
    const pending = todos.filter(t => !t.completed).length;
    const highPriority = todos.filter(t => !t.completed && t.priority === 'high').length;
    
    return { completed, pending, highPriority, totalSessions: sessions.length };
  };

  const getNextUpcomingTodo = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcomingTodos = todos.filter(todo => {
      if (todo.completed) return false;
      const dueDate = new Date(todo.dueDate);
      return dueDate >= today;
    });

    if (upcomingTodos.length === 0) return null;

    upcomingTodos.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return dateA - dateB;
    });

    return upcomingTodos[0];
  };

  const getUniqueSessionTypes = () => {
    const types = sessions.map(s => s.type);
    return [...new Set(types)].sort();
  };

  const getFilteredSessions = () => {
    if (sessionTypeFilter === 'all') {
      return sessions;
    }
    return sessions.filter(s => s.type === sessionTypeFilter);
  };

  const navigateToSession = (sessionId) => {
    setActiveView('sessions');
    setSessionTypeFilter('all');
    setTimeout(() => {
      const sessionElement = document.getElementById(`session-${sessionId}`);
      if (sessionElement) {
        sessionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        sessionElement.style.transition = 'box-shadow 0.3s ease';
        sessionElement.style.boxShadow = '0 0 0 3px rgba(30, 58, 138, 0.5)';
        setTimeout(() => {
          sessionElement.style.boxShadow = '';
        }, 2000);
      }
    }, 100);
  };

  const makeSessionReferencesClickable = (text) => {
    if (!text) return text;
    
    // Find all unique session types mentioned in the text
    const sessionTypes = [...new Set(sessions.map(s => s.type))];
    
    // Split text into parts and create clickable links for session types
    const parts = [];
    let lastIndex = 0;
    
    sessionTypes.forEach(type => {
      const regex = new RegExp(`(${type.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      let match;
      
      while ((match = regex.exec(text.substring(lastIndex))) !== null) {
        const fullMatch = match[0];
        const matchIndex = lastIndex + match.index;
        
        // Find the most recent session of this type before this mention
        const relevantSession = sessions
          .filter(s => s.type === type)
          .reverse()[0]; // Get most recent
        
        if (relevantSession) {
          parts.push({
            text: text.substring(lastIndex, matchIndex),
            isLink: false
          });
          
          parts.push({
            text: fullMatch,
            isLink: true,
            sessionId: relevantSession.id,
            sessionType: type
          });
          
          lastIndex = matchIndex + fullMatch.length;
        }
      }
    });
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        text: text.substring(lastIndex),
        isLink: false
      });
    }
    
    if (parts.length === 0) {
      return <span>{text}</span>;
    }
    
    return (
      <span>
        {parts.map((part, idx) => 
          part.isLink ? (
            <button
              key={idx}
              onClick={() => navigateToSession(part.sessionId)}
              className="text-blue-900 underline hover:text-blue-700 font-medium"
              title={`Go to ${part.sessionType} session`}
            >
              {part.text}
            </button>
          ) : (
            <span key={idx}>{part.text}</span>
          )
        )}
      </span>
    );
  };

  const toggleSessionExpansion = (sessionId) => {
    setExpandedSessionId(expandedSessionId === sessionId ? null : sessionId);
  };

  const generateInsights = async () => {
  setGeneratingInsights(true);
  try {
    const sessionCount = sessions.length;
    const previousInsight = insights.length > 0 ? insights[insights.length - 1] : null;

    const insightsData = await api.generateInsights(sessions, previousInsight);

    const newInsight = {
      ...insightsData,
      generatedAt: new Date().toISOString(),
      sessionCount: sessionCount,
      reportNumber: insights.length + 1
    };

    const updatedInsights = [...insights, newInsight];
    setInsights(updatedInsights);
    setSelectedInsightIndex(updatedInsights.length - 1);
    await firebaseStorage.set('virgil-insights', JSON.stringify(updatedInsights));
    setShowInsightsUnlock(false);
    setActiveView('insights');
    
  } catch (error) {
    console.error('Error generating insights:', error);
    alert('Failed to generate insights. Please try again.');
  } finally {
    setGeneratingInsights(false);
  }
};

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getTodosForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return todos.filter(todo => todo.dueDate === dateStr);
  };

  const navigateCalendar = (direction) => {
    const newDate = new Date(currentCalendarDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentCalendarDate(newDate);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-blue-900 text-lg">Loading Virgil...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Virgil</h1>
                <p className="text-gray-600 text-sm">Turn insight into action</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {userProfile && (
                <button
                  onClick={editProfile}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Edit profile"
                >
                  <User className="w-5 h-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700 hidden sm:inline">{userProfile.name}</span>
                </button>
              )}
              <button
                onClick={() => setShowNewSessionModal(true)}
                className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-lg transition-shadow"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">New Session</span>
              </button>
            </div>
          </div>

          {(() => {
            const nextTodo = getNextUpcomingTodo();
            if (!nextTodo) return null;

            const sourceSession = sessions.find(s => s.id === nextTodo.sessionId);
            const dueDate = new Date(nextTodo.dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const daysUntil = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
            
            const isOverdue = daysUntil < 0;
            const isDueToday = daysUntil === 0;
            const isDueSoon = daysUntil > 0 && daysUntil <= 3;

            return (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-900" />
                    <h2 className="text-lg font-bold text-gray-800">Next Up</h2>
                  </div>
                  {isDueToday && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                      Due Today
                    </span>
                  )}
                  {isOverdue && (
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      Overdue
                    </span>
                  )}
                  {isDueSoon && !isDueToday && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      Due in {daysUntil} {daysUntil === 1 ? 'day' : 'days'}
                    </span>
                  )}
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl p-4 border-l-4 border-blue-900">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleTodo(nextTodo.id)}
                      className="mt-1 flex-shrink-0"
                    >
                      <Circle className="w-6 h-6 text-blue-900 hover:text-blue-700" />
                    </button>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{nextTodo.title}</h3>
                      <p className="text-gray-700 text-sm mb-3">{nextTodo.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{dueDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                        </div>
                        
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          nextTodo.priority === 'high' 
                            ? 'bg-orange-100 text-orange-800' 
                            : nextTodo.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {nextTodo.priority.charAt(0).toUpperCase() + nextTodo.priority.slice(1)} Priority
                        </span>

                        {sourceSession && (
                          <button
                            onClick={() => navigateToSession(nextTodo.sessionId)}
                            className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-900 rounded-full hover:bg-blue-200 transition-colors text-xs font-medium"
                          >
                            <MessageSquare className="w-3 h-3" />
                            {sourceSession.type}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-xl">
              <div className="text-blue-900 text-sm font-medium">Total Sessions</div>
              <div className="text-2xl font-bold text-blue-900">{stats.totalSessions}</div>
              {stats.totalSessions < 10 && (
                <div className="text-xs text-blue-700 mt-1">
                  {10 - stats.totalSessions} more to unlock Insights
                </div>
              )}
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-4 rounded-xl">
              <div className="text-green-800 text-sm font-medium">Completed</div>
              <div className="text-2xl font-bold text-green-900">{stats.completed}</div>
            </div>
            <div className="bg-gradient-to-br from-slate-100 to-slate-50 p-4 rounded-xl">
              <div className="text-slate-700 text-sm font-medium">Pending Action Items</div>
              <div className="text-2xl font-bold text-slate-800">{stats.pending}</div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-4 rounded-xl">
              <div className="text-orange-800 text-sm font-medium">High Priority</div>
              <div className="text-2xl font-bold text-orange-900">{stats.highPriority}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-2 mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`w-[calc(50%-0.25rem)] md:flex-1 py-3 rounded-lg font-medium transition-colors ${
              activeView === 'dashboard'
                ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Action Items
            </div>
          </button>
          <button
            onClick={() => setActiveView('sessions')}
            className={`w-[calc(50%-0.25rem)] md:flex-1 py-3 rounded-lg font-medium transition-colors ${
              activeView === 'sessions'
                ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Sessions
            </div>
          </button>
          <button
            onClick={() => sessions.length >= 10 && setActiveView('insights')}
            disabled={sessions.length < 10}
            className={`w-[calc(50%-0.25rem)] md:flex-1 py-3 rounded-lg font-medium transition-colors relative ${
              sessions.length < 10
                ? 'text-gray-400 cursor-not-allowed opacity-60'
                : activeView === 'insights'
                ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title={sessions.length < 10 ? `${10 - sessions.length} more sessions to unlock` : ''}
          >
            <div className="flex items-center justify-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Insights
              {sessions.length >= 10 && sessions.length % 10 === 0 && !insights.some(i => i.sessionCount === sessions.length) && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
              )}
            </div>
          </button>
          <button
            onClick={() => setActiveView('calendar')}
            className={`w-[calc(50%-0.25rem)] md:flex-1 py-3 rounded-lg font-medium transition-colors ${
              activeView === 'calendar'
                ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              Calendar
            </div>
          </button>
        </div>

        {activeView === 'dashboard' && (
          <div className="space-y-4">
            {todos.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Sparkles className="w-16 h-16 text-blue-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No action items yet</h3>
                <p className="text-gray-500 mb-6">Add a session and generate to-dos to get started!</p>
              </div>
            ) : (
              <>
                {['high', 'medium', 'low'].map(priority => {
                  const priorityTodos = todos.filter(t => t.priority === priority && !t.completed);
                  if (priorityTodos.length === 0) return null;

                  return (
                    <div key={priority} className="bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-lg font-semibold mb-4 capitalize flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${
                          priority === 'high' ? 'bg-orange-600' :
                          priority === 'medium' ? 'bg-yellow-500' :
                          'bg-green-700'
                        }`} />
                        {priority} Priority
                      </h3>
                      <div className="space-y-3">
                        {priorityTodos.map(todo => (
                          <div key={todo.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            {editingTodoDetails?.id === todo.id ? (
                              <div className="space-y-3">
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                                  <input
                                    type="text"
                                    value={editingTodoDetails.title}
                                    onChange={(e) => setEditingTodoDetails({ ...editingTodoDetails, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                                  <textarea
                                    value={editingTodoDetails.description}
                                    onChange={(e) => setEditingTodoDetails({ ...editingTodoDetails, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent resize-none"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">Priority</label>
                                  <div className="flex gap-2">
                                    {['high', 'medium', 'low'].map(p => (
                                      <button
                                        key={p}
                                        onClick={() => setEditingTodoDetails({ ...editingTodoDetails, priority: p })}
                                        className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm capitalize transition-colors ${
                                          editingTodoDetails.priority === p
                                            ? p === 'high'
                                              ? 'bg-orange-600 text-white'
                                              : p === 'medium'
                                              ? 'bg-yellow-500 text-white'
                                              : 'bg-green-700 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                      >
                                        {p}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex gap-2 pt-2">
                                  <button
                                    onClick={saveTodoDetails}
                                    className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2"
                                  >
                                    <Check className="w-4 h-4" />
                                    Save
                                  </button>
                                  <button
                                    onClick={cancelEditingTodoDetails}
                                    className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium flex items-center justify-center gap-2"
                                  >
                                    <X className="w-4 h-4" />
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-start gap-3">
                                <button
                                  onClick={() => toggleTodo(todo.id)}
                                  className="mt-1 flex-shrink-0"
                                >
                                  <Circle className="w-6 h-6 text-gray-400 hover:text-blue-900" />
                                </button>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-gray-800 mb-1">{todo.title}</h4>
                                  <p className="text-gray-600 text-sm mb-2">{todo.description}</p>
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                      {editingTodoId === todo.id ? (
                                        <div className="flex items-center gap-2">
                                          <input
                                            type="date"
                                            value={editingDate}
                                            onChange={(e) => setEditingDate(e.target.value)}
                                            className="px-2 py-1 border border-blue-300 rounded focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                                          />
                                          <button
                                            onClick={() => updateTodoDueDate(todo.id, editingDate)}
                                            className="text-green-600 hover:text-green-700"
                                          >
                                            <Check className="w-4 h-4" />
                                          </button>
                                          <button
                                            onClick={cancelEditingDate}
                                            className="text-red-600 hover:text-red-700"
                                          >
                                            <X className="w-4 h-4" />
                                          </button>
                                        </div>
                                      ) : (
                                        <button
                                          onClick={() => startEditingDate(todo.id, todo.dueDate)}
                                          className="flex items-center gap-1 hover:text-blue-900 transition-colors"
                                        >
                                          <Calendar className="w-4 h-4" />
                                          {new Date(todo.dueDate).toLocaleDateString()}
                                        </button>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {todo.sessionId && (() => {
                                        const sourceSession = sessions.find(s => s.id === todo.sessionId);
                                        return sourceSession ? (
                                          <button
                                            onClick={() => navigateToSession(todo.sessionId)}
                                            className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-900 rounded-full hover:bg-blue-200 transition-colors text-xs font-medium whitespace-nowrap"
                                            title="Go to source session"
                                          >
                                            <MessageSquare className="w-3 h-3" />
                                            {sourceSession.type}
                                          </button>
                                        ) : null;
                                      })()}
                                      <button
                                        onClick={() => startEditingTodoDetails(todo)}
                                        className="text-gray-400 hover:text-blue-900"
                                        title="Edit todo"
                                      >
                                        <Edit2 className="w-5 h-5" />
                                      </button>
                                      <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="text-gray-400 hover:text-red-500"
                                      >
                                        <Trash2 className="w-5 h-5" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {todos.some(t => t.completed) && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-600">Completed</h3>
                    <div className="space-y-3">
                      {todos.filter(t => t.completed).map(todo => (
                        <div key={todo.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleTodo(todo.id)}
                              className="mt-1 flex-shrink-0"
                            >
                              <CheckCircle2 className="w-6 h-6 text-green-500" />
                            </button>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-500 line-through mb-1">{todo.title}</h4>
                              <p className="text-gray-400 text-sm">{todo.description}</p>
                            </div>
                            <button
                              onClick={() => deleteTodo(todo.id)}
                              className="text-gray-400 hover:text-red-500 flex-shrink-0"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeView === 'sessions' && (
          <div className="space-y-4">
            {sessions.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <MessageSquare className="w-16 h-16 text-blue-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No sessions recorded</h3>
                <p className="text-gray-500 mb-6">Start by adding your first therapy or breathwork session!</p>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-xl shadow-lg p-4">
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700">Filter by type:</label>
                    <select
                      value={sessionTypeFilter}
                      onChange={(e) => setSessionTypeFilter(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    >
                      <option value="all">All Sessions ({sessions.length})</option>
                      {getUniqueSessionTypes().map(type => {
                        const count = sessions.filter(s => s.type === type).length;
                        return (
                          <option key={type} value={type}>
                            {type} ({count})
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {getFilteredSessions().slice().reverse().map(session => {
                  const sessionTodos = todos.filter(todo => todo.sessionId === session.id);
                  const hasGeneratedTodos = sessionTodos.length > 0;
                  const completedCount = sessionTodos.filter(todo => todo.completed).length;
                  const totalCount = sessionTodos.length;
                  
                  return (
                    <div key={session.id} id={`session-${session.id}`} className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <h3 className="text-xl font-semibold text-gray-800">{session.type}</h3>
                            {hasGeneratedTodos && (
                              <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                <CheckCircle2 className="w-4 h-4" />
                                {completedCount}/{totalCount} completed
                              </span>
                            )}
                          </div>
                          <p className="text-gray-500 text-sm">{(() => {
                            const [year, month, day] = session.date.split('-');
                            const date = new Date(year, month - 1, day);
                            return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                          })()}</p>
                        </div>
                        <button
                          onClick={() => deleteSession(session.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <p className="text-gray-700 whitespace-pre-wrap">{session.notes}</p>
                      </div>

                      {hasGeneratedTodos && (
                        <div className="mb-4">
                          <button
                            onClick={() => toggleSessionExpansion(session.id)}
                            className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left"
                          >
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-blue-900" />
                              <span className="font-medium text-blue-900">
                                View Action Items ({completedCount}/{totalCount})
                              </span>
                            </div>
                            <ChevronDown 
                              className={`w-5 h-5 text-blue-900 transition-transform ${
                                expandedSessionId === session.id ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {expandedSessionId === session.id && (
                            <div className="mt-3 space-y-2 pl-4 border-l-2 border-blue-200">
                              {sessionTodos.map(todo => (
                                <div 
                                  key={todo.id}
                                  className={`p-3 rounded-lg border ${
                                    todo.completed 
                                      ? 'bg-gray-50 border-gray-200' 
                                      : 'bg-white border-gray-300'
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <button
                                      onClick={() => toggleTodo(todo.id)}
                                      className="mt-1 flex-shrink-0"
                                    >
                                      {todo.completed ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                      ) : (
                                        <Circle className="w-5 h-5 text-gray-400 hover:text-blue-900" />
                                      )}
                                    </button>
                                    <div className="flex-1 min-w-0">
                                      <h4 className={`font-medium mb-1 ${
                                        todo.completed ? 'text-gray-500 line-through' : 'text-gray-800'
                                      }`}>
                                        {todo.title}
                                      </h4>
                                      <p className={`text-sm mb-2 ${
                                        todo.completed ? 'text-gray-400' : 'text-gray-600'
                                      }`}>
                                        {todo.description}
                                      </p>
                                      <div className="flex items-center gap-2 text-xs">
                                        <span className="flex items-center gap-1 text-gray-500">
                                          <Calendar className="w-3 h-3" />
                                          {new Date(todo.dueDate).toLocaleDateString()}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded-full font-medium ${
                                          todo.priority === 'high' 
                                            ? 'bg-orange-100 text-orange-800' 
                                            : todo.priority === 'medium'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-green-100 text-green-800'
                                        }`}>
                                          {todo.priority}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex gap-2 flex-shrink-0">
                                      <button
                                        onClick={() => startEditingTodoDetails(todo)}
                                        className="text-gray-400 hover:text-blue-900"
                                        title="Edit action item"
                                      >
                                        <Edit2 className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="text-gray-400 hover:text-red-500"
                                        title="Delete action item"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      <button
                        onClick={() => generateTodosFromSession(session)}
                        disabled={generatingTodosForSession === session.id}
                        className="w-full bg-gradient-to-r from-blue-900 to-blue-800 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-shadow disabled:opacity-50"
                      >
                        <Sparkles className="w-5 h-5" />
                        {generatingTodosForSession === session.id ? 'Generating...' : hasGeneratedTodos ? 'Generate More Action Items' : 'Generate Action Items'}
                      </button>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}

        {activeView === 'insights' && (
          <div className="space-y-6">
            {insights.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Lightbulb className="w-16 h-16 text-blue-300 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Generate Your Growth Insights</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  You've completed {sessions.length} sessions! Get AI-powered insights on your personal growth journey, recurring themes, and recommended next steps.
                </p>
                <button
                  onClick={generateInsights}
                  disabled={generatingInsights}
                  className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-8 py-4 rounded-lg font-medium hover:shadow-lg transition-shadow disabled:opacity-50 flex items-center gap-2 mx-auto"
                >
                  <Sparkles className="w-5 h-5" />
                  {generatingInsights ? 'Analyzing Your Journey...' : 'Generate Insights'}
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8">
                {/* Header with navigation */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setSelectedInsightIndex(Math.max(0, selectedInsightIndex - 1))}
                      disabled={selectedInsightIndex === 0}
                      className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800">
                        Report #{insights[selectedInsightIndex].reportNumber}
                      </h2>
                      <p className="text-gray-600">
                        {insights[selectedInsightIndex].sessionCount} sessions · Generated {new Date(insights[selectedInsightIndex].generatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedInsightIndex(Math.min(insights.length - 1, selectedInsightIndex + 1))}
                      disabled={selectedInsightIndex === insights.length - 1}
                      className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                  
                  {/* Report selector dropdown */}
                  <select
                    value={selectedInsightIndex}
                    onChange={(e) => setSelectedInsightIndex(parseInt(e.target.value))}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  >
                    {insights.map((insight, idx) => (
                      <option key={idx} value={idx}>
                        Report #{insight.reportNumber} ({insight.sessionCount} sessions)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-6">
                  {/* Progress Since Last Report (only show if not first report) */}
                  {insights[selectedInsightIndex].progressSinceLast && (
                    <div className="border-l-4 border-green-600 pl-6 bg-green-50 p-4 rounded-r-lg">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        Progress Since Last Report
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {makeSessionReferencesClickable(insights[selectedInsightIndex].progressSinceLast)}
                      </p>
                    </div>
                  )}

                  {/* Recurring Themes */}
                  <div className="border-l-4 border-blue-900 pl-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-900" />
                      Recurring Themes
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {insights[selectedInsightIndex].themes.map((theme, idx) => (
                        <span key={idx} className="px-4 py-2 bg-blue-100 text-blue-900 rounded-full font-medium">
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Growth Areas */}
                  <div className="border-l-4 border-green-600 pl-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Areas of Growth
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {makeSessionReferencesClickable(insights[selectedInsightIndex].growthAreas)}
                    </p>
                  </div>

                  {/* Patterns */}
                  <div className="border-l-4 border-purple-600 pl-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                      Patterns & Trends
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {makeSessionReferencesClickable(insights[selectedInsightIndex].patterns)}
                    </p>
                  </div>

                  {/* Breakthroughs */}
                  <div className="border-l-4 border-orange-600 pl-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-orange-600" />
                      Key Breakthroughs
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {makeSessionReferencesClickable(insights[selectedInsightIndex].breakthroughs)}
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div className="border-l-4 border-blue-600 pl-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      Recommended Next Steps
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {makeSessionReferencesClickable(insights[selectedInsightIndex].recommendations)}
                    </p>
                  </div>
                </div>

                {/* Session Type Breakdown */}
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 mt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-900" />
                    Session Breakdown
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Pie Chart */}
                    <div className="flex items-center justify-center">
                      <div className="relative w-48 h-48">
                        {(() => {
                          const sessionTypeCounts = {};
                          sessions.forEach(s => {
                            sessionTypeCounts[s.type] = (sessionTypeCounts[s.type] || 0) + 1;
                          });
                          
                          const colors = ['#1e3a8a', '#ea580c', '#15803d', '#eab308', '#9333ea', '#0891b2'];
                          let currentAngle = -90;
                          
                          return (
                            <svg viewBox="0 0 200 200" className="transform -rotate-90">
                              {Object.entries(sessionTypeCounts).map(([type, count], idx) => {
                                const percentage = (count / sessions.length) * 100;
                                const angle = (percentage / 100) * 360;
                                const startAngle = currentAngle;
                                const endAngle = currentAngle + angle;
                                
                                const startRad = (startAngle * Math.PI) / 180;
                                const endRad = (endAngle * Math.PI) / 180;
                                
                                const x1 = 100 + 80 * Math.cos(startRad);
                                const y1 = 100 + 80 * Math.sin(startRad);
                                const x2 = 100 + 80 * Math.cos(endRad);
                                const y2 = 100 + 80 * Math.sin(endRad);
                                
                                const largeArc = angle > 180 ? 1 : 0;
                                
                                const path = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`;
                                
                                currentAngle = endAngle;
                                
                                return (
                                  <path
                                    key={type}
                                    d={path}
                                    fill={colors[idx % colors.length]}
                                    stroke="white"
                                    strokeWidth="2"
                                  />
                                );
                              })}
                            </svg>
                          );
                        })()}
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="flex flex-col justify-center space-y-3">
                      {(() => {
                        const sessionTypeCounts = {};
                        sessions.forEach(s => {
                          sessionTypeCounts[s.type] = (sessionTypeCounts[s.type] || 0) + 1;
                        });
                        
                        const colors = ['#1e3a8a', '#ea580c', '#15803d', '#eab308', '#9333ea', '#0891b2'];
                        
                        return Object.entries(sessionTypeCounts)
                          .sort((a, b) => b[1] - a[1])
                          .map(([type, count], idx) => {
                            const percentage = ((count / sessions.length) * 100).toFixed(1);
                            return (
                              <div key={type} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div 
                                    className="w-4 h-4 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: colors[idx % colors.length] }}
                                  />
                                  <span className="font-medium text-gray-800">{type}</span>
                                </div>
                                <span className="text-gray-600 font-medium">{count} ({percentage}%)</span>
                              </div>
                            );
                          });
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

{activeView === 'calendar' && (
  <div className="space-y-4">
    {/* Month Navigation */}
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateCalendar(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h3 className="text-xl font-semibold text-gray-800">
          {currentCalendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <button
          onClick={() => navigateCalendar(1)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        
        {(() => {
          const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentCalendarDate);
          const days = [];

          for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="aspect-square" />);
          }

          for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const todosForDay = getTodosForDate(date);
            const isSelected = selectedCalendarDate === dateStr;
            const isCurrentDay = isToday(date);

            days.push(
              <button
                key={day}
                onClick={() => setSelectedCalendarDate(dateStr)}
                className={`aspect-square p-1 rounded-lg text-sm relative transition-colors ${
                  isSelected 
                    ? 'bg-blue-900 text-white font-semibold' 
                    : isCurrentDay
                    ? 'bg-blue-100 text-blue-900 font-semibold'
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span>{day}</span>
                  {todosForDay.length > 0 && (
                    <div className="flex gap-0.5 mt-0.5">
                      {todosForDay.slice(0, 3).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 h-1 rounded-full ${
                            isSelected ? 'bg-white' : 'bg-blue-600'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </button>
            );
          }

          return days;
        })()}
      </div>
    </div>

    {/* Selected Date Items */}
    {selectedCalendarDate && (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            {new Date(selectedCalendarDate + 'T00:00:00').toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            })}
          </h3>
          <button
            onClick={() => setSelectedCalendarDate(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {(() => {
          const [year, month, day] = selectedCalendarDate.split('-').map(Number);
          const date = new Date(year, month - 1, day);
          const itemsOnDate = getTodosForDate(date);
          
          if (itemsOnDate.length === 0) {
            return (
              <p className="text-gray-500 text-center py-8">No action items on this date</p>
            );
          }

          return (
            <div className="space-y-3">
              {itemsOnDate.map(todo => {
                const session = sessions.find(s => s.id === todo.sessionId);
                return (
                  <div
                    key={todo.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className="mt-1 flex-shrink-0"
                      >
                        {todo.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400 hover:text-blue-600" />
                        )}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                          {todo.title}
                        </h4>
                        {todo.description && (
                          <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            todo.priority === 'high' 
                              ? 'bg-orange-100 text-orange-700'
                              : todo.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {todo.priority === 'high' ? 'High Priority' : todo.priority === 'medium' ? 'Medium Priority' : 'Low Priority'}
                          </span>
                          {session && (
                            <button
                              onClick={() => navigateToSession(session.id)}
                              className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 font-medium"
                            >
                              {session.type}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>
    )}
  </div>
)}

        {showNewSessionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
            <div className="min-h-full flex items-start justify-center p-4 py-8">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Record New Session</h2>
              
              {sessionError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-red-800 font-medium">{sessionError}</p>
                  </div>
                  <button
                    onClick={() => setSessionError('')}
                    className="text-red-400 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Type
                  </label>
                  {isAddingCustomType ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={customTypeInput}
                        onChange={(e) => setCustomTypeInput(e.target.value)}
                        placeholder="Enter custom session type..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addCustomSessionType();
                          }
                        }}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={addCustomSessionType}
                          className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                        >
                          Add Type
                        </button>
                        <button
                          onClick={() => {
                            setIsAddingCustomType(false);
                            setCustomTypeInput('');
                          }}
                          className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <select
                        value={newSession.type}
                        onChange={(e) => setNewSession({ ...newSession, type: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                      >
                        <option value="">Select type...</option>
                        <option value="Therapy Session">Therapy Session</option>
                        <option value="Breathwork">Breathwork</option>
                        <option value="Meditation">Meditation</option>
                        <option value="Coaching Session">Coaching Session</option>
                        <option value="Journaling">Journaling</option>
                        <option value="Workshop">Workshop</option>
                        {customSessionTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                      <button
                        onClick={() => setIsAddingCustomType(true)}
                        className="w-full py-2 px-4 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-blue-900 hover:text-blue-900 font-medium transition-colors"
                      >
                        + Add Custom Session Type
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newSession.date}
                    onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Photo (Optional)
                  </label>
                  {uploadedPhoto ? (
                    <div className="relative">
                      <img 
                        src={uploadedPhoto} 
                        alt="Uploaded session content" 
                        className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
                        title="Remove photo"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {isProcessingPhoto && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                          <div className="text-white text-sm font-medium">Extracting text...</div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        disabled={isProcessingPhoto}
                      />
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-900 hover:bg-blue-50 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload a photo
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Text in the photo will be automatically extracted
                        </p>
                      </div>
                    </label>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Notes
                  </label>
                  <div className="relative">
                    <textarea
                      value={newSession.notes}
                      onChange={(e) => setNewSession({ ...newSession, notes: e.target.value })}
                      rows={8}
                      placeholder="What insights did you gain? What patterns emerged? What do you want to work on?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent resize-none"
                      disabled={isRecording}
                    />
                    <button
                      type="button"
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`absolute bottom-3 right-3 p-2 rounded-lg transition-colors ${
                        isRecording
                          ? 'bg-red-500 text-white hover:bg-red-600 animate-pulse'
                          : 'bg-blue-900 text-white hover:bg-blue-800'
                      }`}
                      title={isRecording ? 'Stop recording' : 'Start voice recording'}
                    >
                      {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>
                  </div>
                  {isRecording && (
                    <p className="text-sm text-red-600 mt-2 font-medium">
                      🔴 Recording... Click the microphone button again to stop and transcribe.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    if (isRecording) {
                      stopRecording();
                    }
                    setShowNewSessionModal(false);
                    setNewSession({ type: '', date: '', notes: '' });
                    setIsAddingCustomType(false);
                    setCustomTypeInput('');
                    setUploadedPhoto(null);
                    setIsProcessingPhoto(false);
                    setSessionError('');
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={addSession}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg hover:shadow-lg transition-shadow font-medium"
                >
                  Save Session
                </button>
              </div>
            </div>
            </div>
          </div>
        )}

        {/* Insights Unlock Celebration */}
        {showInsightsUnlock && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Lightbulb className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">🎉 Insights Unlocked!</h2>
              <p className="text-gray-600 mb-6">
                You've completed 10 sessions! You can now generate AI-powered insights about your personal growth journey, recurring themes, and patterns.
              </p>
              <div className="space-y-3">
                <button
                  onClick={generateInsights}
                  disabled={generatingInsights}
                  className="w-full bg-gradient-to-r from-blue-900 to-blue-800 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-shadow disabled:opacity-50"
                >
                  {generatingInsights ? 'Generating Insights...' : 'Generate My Insights'}
                </button>
                <button
                  onClick={() => setShowInsightsUnlock(false)}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        )}

        {showProfileSetup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {userProfile ? 'Edit Profile' : 'Welcome to Virgil'}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {userProfile ? 'Update your information' : 'Create your account to get started'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    We'll use this to personalize your experience
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                {userProfile && (
                  <button
                    onClick={() => {
                      setShowProfileSetup(false);
                      setProfileForm({ name: '', email: '' });
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={userProfile ? updateProfile : saveUserProfile}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg hover:shadow-lg transition-shadow font-medium"
                >
                  {userProfile ? 'Update Profile' : 'Get Started'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Celebration Animation */}
{celebratingTodoId && (
  <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
    <div className="relative">
      {/* Confetti particles */}
      {[...Array(45)].map((_, i) => {
        const angle = (i / 45) * 360 * (Math.PI / 180);
        const distance = 150 + Math.random() * 250;
        const duration = 1.5 + Math.random() * 0.5;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        return (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: ['#ea580c', '#eab308', '#22c55e', '#3b82f6', '#a855f7'][i % 5],
              animation: `confetti-${i} ${duration}s ease-out forwards`,
              animationDelay: `${Math.random() * 0.1}s`,
            }}
          >
            <style>{`
              @keyframes confetti-${i} {
                0% {
                  opacity: 1;
                  transform: translate(0, 0) rotate(0deg) scale(1);
                }
                100% {
                  opacity: 0;
                  transform: translate(${endX}px, ${endY}px) rotate(720deg) scale(0.3);
                }
              }
            `}</style>
          </div>
        );
      })}
    </div>
 
            
            {/* Center celebration text */}
            <div className="absolute text-center">
              <div className="text-4xl font-bold text-blue-900">
                Keep going!
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
