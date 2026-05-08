const fs = require('fs');

// 1. REVERT ViewCourse.jsx
const viewCoursePath = 'd:/Desktop/digikhyber/src/pages/ViewCourse.jsx';
let vcContent = fs.readFileSync(viewCoursePath, 'utf8');

// Remove vanta/p5 imports
vcContent = vcContent.replace('import p5 from "p5";\n', '');
vcContent = vcContent.replace('import TOPOLOGY from "vanta/dist/vanta.topology.min";\n', '');
vcContent = vcContent.replace('import React, { useState, useEffect, useRef } from "react";', 'import React, { useState, useEffect } from "react";');
vcContent = vcContent.replace('if (!window.p5) window.p5 = p5;\n\n', '');

// Remove Vanta Logic
const vantaLogicRegex = /const vantaRef = useRef\(null\);[\s\S]*?\}, \[\]\);\n/;
vcContent = vcContent.replace(vantaLogicRegex, '');

// Remove Wrapper Divs
vcContent = vcContent.replace('<div ref={vantaRef} className="position-relative min-vh-100" style={{ zIndex: 1 }}>\n      <div style={{ position: "relative", zIndex: 2 }}>\n', '');
vcContent = vcContent.replace('      </div>\n    </div>\n  );\n};\n\nexport default ViewCourse;', '  );\n};\n\nexport default ViewCourse;');

fs.writeFileSync(viewCoursePath, vcContent);


// 2. FIX PageBanner.jsx Vanta Visibility
const pageBannerPath = 'd:/Desktop/digikhyber/src/components/PageBanner.jsx';
let pbContent = fs.readFileSync(pageBannerPath, 'utf8');

// The Vanta canvas is likely being obscured by the solid CSS background or the overlay.
// Let's remove the CSS background from simple-page-banner because Vanta has its own backgroundColor
pbContent = pbContent.replace('background: linear-gradient(135deg, #0B5D3B 0%, #063d27 100%);', '/* background handled by Vanta */');

// And let's make the overlay much more transparent so the topology shines through
pbContent = pbContent.replace(
  'background: radial-gradient(circle at center, rgba(11, 93, 59, 0.4) 0%, rgba(6, 61, 39, 0.9) 100%);',
  'background: radial-gradient(circle at center, rgba(11, 93, 59, 0.1) 0%, rgba(6, 61, 39, 0.4) 100%);'
);

fs.writeFileSync(pageBannerPath, pbContent);
console.log('Success');
