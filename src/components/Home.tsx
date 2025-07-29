import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Gift, ArrowRight } from 'lucide-react';
import { set } from 'mongoose';

const defaultExtraReasons = [
  "Por tu sonrisa que ilumina mis días", "Por cómo me abrazas cuando más lo necesito",
  "Por tu forma única de ver el mundo", "Por hacer que lo ordinario se vuelva extraordinario",
  "Por tu risa contagiosa", "Por cómo me apoyas en mis sueños",
  "Por tu paciencia infinita", "Por los pequeños detalles que me demuestras",
  "Por tu forma de cocinar con amor", "Por cómo cuidas de mí cuando estoy enfermo/a",
  "Por tus mensajes de buenos días", "Por cómo me haces sentir especial",
  "Por tu forma de bailar", "Por escucharme sin juzgar",
  "Por tus abrazos que lo curan todo", "Por tu forma de decir mi nombre",
  "Por compartir tus secretos conmigo", "Por tu manera de ser auténtico/a",
  "Por hacer que cada día sea una aventura", "Por tu corazón generoso",
  "Por cómo me miras", "Por tu forma de caminar tomado/a de mi mano",
  "Por los planes que hacemos juntos", "Por tu forma de consolarme",
  "Por tus besos espontáneos", "Por cómo me entiendes sin palabras",
  "Por tu forma de reír", "Por compartir tus comidas favoritas conmigo",
  "Por tu manera de sorprenderme", "Por cómo me haces sentir en casa",
  "Por tus caricias suaves", "Por tu forma de ser romántico/a",
  "Por cómo me motivas a ser mejor", "Por tu paciencia con mis defectos",
  "Por los momentos de silencio cómodo", "Por tu forma de decir 'te amo'",
  "Por cómo me haces reír hasta llorar", "Por tu manera de ser comprensivo/a",
  "Por los pequeños besos en la frente", "Por cómo celebras mis logros",
  "Por tu forma de hacerme sentir seguro/a", "Por tus mensajes de buenas noches",
  "Por cómo me abrazas por la espalda", "Por tu manera de ser cariñoso/a",
  "Por los planes espontáneos", "Por cómo me cuidas",
  "Por tu forma de ser mi mejor amigo/a", "Por tus ojos que hablan",
  "Por cómo me haces sentir único/a", "Por tu manera de ser protector/a",
  "Por los momentos de complicidad", "Por tu forma de hacerme sonreír",
  "Por cómo compartes tu tiempo conmigo", "Por tu manera de ser detallista",
  "Por los abrazos largos", "Por cómo me apoyas en todo",
  "Por tu forma de ser mi confidente", "Por tus gestos de amor diarios",
  "Por cómo me haces sentir amado/a", "Por tu manera de ser tierno/a",
  "Por los momentos íntimos", "Por tu forma de hacerme sentir importante",
  "Por cómo me complementas", "Por tu manera de ser mi compañero/a",
  "Por los recuerdos que creamos", "Por tu forma de hacerme feliz",
  "Por cómo me inspiras", "Por tu manera de ser mi refugio",
  "Por los proyectos que planeamos", "Por tu forma de amarme incondicionalmente",
  "Por cómo me haces crecer", "Por tu manera de ser mi motivación",
  "Por los sueños que compartimos", "Por tu forma de hacerme sentir completo/a",
  "Por cómo cuidas nuestro amor", "Por tu manera de ser mi esperanza",
  "Por los momentos perfectos", "Por tu forma de hacerme sentir vivo/a",
  "Por cómo me amas tal como soy", "Por tu manera de ser mi todo",
  "Por cada día a tu lado", "Por tu forma de hacer que valga la pena",
  "Por cómo me haces soñar", "Por tu manera de ser mi felicidad",
  "Por los 'te amo' susurrados", "Por tu forma de ser mi mundo",
  "Por cómo me haces sentir en las nubes", "Por tu manera de ser mi alma gemela",
  "Por cada momento compartido", "Por tu forma de ser mi vida",
  "Por cómo me amas sin condiciones", "Por tu manera de ser mi eternidad",
  "Por cada sonrisa que me regalas", "Por tu forma de ser mi universo",
  "Por cómo haces que todo tenga sentido", "Por tu manera de ser mi destino",
  "Por cada latido de tu corazón", "Por tu forma de ser mi hogar",
  "Por cómo me amas más cada día", "Por tu manera de ser mi para siempre"
];

const Home: React.FC = () => {
  
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState('');
  const [reasons, setReasons] = useState(['', '', '']);
  const [partnerName, setPartnerName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [extraReasons, setExtraReasons] = useState<string[]>(defaultExtraReasons); // defaultExtraReasons es tu array predeterminado de 100 razones
  const [showExtraReasons, setShowExtraReasons] = useState(false);
  const navigate = useNavigate();
  
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhoto(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleExtraReasonChange = (index: number, value: string) => {
    const updated = [...extraReasons];
    updated[index] = value;
    setExtraReasons(updated);
  };

  const handleReasonChange = (index: number, value: string) => {
    const newReasons = [...reasons];
    newReasons[index] = value;
    setReasons(newReasons);
  };

  const generateSurprise = async () => {
    const surpriseData = {
      userName,
      reasons: reasons.filter(r => r.trim() !== ''),
      partnerName,
      timestamp: Date.now(),
      photo: photo || null,
      extraReasons: extraReasons.length === 100 ? extraReasons : defaultExtraReasons
    };

    // POST a la API
    const response = await fetch('https://belovely1.onrender.com/surprise', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(surpriseData)
    });
    const result = await response.json();
    const surpriseId = result._id;

    const link = `${window.location.origin}/surprise/${surpriseId}`;
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
            BeLovely1
          </h1>
          <p className="text-gray-600 font-modern">
            Crea una linda sorpresa con más de 100 razones por las que amas a esa persona especial ❤️
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
              Cuéntame 3 razones por las que amas a esa persona especial
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
              <div className="mb-6">
              <label className="block font-modern text-gray-700 mb-2">Foto opcional con tu pareja:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-pink-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100 transition"
              />
              {photo && (
                <img
                  src={photo}
                  alt="Foto pareja"
                  className="rounded-2xl mt-4 mx-auto shadow-lg border-4 border-pink-100 max-h-48 animate__animated animate__fadeIn"
                  style={{ objectFit: 'cover' }}
                />
              )}
            </div>

            <div className="mb-6">
                <button
                type="button"
                onClick={() => setShowExtraReasons(!showExtraReasons)}
                className="bg-gradient-to-r from-pink-200 to-rose-200 text-pink-700 font-semibold py-2 px-4 rounded-xl shadow hover:from-pink-300 hover:to-rose-300 transition-all"
                >
                {showExtraReasons ? 'Ocultar' : 'Editar'} las 100 razones 👀
                </button>
              {showExtraReasons && (
                <div className="mt-4 max-h-80 overflow-y-auto bg-white/90 rounded-xl p-4 border border-pink-100 shadow-inner animate__animated animate__fadeIn">
                  {extraReasons.map((reason, idx) => (
                    <div key={idx} className="mb-2 flex items-center">
                      <span className="font-modern text-xs text-pink-500 mr-2">{idx + 1}.</span>
                      <input
                        type="text"
                        value={reason}
                        onChange={e => handleExtraReasonChange(idx, e.target.value)}
                        className="flex-1 p-2 rounded border border-pink-200 focus:border-pink-400 font-modern text-xs"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            </div>
          </div>
        )}

        {/* Step 3: Partner Name */}
        {step === 3 && (
          <div className="fade-in">
            <h2 className="text-xl font-romantic font-semibold text-gray-800 mb-4 text-center">
              ¿Cómo se llama esa hermosa persona?
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
                setPhoto(null);
                setExtraReasons(defaultExtraReasons);
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