"use client";

import { useEffect, useState } from "react";
import { X, Share } from "lucide-react";

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Only show on iOS Safari
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isInStandaloneMode = window.matchMedia("(display-mode: standalone)").matches;
    const dismissed = localStorage.getItem("install-prompt-dismissed");

    if (isIOS && !isInStandaloneMode && !dismissed) {
      // Delay showing the prompt
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("install-prompt-dismissed", "true");
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-lg shadow-lg border border-slate-200 p-4 z-50">
      <button
        onClick={dismiss}
        className="absolute top-2 right-2 text-slate-400 hover:text-slate-600"
      >
        <X className="w-5 h-5" />
      </button>
      <div className="flex items-start gap-3">
        <div className="p-2 bg-teal-50 rounded-lg">
          <Share className="w-5 h-5 text-teal-600" />
        </div>
        <div>
          <p className="font-medium text-slate-900">Add to Home Screen</p>
          <p className="text-sm text-slate-600 mt-1">
            Install this app for offline access. Tap <Share className="w-4 h-4 inline" /> then &quot;Add to Home Screen&quot;.
          </p>
        </div>
      </div>
    </div>
  );
}
