export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        <img
          src="/logo-white.png"
          alt="Dellano Sousa Advocacia"
          className="footer-logo"
          width="120"
          height="41"
          loading="lazy"
        />
        <p>
          © {year} Dellano Sousa Advocacia · Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
