const fs = require('fs');

let html = fs.readFileSync('C:\\Users\\Saurabh Nimbarte\\Downloads\\Documents_PDFs\\dr-vaibhavi-website\\index.html', 'utf8');

// Extract everything inside <body>...</body>
let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
if (!bodyMatch) {
    console.log("No body found");
    process.exit(1);
}
let body = bodyMatch[1];

// Convert class= to className=
body = body.replace(/class=/g, 'className=');
// Convert for= to htmlFor=
body = body.replace(/for=/g, 'htmlFor=');
// Convert inline styles if any (none exist except Google translate display:none)
body = body.replace(/style="display:none;"/g, '');
// Convert self closing tags
body = body.replace(/<img([^>]+[^\/])>/g, '<img$1 />');
body = body.replace(/<input([^>]+[^\/])>/g, '<input$1 />');
body = body.replace(/<br>/g, '<br />');
body = body.replace(/<hr>/g, '<hr />');
// Convert HTML comments to JSX comments
body = body.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
// Convert onclick/onsubmit to onClick/onSubmit
body = body.replace(/onsubmit=/g, 'onSubmit=');
body = body.replace(/onclick=/g, 'onClick=');

// Extract scripts into a useEffect block
let scriptTags = body.match(/<script[\s\S]*?<\/script>/g) || [];
body = body.replace(/<script[\s\S]*?<\/script>/g, '');

const pageTsx = `"use client";
import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        // Initialize AOS
        if (typeof window !== 'undefined') {
            const AOS = require('aos');
            AOS.init({ once: true });
            
            // Initialize Swiper
            const Swiper = require('swiper');
            new Swiper('.testimonials-slider', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                pagination: { el: '.swiper-pagination', clickable: true },
                autoplay: { delay: 5000 },
                breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
            });
        }
        
        // Sticky Navbar
        const handleScroll = () => {
            const nav = document.getElementById('navbar');
            if (nav) {
                if (window.scrollY > 20) {
                    nav.classList.add('shadow-md');
                } else {
                    nav.classList.remove('shadow-md');
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const submitForm = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.Patient_Name.value;
        const mobile = form.Mobile_Number.value;
        const date = form.Appointment_Date.value;
        const mode = form.Consultation_Mode.value;
        const concern = form.Health_Concern.value || 'None';
        
        const message = \`*New Appointment Request* %0A%0A*Name:* \${name}%0A*Mobile:* \${mobile}%0A*Date:* \${date}%0A*Mode:* \${mode}%0A*Concern:* \${concern}\`;
        
        const whatsappUrl = \`https://wa.me/919284880359?text=\${message}\`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <main>
            ${body}
        </main>
    );
}
`;

fs.writeFileSync('C:\\Users\\Saurabh Nimbarte\\Downloads\\Documents_PDFs\\dr-vaibhavi-app\\src\\app\\page.tsx', pageTsx);
console.log("Migration script complete");
