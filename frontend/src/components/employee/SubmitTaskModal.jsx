import React from "react";
import { Send, X } from "lucide-react";

const SubmitTaskModal = ({
    response,
    setResponse,
    closeModal,
    submitTask
}) => {

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4">

                <div className="flex items-center justify-between border-b border-slate-100 pb-3">

                    <div>

                        <h3 className="text-base font-bold text-slate-900">
                            Submit Work Outcome
                        </h3>

                        <p className="text-xs text-slate-500">
                            Provide details or link deliverables for your manager.
                        </p>

                    </div>

                    <button
                        onClick={closeModal}
                        className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                    >
                        <X className="h-4 w-4" />
                    </button>

                </div>


                <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Enter details about your work completion or changes..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 h-32"
                />


                <div className="flex justify-end gap-2">

                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-200"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={submitTask}
                        className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 shadow-xs"
                    >
                        <Send className="h-3.5 w-3.5" />
                        Submit Response
                    </button>

                </div>

            </div>

        </div>
    );
};

export default SubmitTaskModal;