'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Edit2, Trash2, Send, X, FileText } from 'lucide-react';

interface Note {
  id: string;
  date: string; // ISO or formatted
  content: string;
}

export function LeadNotes() {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', date: '10 Jul', content: 'Site visit completed.' },
    { id: '2', date: '07 Jul', content: 'Asked for discount.' },
    { id: '3', date: '05 Jul', content: 'Customer interested in 3 BHK.' }
  ]);

  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    // Formatting current date like "12 Jul"
    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short' }).format(now);
    
    const note: Note = {
      id: Math.random().toString(36).substring(7),
      date: formattedDate,
      content: newNote.trim()
    };
    
    // Add to top of list
    setNotes([note, ...notes]);
    setNewNote('');
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const saveEdit = (id: string) => {
    if (!editContent.trim()) return;
    setNotes(notes.map(n => n.id === id ? { ...n, content: editContent.trim() } : n));
    setEditingId(null);
    setEditContent('');
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <section className="bg-card border rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="bg-muted/30 p-5 border-b">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" /> Internal Notes
        </h3>
      </div>
      
      {/* Add Note Section */}
      <div className="p-5 border-b bg-muted/10">
        <div className="relative">
          <Textarea 
            placeholder="Add a new note..." 
            className="min-h-[80px] pr-12 pb-10 resize-none bg-card"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <div className="absolute bottom-3 right-3 flex justify-end">
            <Button size="sm" onClick={handleAddNote} disabled={!newNote.trim()}>
              <Send className="w-4 h-4 mr-2" /> Add
            </Button>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto max-h-[400px]">
        {notes.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No notes added yet.
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-border">
            {notes.map((note) => (
              <div key={note.id} className="p-5 hover:bg-muted/30 transition-colors group">
                {editingId === note.id ? (
                  <div className="space-y-3">
                    <Textarea 
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="min-h-[80px] resize-none"
                    />
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={() => saveEdit(note.id)}>
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-semibold text-primary">{note.date}</span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => startEdit(note)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => deleteNote(note.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-foreground text-sm whitespace-pre-wrap leading-relaxed">
                      {note.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
