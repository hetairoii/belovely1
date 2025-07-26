import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Gift, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SurpriseData {
  userName: string;
  reasons: string[];
  partnerName: string;
  timestamp: number;
}

const SurprisePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [surpriseData, setSurpriseData] = useState<SurpriseData | null>(null);
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'gifts' | 'extraReasons'>('welcome');
  const [openedGifts, setOpenedGifts] = useState<boolean[]>([false, false, false, false]);
  const [showExtraReasons, setShowExtraReasons] = useState(false);

  const extraReasons = [
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
    "Por cómo me amas más cada día", "Por tu manera de ser mi para siempre",
    "Por cada 'buenos días' y 'buenas noches'", "Por tu forma de ser mi razón de ser",
    "Por cómo me haces creer en el amor", "Por tu manera de ser mi milagro diario",
    "Por cada aventura juntos", "Por tu forma de ser mi mejor decisión",
    "Por cómo me amas en mis peores momentos", "Por tu manera de ser mi salvación",
    "Por cada plan que hacemos", "Por tu forma de ser mi inspiración",
    "Por cómo me haces sentir invencible", "Por tu manera de ser mi fortaleza",
    "Por cada gesto de amor", "Por tu forma de ser mi bendición",
    "Por cómo me amas más allá de las palabras", "Por tu manera de ser mi regalo de la vida"
  ];

  useEffect(() => {
    if (id) {
      const data = localStorage.getItem(`surprise_${id}`);
      if (data) {
        setSurpriseData(JSON.parse(data));
      }
    }
  }, [id]);

  const handleGiftClick = (index: number) => {
    if (index === 3 && openedGifts.slice(0, 3).some(opened => !opened)) {
      return; // Can't open the 4th gift until the first 3 are opened
    }
    
    const newOpenedGifts = [...openedGifts];
    newOpenedGifts[index] = true;
    setOpenedGifts(newOpenedGifts);

    if (index === 3) {
      setTimeout(() => {
        setShowExtraReasons(true);
      }, 1000);
    }
  };

  if (!surpriseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-pink-400 mx-auto mb-4 pulse-heart" />
          <p className="text-xl text-gray-600 font-romantic">
            Cargando tu sorpresa especial...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute text-pink-300 opacity-20 ${
              i % 2 === 0 ? 'heart-float' : 'heart-float-delayed'
            }`}
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              width: `${Math.random() * 20 + 15}px`,
              height: `${Math.random() * 20 + 15}px`,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Welcome Screen */}
        {currentScreen === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-pink-100">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="mb-8"
              >
                <div className="p-6 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                  <Heart className="w-12 h-12 text-white pulse-heart" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-3xl md:text-4xl font-romantic font-bold text-gray-800 mb-6"
              >
                ¡Hola, {surpriseData.partnerName}!
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-lg md:text-xl text-gray-700 mb-8 font-modern leading-relaxed"
              >
                Parece que te has vuelto alguien muy especial para{' '}
                <span className="font-semibold text-pink-600">{surpriseData.userName}</span>, 
                así que te preparó esta sorpresa ¿Lista para ver?
              </motion.p>

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                onClick={() => setCurrentScreen('gifts')}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold py-4 px-8 rounded-2xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-modern text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Vamos a ver ✨
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Gifts Screen */}
        {currentScreen === 'gifts' && (
          <motion.div
            key="gifts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-romantic font-bold text-center text-gray-800 mb-12"
            >
              Tus regalos especiales 🎁
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* First 3 user reasons */}
              {surpriseData.reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.2 }}
                  className="flex justify-center"
                >
                  <div
                    onClick={() => handleGiftClick(index)}
                    className={`gift-box cursor-pointer relative bg-gradient-to-r from-pink-400 to-rose-400 rounded-3xl p-8 shadow-2xl border-4 border-white hover:shadow-3xl transition-all duration-300 max-w-sm w-full ${
                      openedGifts[index] ? 'gift-opened' : ''
                    }`}
                  >
                    {!openedGifts[index] ? (
                      <div className="text-center">
                        <Gift className="w-16 h-16 text-white mx-auto mb-4" />
                        <p className="text-white font-romantic font-semibold text-xl">
                          Regalo {index + 1}
                        </p>
                        <p className="text-pink-100 text-sm mt-2 font-modern">
                          Haz click para abrir
                        </p>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                      >
                        <Heart className="w-12 h-12 text-white mx-auto mb-4 pulse-heart" />
                        <p className="text-white font-romantic font-semibold text-lg mb-3">
                          Razón {index + 1}:
                        </p>
                        <p className="text-white font-modern leading-relaxed">
                          {reason}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* 4th special gift */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 }}
                className="flex justify-center md:col-span-2"
              >
                <div
                  onClick={() => handleGiftClick(3)}
                  className={`gift-box cursor-pointer relative rounded-3xl p-8 shadow-2xl border-4 border-white hover:shadow-3xl transition-all duration-300 max-w-sm w-full ${
                    openedGifts.slice(0, 3).every(opened => opened)
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 cursor-pointer'
                      : 'bg-gray-400 cursor-not-allowed opacity-50'
                  } ${openedGifts[3] ? 'gift-opened' : ''}`}
                >
                  {!openedGifts[3] ? (
                    <div className="text-center">
                      <Sparkles className="w-16 h-16 text-white mx-auto mb-4" />
                      <p className="text-white font-romantic font-semibold text-xl">
                        Regalo Especial
                      </p>
                      <p className="text-pink-100 text-sm mt-2 font-modern">
                        {openedGifts.slice(0, 3).every(opened => opened)
                          ? 'Haz click para abrir'
                          : 'Abre los otros 3 primero'}
                      </p>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center"
                    >
                      <Sparkles className="w-12 h-12 text-white mx-auto mb-4 pulse-heart" />
                      <p className="text-white font-romantic font-bold text-2xl">
                        ¿En serio pensaste que eran solo 3? 😄
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Extra Reasons Section */}
            <AnimatePresence>
              {showExtraReasons && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-pink-100"
                >
                  <h3 className="text-3xl font-romantic font-bold text-center text-gray-800 mb-8">
                    Más de 100 razones por las que te amamos ❤️
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                    {extraReasons.map((reason, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-200 hover:shadow-md transition-shadow duration-300"
                      >
                        <p className="text-gray-700 font-modern text-sm">
                          {reason}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-center mt-8">
                    <div className="flex justify-center items-center gap-2">
                      <Heart className="w-6 h-6 text-pink-500 pulse-heart" />
                      <p className="text-xl font-romantic font-semibold text-gray-800">
                        Con amor, {surpriseData.userName}
                      </p>
                      <Heart className="w-6 h-6 text-pink-500 pulse-heart" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SurprisePage;