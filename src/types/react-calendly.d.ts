declare module 'react-calendly' {
    import React from 'react';
  
    export interface CalendlyEventListener {
      onDateAndTimeSelected?: () => void;
      onEventScheduled?: (e: any) => void;
    }
  
    export interface InlineWidgetProps {
      url: string;
      styles?: {
        height?: string | number;
        width?: string | number;
        [key: string]: any;
      };
      prefill?: {
        email?: string;
        firstName?: string;
        lastName?: string;
        name?: string;
        [key: string]: any;
      };
      utm?: Record<string, string>;
    }
  
    export const InlineWidget: React.FC<InlineWidgetProps>;
    export const PopupButton: React.FC<any>;
    export const PopupWidget: React.FC<any>;
    export function loadScript(): Promise<void>;
  }