import React, { useEffect, useState } from 'react';
import { RegistrationForm } from './RegistrationForm';
import { CommentsSection } from './CommentsSection';
import { RelatedArticles } from './RelatedArticles';
import { ArrowDownIcon, CheckCircleIcon, ShieldIcon, AlertCircleIcon, ClockIcon } from 'lucide-react';
export function ArticleContent() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  // Calculate dynamic date (30 days from now)
  const dynamicDate = new Date();
  dynamicDate.setDate(dynamicDate.getDate() + 30);
  const formattedDate = dynamicDate.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  // Show sticky CTA after scrolling past intro
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // Scroll to registration form
  const scrollToForm = () => {
    const form = document.getElementById('registration-form');
    if (form) {
      form.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  // Countdown timer state
  const [countdown, setCountdown] = useState({
    days: 30,
    hours: 12,
    minutes: 45,
    seconds: 20
  });
  // Update countdown timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return {
            ...prev,
            seconds: prev.seconds - 1
          };
        } else if (prev.minutes > 0) {
          return {
            ...prev,
            minutes: prev.minutes - 1,
            seconds: 59
          };
        } else if (prev.hours > 0) {
          return {
            ...prev,
            hours: prev.hours - 1,
            minutes: 59,
            seconds: 59
          };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59
          };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return <div className="prose max-w-none">
      {/* Sticky CTA for mobile and desktop */}
      {showStickyCTA && <div className="fixed bottom-0 left-0 w-full bg-red-600 text-white py-2 md:py-3 px-4 z-50 shadow-lg flex justify-between items-center">
          <div className="text-sm md:text-base font-bold flex items-center">
            <ClockIcon size={16} className="mr-1" />
            Oportunidad limitada: {countdown.days} días restantes
          </div>
          <button onClick={scrollToForm} className="bg-white text-red-600 px-3 md:px-4 py-1 md:py-2 rounded-md text-xs md:text-sm font-bold hover:bg-gray-100 transition-colors">
            CONOCER MÁS
          </button>
        </div>}

      {/* Official program banner - more subtle */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-2 mb-6 flex items-center justify-center gap-2">
        <span className="text-xs font-medium text-gray-600 flex items-center">
          <img src="/gratis-png-comision-federal-de-electricidad-de-la-ciudad-de-mexico-con-el-logotipo-de-pemex-mil-removebg-preview.png" alt="CFE" className="h-5 w-auto mr-1" />
          Programa Oficial de Inversión Ciudadana 2025
        </span>
      </div>

      {/* Summary box at the top - more professional */}
      <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-600 mb-6 md:mb-8">
        <h3 className="text-lg font-bold mb-2 text-black">Puntos clave:</h3>
        <ul className="text-sm md:text-base space-y-2">
          <li className="flex items-start">
            <span className="text-red-600 mr-2">•</span>
            <span>
              El programa está respaldado oficialmente por la Comisión Federal
              de Electricidad y el Gobierno Federal
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 mr-2">•</span>
            <span>
              Los participantes pueden obtener rendimientos mensuales entre 15%
              y 25% sobre su inversión
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 mr-2">•</span>
            <span>
              La inversión mínima requerida es de $2,500 pesos mexicanos
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-red-600 mr-2">•</span>
            <span>
              El programa permite retiros disponibles en cualquier momento sin
              penalizaciones
            </span>
          </li>
        </ul>
      </div>

      <p className="font-serif text-base md:text-lg mb-6 leading-relaxed">
        <span className="font-bold text-xl">CDMX – Enero 2025.</span> La
        presidenta electa Claudia Sheinbaum, junto al expresidente Andrés Manuel
        López Obrador, presentaron el nuevo Programa de Inversión Ciudadana de
        la CFE, una iniciativa que permite a los mexicanos generar ingresos
        adicionales a través de inversiones en proyectos energéticos
        estratégicos.
      </p>

      <p className="font-serif leading-relaxed">
        Este proyecto, respaldado por la Comisión Federal de Electricidad,
        permite que cualquier ciudadano participe con una aportación mínima de
        $2,500 pesos, obteniendo rendimientos mensuales significativamente
        superiores a los ofrecidos por bancos tradicionales.
      </p>

      {/* First CTA button - more subtle and professional */}
      <div className="my-6 text-center">
        <button onClick={scrollToForm} className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition-colors inline-flex items-center text-sm">
          MÁS INFORMACIÓN SOBRE EL PROGRAMA
          <ArrowDownIcon size={14} className="ml-2" />
        </button>
        <p className="text-xs text-gray-500 mt-2">
          Programa oficial respaldado por la Comisión Federal de Electricidad
        </p>
      </div>

      <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-black border-b border-gray-200 pb-2">
        ¿Por qué es importante este programa?
      </h2>

      <p className="font-serif leading-relaxed">
        La presidenta Sheinbaum explicó que este mecanismo busca:
      </p>

      <ul className="space-y-3 my-4">
        <li className="flex items-start bg-gray-50 p-3 rounded-md">
          <span className="text-red-600 mr-2 font-bold">•</span>
          <span className="font-serif">
            <strong>Democratizar las inversiones:</strong> Permitir que los
            ciudadanos comunes, no solo bancos o grandes corporativos, se
            beneficien de proyectos energéticos nacionales.
          </span>
        </li>
        <li className="flex items-start bg-gray-50 p-3 rounded-md">
          <span className="text-red-600 mr-2 font-bold">•</span>
          <span className="font-serif">
            <strong>Apoyar a las familias mexicanas:</strong> Crear una nueva
            fuente de ingresos para complementar salarios y pensiones en un
            momento económico desafiante.
          </span>
        </li>
        <li className="flex items-start bg-gray-50 p-3 rounded-md">
          <span className="text-red-600 mr-2 font-bold">•</span>
          <span className="font-serif">
            <strong>Impulsar la soberanía energética:</strong> Financiar
            proyectos nacionales de energía limpia y renovable sin depender de
            capital extranjero.
          </span>
        </li>
      </ul>

      {/* Added image above the quote - better formatting */}
      <div className="my-6">
        <img src="/post_WhatsApp_Image_2024-11-06_at_9.25.39_AM.jpg" alt="Claudia Sheinbaum hablando desde el podio presidencial" className="w-full h-auto rounded-sm shadow-md mb-2" />
        <p className="text-xs text-gray-500 italic">
          Claudia Sheinbaum durante la presentación oficial del programa. Enero
          2025. Foto: Presidencia.
        </p>
      </div>

      <div className="border-l-4 border-red-600 pl-4 py-2 my-6 bg-gray-50 italic font-serif">
        <p className="text-lg">
          "Con este programa, por primera vez los beneficios de los proyectos
          energéticos de México llegarán directamente a los bolsillos de las
          familias trabajadoras, no solo a grandes inversionistas."
        </p>
        <p className="text-sm font-semibold mt-1">
          - Claudia Sheinbaum, Presidenta electa de México
        </p>
      </div>

      <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-black border-b border-gray-200 pb-2">
        ¿Cómo funciona el Bono Ciudadano CFE?
      </h2>

      <p className="mb-4 font-serif leading-relaxed">
        El proceso es sencillo y transparente, diseñado para que cualquier
        mexicano pueda participar:
      </p>

      <ol className="space-y-3 my-4">
        <li className="flex items-center bg-gray-50 p-3 rounded-md">
          <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
            1
          </span>
          <div className="font-serif">
            <strong>Registro:</strong> Complete el formulario oficial con sus
            datos básicos para reservar su lugar en el programa.
          </div>
        </li>
        <li className="flex items-center bg-gray-50 p-3 rounded-md">
          <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
            2
          </span>
          <div className="font-serif">
            <strong>Inversión inicial:</strong> Realice un depósito mínimo de
            $2,500 pesos a través de transferencia SPEI segura.
          </div>
        </li>
        <li className="flex items-center bg-gray-50 p-3 rounded-md">
          <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
            3
          </span>
          <div className="font-serif">
            <strong>Certificado digital:</strong> Reciba su certificado oficial
            con número de folio que garantiza su participación.
          </div>
        </li>
        <li className="flex items-center bg-gray-50 p-3 rounded-md">
          <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
            4
          </span>
          <div className="font-serif">
            <strong>Pagos mensuales:</strong> Comience a recibir sus
            rendimientos mensuales directamente a su cuenta bancaria.
          </div>
        </li>
        <li className="flex items-center bg-gray-50 p-3 rounded-md">
          <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
            5
          </span>
          <div className="font-serif">
            <strong>Flexibilidad total:</strong> Puede aumentar su inversión o
            solicitar retiros parciales o totales en cualquier momento.
          </div>
        </li>
      </ol>

      {/* AMLO image and quote - improved formatting */}
      <div className="my-6">
        <img src="/2_%282%29.png" alt="Andrés Manuel López Obrador frente al logo de CFE" className="w-full h-auto rounded-sm shadow-md mb-2" />
        <p className="text-xs text-gray-500 italic">
          El expresidente López Obrador ha sido un impulsor clave de esta
          iniciativa. Foto: Archivo.
        </p>
      </div>

      <div className="border-l-4 border-red-600 pl-4 py-2 my-6 bg-gray-50 italic font-serif">
        <p className="text-lg">
          "Este programa representa la continuidad de nuestra visión: que los
          recursos energéticos de México beneficien primero a los mexicanos. Los
          proyectos de la CFE ahora serán una fuente de ingresos directa para
          las familias."
        </p>
        <p className="text-sm font-semibold mt-1">
          — Andrés Manuel López Obrador, Expresidente de México
        </p>
      </div>

      {/* Realistic example with more moderate returns - more professional look */}
      <div className="bg-gray-50 p-4 rounded-lg my-6 border border-gray-200">
        <p className="font-bold text-black mb-3 border-b border-gray-200 pb-2">
          <strong>Ejemplos de rendimientos mensuales:</strong>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-center mb-2">
              <div className="text-gray-600 text-sm">Inversión inicial</div>
              <div className="text-2xl font-bold text-black">$2,500</div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 text-sm">Rendimiento mensual</div>
              <div className="text-xl font-bold text-green-600">
                +$150 - $250
              </div>
              <div className="text-xs text-gray-500 mt-1">
                15-25% de rendimiento mensual
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-red-200">
            <div className="text-center mb-2">
              <div className="text-gray-600 text-sm">Inversión inicial</div>
              <div className="text-2xl font-bold text-black">$5,000</div>
              <div className="text-xs bg-red-50 text-red-600 rounded-full px-2 py-0.5 inline-block mt-1">
                Opción popular
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 text-sm">Rendimiento mensual</div>
              <div className="text-xl font-bold text-green-600">
                +$750 - $1,250
              </div>
              <div className="text-xs text-gray-500 mt-1">
                15-25% de rendimiento mensual
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-center mb-2">
              <div className="text-gray-600 text-sm">Inversión inicial</div>
              <div className="text-2xl font-bold text-black">$10,000</div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 text-sm">Rendimiento mensual</div>
              <div className="text-xl font-bold text-green-600">
                +$1,500 - $2,500
              </div>
              <div className="text-xs text-gray-500 mt-1">
                15-25% de rendimiento mensual
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-700 mt-4 bg-gray-50 p-3 rounded-md border-l-4 border-gray-300 font-serif">
          <strong>Nota:</strong> Los rendimientos provienen directamente de
          proyectos energéticos de CFE. La inversión genera retornos pasivos sin
          requerir actividad adicional del participante.
        </p>
      </div>

      <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-black border-b border-gray-200 pb-2">
        ¿Por qué este rendimiento es posible?
      </h2>

      <p className="mb-4 font-serif leading-relaxed">
        El Programa de Bonos Ciudadanos CFE no es un esquema privado ni
        especulativo. Su rentabilidad se sostiene en una decisión gubernamental
        clara: canalizar directamente parte de los excedentes y fondos
        destinados a proyectos energéticos hacia los ciudadanos.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2 text-black border-b border-gray-200 pb-2">
            ¿De dónde vienen los rendimientos?
          </h3>
          <p className="text-sm font-serif">
            Los proyectos de energía de la CFE generan utilidades significativas
            que tradicionalmente se distribuían entre grandes inversionistas.
            Ahora, el gobierno ha decidido que estos beneficios lleguen
            directamente a los ciudadanos participantes.
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-lg mb-2 text-black border-b border-gray-200 pb-2">
            ¿Es segura mi inversión?
          </h3>
          <p className="text-sm font-serif">
            Completamente. A diferencia de inversiones especulativas, este
            programa está respaldado por activos reales de la CFE y cuenta con
            garantía gubernamental. Cada peso invertido está protegido por la
            solidez de la empresa estatal.
          </p>
        </div>
      </div>

      <p className="mb-4 font-serif leading-relaxed">
        Durante años, estas utilidades se quedaban en manos de bancos e
        intermediarios financieros. Hoy, bajo este programa extraordinario, la
        CFE abre la puerta para que cada mexicano pueda recibir un beneficio
        directo de las inversiones públicas en energía eléctrica y proyectos de
        infraestructura nacional.
      </p>

      <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-600 my-4">
        <div className="flex items-start">
          <ShieldIcon className="text-green-600 mr-2 flex-shrink-0 mt-1" size={18} />
          <p className="text-sm font-serif">
            <strong>Protección total:</strong> Este programa cuenta con respaldo
            gubernamental y está supervisado por la Comisión Nacional Bancaria y
            de Valores, garantizando la seguridad de su inversión.
          </p>
        </div>
      </div>

      {/* Second CTA button - more professional */}
      <div className="my-8 text-center">
        <p className="text-sm text-gray-600 mb-3 font-serif">
          Para obtener más información sobre esta oportunidad de inversión
        </p>
        <button onClick={scrollToForm} className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition-colors inline-flex items-center text-sm">
          SOLICITAR INFORMACIÓN
          <ArrowDownIcon size={14} className="ml-2" />
        </button>
      </div>

      <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-black border-b border-gray-200 pb-2">
        Testimonios de participantes
      </h2>

      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-3">
              <img src="https://randomuser.me/api/portraits/men/34.jpg" alt="Juan Rodríguez" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-semibold">Juan Rodríguez</p>
              <p className="text-xs text-gray-500">Cabo San Lucas, Maestro</p>
            </div>
          </div>
          <p className="italic text-sm font-serif">
            "Invertí $2,500 pesos con dudas, pero al primer mes recibí $200 en
            mi cuenta. Ahora tengo $20,000 invertidos y recibo más de $3,500
            mensuales. Esto ha sido un gran complemento para los gastos de mi
            familia."
          </p>
          <div className="flex mt-2">
            <span className="text-amber-500">★★★★★</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-3">
              <img src="https://randomuser.me/api/portraits/women/67.jpg" alt="María Gómez" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-semibold">María Gómez</p>
              <p className="text-xs text-gray-500">CDMX, Contadora</p>
            </div>
          </div>
          <p className="italic text-sm font-serif">
            "Como contadora, siempre analizo bien donde poner mi dinero. Este
            programa me sorprendió por su transparencia y resultados. Comencé
            con $10,000 y en tres meses ya recuperé mi inversión inicial, todo
            sigue generando."
          </p>
          <div className="flex mt-2">
            <span className="text-amber-500">★★★★★</span>
          </div>
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-black border-b border-gray-200 pb-2">
        Respaldo institucional
      </h2>

      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <img src="/gratis-png-comision-federal-de-electricidad-de-la-ciudad-de-mexico-con-el-logotipo-de-pemex-mil-removebg-preview.png" alt="CFE" className="h-16 w-auto" />
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg">
              Comisión Federal de Electricidad
            </h3>
            <p className="text-sm text-gray-600">
              Empresa productiva del Estado Mexicano
            </p>
          </div>
        </div>
        <p className="text-sm mb-4 font-serif">
          El programa está respaldado directamente por la CFE, una de las
          empresas más sólidas de México. Cada inversión genera un Certificado
          Digital de Bono Ciudadano con folio único registrado ante la CNBV.
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
            <CheckCircleIcon size={14} className="text-green-600 mr-1" />
            <span className="text-xs">Garantía gubernamental</span>
          </div>
          <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
            <CheckCircleIcon size={14} className="text-green-600 mr-1" />
            <span className="text-xs">Certificado oficial</span>
          </div>
          <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
            <CheckCircleIcon size={14} className="text-green-600 mr-1" />
            <span className="text-xs">Supervisión CNBV</span>
          </div>
          <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
            <CheckCircleIcon size={14} className="text-green-600 mr-1" />
            <span className="text-xs">Retiros inmediatos</span>
          </div>
        </div>
      </div>

      {/* Countdown section - more professional */}
      <div className="bg-gray-50 border border-gray-200 p-4 my-8 shadow-sm rounded-lg">
        <h3 className="text-lg font-bold mb-3 flex items-center text-gray-800">
          <AlertCircleIcon size={18} className="text-red-600 mr-2" />
          <span>Convocatoria por tiempo limitado</span>
        </h3>
        <p className="mb-4 text-sm font-serif">
          La primera emisión de Bonos Ciudadanos CFE está limitada a 10,000
          participantes. Una vez alcanzado ese número, el registro se cerrará
          hasta la siguiente fase.
        </p>
        <div className="grid grid-cols-4 gap-2 max-w-md mx-auto mb-3">
          <div className="bg-white rounded-lg p-2 text-center shadow-sm">
            <div className="text-xl font-bold text-red-600">
              {countdown.days}
            </div>
            <div className="text-xs text-gray-500">Días</div>
          </div>
          <div className="bg-white rounded-lg p-2 text-center shadow-sm">
            <div className="text-xl font-bold text-red-600">
              {countdown.hours}
            </div>
            <div className="text-xs text-gray-500">Horas</div>
          </div>
          <div className="bg-white rounded-lg p-2 text-center shadow-sm">
            <div className="text-xl font-bold text-red-600">
              {countdown.minutes}
            </div>
            <div className="text-xs text-gray-500">Minutos</div>
          </div>
          <div className="bg-white rounded-lg p-2 text-center shadow-sm">
            <div className="text-xl font-bold text-red-600">
              {countdown.seconds}
            </div>
            <div className="text-xs text-gray-500">Segundos</div>
          </div>
        </div>
        <div className="text-center text-sm font-medium text-gray-700">
          Cierre de registro: {formattedDate}
        </div>
      </div>

      <div id="registration-form" className="bg-white p-6 rounded-lg mb-8 shadow-md border border-gray-200">
        <h3 className="text-xl font-bold mb-6 text-center text-black border-b border-gray-200 pb-3">
          Solicite información sobre el Programa de Bonos Ciudadanos CFE
        </h3>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-3 rounded-md shadow-sm flex items-start">
            <span className="text-red-600 mr-2 text-xl">•</span>
            <div>
              <div className="font-bold text-sm">Accesible para todos:</div>
              <div className="text-xs text-gray-600">Desde $2,500 pesos</div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-md shadow-sm flex items-start">
            <span className="text-red-600 mr-2 text-xl">•</span>
            <div>
              <div className="font-bold text-sm">Rendimientos mensuales:</div>
              <div className="text-xs text-gray-600">Directos a su cuenta</div>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-md shadow-sm flex items-start">
            <span className="text-red-600 mr-2 text-xl">•</span>
            <div>
              <div className="font-bold text-sm">Flexibilidad total:</div>
              <div className="text-xs text-gray-600">
                Retiros en cualquier momento
              </div>
            </div>
          </div>
        </div>
        <RegistrationForm />
      </div>

      <RelatedArticles />

      <CommentsSection />
    </div>;
}