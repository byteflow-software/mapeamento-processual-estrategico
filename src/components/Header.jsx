export default function Header() {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <a href="#inicio" className="brand" aria-label="Dellano Sousa Advocacia - Início">
          <img
            src="/logo-white.png"
            alt=""
            className="brand-logo"
            width="140"
            height="48"
            loading="eager"
          />
        </a>
        <a className="btn btn-ghost" href="#formulario">
          Solicitar mapeamento
        </a>
      </div>
    </header>
  );
}
