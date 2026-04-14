export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <p>
          © {year} Dellano Sousa Advocacia · Mapeamento Processual Estratégico · Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
