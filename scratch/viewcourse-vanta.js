const fs = require('fs');
const path = 'd:/Desktop/digikhyber/src/pages/ViewCourse.jsx';
let content = fs.readFileSync(path, 'utf8');

// Add imports
if (!content.includes("import p5 from 'p5';") && !content.includes('import p5 from "p5";')) {
  content = content.replace(
    'import React, { useState, useEffect } from "react";',
    'import React, { useState, useEffect, useRef } from "react";\nimport p5 from "p5";\nimport TOPOLOGY from "vanta/dist/vanta.topology.min";'
  );
}

if (!content.includes('if (!window.p5) window.p5 = p5;')) {
  const insertIndex = content.indexOf('const ViewCourse = () => {');
  content = content.slice(0, insertIndex) + 'if (!window.p5) window.p5 = p5;\n\n' + content.slice(insertIndex);
}

// Add Vanta logic
const vantaLogic = `
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  useEffect(() => {
    const initVanta = () => {
      if (vantaRef.current && !vantaEffectRef.current) {
        try {
          vantaEffectRef.current = TOPOLOGY({
            el: vantaRef.current,
            p5: p5,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0xc9a227,
            backgroundColor: 0x0b5d3b,
          });
        } catch (err) {
          console.error("Vanta initialization failed:", err);
        }
      }
    };

    const timer = setTimeout(initVanta, 150);

    return () => {
      clearTimeout(timer);
      if (vantaEffectRef.current) {
        try {
          vantaEffectRef.current.destroy();
        } catch (e) {
          console.warn("Vanta destroy error:", e);
        }
        vantaEffectRef.current = null;
      }
    };
  }, []);
`;

if (!content.includes('const vantaRef = useRef(null);')) {
  content = content.replace(
    'const { showSuccess, showError, showWarning, showInfo } = useModal();',
    'const { showSuccess, showError, showWarning, showInfo } = useModal();\n' + vantaLogic
  );
}

// Wrap return with vanta div
const returnIndex = content.indexOf('  return (\n    <>');
if (returnIndex !== -1) {
  content = content.replace(
    '  return (\n    <>',
    '  return (\n    <div ref={vantaRef} className="position-relative min-vh-100" style={{ zIndex: 1 }}>\n      <div style={{ position: "relative", zIndex: 2 }}>'
  );
  
  const lastIndex = content.lastIndexOf('    </>\n  );');
  if (lastIndex !== -1) {
    content = content.substring(0, lastIndex) + '      </div>\n    </div>\n  );' + content.substring(lastIndex + 14);
  }
}

fs.writeFileSync(path, content);
console.log('Success');
