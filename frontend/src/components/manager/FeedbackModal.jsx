import React from "react";
import { Send } from "lucide-react";

const FeedbackModal = ({
    feedback,
    setFeedback,
    selectedTask,
    setSelectedTask,
    changeRequired
}) => {

    if (!selectedTask) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4">

                <div>

                    <h3 className="text-base font-bold text-slate-900">
                        Request Revisions
                    </h3>

                    <p className="text-xs text-slate-500">
                        Provide feedback on what needs modification before approval.
                    </p>

                </div>

                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Enter details on required fixes..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-rose-400 h-28"
                />

                <div className="flex justify-end gap-2">

                    <button
                        onClick={() => {
                            setSelectedTask(null);
                            setFeedback("");
                        }}
                        className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-200"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => changeRequired(selectedTask)}
                        className="flex items-center gap-1 px-4 py-2 bg-rose-600 text-white text-xs font-semibold rounded-lg hover:bg-rose-700"
                    >
                        <Send className="h-3.5 w-3.5" />
                        Send Back
                    </button>

                </div>

            </div>

        </div>
    );
};

export default FeedbackModal;