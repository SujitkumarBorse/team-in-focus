import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  standalone: true
})
export class ContactComponent implements OnInit {
  emailID1 = 'teaminfocus03@gmail.com';
  
  faqs: FAQ[] = [
    {
      question: "What photography services do you offer?",
      answer: "We offer a comprehensive range of photography services including wedding photography, pre-wedding shoots, engagement sessions, newborn photography, corporate events, maternity shoots, and birthday celebrations. Each service is tailored to capture your special moments beautifully.",
      isOpen: false
    },
    {
      question: "How far in advance should I book your services?",
      answer: "We recommend booking at least 3-6 months in advance for weddings and major events, especially during peak seasons (spring and fall). For other services like engagement shoots or corporate events, 2-4 weeks notice is usually sufficient.",
      isOpen: false
    },
    {
      question: "What is included in your photography packages?",
      answer: "Our packages typically include professional photography coverage, high-resolution digital images, basic editing and retouching, online gallery for viewing and downloading, and print release. Wedding packages may also include engagement sessions, albums, and additional services.",
      isOpen: false
    },
    {
      question: "Do you travel for photography sessions?",
      answer: "Yes, we love to travel! We offer photography services throughout the region and are willing to travel for destination weddings and special events. Travel fees may apply for locations outside our standard service area.",
      isOpen: false
    },
    {
      question: "How long does it take to receive my photos?",
      answer: "For most sessions, you'll receive a preview within 1-2 weeks and your complete gallery within 3-4 weeks. Wedding photography typically takes 4-6 weeks for the full gallery due to the volume of images and detailed editing required.",
      isOpen: false
    },
    {
      question: "Can I customize a photography package?",
      answer: "Absolutely! We understand that every client has unique needs and preferences. We're happy to customize packages to include specific services, additional hours, special requests, or combine different elements to create the perfect package for your event.",
      isOpen: false
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // Scroll to top when component loads (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  toggleFAQ(index: number): void {
    // Close all other FAQs
    this.faqs.forEach((faq, i) => {
      if (i !== index) {
        faq.isOpen = false;
      }
    });

    // Toggle the clicked FAQ
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }

  getDirections(): void {
    // Open Google Maps with the office address (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      const address = encodeURIComponent('Shop No. 2, Vijay Residency, Near Talathi Office, Tathawde Road, Punawale, Pune, Pimpri-Chinchwad, Maharashtra - 411033, India');
      window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
    }
  }

  // Method to handle contact form submission
  onSubmitContactForm(): void {
    // This would typically handle form submission
    alert('Thank you for your message! We will get back to you soon.');
  }

  // Method to handle service inquiry
  onServiceInquiry(service: string): void {
    alert(`Thank you for your interest in our ${service} services! We will contact you with more details.`);
  }
}
