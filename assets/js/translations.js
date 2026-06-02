// ── TRANSLATIONS ──
window.i18nData = window.i18nData || {};
const i18nData = window.i18nData = {
  ca: {
    'nav.services': 'Serveis',
    'nav.advantages': 'Avantatges',
    'nav.howItWorks': 'Com funciona',
    'nav.customerService': 'Atenció al client',
    'nav.contact': 'Contacte',
    'nav.clients': 'A qui servim',
    'nav.requestFree': 'Sol·licitar gratis',

    'machine.sub': 'Serveis de Vending',
    'machine.displayEyebrow': 'Selecciona',
    'machine.displayIdle': 'una secció',
    'machine.dispensing': 'Dispensant…',
    'machine.back': 'Tornar a la màquina',
    'machine.sticker1': '0€ instal·lació',
    'machine.sticker2': '0€ manteniment',
    'machine.sticker3': '24/7',

    'a11y.skip': 'Salta al contingut',

    'hero.badge': 'Servei 100% gratuït per a la teva empresa',
    'hero.title': 'Màquines de vending<br /><span class="gradient-text">sense cost per a tu</span>',
    'hero.subtitle': "Instal·lem i mantenim màquines de cafè, snacks i begudes a la teva empresa o establiment <strong>completament gratis</strong>. Sense inversió, sense preocupacions — només beneficis per al teu equip.",
    'hero.cta1': 'Sol·licita la teva màquina gratis',
    'hero.cta2': 'Veure com funciona',
    'hero.stat1': "Cost d'instal·lació",
    'hero.stat2': 'Manteniment mensual',
    'hero.stat3': 'Disponibilitat',
    'hero.installBadge': 'Instal·lació gratuïta',
    'hero.label1': 'Cafè premium',
    'hero.label2': 'Begudes fredes',
    'hero.chip': 'Reparacions en un màxim de 24 h',

    'trust.text': 'Presents a tot el Baix Ter i comarques veïnes',
    'trust.item1': 'Empreses industrials',
    'trust.item2': 'Oficines i coworkings',
    'trust.item3': 'Centres educatius',
    'trust.item4': 'Hotels i residències',
    'trust.item5': 'Gimnasos i centres esportius',

    'clients.tag': 'Qui ens tria?',
    'clients.title': 'Vending per a qualsevol<br/><span class="gradient-text">tipus d\'empresa</span>',
    'clients.subtitle': "Hospitals, col·legis, fàbriques, gimnasos… instal·lem les nostres màquines allà on la gent les necessiti",
    'clients.hospital': 'Hospitals',
    'clients.school': 'Col·legis',
    'clients.factory': 'Indústria',
    'clients.office': 'Oficines',
    'clients.hotel': 'Hotels',
    'clients.gym': 'Gimnasos',
    'clients.residence': 'Residències',
    'clients.gov': 'Administracions',
    'clients.center': 'Les teves màquines',

    'services.tag': 'Els nostres serveis',
    'services.title': 'Tot el que el teu equip necessita,<br />en un sol espai',
    'services.subtitle': "Oferim tres línies de màquines adaptades a qualsevol tipus d'empresa o establiment",
    'services.popular': 'Més popular',
    'services.coffee.title': 'Màquines de Cafè',
    'services.coffee.desc': "Cafè exprés, tallat, americà, cappuccino i més. Grans d'alta qualitat amb preparació automàtica perquè cada pausa sigui un moment especial.",
    'services.coffee.f1': 'Cafè en gra mòlt al moment',
    'services.coffee.f2': 'Opcions de llet calenta i freda',
    'services.coffee.f3': 'Xocolata calenta i infusions',
    'services.coffee.f4': "Tasses o gots d'un sol ús inclosos",
    'services.snacks.title': 'Màquines de Snacks',
    'services.snacks.desc': "Brioixeria, fruits secs, barretes energètiques, entrepans i una àmplia selecció d'aperitius per satisfer qualsevol gana a qualsevol hora.",
    'services.snacks.f1': 'Més de 40 referències de producte',
    'services.snacks.f2': 'Opcions saludables i tradicionals',
    'services.snacks.f3': 'Productes frescos i envasats',
    'services.snacks.f4': 'Reposició periòdica garantida',
    'services.drinks.title': 'Màquines de Begudes',
    'services.drinks.desc': "Aigua freda i calenta, refrescs, sucs naturals i begudes energètiques. Sempre a la temperatura perfecta i llestes per consumir a l'instant.",
    'services.drinks.f1': 'Refrescs de les principals marques',
    'services.drinks.f2': 'Aigua mineral freda i natural',
    'services.drinks.f3': 'Sucs i begudes isotòniques',
    'services.drinks.f4': 'Temperatura òptima garantida',

    'advantages.tag': 'Per què escollir-nos?',
    'advantages.title': "La solució més intel·ligent<br />per a la teva empresa",
    'advantages.subtitle': "Un servei dissenyat perquè no hagis de preocupar-te per res",
    'advantages.a1.title': 'Cost zero',
    'advantages.a1.desc': "Instal·lació, manteniment i reposició de productes totalment gratuïts. Sense lletra petita.",
    'advantages.a2.title': 'Resposta ràpida',
    'advantages.a2.desc': "Equip tècnic local que resol qualsevol incidència en el menor temps possible.",
    'advantages.a3.title': 'Sense compromisos',
    'advantages.a3.desc': "Ens adaptem a les teves necessitats. Pots sol·licitar retirar la màquina en qualsevol moment.",
    'advantages.a4.title': 'Màquines homologades',
    'advantages.a4.desc': "Tot l'equipament compleix la normativa vigent i supera controls d'higiene regulars.",
    'advantages.a5.title': "Benestar de l'equip",
    'advantages.a5.desc': "Treballadors més satisfets i productius gràcies a un servei de qualitat accessible.",
    'advantages.a6.title': 'Servei local',
    'advantages.a6.desc': "Empresa del Baix Ter amb coneixement del territori i tracte proper i personalitzat.",

    'howItWorks.tag': 'Procés senzill',
    'howItWorks.title': 'Comença en 3 passos',
    'howItWorks.subtitle': "Des del primer contacte fins a la màquina instal·lada, ho gestionem tot nosaltres",
    'howItWorks.step1.title': "Contacta'ns",
    'howItWorks.step1.desc': "Escriu-nos o truca'ns. Explica'ns quin tipus d'establiment tens i quantes persones el freqüenten. En menys de 24 hores et responem.",
    'howItWorks.step2.title': 'Planifiquem junts',
    'howItWorks.step2.desc': "Visitem el teu local, decidim quines màquines s'adapten millor i acordem la ubicació ideal. Tu tries, nosaltres ens encarreguem.",
    'howItWorks.step3.title': "Instal·lem i llest",
    'howItWorks.step3.desc': "El nostre equip instal·la la màquina, l'aprovisiona i t'explica el seu funcionament. A partir d'aquell moment, el manteniment corre del nostre compte.",

    'gallery.item1': 'Vending per a empreses',
    'gallery.item2': 'Cafè de qualitat',
    'gallery.item3': 'Begudes sempre fredes',
    'gallery.item4': 'Snacks i brioixeria',
    'gallery.item5': 'Per a qualsevol espai de treball',

    'cta.badge': 'Oferta sense compromís',
    'cta.title': 'La teva empresa encara no té vending?',
    'cta.desc': "Uneix-te als negocis del Baix Ter que ja gaudeixen d'un servei de qualitat sense pagar res. El procés és senzill i sense risc.",
    'cta.btn': 'Demanar informació gratuïta',

    'testimonials.tag': 'Testimonis',
    'testimonials.title': 'El que diuen els nostres clients',
    'testimonials.t1': '"Portem més de dos anys amb la màquina de cafè i el servei és impecable. Sempre plena, sempre neta i quan hi ha algun problema ho resolen aquell mateix dia."',
    'testimonials.t1.role': 'Responsable de RRHH – Empresa industrial',
    'testimonials.t2': '"No podíem creure que fos realment gratis fins que ho vam veure. Instal·lació ràpida, tracte proper i els empleats estan encantats. Totalment recomanable."',
    'testimonials.t2.role': 'Director General – Pime tecnològica',
    'testimonials.t3': "\"Tenim màquina de cafè i de snacks. Els nois del gimnàs agraeixen molt poder agafar alguna cosa després de l'entrenament. Un servei de 10.\"",
    'testimonials.t3.role': 'Propietària – Centre esportiu',

    'sat.placeholder': 'Número de la teva màquina',

    'contact.tag': 'Contacta amb nosaltres',
    'contact.title': 'Parlem sense compromís',
    'contact.desc': "Som aquí per resoldre tots els teus dubtes i explicar-te com podem ajudar-te. Sense costos ocults, sense lletra petita.",
    'contact.photoBadge': 'Instal·lació gratuïta · Sense permanència',
    'contact.phone': 'Telèfon',
    'contact.email': 'Correu electrònic',
    'contact.whatsapp': 'Escriu-nos ara',
    'contact.form.title': 'Sol·licita informació gratuïta',
    'contact.form.name': 'Nom *',
    'contact.form.namePlaceholder': 'El teu nom',
    'contact.form.company': 'Empresa',
    'contact.form.companyPlaceholder': 'Nom de la teva empresa',
    'contact.form.email': 'Correu electrònic *',
    'contact.form.phone': 'Telèfon',
    'contact.form.machineType': "Quin tipus de màquina t'interessa?",
    'contact.form.selectOption': 'Selecciona una opció',
    'contact.form.coffee': 'Màquina de cafè',
    'contact.form.snacks': 'Màquina de snacks / menjar',
    'contact.form.drinks': 'Màquina de begudes',
    'contact.form.combo': 'Combinació de diverses',
    'contact.form.notSure': 'Encara no ho tinc clar',
    'contact.form.message': 'Missatge',
    'contact.form.messagePlaceholder': "Explica'ns més sobre el teu establiment o qualsevol dubte que tinguis…",
    'contact.form.privacy': 'He llegit i accepto la <a href="privacy.html">política de privacitat</a>',
    'contact.form.submit': 'Enviar sol·licitud gratuïta',
    'contact.form.sending': 'Enviant…',
    'contact.form.success': "Missatge enviat! Et contactarem en menys de 24 hores.",

    'footer.desc': "Servei de vending gratuït per a empreses i establiments del Baix Ter i comarques veïnes.",
    'footer.services': 'Serveis',
    'footer.coffee': 'Màquines de cafè',
    'footer.snacks': 'Màquines de snacks',
    'footer.drinks': 'Màquines de begudes',
    'footer.company': 'Empresa',
    'footer.whyUs': 'Per què escollir-nos',
    'footer.howItWorks': 'Com funciona',
    'footer.testimonials': 'Testimonis',
    'footer.contact': 'Contacte',
    'footer.contactForm': 'Formulari de contacte',
    'footer.copyright': '© Vending Baix Ter. Tots els drets reservats.',
    'footer.privacy': 'Política de privacitat',
    'footer.legal': 'Avís legal',
    'footer.cookies': 'Cookies',
  },

  es: {
    'nav.services': 'Servicios',
    'nav.advantages': 'Ventajas',
    'nav.howItWorks': 'Cómo funciona',
    'nav.customerService': 'Atención al cliente',
    'nav.contact': 'Contacto',
    'nav.clients': 'A quién servimos',
    'nav.requestFree': 'Solicitar gratis',

    'machine.sub': 'Servicios de Vending',
    'machine.displayEyebrow': 'Selecciona',
    'machine.displayIdle': 'una sección',
    'machine.dispensing': 'Dispensando…',
    'machine.back': 'Volver a la máquina',
    'machine.sticker1': '0€ instalación',
    'machine.sticker2': '0€ mantenimiento',
    'machine.sticker3': '24/7',

    'a11y.skip': 'Saltar al contenido',

    'hero.badge': 'Servicio 100% gratuito para tu empresa',
    'hero.title': 'Máquinas de vending<br /><span class="gradient-text">sin coste para ti</span>',
    'hero.subtitle': "Instalamos y mantenemos máquinas de café, snacks y bebidas en tu empresa o establecimiento <strong>completamente gratis</strong>. Sin inversión, sin preocupaciones — solo beneficios para tu equipo.",
    'hero.cta1': 'Solicita tu máquina gratis',
    'hero.cta2': 'Ver cómo funciona',
    'hero.stat1': 'Coste de instalación',
    'hero.stat2': 'Mantenimiento mensual',
    'hero.stat3': 'Disponibilidad',
    'hero.installBadge': 'Instalación gratuita',
    'hero.label1': 'Café premium',
    'hero.label2': 'Bebidas frías',
    'hero.chip': 'Reparaciones en un máximo de 24 h',

    'trust.text': 'Presentes en todo el Baix Ter y comarcas vecinas',
    'trust.item1': 'Empresas industriales',
    'trust.item2': 'Oficinas y coworkings',
    'trust.item3': 'Centros educativos',
    'trust.item4': 'Hoteles y residencias',
    'trust.item5': 'Gimnasios y centros deportivos',

    'clients.tag': '¿Quién nos elige?',
    'clients.title': 'Vending para cualquier<br/><span class="gradient-text">tipo de empresa</span>',
    'clients.subtitle': "Hospitales, colegios, fábricas, gimnasios… instalamos nuestras máquinas donde la gente las necesite",
    'clients.hospital': 'Hospitales',
    'clients.school': 'Colegios',
    'clients.factory': 'Industria',
    'clients.office': 'Oficinas',
    'clients.hotel': 'Hoteles',
    'clients.gym': 'Gimnasios',
    'clients.residence': 'Residencias',
    'clients.gov': 'Administraciones',
    'clients.center': 'Tus máquinas',

    'services.tag': 'Nuestros servicios',
    'services.title': 'Todo lo que tu equipo necesita,<br />en un solo espacio',
    'services.subtitle': 'Ofrecemos tres líneas de máquinas adaptadas a cualquier tipo de empresa o establecimiento',
    'services.popular': 'Más popular',
    'services.coffee.title': 'Máquinas de Café',
    'services.coffee.desc': 'Café expreso, cortado, americano, cappuccino y más. Granos de alta calidad con preparación automática para que cada pausa sea un momento especial.',
    'services.coffee.f1': 'Café en grano molido al momento',
    'services.coffee.f2': 'Opciones de leche caliente y fría',
    'services.coffee.f3': 'Chocolate caliente e infusiones',
    'services.coffee.f4': 'Tazas o vasos desechables incluidos',
    'services.snacks.title': 'Máquinas de Snacks',
    'services.snacks.desc': 'Bollería, frutos secos, barritas energéticas, sándwiches y una amplia selección de aperitivos para satisfacer cualquier antojo a cualquier hora.',
    'services.snacks.f1': 'Más de 40 referencias de producto',
    'services.snacks.f2': 'Opciones saludables y tradicionales',
    'services.snacks.f3': 'Productos frescos y envasados',
    'services.snacks.f4': 'Reposición periódica garantizada',
    'services.drinks.title': 'Máquinas de Bebidas',
    'services.drinks.desc': 'Agua fría y caliente, refrescos, zumos naturales y bebidas energéticas. Siempre a la temperatura perfecta y listos para consumir al instante.',
    'services.drinks.f1': 'Refrescos de las principales marcas',
    'services.drinks.f2': 'Agua mineral fría y natural',
    'services.drinks.f3': 'Zumos y bebidas isotónicas',
    'services.drinks.f4': 'Temperatura óptima garantizada',

    'advantages.tag': '¿Por qué elegirnos?',
    'advantages.title': 'La solución más inteligente<br />para tu empresa',
    'advantages.subtitle': 'Un servicio diseñado para que tú no tengas que preocuparte por nada',
    'advantages.a1.title': 'Coste cero',
    'advantages.a1.desc': 'Instalación, mantenimiento y reposición de productos totalmente gratuitos. Sin letra pequeña.',
    'advantages.a2.title': 'Respuesta rápida',
    'advantages.a2.desc': 'Equipo técnico local que resuelve cualquier incidencia en el menor tiempo posible.',
    'advantages.a3.title': 'Sin compromisos',
    'advantages.a3.desc': 'Nos adaptamos a tus necesidades. Puedes solicitar retirar la máquina en cualquier momento.',
    'advantages.a4.title': 'Máquinas homologadas',
    'advantages.a4.desc': 'Todo el equipamiento cumple con la normativa vigente y pasa controles de higiene regulares.',
    'advantages.a5.title': 'Bienestar del equipo',
    'advantages.a5.desc': 'Trabajadores más satisfechos y productivos gracias a un servicio de calidad accesible.',
    'advantages.a6.title': 'Servicio local',
    'advantages.a6.desc': 'Empresa del Baix Ter con conocimiento del territorio y trato cercano y personalizado.',

    'howItWorks.tag': 'Proceso sencillo',
    'howItWorks.title': 'Empieza en 3 pasos',
    'howItWorks.subtitle': 'Desde el primer contacto hasta la máquina instalada, lo gestionamos todo nosotros',
    'howItWorks.step1.title': 'Contáctanos',
    'howItWorks.step1.desc': 'Escríbenos o llámanos. Cuéntanos qué tipo de establecimiento tienes y cuántas personas lo frecuentan. En menos de 24 horas te respondemos.',
    'howItWorks.step2.title': 'Planificamos juntos',
    'howItWorks.step2.desc': 'Visitamos tu local, decidimos qué máquinas se adaptan mejor y acordamos la ubicación ideal. Tú eliges, nosotros nos encargamos.',
    'howItWorks.step3.title': 'Instalamos y listo',
    'howItWorks.step3.desc': 'Nuestro equipo instala la máquina, la aprovisiona y te explica su funcionamiento. A partir de ese momento, el mantenimiento corre de nuestra cuenta.',

    'gallery.item1': 'Vending para empresas',
    'gallery.item2': 'Café de calidad',
    'gallery.item3': 'Bebidas siempre frías',
    'gallery.item4': 'Snacks y bollería',
    'gallery.item5': 'Para cualquier espacio de trabajo',

    'cta.badge': 'Oferta sin compromiso',
    'cta.title': '¿Tu empresa aún no tiene vending?',
    'cta.desc': 'Únete a los negocios del Baix Ter que ya disfrutan de un servicio de calidad sin pagar nada. El proceso es sencillo y sin riesgo.',
    'cta.btn': 'Pedir información gratuita',

    'testimonials.tag': 'Testimonios',
    'testimonials.title': 'Lo que dicen nuestros clientes',
    'testimonials.t1': '"Llevamos más de dos años con la máquina de café y el servicio es impecable. Siempre llena, siempre limpia y cuando hay algún problema lo resuelven ese mismo día."',
    'testimonials.t1.role': 'Responsable de RRHH – Empresa industrial',
    'testimonials.t2': '"No podíamos creer que fuera realmente gratis hasta que lo vimos. Instalación rápida, trato cercano y los empleados están encantados. Totalmente recomendable."',
    'testimonials.t2.role': 'Director General – Pyme tecnológica',
    'testimonials.t3': '"Tenemos máquina de café y de snacks. Los chicos del gimnasio agradecen mucho poder pillar algo después del entrenamiento. Un servicio de 10."',
    'testimonials.t3.role': 'Propietaria – Centro deportivo',

    'sat.placeholder': 'Número de tu máquina',

    'contact.tag': 'Contacta con nosotros',
    'contact.title': 'Hablemos sin compromiso',
    'contact.desc': 'Estamos aquí para resolver todas tus dudas y explicarte cómo podemos ayudarte. Sin costes ocultos, sin letra pequeña.',
    'contact.photoBadge': 'Instalación gratuita · Sin permanencia',
    'contact.phone': 'Teléfono',
    'contact.email': 'Email',
    'contact.whatsapp': 'Escríbenos ahora',
    'contact.form.title': 'Solicita información gratuita',
    'contact.form.name': 'Nombre *',
    'contact.form.namePlaceholder': 'Tu nombre',
    'contact.form.company': 'Empresa',
    'contact.form.companyPlaceholder': 'Nombre de tu empresa',
    'contact.form.email': 'Email *',
    'contact.form.phone': 'Teléfono',
    'contact.form.machineType': '¿Qué tipo de máquina te interesa?',
    'contact.form.selectOption': 'Selecciona una opción',
    'contact.form.coffee': 'Máquina de café',
    'contact.form.snacks': 'Máquina de snacks / comida',
    'contact.form.drinks': 'Máquina de bebidas',
    'contact.form.combo': 'Combinación de varias',
    'contact.form.notSure': 'No lo tengo claro aún',
    'contact.form.message': 'Mensaje',
    'contact.form.messagePlaceholder': 'Cuéntanos más sobre tu establecimiento o cualquier duda que tengas…',
    'contact.form.privacy': 'He leído y acepto la <a href="privacy.html">política de privacidad</a>',
    'contact.form.submit': 'Enviar solicitud gratuita',
    'contact.form.sending': 'Enviando…',
    'contact.form.success': '¡Mensaje enviado! Te contactaremos en menos de 24 horas.',

    'footer.desc': 'Servicio de vending gratuito para empresas y establecimientos del Baix Ter y comarcas vecinas.',
    'footer.services': 'Servicios',
    'footer.coffee': 'Máquinas de café',
    'footer.snacks': 'Máquinas de snacks',
    'footer.drinks': 'Máquinas de bebidas',
    'footer.company': 'Empresa',
    'footer.whyUs': 'Por qué elegirnos',
    'footer.howItWorks': 'Cómo funciona',
    'footer.testimonials': 'Testimonios',
    'footer.contact': 'Contacto',
    'footer.contactForm': 'Formulario de contacto',
    'footer.copyright': '© Vending Baix Ter. Todos los derechos reservados.',
    'footer.privacy': 'Política de privacidad',
    'footer.legal': 'Aviso legal',
    'footer.cookies': 'Cookies',
  }
};

// ── i18n ENGINE ──
window.currentLang = 'ca';

// Aplica data-i18n / data-i18n-html / data-i18n-placeholder a UN sol element.
// Usa l'idioma indicat o l'actual. Reutilitzat per applyTranslations (DRY) i
// pel router (display de la màquina) via window.applyI18nElement.
function applyI18nElement(el, lang) {
  if (!el) return;
  lang = lang || window.currentLang || 'ca';
  const dict = i18nData[lang];
  if (!dict) return;

  if (el.dataset.i18n !== undefined) {
    const v = dict[el.dataset.i18n];
    if (v !== undefined) el.textContent = v;
  }
  if (el.dataset.i18nHtml !== undefined) {
    const v = dict[el.dataset.i18nHtml];
    if (v !== undefined) el.innerHTML = v;
  }
  if (el.dataset.i18nPlaceholder !== undefined) {
    const v = dict[el.dataset.i18nPlaceholder];
    if (v !== undefined) el.placeholder = v;
  }
}
window.applyI18nElement = applyI18nElement;

function applyTranslations(lang) {
  if (!i18nData[lang]) return;
  window.currentLang = lang;
  document.documentElement.lang = lang;

  // Aplica a tot el document (home-màquina + tots els paneles), per element
  document.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-placeholder]').forEach(el => {
    applyI18nElement(el, lang);
  });

  // Active button state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('lang') || 'ca';
  applyTranslations(saved);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyTranslations(btn.dataset.lang));
  });
});
