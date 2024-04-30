import jsPDF from 'jspdf';
import "jspdf-autotable";
import '../../'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { Heading } from './components/Heading';
import { CommentsSection, PricesSection, Table } from './components/Body';
import { Footer } from './components/Footer';

const Index = () => {
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

  function Print() {
    Heading({ pdf, marginX, rgbGreen, rgbBackground, fontText })
    Table({ pdf, marginX, marginXend, coordinateYtable: 98, rgbStyleColor: rgbGreen, rgbBackground })
    CommentsSection({ pdf, marginX, marginXend: ((marginXend / 2) - 10), coordinateYcomments: 205, rgbStyleColor: rgbGreen, rgbBackground })
    PricesSection({ pdf, marginX: ((marginXend / 2) + 62), coordinateYprices: 205, fontText: pricesText })
    Footer({ pdf, fontText: footerText, marginX: ((marginXend / 2) + 25), coordinateYfooter: 270 })
    pdf.save("Factura - Prueba")
  }

  return <section className='fixed right-7 bottom-7 text-4xl'>
    <FontAwesomeIcon icon={faFileInvoice} onClick={Print} />
  </section>
}

export default Index