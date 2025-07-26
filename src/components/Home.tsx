import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Gift, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState('');
  const [reasons, setReasons] = useState(['', '', '']);
  const [partnerName, setPartnerName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleReasonChange = (index: number, value: string) => {
    const newReasons = [...reasons];
    newReasons[index] = value;
    setReasons(newReasons);
  };

  const generateSurprise = () => {
    const surpriseId = Math.random().toString(36).substr(2, 9);
    const surpriseData = {
      userName,
      reasons: reasons.filter(r => r.trim() !== ''),
      partnerName,
      timestamp: Date.now()
    };
    
    localStorage.setItem(`surprise_${surpriseId}`, JSON.stringify(surpriseData));
    const params = new URLSearchParams({
      userName,
      partnerName,
      reasons: JSON.stringify(reasons.filter(r => r.trim() !== ''))
    }).toString();
    const link = `${window.location.origin}/surprise/${surpriseId}?${params}`;
    setGeneratedLink(link);
    setStep(5);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    alert('¡Enlace copiado! Compártelo con tu pareja ❤️');
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return userName.trim() !== '';
      case 2:
        return reasons.every(r => r.trim() !== '');
      case 3:
        return partnerName.trim() !== '';
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-20 left-10 text-pink-300 heart-float w-6 h-6" />
        <Heart className="absolute top-40 right-20 text-rose-300 heart-float-delayed w-4 h-4" />
        <Heart className="absolute bottom-32 left-20 text-red-300 heart-float w-5 h-5" />
        <Heart className="absolute bottom-20 right-10 text-pink-400 heart-float-delayed w-3 h-3" />
      </div>

      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-pink-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full">
              <Gift className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-romantic font-bold text-gray-800 mb-2">
            Carta de Amor
          </h1>
          <p className="text-gray-600 font-modern">
            Crea una sorpresa especial para esa persona que amas
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  step >= num
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: User Name */}
        {step === 1 && (
          <div className="fade-in">
            <h2 className="text-xl font-romantic font-semibold text-gray-800 mb-4 text-center">
              ¡Hola! ¿Cuál es tu nombre?
            </h2>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Escribe tu nombre aquí..."
              className="w-full p-4 border-2 border-pink-200 rounded-2xl focus:border-pink-400 focus:outline-none transition-colors duration-300 font-modern"
              autoFocus
            />
          </div>
        )}

        {/* Step 2: 3 Reasons */}
        {step === 2 && (
          <div className="fade-in">
            <h2 className="text-xl font-romantic font-semibold text-gray-800 mb-4 text-center">
              Cuéntame 3 razones por las que amas a tu pareja
            </h2>
            <div className="space-y-4">
              {reasons.map((reason, index) => (
                <div key={index} className="slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-modern">
                    Razón {index + 1}:
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => handleReasonChange(index, e.target.value)}
                    placeholder={`Escribe la razón ${index + 1}...`}
                    className="w-full p-3 border-2 border-pink-200 rounded-xl focus:border-pink-400 focus:outline-none transition-colors duration-300 font-modern resize-none"
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Partner Name */}
        {step === 3 && (
          <div className="fade-in">
            <h2 className="text-xl font-romantic font-semibold text-gray-800 mb-4 text-center">
              ¿Cómo se llama esa persona especial?
            </h2>
            <input
              type="text"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              placeholder="Escribe el nombre de tu pareja..."
              className="w-full p-4 border-2 border-pink-200 rounded-2xl focus:border-pink-400 focus:outline-none transition-colors duration-300 font-modern"
              autoFocus
            />
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="fade-in text-center">
            <h2 className="text-xl font-romantic font-semibold text-gray-800 mb-6">
              ¡Perfecto! Tu sorpresa está lista
            </h2>
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-2xl mb-6 border border-pink-100">
              <p className="font-modern text-gray-700 mb-2">
                <strong>{userName}</strong> le preparó una sorpresa especial a <strong>{partnerName}</strong>
              </p>
              <div className="flex justify-center">
                <Heart className="text-pink-500 pulse-heart w-6 h-6" />
              </div>
            </div>
            <button
              onClick={generateSurprise}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold py-4 px-6 rounded-2xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-modern"
            >
              Crear Sorpresa ✨
            </button>
          </div>
        )}

        {/* Step 5: Generated Link */}
        {step === 5 && (
          <div className="fade-in text-center">
            <h2 className="text-xl font-romantic font-semibold text-gray-800 mb-4">
              ¡Tu sorpresa está lista! 🎉
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl mb-6 border border-green-200">
              <p className="text-sm text-gray-600 mb-3 font-modern">
                Comparte este enlace con {partnerName}:
              </p>
              <div className="bg-white p-3 rounded-xl border-2 border-dashed border-gray-300 mb-4">
                <p className="text-xs text-gray-500 break-all font-mono">
                  {generatedLink}
                </p>
              </div>
              <button
                onClick={copyLink}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-md font-modern"
              >
                Copiar Enlace 📋
              </button>
            </div>
            <button
              onClick={() => {
                setStep(1);
                setUserName('');
                setReasons(['', '', '']);
                setPartnerName('');
                setGeneratedLink('');
              }}
              className="text-pink-500 hover:text-pink-600 transition-colors duration-300 font-modern text-sm"
            >
              Crear otra sorpresa
            </button>
          </div>
        )}

        {/* Navigation Button */}
        {step < 4 && (
          <div className="mt-8">
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform font-modern flex items-center justify-center gap-2 ${
                canProceed()
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 hover:scale-105 shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continuar
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;