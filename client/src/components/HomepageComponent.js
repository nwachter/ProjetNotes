import React, { useEffect, useState } from 'react';
import { fetchAllNotes } from '../services/notes';

const HomepageComponent = ({ notesData }) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getNotes = async () => {
            try {
                const data = await fetchAllNotes();
                setNotes(data);
            } catch (err) {
                setError('Failed to fetch notes.');
            } finally {
                setLoading(false);
            }
        };

        getNotes();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>All Notes</h1>
            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                        <small>Created At: {new Date(note.createdAt).toLocaleString()}</small>
                        <p>Tags: {note.tags.join(', ')}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomepageComponent;
