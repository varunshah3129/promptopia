'use client';

import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);

    const searchParams = useSearchParams();
    const promptId = searchParams.get('id'); // Use useSearchParams to get the ID

    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    useEffect(() => {
        const getPromptDetails = async () => {
            if (promptId) {
                const response = await fetch(`/api/prompt/${promptId}`);
                const data = await response.json();

                setPost({
                    prompt: data.prompt,
                    tag: data.tag
                });
            }
        };

        getPromptDetails();
    }, [promptId]);

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) return alert('Prompt ID not found');

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            });

            if (response.ok) {
                await router.push('/');
            } else {
                console.error('Failed to update prompt', response.statusText);
            }
        } catch (e) {
            console.error('Error updating prompt:', e);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    );

};

export default EditPrompt;
