const fs = require('fs');
const path = 'd:/Desktop/digikhyber/src/pages/ApplyScholarShipCard.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add useEffect and useRef to React import
if (content.includes('import React, { useState } from "react";')) {
  content = content.replace(
    'import React, { useState } from "react";',
    'import React, { useState, useEffect, useRef } from "react";'
  );
}

// 2. Add p5 and TOPOLOGY imports right after the React import
if (content.includes('import React, { useState, useEffect, useRef } from "react";\nimport { useNavigate')) {
  content = content.replace(
    'import React, { useState, useEffect, useRef } from "react";\nimport { useNavigate',
    'import React, { useState, useEffect, useRef } from "react";\nimport p5 from "p5";\nimport TOPOLOGY from "vanta/dist/vanta.topology.min";\n\nif (!window.p5) window.p5 = p5;\nimport { useNavigate'
  );
}

// 3. Add refs and useEffect inside the component
const componentStart = `const ApplyScholarShipCard = () => {\n`;
const vantaInit = `  const vantaRef = useRef(null);\n  const vantaEffectRef = useRef(null);\n\n  useEffect(() => {\n    const initVanta = () => {\n      if (vantaRef.current && !vantaEffectRef.current) {\n        try {\n          vantaEffectRef.current = TOPOLOGY({\n            el: vantaRef.current,\n            p5: p5,\n            mouseControls: true,\n            touchControls: true,\n            gyroControls: false,\n            minHeight: 200.0,\n            minWidth: 200.0,\n            scale: 1.0,\n            scaleMobile: 1.0,\n            color: 0xc9a227,\n            backgroundColor: 0x0b5d3b,\n          });\n        } catch (err) {\n          console.error("Vanta initialization failed:", err);\n        }\n      }\n    };\n\n    const timer = setTimeout(initVanta, 150);\n\n    return () => {\n      clearTimeout(timer);\n      if (vantaEffectRef.current) {\n        try {\n          vantaEffectRef.current.destroy();\n        } catch (e) {\n          console.warn("Vanta destroy error:", e);\n        }\n        vantaEffectRef.current = null;\n      }\n    };\n  }, []);\n\n`;

if (!content.includes('vantaRef = useRef')) {
  content = content.replace(componentStart, componentStart + vantaInit);
}

// 4. Update the return wrapper to include the vanta bg
const oldReturnStart = `  return (
    <div className="scholarship-page-wrapper py-5" style={{ backgroundColor: "#f8faf9", minHeight: "100vh", fontFamily: "'Inter', 'Poppins', sans-serif" }}>`;
const newReturnStart = `  return (
    <div className="scholarship-page-wrapper py-5" style={{ minHeight: "100vh", fontFamily: "'Inter', 'Poppins', sans-serif", position: "relative" }}>
      <div ref={vantaRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}></div>`;

if (content.includes(oldReturnStart)) {
  content = content.replace(oldReturnStart, newReturnStart);
}

// 5. Change the Digikhyber line to be golden
const oldLine = `<p className="mb-0 text-white" style={{ fontWeight: "600", fontSize: "0.95rem", color: "#ffffff" }}>Digikhyber Initiative - Government of Punjab</p>`;
const newLine = `<p className="mb-0" style={{ fontWeight: "600", fontSize: "0.95rem", color: "#C9A227" }}>Digikhyber Initiative - Government of Punjab</p>`;

if (content.includes(oldLine)) {
  content = content.replace(oldLine, newLine);
}

fs.writeFileSync(path, content);
console.log('Success');
