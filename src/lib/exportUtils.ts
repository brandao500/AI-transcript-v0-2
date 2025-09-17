import { Document, HeadingLevel, Packer, Paragraph, TextRun } from 'docx';
import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';
import { AnalysisResult } from '@/components/ReportSection';

export const exportToPdf = (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const opt = {
    margin: 10,
    filename: `${filename}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
};

export const exportToDocx = async (analysisResult: AnalysisResult, filename: string) => {
  const { summary } = analysisResult;
  
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: 'Relatório de Análise',
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 200 }
          }),
          
          // Executive Summary
          new Paragraph({
            text: 'Resumo Executivo',
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            children: [new TextRun(summary.executiveSummary)],
            spacing: { after: 200 }
          }),
          
          // Key Concepts
          new Paragraph({
            text: 'Conceitos Chave',
            heading: HeadingLevel.HEADING_2,
          }),
          ...summary.keyConcepts.flatMap(concept => [
            new Paragraph({
              text: concept.title,
              heading: HeadingLevel.HEADING_3,
              spacing: { before: 200 }
            }),
            new Paragraph(concept.description),
            new Paragraph(`Importância: ${concept.importance}`),
            new Paragraph(`Dificuldade: ${concept.difficulty}`),
            new Paragraph({
              text: `Exemplo: ${concept.example}`,
              spacing: { after: 200 }
            })
          ]),
          
          // Add more sections as needed for mainPoints, studyQuestions, etc.
        ]
      }
    ]
  });

  const buffer = await Packer.toBlob(doc);
  saveAs(buffer, `${filename}.docx`);
};
