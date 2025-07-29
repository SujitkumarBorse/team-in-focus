import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, retry, timeout } from 'rxjs/operators';

export interface GalleryImage {
  src: string;
  loaded?: boolean;
  error?: boolean;
  retryCount?: number;
  originalSrc?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private readonly MAX_RETRIES = 3;
  private readonly REQUEST_TIMEOUT = 10000; // 10 seconds

  constructor(private http: HttpClient) {}

  /**
   * Get gallery data from gallery-data.json
   */
  getGalleryData(): Observable<any> {
    return this.http.get<any>('/gallery-data.json').pipe(
      timeout(this.REQUEST_TIMEOUT),
      map(data => {
        // Process the data from gallery-data.json
        const processedData: any = {};
        
        // Process each category
        Object.keys(data).forEach(category => {
          const images = data[category] || [];
          processedData[category] = images.map((image: any) => ({
            src: this.processImageUrl(image.src || image),
            loaded: false,
            error: false,
            retryCount: 0,
            originalSrc: image.src || image
          }));
        });
        
        return processedData;
      }),
      retry(this.MAX_RETRIES),
      catchError(error => {
        // console.error('Error loading gallery data from JSON:', error);
        // Return empty data instead of fallback images
        return of({});
      })
    );
  }

  /**
   * Process image URLs to ensure they work properly
   */
  private processImageUrl(url: string): string {
    if (!url) return '';
    
    // console.log('Processing URL:', url);
    
    // Handle Google Drive URLs (file sharing links)
    if (url.includes('drive.google.com')) {
      const processedUrl = this.processGoogleDriveUrl(url);
      // console.log('Processed Google Drive URL:', processedUrl);
      return processedUrl;
    }
    
    // Handle direct Google Drive image URLs (lh3.googleusercontent.com)
    if (url.includes('lh3.googleusercontent.com')) {
      // console.log('Direct Google Drive image URL (unchanged):', url);
      return url;
    }
    
    // Handle Unsplash URLs (already properly formatted)
    if (url.includes('unsplash.com')) {
      // console.log('Unsplash URL (unchanged):', url);
      return url;
    }
    
    // For other URLs, return as is
    // console.log('Other URL (unchanged):', url);
    return url;
  }

  /**
   * Process Google Drive URLs to ensure they work properly
   */
  private processGoogleDriveUrl(url: string): string {
    // console.log('Processing Google Drive URL:', url);
    
    // Check if it's already a thumbnail URL
    if (url.includes('thumbnail')) {
      // Ensure proper size parameter
      if (!url.includes('sz=')) {
        url += '&sz=w800';
      }
      // console.log('Already thumbnail URL, returning:', url);
      return url;
    }
    
    // Extract file ID from Google Drive URL
    let fileId = '';
    
    // Handle different Google Drive URL formats
    if (url.includes('/file/d/')) {
      // Format: https://drive.google.com/file/d/FILE_ID/view
      const match = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
      if (match) {
        fileId = match[1];
      }
    } else if (url.includes('id=')) {
      // Format: https://drive.google.com/open?id=FILE_ID
      const match = url.match(/[?&]id=([a-zA-Z0-9-_]+)/);
      if (match) {
        fileId = match[1];
      }
    }
    
    // console.log('Extracted file ID:', fileId);
    
    if (fileId) {
      // Return thumbnail URL with proper size
      const thumbnailUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
      // console.log('Generated thumbnail URL:', thumbnailUrl);
      return thumbnailUrl;
    }
    
    // If we can't extract file ID, return original URL
    // console.log('Could not extract file ID, returning original URL:', url);
    return url;
  }

  /**
   * Test if a URL is accessible (for debugging purposes)
   */
  testImageUrl(url: string): Observable<boolean> {
    return this.http.head(url, { observe: 'response' }).pipe(
      map(response => {
        // console.log('Image URL test successful:', url, response.status);
        return true;
      }),
      catchError(error => {
        // console.error('Image URL test failed:', url, error);
        return of(false);
      })
    );
  }

  /**
   * Get alternative URL for retry attempts
   */
  getAlternativeUrl(originalUrl: string, retryCount: number): string {
    // Handle direct Google Drive image URLs (lh3.googleusercontent.com)
    if (originalUrl.includes('lh3.googleusercontent.com')) {
      // Extract file ID from direct URL format
      const match = originalUrl.match(/\/d\/([a-zA-Z0-9-_]+)=/);
      if (match) {
        const fileId = match[1];
        // Try different sizes for retry attempts
        const sizes = ['w800', 'w600', 'w400', 'w200'];
        const sizeIndex = retryCount % sizes.length;
        return `https://lh3.googleusercontent.com/d/${fileId}=${sizes[sizeIndex]}?authuser=0`;
      }
      return originalUrl;
    }

    // Handle regular Google Drive URLs
    if (!originalUrl.includes('drive.google.com')) {
      return originalUrl;
    }

    // Extract file ID
    let fileId = '';
    if (originalUrl.includes('/file/d/')) {
      const match = originalUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
      if (match) {
        fileId = match[1];
      }
    } else if (originalUrl.includes('id=')) {
      const match = originalUrl.match(/[?&]id=([a-zA-Z0-9-_]+)/);
      if (match) {
        fileId = match[1];
      }
    } else if (originalUrl.includes('thumbnail')) {
      const match = originalUrl.match(/[?&]id=([a-zA-Z0-9-_]+)/);
      if (match) {
        fileId = match[1];
      }
    }

    if (fileId) {
      // Try different sizes for retry attempts
      const sizes = ['w800', 'w600', 'w400', 'w200'];
      const sizeIndex = retryCount % sizes.length;
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=${sizes[sizeIndex]}`;
    }

    return originalUrl;
  }

  /**
   * Get default gallery data with sample images (fallback only)
   */
  private getDefaultGalleryData(): any {
    return {
      'wedding': [],
      'pre-wedding': [],
      'engagement': [],
      'new-born': [],
      'corporate': [],
      'maternity': [],
      'birthday': []
    };
  }
} 