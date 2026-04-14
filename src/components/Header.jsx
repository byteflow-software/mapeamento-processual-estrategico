export default function Header() {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <a href="#inicio" className="brand" aria-label="Dellano Sousa Advocacia - Início">
          <span className="brand-badge" aria-hidden="true">DS</span>
          <span className="brand-copy">
            <strong>Dellano Sousa Advocacia</strong>
            <span>Mapeamento Processual Estratégico</span>
          </span>
        </a>
        <a className="btn btn-ghost" href="#formulario">
          Solicitar mapeamento
        </a>
      </div>
    </header>
  );
}
