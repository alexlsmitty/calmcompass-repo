// src/services/api.ts - Create a new file

/**
 * Mock API service that mimics a real API service by fetching from local JSON files
 * This can easily be replaced with actual API calls in the future
 */

// Types
export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
  }
  
  // Generic fetch function to import JSON
  async function fetchMockData<T>(jsonPath: string): Promise<ApiResponse<T>> {
    try {
      // In a real API, this would be a fetch call to an endpoint
      const response = await import(`../mock-api-data/${jsonPath}.json`);
      
      return {
        data: response.default as T,
        success: true
      };
    } catch (error) {
      console.error(`Error fetching mock data from ${jsonPath}:`, error);
      return {
        data: {} as T,
        success: false,
        message: `Failed to fetch data: ${error}`
      };
    }
  }
  
  // API methods that mimic real API endpoints
  // These can be replaced with actual API calls later
  
  // Practitioners
  export async function getPractitioners() {
    return fetchMockData<any>('practitioner-data');
  }
  
  // Services
  export async function getServices() {
    return fetchMockData<any>('service-data');
  }
  
  // User Data
  export async function getUserData(userId: string) {
    // In a real API, you'd pass the userId to the endpoint
    return fetchMockData<any>('user-data');
  }
  
  // Appointments
  export async function getAppointments(userId: string) {
    return fetchMockData<any>('appointment-data');
  }
  
  // Exercises
  export async function getExercises() {
    return fetchMockData<any>('exercise-data');
  }
  
  // Practice Information
  export async function getPracticeInfo() {
    return fetchMockData<any>('practice-info');
  }
  
  // Site Configuration
  export async function getSiteConfig() {
    return fetchMockData<any>('site-config');
  }
  
  // Example for POST-like operations (create, update, delete)
  // For the mock API, we'll simulate success but won't actually change data
  
  export async function createAppointment(appointmentData: any) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: { 
        id: `apt-${Date.now()}`,
        ...appointmentData,
        status: 'Confirmed'
      },
      success: true,
      message: 'Appointment created successfully!'
    };
  }
  
  export async function updateUserProfile(userId: string, profileData: any) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: { 
        id: userId,
        ...profileData,
        updatedAt: new Date().toISOString()
      },
      success: true,
      message: 'Profile updated successfully!'
    };
  }
  
  export async function deleteAppointment(appointmentId: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: { id: appointmentId },
      success: true,
      message: 'Appointment cancelled successfully!'
    };
  }