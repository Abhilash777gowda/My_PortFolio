import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { X, Send, Sparkles, Terminal, Copy, Check, Grip } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'system', content: "Hello. I am Grok (port-edition). Ask me anything." }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Resize State
    const [chatSize, setChatSize] = useState({ width: 400, height: 500 });
    const [isResizing, setIsResizing] = useState(false);
    const resizeRef = useRef({ startX: 0, startY: 0, startWidth: 0, startHeight: 0 });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Handle Resize Events
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizing) return;

            const deltaX = resizeRef.current.startX - e.clientX;
            const deltaY = resizeRef.current.startY - e.clientY;

            setChatSize({
                width: Math.max(300, Math.min(800, resizeRef.current.startWidth + deltaX)),
                height: Math.max(400, Math.min(800, resizeRef.current.startHeight + deltaY))
            });
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            document.body.style.cursor = 'default';
        };

        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'nwse-resize';
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    const startResizing = (e) => {
        e.preventDefault();
        setIsResizing(true);
        resizeRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            startWidth: chatSize.width,
            startHeight: chatSize.height
        };
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post('/api/chat', { message: input });
            setMessages([...newMessages, { role: 'assistant', content: response.data.reply }]);
        } catch (error) {
            console.error(error);
            setMessages([...newMessages, { role: 'assistant', content: 'Error connecting to the matrix.' }]);
        } finally {
            setLoading(false);
        }
    };

    const CopyButton = ({ text }) => {
        const [copied, setCopied] = useState(false);

        const handleCopy = () => {
            navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        };

        return (
            <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors"
                title="Copy code"
            >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
            </button>
        );
    };

    return (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60] flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            {isOpen && (
                <div
                    style={{ width: isResizing ? chatSize.width : undefined, height: isResizing ? chatSize.height : undefined }}
                    className="pointer-events-auto mb-4 rounded-2xl bg-white dark:bg-[#09090b] border border-gray-200 dark:border-[#27272a] shadow-2xl flex flex-col font-sans overflow-hidden animate-in slide-in-from-bottom-5 duration-300 origin-bottom-right relative transition-[width,height] ease-out"
                // Apply dynamic width/height via inline styles to avoid conflict with Tailwind responsive classes during resize
                // But we keep responsive classes for initial render/mobile fallback
                >
                    {/* Override style for desktop dynamic sizing */}
                    <style>{`
                        @media (min-width: 768px) {
                            .chat-window-dynamic {
                                width: ${chatSize.width}px !important;
                                height: ${chatSize.height}px !important;
                            }
                        }
                    `}</style>
                    <div className="w-[calc(100vw-2rem)] md:w-auto h-[60vh] md:h-auto max-h-[800px] chat-window-dynamic flex flex-col h-full bg-white dark:bg-[#09090b]">

                        {/* Resize Handle - More Visible */}
                        <div
                            onMouseDown={startResizing}
                            className="absolute top-0 left-0 w-8 h-8 z-50 cursor-nwse-resize flex items-center justify-center text-zinc-400 hover:text-[#4285F4] transition-colors hidden md:flex bg-gradient-to-br from-gray-100 to-transparent dark:from-zinc-800 dark:to-transparent rounded-br-xl"
                            title="Drag to resize"
                        >
                            <Grip size={18} className="-rotate-90" />
                        </div>

                        {/* Header */}
                        <div className="p-4 border-b border-gray-200 dark:border-[#27272a] flex justify-between items-center bg-white/50 dark:bg-[#09090b]/50 backdrop-blur-md select-none" onDoubleClick={() => setChatSize({ width: 400, height: 500 })}>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#0F9D58] animate-pulse"></div>
                                <h3 className="font-semibold text-zinc-800 dark:text-white tracking-wide text-sm flex items-center gap-2">
                                    ABHIBOT <span className="text-[10px] text-zinc-500 font-mono">BETA</span>
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors p-1"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'ml-auto items-end' : 'items-start'
                                        }`}
                                >
                                    <span className="text-[10px] text-zinc-500 mb-1 ml-1 uppercase tracking-wider font-mono">
                                        {msg.role === 'user' ? 'You' : 'Abhibot'}
                                    </span>
                                    <div
                                        className={`px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed ${msg.role === 'user'
                                            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium'
                                            : 'bg-white dark:bg-[#18181b] text-zinc-800 dark:text-zinc-100 border border-gray-200 dark:border-[#27272a]'
                                            }`}
                                    >
                                        <div className="prose dark:prose-invert prose-sm max-w-none break-words">
                                            <ReactMarkdown
                                                rehypePlugins={[rehypeHighlight]}
                                                components={{
                                                    p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                    ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 last:mb-0" {...props} />,
                                                    ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 last:mb-0" {...props} />,
                                                    li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                                    a: ({ node, ...props }) => <a className="text-[#4285F4] hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                                                    code({ node, inline, className, children, ...props }) {
                                                        const match = /language-(\w+)/.exec(className || '')
                                                        const codeText = String(children).replace(/\n$/, '')
                                                        return !inline && match ? (
                                                            <div className="rounded-lg overflow-hidden my-3 border border-gray-200 dark:border-zinc-700 w-full group shadow-sm">
                                                                <div className="bg-gray-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-500 dark:text-zinc-400 border-b border-gray-200 dark:border-zinc-700 flex justify-between items-center">
                                                                    <span className='font-mono font-medium'>{match[1]}</span>
                                                                    <CopyButton text={codeText} />
                                                                </div>
                                                                <div className="overflow-x-auto bg-[#282c34] text-white">
                                                                    <code className={`${className} block p-3 text-sm font-mono leading-relaxed`} {...props}>
                                                                        {children}
                                                                    </code>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <code className="bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-[13px] font-mono border border-gray-200 dark:border-zinc-700 break-all text-[#DB4437] dark:text-[#DB4437]" {...props}>
                                                                {children}
                                                            </code>
                                                        )
                                                    }
                                                }}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex items-start">
                                    <div className="px-4 py-2.5 rounded-2xl bg-white dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 md:p-4 bg-white dark:bg-[#09090b] border-t border-gray-200 dark:border-[#27272a]">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                    placeholder="Ask Abhibot..."
                                    className="w-full bg-gray-50 dark:bg-[#18181b] text-zinc-900 dark:text-white text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-500 rounded-xl px-4 py-3.5 pr-10 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 focus:bg-white dark:focus:bg-[#27272a] transition-all border border-transparent focus:border-gray-300 dark:focus:border-[#3f3f46]"
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={loading || !input.trim()}
                                    className="absolute right-2 p-1.5 bg-black dark:bg-white rounded-lg text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:hover:bg-black dark:disabled:hover:bg-white transition-colors"
                                >
                                    <Send size={16} strokeWidth={2.5} />
                                </button>
                            </div>
                            <div className="text-[10px] text-center text-zinc-400 dark:text-zinc-600 mt-2 font-mono">
                                Abhibot may produce inaccurate information.
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Inactive Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`pointer-events-auto ${isOpen
                    ? 'bg-zinc-100 dark:bg-[#18181b] text-black dark:text-white'
                    : 'bg-black dark:bg-white text-white dark:text-black'
                    } w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center border border-gray-200 dark:border-[#27272a]`}
            >
                {isOpen ? <X size={24} /> : <Terminal size={24} strokeWidth={2.5} />}
            </button>
        </div>
    );
};

export default Chatbot;
