import React, { useState, useEffect } from 'react';
import { getAllTags } from '../../services/tags';

const Tags = () => {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const data = await getAllTags();
                setTags(data);
            } catch (err) {
                setError('Failed to fetch tags.');
            } finally {
                setLoading(false);
            }
        };

        fetchTags();
    }, []);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex justify-center my-4 gap-4 flex-wrap">
            {tags?.map((tag, index) => (
                <button
                    key={index}
                    className="px-4 py-1.5 font-lora text-[13px] bg-teal-700/90 text-gray-100 active:text-slate-700/70 active:bg-opacity-70 rounded-full shadow hover:filter hover:brightness-110 transition-all hover:scale-110 duration-300 ease-in-out"
                >
                    #{tag?.name}
                </button>
            ))}
        </div>
    );
};

export default Tags;
