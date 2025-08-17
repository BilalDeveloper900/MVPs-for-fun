'use client';

import { useState } from 'react';
import HookCTA from '../components/HookCTA';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import { apiService, GeneratedContent } from '../services/api';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [toast, setToast] = useState({ message: '', isVisible: false });

  const generateHooksAndCTAs = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    
    try {
      // Use the real API service
      const content = await apiService.generateContent(topic.trim());
      setGeneratedContent(content);
      setToast({ message: 'Content generated successfully!', isVisible: true });
    } catch (error) {
      console.error('Failed to generate content:', error);
      setToast({ 
        message: error instanceof Error ? error.message : 'Failed to generate content', 
        isVisible: true 
      });
    } finally {
      setIsGenerating(false);
      setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 3000);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast({ message: 'Copied to clipboard!', isVisible: true });
      setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 3000);
    } catch (err) {
      setToast({ message: 'Failed to copy to clipboard', isVisible: true });
      setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 3000);
    }
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Hooks & CTAs Generator
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Generate compelling hooks and call-to-actions for your content using AI
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="mb-6">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
              What's your post topic or idea?
            </label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., email marketing, productivity, weight loss..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              onKeyPress={(e) => e.key === 'Enter' && generateHooksAndCTAs()}
            />
          </div>
          
          <button
            onClick={generateHooksAndCTAs}
            disabled={!topic.trim() || isGenerating}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
              !topic.trim() || isGenerating
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            {isGenerating ? <LoadingSpinner /> : 'Generate Hooks & CTAs'}
          </button>
        </div>

        {/* Output Section */}
        {generatedContent && (
          <div className="space-y-6">
            {/* Hooks Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-blue-600 mr-2">🎯</span>
                Compelling Hooks
              </h2>
              <div className="space-y-3">
                {generatedContent.hooks.map((hook, index) => (
                  <HookCTA
                    key={index}
                    text={hook}
                    type="hook"
                    onCopy={copyToClipboard}
                  />
                ))}
              </div>
            </div>

            {/* CTAs Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-green-600 mr-2">🚀</span>
                Call-to-Actions
              </h2>
              <div className="space-y-3">
                {generatedContent.ctas.map((cta, index) => (
                  <HookCTA
                    key={index}
                    text={cta}
                    type="cta"
                    onCopy={copyToClipboard}
                  />
                ))}
              </div>
            </div>

            {/* Regenerate Button */}
            <div className="text-center">
              <button
                onClick={() => setGeneratedContent(null)}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Generate New Ideas
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!generatedContent && (
          <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">How to use:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Enter your post topic or idea in the input field above</li>
              <li>Click "Generate Hooks & CTAs" to create compelling content using AI</li>
              <li>Copy any hooks or CTAs you like to use in your content</li>
              <li>Generate new ideas anytime by clicking the regenerate button</li>
            </ol>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                💡 <strong>Powered by AI:</strong> This tool uses GPT-4-turbo to generate unique, 
                engaging content tailored to your specific topic.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
    </main>
  );
}
