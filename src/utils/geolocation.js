import axios from 'axios';

// Cache the result to avoid multiple API calls
let cachedCountry = null;

export const getUserCountry = async () => {
  if (cachedCountry) {
    return cachedCountry;
  }

  try {
    // Using ipapi.co (free tier: 1000 requests/day)
    const response = await axios.get('https://ipapi.co/json/', {
      timeout: 5000
    });
    
    cachedCountry = response.data.country_code;
    return cachedCountry;
  } catch (error) {
    console.warn('Failed to get user location:', error);
    // Fallback: assume non-Turkey if geolocation fails
    cachedCountry = 'UNKNOWN';
    return cachedCountry;
  }
};

export const isUserInTurkey = async () => {
  const country = await getUserCountry();
  return country === 'TR';
};

// Alternative method using multiple services for better reliability
export const getUserCountryWithFallback = async () => {
  if (cachedCountry) {
    return cachedCountry;
  }

  const services = [
    'https://ipapi.co/json/',
    'https://ip-api.com/json/',
    'https://ipinfo.io/json',
  ];

  for (const service of services) {
    try {
      const response = await axios.get(service, { timeout: 3000 });

      // Different services have different response formats
      let countryCode;
      if (service.includes('ipapi.co')) {
        countryCode = response.data.country_code;
      } else if (service.includes('ip-api.com')) {
        countryCode = response.data.countryCode;
      } else if (service.includes('ipinfo.io')) {
        countryCode = response.data.country;
      }

      if (countryCode) {
        cachedCountry = countryCode;
        return cachedCountry;
      }
    } catch (error) {
      console.warn(`Service ${service} failed:`, error);
      continue;
    }
  }

  // If all services fail, default to non-Turkey
  cachedCountry = 'UNKNOWN';
  return cachedCountry;
};
