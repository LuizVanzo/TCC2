import { Head, Link } from '@inertiajs/react';
import '../../css/welcome.css';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
  const handleImageError = () => {
    document
      .getElementById('screenshot-container')
      ?.classList.add('!hidden');
    document.getElementById('docs-card')?.classList.add('!row-span-1');
    document
      .getElementById('docs-card-content')
      ?.classList.add('!flex-row');
    document.getElementById('background')?.classList.add('!hidden');
  };

  return (
    <>
      <div>
        {/* Seção do Cabeçalho */}
        <header>
          <div className="container">
            <nav>
              <div className="logo">Memorial Digital</div>
              <div className="nav-links">
                <a href="#features">Recursos</a>
                <a href="#about">Sobre Nós</a>
                <a href="#contact">Contato</a>
              </div>
              <Link href="/login" className="cta-button" as="button">Comece Agora</Link>

            </nav>
          </div>
        </header>

        {/* Seção Hero */}
        <section className="hero">
          <div className="container">
            <h1>Preserve Memórias Para Sempre</h1>
            <p>
              Crie um belo memorial digital para homenagear e lembrar quem você ama.
              Nossa plataforma ajuda você a preservar memórias, compartilhar histórias e se conectar com a família.
            </p>
            <button className="cta-button">Saiba Mais</button>
          </div>
        </section>

        {/* Seção de Recursos */}
        <section id="features" className="features">
          <div className="container">
            <div className="section-title">
              <h2>Nossos Recursos</h2>
              <p>Crie um legado digital duradouro com nossa plataforma completa de memoriais</p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon"><i className="fas fa-photo-film"></i></div>
                <h3>Galeria de Mídia</h3>
                <p>Envie fotos para criar uma bela galeria de tributo que celebra os momentos especiais da vida.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><i className="fas fa-qrcode"></i></div>
                <h3>Qr Code</h3>
                <p>Acesso facilitado e duradouro via Qr code.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><i className="fas fa-book-open"></i></div>
                <h3>História</h3>
                <p>Escreva a História  sobre quem está homenageando.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><i className="fas fa-lock"></i></div>
                <h3>Controles de Privacidade</h3>
                <p>Escolha quem pode visualizar e contribuir com o seu memorial com configurações de privacidade flexíveis.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><i className="fas fa-house"></i></div>
                <h3>Memorial Familiar</h3>
                <p>Conecte memoriais para criar visual que preserve a história da sua família.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><i className="fas fa-mobile-alt"></i></div>
                <h3>Acesso Móvel</h3>
                <p>Acesse os memoriais a qualquer momento e em qualquer lugar com nossa plataforma responsiva.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Sobre */}
        <section id="about" className="about">
          <div className="container">
            <div className="about-container">
              <div className="about-image">
                <img
                  src="https://cdn.pixabay.com/photo/2016/02/18/16/48/loving-1207568_1280.jpg"
                  alt="Sobre o Memorial Digital"
                />
              </div>
              <div className="about-content">
                <h2>Sobre o Memorial Digital</h2>
                <p>
                  O Memorial Digital foi fundado com uma missão simples: ajudar famílias a preservar e compartilhar memórias de seus entes queridos de forma significativa e acessível.
                </p>
                <p>
                  Nossa plataforma combina design cuidadoso com tecnologia de ponta para criar memoriais digitais que homenageiam histórias de vida e conectam gerações.
                </p>
                <p>
                  Comprometidos em apoiar famílias em sua jornada de luto, oferecendo ferramentas que celebram a vida e preservam o legado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Rodapé */}
        <footer id="contact">
          <div className="container">
            <div className="footer-content">
              <div className="footer-column">
                <h3>Memorial Digital</h3>
                <p>Criando legados digitais duradouros para quem amamos.</p>
              </div>
              <div className="footer-column">
                <h3>Links Rápidos</h3>
                <ul>
                  <li><a href="#features">Recursos</a></li>
                  <li><a href="#about">Sobre Nós</a></li>
                  <li><a href="#">Perguntas Frequentes</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h3>Suporte</h3>
                <ul>
                  <li><a href="#">Central de Ajuda</a></li>
                  <li><a href="#">Fale Conosco</a></li>
                  <li><a href="#">Política de Privacidade</a></li>
                  <li><a href="#">Termos de Serviço</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h3>Conecte-se</h3>
                {/* 
              <ul>
                <li><a href="#"><i className="fab fa-facebook"></i> Facebook</a></li>
                <li><a href="#"><i className="fab fa-twitter"></i> Twitter</a></li>
                <li><a href="#"><i className="fab fa-instagram"></i> Instagram</a></li>
                <li><a href="#"><i className="fab fa-linkedin"></i> LinkedIn</a></li>
              </ul>
              */}
              </div>
            </div>
            <div className="copyright">
              <p>2025</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
