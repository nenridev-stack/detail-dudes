import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Ponte en contacto con nuestro equipo de detallamiento automotriz. Haz preguntas, solicita una cotización o programa una cita de servicio.',
};

export default function ContactPage() {
  return (
    <section className="py-16 md:py-24 pt-24 bg-black">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
            Contáctanos
          </h1>
          <p className="text-gray-400 text-base max-w-lg mx-auto">
            ¿Tienes una pregunta o quieres reservar un servicio? Envíanos un mensaje y
            te responderemos dentro de 24 horas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Formulario de Contacto */}
          <div className="order-2 lg:order-1">
            <ContactForm />
          </div>

          {/* Barra lateral de información de contacto */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Teléfono */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-accent-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-white text-sm">Teléfono</h3>
                <a
                  href="tel:+15551234567"
                  className="text-gray-400 text-sm hover:text-accent-400 transition-colors"
                >
                  (555) 123-4567
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-accent-400"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-white text-sm">Correo</h3>
                <a
                  href="mailto:info@detaildudes.com"
                  className="text-gray-400 text-sm hover:text-accent-400 transition-colors"
                >
                  info@detaildudes.com
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-green-400"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.462-1.496A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.332-1.543.75.75 0 00-.653-.07l-2.89.968.968-2.89a.75.75 0 00-.07-.653A9.94 9.94 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-white text-sm">WhatsApp</h3>
                <a
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 text-sm hover:text-green-400 transition-colors"
                >
                  Chatea con nosotros por WhatsApp
                </a>
              </div>
            </div>

            {/* Horario de Atención */}
            <div>
              <h3 className="font-medium text-white text-sm mb-3">Horario de Atención</h3>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="py-2 text-gray-400">Lunes - Viernes</td>
                    <td className="py-2 text-right text-white font-medium">8:00 AM - 6:00 PM</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-400">Sábado</td>
                    <td className="py-2 text-right text-white font-medium">9:00 AM - 5:00 PM</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-400">Domingo</td>
                    <td className="py-2 text-right text-white font-medium">Cerrado</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mapa */}
            <div>
              <h3 className="font-medium text-white text-sm mb-3">Área de Servicio</h3>
              <div className="w-full h-48 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <p className="text-gray-500 text-sm text-center px-4">
                  Mapa de Google Maps —<br />
                  Reemplazar con mapa real del área de servicio
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
