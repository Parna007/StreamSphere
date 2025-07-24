import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ textAlign: 'center', padding: '1rem', marginTop: 'auto' }}>
      <p>streamSphere © {currentYear}</p>
    </footer>
  );
}

export default Footer;
