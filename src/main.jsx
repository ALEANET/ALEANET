import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  CheckCircle2,
  ChefHat,
  DoorOpen,
  Drill,
  Hammer,
  Home,
  Mail,
  MapPin,
  Menu,
  PaintRoller,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
  X,
} from "lucide-react";
import "./styles.css";

const services = [
  {
    icon: ChefHat,
    title: "Cuisines",
    subtitle: "CONCEPTION • POSE • AMÉNAGEMENT",
    text: "Montage et installation de cuisines modernes, fonctionnelles et adaptées à votre espace.",
    features: [
      "Des cuisines parfaitement adaptées à vos besoins et à votre espace.",
      "Matériaux robustes et finitions soignées.",
      "Aménagement intelligent pour plus de confort au quotidien.",
    ],
    featureTitles: ["SUR MESURE", "QUALITÉ", "FONCTIONNALITÉ"],
    image: `${import.meta.env.BASE_URL}images/cuisine.png`,
  },

  {
    icon: Home,
    title: "Parquets",
    subtitle: "POSE • RÉNOVATION • FINITIONS",
    text: "Pose de parquet flottant, massif ou stratifié avec finitions soignées.",
    features: [
      "Un rendu chaleureux et élégant qui sublime votre intérieur.",
      "Des matériaux résistants pour un sol solide et durable.",
      "Un excellent confort de marche et une bonne isolation phonique.",
    ],
    featureTitles: ["ESTHÉTIQUE", "DURABILITÉ", "CONFORT"],
    image: `${import.meta.env.BASE_URL}images/parquet.png`,
  },

  {
    icon: PaintRoller,
    title: "Peinture",
    subtitle: "PRÉPARATION • PEINTURE • FINITIONS",
    text: "Peinture, enduit, préparation des surfaces et finitions propres.",
    features: [
      "Préparation soignée des murs et surfaces avant peinture.",
      "Un travail précis avec des finitions propres, nettes, élégantes et durables.",
      "Un chantier protégé, propre et nettoyé après intervention.",
    ],

    featureTitles: [
      "PRÉPARATION SOIGNÉE",
      "FINITIONS SOIGNÉES",
      "PROPRETÉ GARANTIE",
    ],
    image: `${import.meta.env.BASE_URL}images/peinture.png`,
  },

  {
    icon: DoorOpen,
    title: "Portes",
    subtitle: "POSE • REMPLACEMENT • RÉGLAGES",
    text: "Pose et remplacement de portes intérieures et extérieures, tous types.",
    features: [
      "Des portes robustes pour votre tranquillité au quotidien.",
      "Un large choix de styles, finitions et couleurs pour tous les goûts.",
      "Une installation soignée pour un résultat propre et durable.",
    ],

    featureTitles: ["SÉCURITÉ", "DESIGN", "POSE PRO"],
    image: `${import.meta.env.BASE_URL}images/portes.png`,
  },

  {
    icon: Wrench,
    title: "Fenêtres",
    subtitle: "POSE • RÉNOVATION • ISOLATION",
    text: "Pose et remplacement de fenêtres PVC, aluminium ou bois, adaptées à votre habitation et à vos besoins.",
    features: [
      "Excellente isolation thermique et phonique.",
      "Réduction des pertes d’énergie pour un meilleur confort au quotidien.",
      "Large choix de matériaux, coloris et finitions pour tous les sstyles.",
    ],
    featureTitles: ["ISOLATION", "ÉCONOMIES", "ESTHÉTIQUE"],
    image: `${import.meta.env.BASE_URL}images/fenetres.png`,
  },

  {
    icon: Drill,
    title: "Bricolage & meubles",
    subtitle: "MONTAGE • RÉPARATION • AMÉNAGEMENT",
    text: "Montage de meubles, réglages, réparations et petits aménagements.",
    features: [
      "Des solutions simples adaptées pour tous vos besoins.",
      "Interventions rapides et efficaces pour des résultats immédiats et durables.",
      "Petits travaux, réparations et aménagements : nous nous adaptons.",
    ],

    featureTitles: ["PRATIQUE", "RAPIDE", "POLYVALENT"],
    image: `${import.meta.env.BASE_URL}images/bricolage.png`,
  },

  {
    icon: Hammer,
    title: "Rénovation complète",
    subtitle: "RÉNOVATION • AMÉNAGEMENT • FINITIONS",
    text: "Rénovation et aménagement de maisons et appartements, du sol au plafond.",
    features: [
      "Un projet géré de A à Z en toute sérénité.",
      "Des solutions adaptées à vos besoins, envies et budget.",
      "Plomberie, électricité, peinture, carrelage, menuiserie et plus.",
    ],

    featureTitles: ["CLÉ EN MAIN", "SUR MESURE", "TOUS CORPS D'ÉTAT"],
    image: `${import.meta.env.BASE_URL}images/renovation.png`,
  },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  website: "",
};

function App() {
  const [openServices, setOpenServices] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Envoi en cours…" });

    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      setStatus({
        type: "error",
        message: "L'URL du backend n'est pas configurée.",
      });
      return;
    }

    try {
      const response = await fetch(`${apiUrl.replace(/\/$/, "")}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Impossible d'envoyer la demande.");
      }

      setForm(initialForm);
      setStatus({
        type: "success",
        message:
          "Merci ! Votre demande a bien été envoyée. Je vous répondrai rapidement.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message ||
          "Une erreur est survenue. Vous pouvez aussi me contacter par téléphone.",
      });
    }
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <button
            className="brand"
            onClick={() => scrollTo("accueil")}
            aria-label="Accueil"
          >
            <span className="brand-mark">
              <Home size={20} />
            </span>
            <span>
              <strong>ALEA'</strong>
              <em>NET</em>
            </span>
          </button>

          <nav
            className={menuOpen ? "nav-links open" : "nav-links"}
            aria-label="Navigation principale"
          >
            <button onClick={() => scrollTo("services")}>Services</button>
            <button onClick={() => scrollTo("realisations")}>
              Réalisations
            </button>
            <button onClick={() => scrollTo("contact")}>Contact</button>
            <a className="nav-phone" href="tel:+33646297859">
              <Phone size={16} /> 06 46 29 78 59
            </a>
          </nav>

          <button
            className="menu-button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Ouvrir le menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="accueil">
          <div className="hero-glow glow-one" />
          <div className="hero-glow glow-two" />
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <div className="eyebrow">
                <MapPin size={17} /> Lyon & alentours
              </div>
              <h1>
                Vos travaux, réalisés <span>avec soin.</span>
              </h1>
              <p className="hero-text">
                Artisan polyvalent pour vos projets de cuisine, parquet,
                peinture, portes, fenêtres, bricolage et rénovation intérieure.
              </p>
              <div className="hero-actions">
                <button
                  className="button button-gold"
                  onClick={() => scrollTo("contact")}
                >
                  Demander un devis gratuit <ArrowRight size={18} />
                </button>
                <a className="button button-ghost" href="tel:+33646297859">
                  <Phone size={18} /> Appeler maintenant
                </a>
              </div>
              <div className="trust-row">
                <span>
                  <CheckCircle2 size={17} /> Travail soigné
                </span>
                <span>
                  <ShieldCheck size={17} /> Matériaux de qualité
                </span>
                <span>
                  <Star size={17} /> Satisfaction client
                </span>
              </div>
            </div>

            <div className="hero-visual reveal delay-1">
              <div className="photo-card">
                <img
                  src={`${import.meta.env.BASE_URL}flyer.png`}
                  alt="Présentation des services de l'entrprise ALEANET, artisan à Lyon"
                />
                <div className="photo-overlay">
                  <span className="mini-badge">
                    <Sparkles size={16} /> Devis gratuit
                  </span>
                  <strong>La qualité, notre priorité.</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading">
              <span className="kicker">Nos services</span>
              <h2>Un seul artisan pour vos projets du quotidien</h2>
              <p>
                Des interventions claires, des finitions propres et un
                accompagnement adapté à votre besoin.
              </p>
            </div>
            <div className="services-grid">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isOpen = openServices.includes(index);

                return (
                  <article className="service-card" key={service.title}>
                    <div className="service-card-image-wrap">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="service-card-image"
                      />

                      <div className="service-card-overlay">
                        <div className="service-text-box">
                          <h3
                            className={
                              service.title === "Bricolage & meubles" ||
                              service.title === "Rénovation complète"
                                ? "long-title"
                                : ""
                            }
                          >
                            {service.title}
                          </h3>

                          <p className="service-subtitle">{service.subtitle}</p>
                        </div>

                        <button
                          type="button"
                          className="service-details-button"
                          onClick={() => {
                            setOpenServices((prev) =>
                              prev.includes(index)
                                ? prev.filter((i) => i !== index)
                                : [...prev, index],
                            );
                          }}
                          aria-expanded={isOpen}
                        >
                          {isOpen ? "Fermer les détails" : "Voir les détails"}
                        </button>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="service-details">
                        <div className="service-details-header">
                          <div>
                            <span className="service-details-label">
                              NOS PRESTATIONS
                            </span>

                            <h3>{service.title}</h3>
                          </div>

                          <button
                            type="button"
                            className="service-close"
                            onClick={() => {
                              setOpenServices((prev) =>
                                prev.filter((i) => i !== index),
                              );
                            }}
                            aria-label="Fermer les détails"
                          >
                            ×
                          </button>
                        </div>

                        <p className="service-description">{service.text}</p>

                        <div className="service-benefits">
                          {service.features.map((feature, featureIndex) => (
                            <div
                              className="service-benefit"
                              key={service.featureTitles[featureIndex]}
                            >
                              <span className="benefit-check">✓</span>

                              <div>
                                <strong>
                                  {service.featureTitles[featureIndex]}
                                </strong>

                                <p>{feature}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <button
                          type="button"
                          className="service-quote-button"
                          onClick={() => {
                            document.getElementById("contact")?.scrollIntoView({
                              behavior: "smooth",
                            });
                          }}
                        >
                          Demander un devis gratuit
                        </button>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section showcase" id="realisations">
          <div className="container showcase-grid">
            <div>
              <span className="kicker">Votre projet</span>
              <h2>De la petite réparation à la rénovation complète</h2>
              <p>
                Vous expliquez votre besoin, nous échangeons sur les contraintes
                et les finitions souhaitées, puis vous recevez un devis
                personnalisé.
              </p>
              <div className="steps">
                <div>
                  <span>01</span>
                  <div>
                    <strong>Vous me contactez</strong>
                    {/*                     <p>Par formulaire, téléphone ou e-mail.</p>
                     */}{" "}
                    <p>Par téléphone ou e-mail.</p>
                  </div>
                </div>
                <div>
                  <span>02</span>
                  <div>
                    <strong>Nous évaluons le projet</strong>
                    <p>Besoin, dimensions, matériaux et délais.</p>
                  </div>
                </div>
                <div>
                  <span>03</span>
                  <div>
                    <strong>Vous recevez votre devis</strong>
                    <p>Une proposition claire avant le démarrage.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="quote-panel">
              <span>DEVIS GRATUIT</span>
              <h3>Un projet à Lyon ou dans les alentours ?</h3>
              {/* <p>
                Décrivez votre besoin en quelques lignes et ajoutez votre
                téléphone pour être rappelé.
              </p> */}
              <p>
                Un projet de travaux ? Contactez-nous directement par téléphone
                ou par e-mail pour échanger sur votre besoin et obtenir votre
                devis gratuit.
              </p>
              <button
                className="button button-gold"
                onClick={() => scrollTo("contact")}
              >
                Parler de mon projet <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/*  <section className="section contact-section" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy">
              <span className="kicker">Contact</span>
              <h2>Demandez votre devis gratuit</h2>
              <p>
                Indiquez le type de travaux et quelques détails. Je vous
                recontacte pour préciser votre projet.
              </p>
              <div className="contact-list">
                <a href="tel:+33646297859">
                  <span>
                    <Phone />
                  </span>
                  <div>
                    <small>Téléphone</small>
                    <strong>06 46 29 78 59</strong>
                  </div>
                </a>
                <a href="mailto:hmansour1@live.fr">
                  <span>
                    <Mail />
                  </span>
                  <div>
                    <small>E-mail</small>
                    <strong>hmansour1@live.fr</strong>
                  </div>
                </a>
                <div>
                  <span>
                    <MapPin />
                  </span>
                  <div>
                    <small>Zone d'intervention</small>
                    <strong>Lyon et ses alentours</strong>
                  </div>
                </div>
              </div>
            </div>

           { <form className="contact-form" onSubmit={submitForm}>
              <div className="field-row">
                <label>
                  Nom
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    autoComplete="name"
                    required
                    placeholder="Votre nom"
                  />
                </label>
                <label>
                  Téléphone
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    autoComplete="tel"
                    placeholder="06…"
                  />
                </label>
              </div>
              <label>
                E-mail
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  autoComplete="email"
                  required
                  placeholder="vous@exemple.fr"
                />
              </label>
              <label>
                Type de travaux
                <select
                  name="service"
                  value={form.service}
                  onChange={onChange}
                  required
                >
                  <option value="">Choisir un service</option>
                  {services.map((service) => (
                    <option key={service.title} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                  <option value="Autre">Autre projet</option>
                </select>
              </label>
              <label>
                Votre projet
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  minLength="10"
                  rows="6"
                  placeholder="Décrivez les travaux, la commune, les dimensions si vous les connaissez…"
                />
              </label>

               Honeypot anti-spam : invisible pour un humain 
              <input
                className="hp-field"
                name="website"
                value={form.website}
                onChange={onChange}
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
              />

              <button
                className="button button-gold submit-button"
                disabled={status.type === "loading"}
              >
                {status.type === "loading" ? "Envoi…" : "Envoyer ma demande"}{" "}
                <ArrowRight size={18} />
              </button>

              {status.message && (
                <div className={`form-status ${status.type}`} role="status">
                  {status.message}
                </div>
              )}
              <small className="privacy">
                Vos coordonnées servent uniquement à répondre à votre demande de
                devis.
              </small>
            </form>}
          </div>
        </section> */}

        <section className="section contact-section" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy">
              <span className="kicker">CONTACT</span>

              <h2>
                Demandez votre devis <span className="gold-text">gratuit</span>
              </h2>

              <p>
                Un projet, une question ou un besoin spécifique ? Nous sommes à
                votre écoute pour vous conseiller et vous proposer la meilleure
                solution.
              </p>

              <div className="contact-list">
                <a href="tel:+33646297859">
                  <span>
                    <Phone />
                  </span>
                  <div>
                    <small>TÉLÉPHONE</small>
                    <strong>06 46 29 78 59</strong>
                  </div>
                </a>

                <a href="mailto:hmansour1@live.fr">
                  <span>
                    <Mail />
                  </span>
                  <div>
                    <small>E-MAIL</small>
                    <strong>hmansour1@live.fr</strong>
                  </div>
                </a>

                <div>
                  <span>
                    <MapPin />
                  </span>
                  <div>
                    <small>ZONE D'INTERVENTION</small>
                    <strong>Lyon et ses alentours</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-image">
              <img
                src={`${import.meta.env.BASE_URL}images/contact.png`}
                alt="Travaux et rénovation ALEA'NET"
              />
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <div>
            <strong>
              ALEA'<span>NET</span>
            </strong>
            <small>Artisan à Lyon</small>
          </div>
          <p>© {new Date().getFullYear()} — Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
