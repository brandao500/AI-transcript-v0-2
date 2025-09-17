import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Download, Copy, CheckCircle, BookOpen, Lightbulb, ChevronDown, ChevronUp, FileText, FileDown, Zap, Brain, Info, Book, Pencil, HelpCircle } from "lucide-react";
import { useState, useCallback } from "react";
import { exportToPdf, exportToDocx } from "@/lib/exportUtils";

export interface KeyConcept {
  title: string;
  description: string;
  importance: string;
  difficulty: string;
  example: string;
  tip?: string;
}

export interface MainPoint {
  title: string;
  description: string;
  context: string;
  application: string;
  memoryTechnique: string;
}

export interface StudyQuestion {
  question: string;
  answer: string;
  level: string;
  tip?: string;
}

export interface AnalysisResult {
  summary: {
    executiveSummary: string;
    keyConcepts: KeyConcept[];
    mainPoints: MainPoint[];
    importantContexts: {
      title: string;
      description: string;
      relevance: string;
      examples: string[];
    };
    learningStructure: {
      prerequisites: string[];
      learningSequence: string[];
    };
    studyTechniques: Array<{
      name: string;
      whenToUse: string;
      effectiveness: string;
    }>;
    studyQuestions: StudyQuestion[];
    metadata: {
      date: string;
      wordCount: number;
      segments: number;
      source: string;
    };
  };
}

interface ReportSectionProps {
  analysisResult: AnalysisResult;
  onExport: (format: 'text' | 'json' | 'pdf' | 'docx') => void;
}

export function ReportSection({ analysisResult, onExport }: ReportSectionProps) {
  const [copied, setCopied] = useState(false);
  const [openSections, setOpenSections] = useState({
    keyConcepts: true,
    mainPoints: true,
    importantContexts: true,
    learningStructure: true,
    studyTechniques: true,
    studyQuestions: true
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const handleCopyToClipboard = async () => {
    const reportText = generateReportText(analysisResult);
    await navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateReportText = (data: AnalysisResult) => {
    let text = "=== RESUMO EXECUTIVO ===\n\n";
    text += `${data.summary.executiveSummary}\n\n`;

    // Key Concepts
    text += "=== CONCEITOS CHAVE ===\n\n";
    data.summary.keyConcepts.forEach((concept, index) => {
      text += `${concept.title}\n`;
      text += `${concept.description}\n`;
      text += `Importância: ${concept.importance}\n`;
      text += `Dificuldade: ${concept.difficulty}\n`;
      text += `Exemplo:\n${concept.example}\n\n`;
      if (concept.tip) {
        text += `💡 Dica: ${concept.tip}\n\n`;
      }
    });

    // Main Points
    text += "=== PONTOS PRINCIPAIS ===\n\n";
    data.summary.mainPoints.forEach((point, index) => {
      text += `${point.title}\n`;
      text += `${point.description}\n`;
      text += `📍 Contexto: ${point.context}\n`;
      text += `📍 Aplicação: ${point.application}\n`;
      text += `📍 Técnica de Memória: ${point.memoryTechnique}\n\n`;
    });

    // Important Contexts
    const ctx = data.summary.importantContexts;
    text += `=== ${ctx.title.toUpperCase()} ===\n\n`;
    text += `${ctx.description}\n`;
    text += `Relevância: ${ctx.relevance}\n`;
    text += `Exemplos:\n${ctx.examples.map(ex => `➤ ${ex}`).join('\n')}\n\n`;

    // Learning Structure
    text += "=== ESTRUTURA DE APRENDIZADO ===\n\n";
    text += "Pré-requisitos:\n";
    text += data.summary.learningStructure.prerequisites.map(p => `• ${p}`).join('\n') + '\n\n';
    text += "Sequência de Aprendizado:\n";
    text += data.summary.learningStructure.learningSequence.map((s, i) => `${i + 1}. ${s}`).join('\n') + '\n\n';

    // Study Techniques
    text += "=== TÉCNICAS DE ESTUDO ===\n\n";
    data.summary.studyTechniques.forEach(tech => {
      text += `${tech.name}\n`;
      text += `📍 Quando usar: ${tech.whenToUse}\n`;
      text += `📍 Eficácia: ${tech.effectiveness}\n\n`;
    });

    // Study Questions
    text += "=== PERGUNTAS DE ESTUDO ===\n\n";
    data.summary.studyQuestions.forEach((q, i) => {
      text += `${q.question}\n`;
      text += `Resposta:\n${q.answer}\n`;
      text += `📍 Nível: ${q.level}\n`;
      if (q.tip) {
        text += `💡 Dica: ${q.tip}\n`;
      }
      text += '\n';
    });

    // Metadata
    const meta = data.summary.metadata;
    text += `=== INFORMAÇÕES DAS NOTAS ===\n\n`;
    text += `Data: ${meta.date}\n`;
    text += `Palavras: ${meta.wordCount}\n`;
    text += `Segmentos: ${meta.segments}\n`;
    text += `Fonte: ${meta.source}\n`;

    return text;
  };

  const handleExport = (format: 'text' | 'json' | 'pdf' | 'docx') => {
    if (format === 'pdf') {
      // The ID of the report content container
      exportToPdf('report-content', `analise-${new Date().toISOString().split('T')[0]}`);
    } else if (format === 'docx') {
      exportToDocx(analysisResult, `analise-${new Date().toISOString().split('T')[0]}`);
    } else {
      onExport(format);
    }
  };

  const renderKeyConcepts = () => (
    <div className="space-y-6">
      {analysisResult.summary.keyConcepts.map((concept, index) => (
        <div 
          key={index} 
          className="p-4 rounded-lg border border-muted-foreground/10 hover:border-primary/20 transition-colors duration-200"
        >
          <h4 className="font-medium text-foreground mb-2">{concept.title}</h4>
          <p className="text-muted-foreground text-sm mb-3">{concept.description}</p>
          
          <div className="flex flex-wrap gap-4 mt-3 text-sm">
            <div>
              <span className="text-muted-foreground">Importância:</span>{' '}
              <span className="font-medium">{concept.importance}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Dificuldade:</span>{' '}
              <span className="font-medium">{concept.difficulty}</span>
            </div>
          </div>
          
          {concept.example && (
            <div className="mt-3 p-3 bg-muted/20 rounded-md text-sm">
              <div className="font-medium text-muted-foreground mb-1">Exemplo:</div>
              <p className="text-foreground">{concept.example}</p>
            </div>
          )}
          
          {concept.tip && (
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md text-sm">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                <span className="text-blue-700 dark:text-blue-300">{concept.tip}</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderMainPoints = () => (
    <div className="space-y-6">
      {analysisResult.summary.mainPoints.map((point, index) => (
        <div 
          key={index} 
          className="p-5 rounded-lg bg-muted/5 hover:bg-muted/10 transition-colors duration-200 border-l-4 border-primary"
        >
          <h4 className="font-medium text-foreground mb-2">{point.title}</h4>
          <p className="text-muted-foreground text-sm mb-4">{point.description}</p>
          
          <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
            <div className="p-3 bg-muted/10 rounded-md">
              <div className="text-xs font-medium text-muted-foreground mb-1">Contexto</div>
              <p className="text-foreground">{point.context}</p>
            </div>
            <div className="p-3 bg-muted/10 rounded-md">
              <div className="text-xs font-medium text-muted-foreground mb-1">Aplicação</div>
              <p className="text-foreground">{point.application}</p>
            </div>
          </div>
          
          {point.memoryTechnique && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
              <div className="flex items-start gap-2 text-sm">
                <Brain className="h-4 w-4 mt-0.5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <div>
                  <div className="font-medium text-green-800 dark:text-green-200 mb-1">Técnica de Memória</div>
                  <p className="text-green-700 dark:text-green-300">{point.memoryTechnique}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderImportantContexts = () => {
    const ctx = analysisResult.summary.importantContexts;
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">{ctx.description}</p>
        <div>
          <p className="font-medium">Relevância:</p>
          <p className="text-muted-foreground">{ctx.relevance}</p>
        </div>
        <div>
          <p className="font-medium">Exemplos:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            {ctx.examples.map((example, i) => (
              <li key={i} className="text-muted-foreground">{example}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderLearningStructure = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-2">Pré-requisitos</h4>
        <ul className="list-disc pl-5 space-y-1">
          {analysisResult.summary.learningStructure.prerequisites.map((item, i) => (
            <li key={i} className="text-muted-foreground">{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-medium mb-2">Sequência de Aprendizado</h4>
        <ol className="list-decimal pl-5 space-y-1">
          {analysisResult.summary.learningStructure.learningSequence.map((item, i) => (
            <li key={i} className="text-muted-foreground">{item}</li>
          ))}
        </ol>
      </div>
    </div>
  );

  const renderStudyTechniques = () => (
    <div className="space-y-4">
      {analysisResult.summary.studyTechniques.map((tech, i) => (
        <div key={i} className="p-4 border rounded-lg bg-card">
          <h4 className="font-medium mb-2">{tech.name}</h4>
          <p className="text-muted-foreground"><span className="font-medium">Quando usar:</span> {tech.whenToUse}</p>
          <p className="text-muted-foreground"><span className="font-medium">Eficácia:</span> {tech.effectiveness}</p>
        </div>
      ))}
    </div>
  );

  const renderStudyQuestions = () => (
    <div className="space-y-6">
      {analysisResult.summary.studyQuestions.map((q, i) => (
        <div key={i} className="p-4 border rounded-lg bg-card">
          <h4 className="font-medium mb-2">{q.question}</h4>
          <div className="bg-muted p-3 rounded-md mb-3">
            <p className="font-medium mb-1">Resposta:</p>
            <p className="text-muted-foreground">{q.answer}</p>
          </div>
          <p className="text-sm">
            <span className="font-medium">Nível:</span> {q.level}
          </p>
          {q.tip && (
            <div className="mt-2 text-sm text-blue-600 dark:text-blue-400 flex items-start">
              <Lightbulb className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
              <span>{q.tip}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderMetadata = () => {
    const meta = analysisResult.summary.metadata;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <p><span className="font-medium">Data:</span> {meta.date}</p>
          <p><span className="font-medium">Palavras:</span> {meta.wordCount}</p>
        </div>
        <div className="space-y-1">
          <p><span className="font-medium">Segmentos:</span> {meta.segments}</p>
          <p><span className="font-medium">Fonte:</span> {meta.source}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Export Buttons */}
      <div className="flex flex-wrap gap-3 mb-6 p-4 bg-muted/30 rounded-lg border">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleExport('text')}
            className="flex items-center gap-2 bg-background hover:bg-muted/50 transition-all duration-200"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Exportar TXT</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleExport('json')}
            className="flex items-center gap-2 bg-background hover:bg-muted/50 transition-all duration-200"
          >
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Exportar JSON</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleExport('pdf')}
            className="flex items-center gap-2 bg-background hover:bg-muted/50 transition-all duration-200"
          >
            <FileDown className="h-4 w-4" />
            <span className="hidden sm:inline">Exportar PDF</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleExport('docx')}
            className="flex items-center gap-2 bg-background hover:bg-muted/50 transition-all duration-200"
          >
            <FileDown className="h-4 w-4" />
            <span className="hidden sm:inline">Exportar DOCX</span>
          </Button>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopyToClipboard}
          className="flex items-center gap-2 bg-background hover:bg-muted/50 transition-all duration-200 ml-auto"
        >
          {copied ? (
            <>
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="hidden sm:inline">Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span className="hidden sm:inline">Copiar para Área de Transferência</span>
            </>
          )}
        </Button>
      </div>
      
      <div id="report-content" className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Relatório de Análise
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="hidden md:inline">{new Date().toLocaleDateString('pt-BR', { 
              day: '2-digit', 
              month: 'long', 
              year: 'numeric' 
            })}</span>
            <div className="h-1 w-1 rounded-full bg-muted-foreground/50"></div>
            <span>{analysisResult.summary.metadata.wordCount} palavras</span>
          </div>
        </div>

        {/* Resumo Executivo */}
        <Card className="overflow-hidden border border-muted/50 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader 
            className="bg-gradient-to-r from-primary/5 to-primary/10 p-6"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg font-semibold">Resumo Executivo</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="prose prose-sm max-w-none text-muted-foreground">
              {analysisResult.summary.executiveSummary.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-4 last:mb-0">{paragraph}</p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conceitos Chave */}
        <Card className="overflow-hidden border border-muted/50 shadow-sm hover:shadow-md transition-all duration-200">
          <Collapsible defaultOpen>
            <div className="p-0">
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center gap-3 p-6">
                  <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 transition-colors duration-200 group-hover:bg-amber-200 dark:group-hover:bg-amber-800/40">
                    <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 transition-colors duration-200" />
                  </div>
                  <CardTitle className="text-lg font-semibold">Conceitos Chave</CardTitle>
                </div>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="px-6 pb-6 -mt-2">
                {renderKeyConcepts()}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Pontos Principais */}
        <Card className="mt-4 overflow-hidden border border-muted/50 shadow-sm hover:shadow-md transition-all duration-200">
          <Collapsible defaultOpen>
            <div className="p-0">
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center gap-3 p-6">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 transition-colors duration-200 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/40">
                    <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400 transition-colors duration-200" />
                  </div>
                  <CardTitle className="text-lg font-semibold">Pontos Principais</CardTitle>
                </div>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="px-6 pb-6 -mt-2">
                {renderMainPoints()}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Contextos Importantes */}
        <Card className="overflow-hidden border border-muted/50 shadow-sm hover:shadow-md transition-all duration-200">
          <Collapsible defaultOpen>
            <div className="p-0">
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center gap-3 p-6">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 transition-colors duration-200 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40">
                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 transition-colors duration-200" />
                  </div>
                  <CardTitle className="text-lg font-semibold">{analysisResult.summary.importantContexts.title}</CardTitle>
                </div>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="px-6 pb-6 -mt-2">
                {renderImportantContexts()}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Estrutura de Aprendizado */}
        <Card className="overflow-hidden border border-muted/50 shadow-sm hover:shadow-md transition-all duration-200">
          <Collapsible defaultOpen>
            <div className="p-0">
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center gap-3 p-6">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 transition-colors duration-200 group-hover:bg-green-200 dark:group-hover:bg-green-800/40">
                    <Book className="h-5 w-5 text-green-600 dark:text-green-400 transition-colors duration-200" />
                  </div>
                  <CardTitle className="text-lg font-semibold">Estrutura de Aprendizado</CardTitle>
                </div>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="px-6 pb-6 -mt-2">
                {renderLearningStructure()}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Técnicas de Estudo */}
        <Card className="overflow-hidden border border-muted/50 shadow-sm hover:shadow-md transition-all duration-200">
          <Collapsible defaultOpen>
            <div className="p-0">
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center gap-3 p-6">
                  <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 transition-colors duration-200 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800/40">
                    <Pencil className="h-5 w-5 text-yellow-600 dark:text-yellow-400 transition-colors duration-200" />
                  </div>
                  <CardTitle className="text-lg font-semibold">Técnicas de Estudo</CardTitle>
                </div>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="px-6 pb-6 -mt-2">
                {renderStudyTechniques()}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Perguntas de Estudo */}
        <Card className="overflow-hidden border border-muted/50 shadow-sm hover:shadow-md transition-all duration-200">
          <Collapsible defaultOpen>
            <div className="p-0">
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center gap-3 p-6">
                  <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 transition-colors duration-200 group-hover:bg-red-200 dark:group-hover:bg-red-800/40">
                    <HelpCircle className="h-5 w-5 text-red-600 dark:text-red-400 transition-colors duration-200" />
                  </div>
                  <CardTitle className="text-lg font-semibold">Perguntas de Estudo</CardTitle>
                </div>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="px-6 pb-6 -mt-2">
                {renderStudyQuestions()}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Informações das Notas */}
        <Card className="overflow-hidden border border-muted/50 shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader>
            <CardTitle>Informações das Notas</CardTitle>
          </CardHeader>
          <CardContent>
            {renderMetadata()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
