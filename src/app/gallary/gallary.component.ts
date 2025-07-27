import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GalleryService, GalleryImage } from '../services/gallery.service';

@Component({
  selector: 'app-gallary',
  imports: [CommonModule],
  templateUrl: './gallary.component.html',
  styleUrl: './gallary.component.scss',
  standalone: true
})
export class GallaryComponent implements OnInit {
  activeTab: string = 'wedding';
  galleryData: any = {};
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private galleryService: GalleryService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Load gallery data
    this.loadGalleryData();
    
    // Set active tab based on query parameter
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.activeTab = params['tab'];
      }
    });

    // Scroll to top when gallery component loads (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  loadGalleryData(): void {
    console.log('Loading gallery data...');
    this.galleryService.getGalleryData()
      .subscribe({
        next: (data) => {
          console.log('Gallery data loaded successfully:', data);
          this.galleryData = data;
          this.loading = false;
          
          // Log some sample URLs for debugging
          Object.keys(data).forEach(category => {
            if (data[category] && data[category].length > 0) {
              console.log(`${category} category has ${data[category].length} images`);
              console.log('Sample URL:', data[category][0].src);
            }
          });
        },
        error: (error) => {
          console.error('Error loading gallery data:', error);
          this.loading = false;
        }
      });
  }

  // Getter methods for gallery data
  get weddingImages(): GalleryImage[] {
    return this.galleryData.wedding || [];
  }

  get preWeddingImages(): GalleryImage[] {
    return this.galleryData['pre-wedding'] || [];
  }

  get engagementImages(): GalleryImage[] {
    return this.galleryData.engagement || [];
  }

  get newBornImages(): GalleryImage[] {
    return this.galleryData['new-born'] || [];
  }

  get corporateImages(): GalleryImage[] {
    return this.galleryData.corporate || [];
  }

  get maternityImages(): GalleryImage[] {
    return this.galleryData.maternity || [];
  }

  get birthdayImages(): GalleryImage[] {
    return this.galleryData.birthday || [];
  }

  // Tab switching functionality
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  // Navigation methods for home page integration
  navigateToGallery(tab: string): void {
    this.activeTab = tab;
    // Scroll to gallery section if needed
    const galleryElement = document.querySelector('.gallery-container');
    if (galleryElement) {
      galleryElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Handle image loading errors with retry logic
  onImageError(event: any, item: GalleryImage): void {
    const img = event.target;
    console.error('Image failed to load:', img.src, 'Original:', item.originalSrc);
    
    // Increment retry count
    item.retryCount = (item.retryCount || 0) + 1;
    item.error = true;
    
    // Try alternative URL if we haven't exceeded max retries
    if (item.retryCount <= 3 && item.originalSrc) {
      console.log(`Retrying image (attempt ${item.retryCount}):`, item.originalSrc);
      
      // Get alternative URL
      const newSrc = this.galleryService.getAlternativeUrl(item.originalSrc, item.retryCount - 1);
      console.log('New source URL:', newSrc);
      item.src = newSrc;
      item.error = false;
      
      // Retry loading the image
      setTimeout(() => {
        img.src = newSrc;
      }, 1000 * item.retryCount); // Exponential backoff
    } else {
      // Max retries exceeded, show error state
      console.error('Max retries exceeded for image:', item.originalSrc);
      item.error = true;
      
      // Hide the image
      img.style.display = 'none';
      img.style.opacity = '0';
      
      // Hide loading placeholder
      const placeholder = img.parentElement?.querySelector('.image-placeholder');
      if (placeholder) {
        placeholder.style.display = 'none';
      }
      
      // Show error placeholder
      const errorPlaceholder = img.parentElement?.querySelector('.error-placeholder');
      if (errorPlaceholder) {
        errorPlaceholder.style.display = 'flex';
      }
    }
  }

  // Handle image load success
  onImageLoad(event: any, item: GalleryImage): void {
    console.log('Image loaded successfully:', item.src);
    item.loaded = true;
    item.error = false;
    
    // Hide placeholder when image loads successfully
    const placeholder = event.target.parentElement?.querySelector('.image-placeholder');
    const errorPlaceholder = event.target.parentElement?.querySelector('.error-placeholder');
    
    if (placeholder) {
      placeholder.style.display = 'none';
    }
    
    if (errorPlaceholder) {
      errorPlaceholder.style.display = 'none';
    }
    
    // Show the image
    event.target.style.display = 'block';
    event.target.style.opacity = '1';
  }
}
