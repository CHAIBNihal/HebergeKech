// src/jspdf-autotable.d.ts
import { jsPDF } from 'jspdf';

declare module 'jspdf-autotable' {
  interface jsPDF {
    autoTable: any;
  }
}
