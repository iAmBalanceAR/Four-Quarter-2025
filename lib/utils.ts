import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string into a human-readable format
 * @param dateString - Date string in ISO format (YYYY-MM-DD)
 * @returns Formatted date (e.g., "January 1, 2023")
 */
export function formatDate(dateString: string): string {
  if (!dateString) return ""
  
  const date = new Date(dateString)
  
  // Check if the date is valid
  if (isNaN(date.getTime())) return dateString
  
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

/**
 * Format a time string into a human-readable format
 * @param timeString - Time string in 24-hour format (HH:MM)
 * @returns Formatted time (e.g., "7:00 PM")
 */
export function formatTime(timeString: string): string {
  if (!timeString) return ""
  
  // For "HH:MM" format
  if (/^\d{1,2}:\d{2}$/.test(timeString)) {
    const [hours, minutes] = timeString.split(":")
    const hour = parseInt(hours, 10)
    const ampm = hour >= 12 ? "PM" : "AM"
    const formattedHour = hour % 12 || 12
    
    return `${formattedHour}:${minutes} ${ampm}`
  }
  
  // If already formatted or other format, return as is
  return timeString
}
