import { Router } from "@angular/router";

export function centerNavigateTo(section: string, currentUrl: string, router: Router): void {
    try {
      // Find the base part of the URL before (center/
      const baseUrlMatch = currentUrl.match(/(.*?\(center\/)/);
      if (!baseUrlMatch) {
        console.error('Could not find center pattern in URL');
        return;
      }

      // Extract the trailing part after the double slash
      const trailingMatch = currentUrl.match(/\/\/([^)]*)/);
      const trailing = trailingMatch ? trailingMatch[1] : '';

      // Construct the new URL
      const baseUrl = baseUrlMatch[1];
      const newUrl = `${baseUrl}${section}//${trailing}`;
      
      
      router.navigateByUrl(newUrl);
    } catch (error) {
      console.error('Error in centerNavigateTo:', error);
      console.error('Current URL:', currentUrl);
    }
}

export function rightNavigateTo(section: string, currentUrl:string, router: Router): void {
    try {
      if (currentUrl.includes(':right')) {
        const baseUrl = currentUrl.split(':right')[0];
        const newUrl = `${baseUrl}:right/${section}`;
        router.navigateByUrl(newUrl);
      }
    } catch (error) {
      console.error('Error in rightNavigateTo:', error);
    }
}

export function navigateTo(section: string, currentUrl: string, router: Router): void {
  try {
       // Split the URL into segments
      const urlSegments = currentUrl.split('/').filter(segment => segment);
      const baseSegment = urlSegments[0];
      const newUrl = `/${baseSegment}/${section}`;
      router.navigateByUrl(newUrl);

  } catch (error) {
      console.error('Error in navigateTo:', error);
  }
}

