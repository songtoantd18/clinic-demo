import fs from 'fs';
import path from 'path';

const inputDir = path.join(process.cwd(), 'stitch_exports');
const outputDir = path.join(process.cwd(), 'src', 'pages');

const mapping = {
  'chi_ti_t_l_ch_kh_m.html': 'AppointmentDetail',
  'chi_ti_t_ph_ng_kh_m.html': 'ClinicDetail',
  'clinicpulse_health_management_system.html': 'ClinicPulseMain',
  'l_ch_s__kh_m_b_nh_c_a_t_i.html': 'PatientHistory',
  'l_ch_s____t_kh_m.html': 'BookingHistory',
  'prd___h__th_ng_qu_n_l__ph_ng_kh_m.html': 'PRD',
  'th_ng_tin_ph_ng_kh_m.html': 'ClinicInfo',
  'trang_ch__b_nh_nh_n.html': 'PatientHome',
  '__ng_nh_p_ph_ng_kh_m.html': 'ClinicLogin',
  '__ng_nh_p_____ng_k__b_nh_nh_n.html': 'PatientLogin',
  '__t_l_ch_kh_m_nhanh.html': 'QuickBooking'
};

function convertHtmlToJsx(html) {
  // Extract body content
  let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return '';
  let body = bodyMatch[1];

  // Remove scripts
  body = body.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove HTML comments
  body = body.replace(/<!--[\s\S]*?-->/g, '');

  // class to className
  body = body.replace(/ class=/g, ' className=');
  // for to htmlFor
  body = body.replace(/ for=/g, ' htmlFor=');
  
  // Custom styles conversion (very naive, assumes specific Material Symbols style)
  body = body.replace(/style="font-variation-settings: 'FILL' 0, 'wght' 600;"/g, `style={{ fontVariationSettings: "'FILL' 0, 'wght' 600" }}`);
  body = body.replace(/style="[^"]*"/g, ''); // strip any other inline styles to prevent React errors

  // Self closing tags
  body = body.replace(/<img([^>]*[^/])>/g, '<img$1 />');
  body = body.replace(/<input([^>]*[^/])>/g, '<input$1 />');
  body = body.replace(/<hr([^>]*[^/])>/g, '<hr$1 />');
  body = body.replace(/<br>/g, '<br />');

  return body;
}

function processFiles() {
  const files = fs.readdirSync(inputDir);
  
  files.forEach(file => {
    if (mapping[file]) {
      const htmlPath = path.join(inputDir, file);
      const htmlContent = fs.readFileSync(htmlPath, 'utf8');
      
      const jsxContent = convertHtmlToJsx(htmlContent);
      const componentName = mapping[file];
      
      const reactFileContent = `import React from 'react';

export default function ${componentName}() {
  return (
    <>
      ${jsxContent}
    </>
  );
}
`;
      const outputPath = path.join(outputDir, `${componentName}.jsx`);
      fs.writeFileSync(outputPath, reactFileContent);
      console.log(`Created ${componentName}.jsx`);
    }
  });
}

processFiles();
