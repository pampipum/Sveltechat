<script lang="ts">
    import { onMount } from 'svelte';
    import ChatMessage from '$lib/components/ChatMessage.svelte';

    // Define your own type or interface for chat messages if needed
    interface ChatMessage {
        role: 'user' | 'assistant';
        content: string;
    }

    let query: string = '';
    let answer: string = '';
    let loading: boolean = false;
    let chatMessages: ChatMessage[] = [];
    let scrollToDiv: HTMLDivElement;
    let threadId: string | null = null;

    // Initialize conversation thread when component is mounted
    onMount(async () => {
        await initializeThread();
    });

    async function initializeThread() {
        try {
            const response = await fetch('https://openaichat-dl8n.onrender.com/start');
            const data = await response.json();
            if (response.ok) {
                threadId = data.thread_id;
            } else {
                throw new Error(data.error || 'Failed to initialize conversation thread.');
            }
        } catch (err) {
            handleError(err);
        }
    }

    function scrollToBottom() {
        setTimeout(function () {
            scrollToDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
        }, 100)
    }

    const handleSubmit = async () => {
        loading = true
        chatMessages = [...chatMessages, { role: 'user', content: query }]

        try {
            const response = await fetch('https://openaichat-dl8n.onrender.com/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    thread_id: threadId,
                    message: query
                })
            });

            const data = await response.json();

            if (response.ok) {
                if (!threadId) {
                    threadId = data.thread_id; // Save the thread ID for subsequent requests
                }
                chatMessages = [...chatMessages, { role: 'assistant', content: data.response }];
            } else {
                handleError(data.error);
            }
        } catch (err) {
            handleError(err);
        } finally {
            loading = false;
            query = '';
            scrollToBottom();
        }
    }

    function handleError<T>(err: T) {
        loading = false;
        query = '';
        answer = '';
        console.error(err);
    }
</script>

<div class="flex flex-col pt-4 w-full px-8 items-center gap-2">
	<div>
		<h1 class="text-2xl font-bold w-full text-center">Steinbock Solar Expert</h1>
		<p class="text-sm italic">Powered by gpt-3.5-turbo</p>
	</div>
	<div class="h-[500px] w-full bg-gray-900 rounded-md p-4 overflow-y-auto flex flex-col gap-4">
		<div class="flex flex-col gap-2">
			<ChatMessage type="assistant" message="Hello, ask me anything you want!" />
			{#each chatMessages as message}
				<ChatMessage type={message.role} message={message.content} />
			{/each}
			{#if answer}
				<ChatMessage type="assistant" message={answer} />
			{/if}
			{#if loading}
				<ChatMessage type="assistant" message="Loading.." />
			{/if}
		</div>
		<div class="" bind:this={scrollToDiv} />
	</div>
	<form
		class="flex w-full rounded-md gap-4 bg-gray-900 p-4"
		on:submit|preventDefault={() => handleSubmit()}
	>
		<input type="text" class="input input-bordered w-full" bind:value={query} />
		<button type="submit" class="btn btn-accent"> Send </button>
	</form>
</div>
