
import React, { useState } from 'react';
import { ASSESSMENTS } from './data';
import { Assessment, CategoryType, SimulationState } from './types';

// --- Sub-components ---

const Header: React.FC = () => (
  <header className="border-b border-[#D4AF37] mb-8 py-6 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]">
    <div className="flex justify-between items-center">
      <h1 className="font-bebas text-4xl text-[#800000] tracking-tight">PHISHING SIMULATION</h1>
      <div className="font-bebas text-xl text-[#800000]">PHASE 3: RESPONSE & ACTION</div>
    </div>
  </header>
);

const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  const progress = (current / total) * 100;
  return (
    <div className="w-full bg-gray-100 h-1 mb-8 relative overflow-hidden">
      <div 
        className="bg-[#800000] h-full transition-all duration-700 ease-in-out" 
        style={{ width: `${progress}%` }} 
      />
      <div className="absolute right-0 -top-6 font-bebas text-[#800000] text-sm animate-[fadeIn_0.5s_ease-out]">
        Assessment {current} OF {total}
      </div>
    </div>
  );
};

const ValidationCard: React.FC<{ 
  isCorrect: boolean; 
  explanation: string; 
  onContinue: () => void 
}> = ({ isCorrect, explanation, onContinue }) => (
  <div className="fixed bottom-10 left-1/2 -translate-x-1/2 max-w-4xl w-[calc(100%-2rem)] z-50 pointer-events-none animate-[slideUp_0.4s_ease-out_forwards]">
    <div className="bg-white border-t-4 border-[#800000] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border-x border-b border-gray-100 p-6 pointer-events-auto flex items-center justify-between gap-10">
      <div className="flex items-center gap-6 flex-grow">
        <div className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-500 scale-110 ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-50 text-[#800000]'}`}>
          <span className="text-2xl font-bold leading-none select-none">{isCorrect ? '✓' : '✕'}</span>
        </div>
        <div className="flex-grow">
          <p className="text-[15px] text-gray-700 leading-snug font-medium italic">
            {explanation}
          </p>
        </div>
      </div>
      <div className="flex-shrink-0">
        <button 
          onClick={onContinue}
          className="bg-[#800000] text-white font-bebas text-2xl px-12 py-3.5 hover:bg-[#600000] active:scale-95 transition-all duration-200 flex items-center gap-3 group shadow-md"
        >
          CONTINUE <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  </div>
);

const Footer: React.FC = () => (
  <footer className="mt-32 pt-16 pb-24 border-t border-gray-100 text-center relative overflow-hidden bg-white">
    {/* Radial Dot Grid Pattern based on Design Reference */}
    <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]"></div>
    
    <div className="relative z-10 flex flex-col items-center">
      <div className="text-gray-400 text-xs font-bold tracking-[0.4em] mb-3 select-none">
        © AI ENGINEERING TEAM - 2026
      </div>
      <div className="text-gray-300 text-[10px] font-bold tracking-[0.6em] uppercase select-none">
        Operational Awareness Assessment Module
      </div>
    </div>
    
    {/* Decorative High-Contrast Base Bar */}
    <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#000000]"></div>
  </footer>
);

// --- Main App Component ---

export default function App() {
  const [state, setState] = useState<SimulationState & { isAnswered: boolean, selectedId: any }>({
    currentStep: 0,
    score: 0,
    view: 'landing',
    lastAnswerCorrect: false,
    startTime: 0,
    endTime: 0,
    userAnswers: [],
    isAnswered: false,
    selectedId: null
  });

  const startSimulation = () => {
    setState(prev => ({ 
      ...prev, 
      view: 'assessment', 
      startTime: Date.now(),
      currentStep: 0,
      score: 0,
      userAnswers: [],
      isAnswered: false,
      selectedId: null
    }));
  };

  const handleAnswer = (answer: any) => {
    if (state.isAnswered) return;

    const currentAssessment = ASSESSMENTS[state.currentStep];
    const isCorrect = answer === currentAssessment.correctAnswer;
    
    setState(prev => ({
      ...prev,
      lastAnswerCorrect: isCorrect,
      isAnswered: true,
      selectedId: answer,
      score: isCorrect ? prev.score + 1 : prev.score,
      userAnswers: [...prev.userAnswers, { id: currentAssessment.id, isCorrect }]
    }));
  };

  const nextStep = () => {
    if (state.currentStep >= ASSESSMENTS.length - 1) {
      setState(prev => ({ ...prev, view: 'results', endTime: Date.now() }));
    } else {
      setState(prev => ({ 
        ...prev, 
        currentStep: prev.currentStep + 1, 
        isAnswered: false, 
        selectedId: null 
      }));
    }
  };

  if (state.view === 'landing') {
    return (
      <div className="max-w-4xl mx-auto px-4 min-h-screen flex flex-col justify-between pt-12 animate-[fadeIn_0.8s_ease-out]">
        <div></div>
        <div className="text-center mb-6">
          <div className="inline-block p-4 bg-white border border-gray-100 rounded-lg shadow-sm mb-6">
             <img 
               src="https://api.iconify.design/material-symbols:security.svg?color=%23800000" 
               alt="Company Logo" 
               className="h-16 w-auto opacity-80"
             />
          </div>
          <h2 className="font-bebas text-7xl text-[#800000] mb-2 tracking-tight">SOUGHT. SUSPECTED. SECURED.</h2>
          <h3 className="font-bebas text-3xl text-gray-400 mb-8">PHASE 3: THE INCIDENT PROTOCOL</h3>
          <div className="h-px w-32 bg-[#D4AF37] mx-auto mb-8"></div>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Recognition is only the beginning. In this simulation, we validate your ability to act.
            Whether you've spotted a threat or already clicked a link, what happens next matters most.
          </p>
          <button 
            onClick={startSimulation}
            className="bg-[#800000] text-white font-bebas text-3xl px-16 py-4 hover:bg-[#600000] active:scale-95 transition-all duration-300 tracking-wide shadow-lg hover:shadow-xl"
          >
            START SIMULATION
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  if (state.view === 'results') {
    const totalTime = Math.floor((state.endTime - state.startTime) / 1000);
    const efficiency = Math.round((state.score / ASSESSMENTS.length) * 100);
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 animate-[fadeIn_0.8s_ease-out] min-h-screen flex flex-col">
        <div className="flex-grow">
          <Header />
          <div className="text-center">
            <h2 className="font-bebas text-6xl text-[#800000] mb-2">SIMULATION COMPLETE</h2>
            <div className="h-px w-20 bg-[#D4AF37] mx-auto mb-8"></div>
            
            <div className="grid grid-cols-3 gap-8 mb-12">
              {[
                { label: 'Score', val: `${state.score}/${ASSESSMENTS.length}` },
                { label: 'Efficiency', val: `${efficiency}%` },
                { label: 'Time', val: `${Math.floor(totalTime / 60)}m ${totalTime % 60}s` }
              ].map((stat, idx) => (
                <div key={idx} className="border border-gray-100 p-8">
                  <div className="font-bebas text-gray-400 text-lg mb-2 uppercase tracking-widest">{stat.label}</div>
                  <div className="font-bebas text-5xl text-[#800000]">{stat.val}</div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-8 text-left mb-12 border-l-4 border-[#D4AF37]">
              <h4 className="font-bebas text-2xl text-[#800000] mb-4 uppercase tracking-widest">Remediation Status</h4>
              <p className="text-gray-700 leading-relaxed text-lg">
                {efficiency >= 80 
                  ? "Excellent response patterns. You've demonstrated high proficiency in the post-suspicion reporting cycle." 
                  : "Action required. While recognition is present, your escalation choices need refinement to ensure organizational safety."}
              </p>
            </div>

            <button 
              onClick={() => setState(prev => ({ ...prev, view: 'landing' }))}
              className="bg-[#800000] text-white font-bebas text-2xl px-12 py-3 hover:bg-[#600000] active:scale-95 transition-all duration-300"
            >
              RETURN TO DASHBOARD
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const currentAssessment = ASSESSMENTS[state.currentStep];

  return (
    <div className="max-w-4xl mx-auto px-4 pt-12 min-h-screen flex flex-col">
      <div className="flex-grow">
        <Header />
        <ProgressBar current={state.currentStep + 1} total={ASSESSMENTS.length} />
        
        <div key={state.currentStep} className="animate-[fadeIn_0.5s_ease-out]">
          <div className="mb-12">
            {/* Centered Question Header Block */}
            <div className="text-center mb-12">
              <div className="font-bebas text-gray-400 text-xl mb-3 uppercase tracking-[0.2em]">
                Category: {currentAssessment.category.replace('_', ' ')}
              </div>
              <h2 className="font-bebas text-5xl text-[#800000] leading-[1.1] mb-2 max-w-3xl mx-auto">
                {currentAssessment.question}
              </h2>
            </div>

            {/* --- Category 1: Multiple Choice (Stabilized Alignment) --- */}
            {currentAssessment.category === CategoryType.MULTIPLE_CHOICE && (
              <div className="max-w-2xl mx-auto space-y-4">
                {currentAssessment.choices?.map((choice) => {
                  const isSelected = state.selectedId === choice.id;
                  const isCorrect = currentAssessment.correctAnswer === choice.id;
                  
                  let borderClass = "border-gray-200";
                  let bgClass = "bg-white";
                  let icon = null;

                  if (state.isAnswered) {
                    if (isCorrect) {
                      borderClass = "border-green-500 ring-2 ring-green-50";
                      bgClass = "bg-green-50";
                      icon = <span className="text-green-600">✓</span>;
                    } else if (isSelected) {
                      borderClass = "border-red-500 ring-2 ring-red-50";
                      bgClass = "bg-red-50";
                      icon = <span className="text-[#800000]">✕</span>;
                    } else {
                      bgClass = "opacity-40 grayscale bg-gray-50 pointer-events-none";
                    }
                  }

                  return (
                    <button
                      key={choice.id}
                      disabled={state.isAnswered}
                      onClick={() => handleAnswer(choice.id)}
                      className={`w-full min-h-[88px] px-8 py-4 border ${borderClass} ${bgClass} transition-all duration-200 flex items-center group relative overflow-hidden`}
                    >
                      {/* Enforced Vertical Axis Anchor: Fixed width circle */}
                      <div className={`w-12 h-12 min-w-[48px] rounded-full border-2 flex items-center justify-center mr-8 font-bebas transition-all duration-300 flex-shrink-0 ${
                        state.isAnswered && isCorrect ? 'bg-green-600 text-white border-green-600' : 
                        isSelected && !isCorrect ? 'bg-[#800000] text-white border-[#800000]' :
                        'border-gray-300 text-[#800000] group-hover:bg-[#800000] group-hover:text-white group-hover:border-[#800000]'
                      }`}>
                        <span className="text-2xl leading-none pt-1 select-none">
                          {choice.id.toUpperCase()}
                        </span>
                      </div>
                      
                      {/* Left-Aligned Answer Text Block */}
                      <div className="text-[17px] text-gray-700 font-medium leading-snug text-left flex-grow py-1">
                        {choice.text}
                      </div>
                      
                      {/* Fixed Right-Side Icon Slot */}
                      <div className="w-10 flex-shrink-0 flex items-center justify-center ml-4">
                        {icon && <div className="text-3xl font-bold animate-[scaleIn_0.2s_ease-out]">{icon}</div>}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* --- Category 2: True / False --- */}
            {currentAssessment.category === CategoryType.TRUE_FALSE && (
              <div className="flex gap-6 max-w-2xl mx-auto">
                {[true, false].map((val) => {
                  const label = val ? 'TRUE' : 'FALSE';
                  const isCorrect = currentAssessment.correctAnswer === val;
                  const isSelected = state.selectedId === val;

                  let styleClass = "border-gray-200 bg-white hover:border-[#800000]";
                  if (state.isAnswered) {
                    if (isCorrect) styleClass = "border-green-500 bg-green-50 ring-4 ring-green-50";
                    else if (isSelected) styleClass = "border-red-500 bg-red-50 ring-4 ring-red-50";
                    else styleClass = "opacity-30 grayscale bg-gray-50 pointer-events-none";
                  }

                  return (
                    <button
                      key={label}
                      disabled={state.isAnswered}
                      onClick={() => handleAnswer(val)}
                      className={`flex-1 p-12 border-2 transition-all duration-500 text-center group ${styleClass}`}
                    >
                      <div className={`font-bebas text-6xl transition-colors duration-500 ${state.isAnswered && isCorrect ? 'text-green-600' : 'text-[#800000]'}`}>
                        {label}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* --- Category 3: Email Simulation --- */}
            {currentAssessment.category === CategoryType.EMAIL_SIMULATION && currentAssessment.emailData && (
              <div className="space-y-10">
                <div className={`border border-gray-200 shadow-sm transition-all duration-700 ${state.isAnswered ? 'opacity-50 blur-[1px]' : 'hover:shadow-md'}`}>
                  <div className="bg-gray-50 p-5 border-b border-gray-200">
                    <div className="grid grid-cols-[80px_1fr] gap-2 text-sm mb-1">
                      <span className="text-gray-400 font-bold uppercase tracking-wider">From:</span>
                      <span className="text-gray-800 font-semibold">{currentAssessment.emailData.sender}</span>
                    </div>
                    <div className="grid grid-cols-[80px_1fr] gap-2 text-sm mb-1">
                      <span className="text-gray-400 font-bold uppercase tracking-wider">To:</span>
                      <span className="text-gray-800">{currentAssessment.emailData.recipient}</span>
                    </div>
                    <div className="grid grid-cols-[80px_1fr] gap-2 text-sm">
                      <span className="text-gray-400 font-bold uppercase tracking-wider">Subject:</span>
                      <span className="text-gray-800 font-bold uppercase tracking-tight">{currentAssessment.emailData.subject}</span>
                    </div>
                  </div>
                  <div className="p-10 bg-white text-gray-700 leading-relaxed space-y-5 min-h-[300px]">
                    {currentAssessment.emailData.body.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                    
                    {currentAssessment.emailData.hoverLink && (
                      <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-800 text-sm group relative inline-block cursor-help transition-all hover:bg-blue-100">
                        <span className="underline decoration-dotted font-medium">{currentAssessment.emailData.displayLink}</span>
                        <div className="absolute bottom-full left-0 mb-2 p-2 bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 whitespace-nowrap shadow-xl transform translate-y-1 group-hover:translate-y-0">
                          Destination: {currentAssessment.emailData.hoverLink}
                        </div>
                      </div>
                    )}

                    {currentAssessment.emailData.attachment && (
                      <div className="mt-8 flex items-center p-5 border border-gray-100 bg-gray-50 w-72 hover:bg-gray-100 transition-colors cursor-default group">
                        <div className="mr-4 text-[#800000] text-3xl group-hover:scale-110 transition-transform">📎</div>
                        <div>
                          <div className="text-sm font-bold text-gray-800">{currentAssessment.emailData.attachment.name}</div>
                          <div className="text-xs text-gray-400 uppercase tracking-[0.2em] font-bold">{currentAssessment.emailData.attachment.type.split('/')[1]} FILE</div>
                        </div>
                      </div>
                    )}

                    <div className="mt-12 pt-8 border-t border-gray-100 text-gray-400 text-sm whitespace-pre-line leading-relaxed">
                      {currentAssessment.emailData.signature}
                    </div>
                    <div className="mt-6 text-[10px] text-gray-300 leading-tight italic uppercase tracking-[0.2em] font-medium max-w-xl">
                      {currentAssessment.emailData.disclaimer}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {['Report', 'Report to Bank', 'Escalate', 'Verify/Report'].map((action) => {
                    const isCorrect = currentAssessment.correctAnswer === action;
                    const isSelected = state.selectedId === action;
                    
                    let btnStyle = "border-gray-200 text-gray-600 hover:border-[#800000] hover:text-[#800000] hover:bg-gray-50";
                    if (state.isAnswered) {
                      if (isCorrect) btnStyle = "bg-green-600 text-white border-green-600 ring-4 ring-green-50 shadow-lg";
                      else if (isSelected) btnStyle = "bg-[#800000] text-white border-[#800000] ring-4 ring-red-50 shadow-lg";
                      else btnStyle = "opacity-20 grayscale border-gray-100 pointer-events-none scale-95";
                    }

                    return (
                      <button
                        key={action}
                        disabled={state.isAnswered}
                        onClick={() => handleAnswer(action)}
                        className={`border-2 py-5 px-3 font-bebas text-xl transition-all duration-500 active:scale-90 tracking-wide ${btnStyle}`}
                      >
                        {action === 'Report' ? 'REPORT TO IT' : 
                         action === 'Report to Bank' ? 'REPORT TO BANK / NPC' :
                         action === 'Escalate' ? 'ESCALATE TO SOC' : 'VERIFY & REPORT'}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {state.isAnswered && (
          <ValidationCard 
            isCorrect={state.lastAnswerCorrect} 
            explanation={currentAssessment.explanation} 
            onContinue={nextStep}
          />
        )}
      </div>
      
      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
