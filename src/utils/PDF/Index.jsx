import jsPDF from 'jspdf';
import "jspdf-autotable";
import '../..'
import { Heading } from './components/Heading';
import { CommentsSection, PricesSection, Table } from './components/Body';
import { Footer } from './components/Footer';

const pdf = new jsPDF({
  format: "letter",
});

const fontText = 9
const pricesText = 10
const footerText = 8

const rgbGreen = {
  r: 103,
  g: 204,
  b: 120,
}

const rgbBackground = {
  r: 198,
  g: 198,
  b: 198
}

const marginX = 15
const marginXend = 187

// const HeadingData = {
//   business: {
//     title: "Blue Logistic Services",
//     address: "C/ direccion local",
//     rnc: "130870000",
//     email: "blue@gmail.com",
//     phone: "8090001111",
//   },
//   client: {
//     name: "Juan",
//     rnc: "130998877",
//     address: "C/ direccion del cliente",
//     phone: "8090000000",
//   },
//   invoice_detail: {
//     date: '01/05/2024',
//     number: '00001',
//     comprobant: "Crédito Fiscal",
//     expire_date: "01/05/2024"
//   }
// }

// const PricesData = {
//   subtotal: "1200.00",
//   subtotal_with_discount: "1200.00",
//   itbis: "216.00",
//   deposit: "0.00",
//   discount: "0.00",
//   total: "1416.00"
// }

export function PrintInvoice({ HeadingData, PricesData }) {
  Heading({ pdf, HeadingData, marginX, rgbGreen, rgbBackground, fontText })
  Table({ pdf, marginX, marginXend, coordinateYtable: 98, rgbStyleColor: rgbGreen, rgbBackground })
  CommentsSection({ pdf, marginX, marginXend: ((marginXend / 2) - 10), coordinateYcomments: 205, rgbStyleColor: rgbGreen, rgbBackground })
  PricesSection({ pdf, PricesData, marginX: ((marginXend / 2) + 62), coordinateYprices: 205, fontText: pricesText })
  Footer({ pdf, fontText: footerText, marginX: ((marginXend / 2) + 25), coordinateYfooter: 270 })
  pdf.save("Factura - Prueba")
}