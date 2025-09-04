export default function SiteFooter(){
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p style={{letterSpacing:".01em"}}>© {new Date().getFullYear()} Kalahari Research Atlas</p>
        <div style={{display:"flex",gap:"16px",alignItems:"center",fontSize:"14px"}}>
          <a className="chip" href="mailto:nicolas@thegazelle.co">nicolas@thegazelle.co</a>
          <a className="chip" href="https://github.com/nicoesteva-gazelle" target="_blank" rel="noreferrer">GitHub</a>
          <a className="chip" href="https://www.linkedin.com/in/nicoesteva" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}