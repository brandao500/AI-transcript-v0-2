import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Play, 
  Upload, 
  Link, 
  FileText, 
  Languages, 
  Download, 
  Copy,
  Search,
  Zap,
  CheckCircle,
  Loader2
} from "lucide-react";
import { useState, useCallback } from "react";
import Header from "@/components/Header";
import { ReportSection, AnalysisResult, KeyConcept, MainPoint, StudyQuestion } from "@/components/ReportSection";
import { toast } from "@/components/ui/use-toast";

const TranscricaoAnalise = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'transcricao' | 'analise'>('transcricao');

  // Mock function to simulate API call for analysis
  const analyzeContent = async (transcript: string): Promise<AnalysisResult> => {
    // In a real app, this would be an API call to your backend
    return new Promise<AnalysisResult>((resolve) => {
      setTimeout(() => {
        // Mock data matching the new structure
        const mockResult: AnalysisResult = {
          summary: {
            executiveSummary: "Esta palestra aborda a importância de fazer coisas que não escalam no início de uma startup, a necessidade dos fundadores aprenderem a fazer vendas, a importância de cobrar pelo seu produto e a necessidade de trabalhar de trás para frente a partir de seus objetivos.",
            
            keyConcepts: [
              {
                title: "Fazer coisas que não escalam",
                description: "Ações manuais e intensivas em tempo que não podem ser facilmente automatizadas ou multiplicadas, mas que são cruciais para o crescimento inicial de uma startup.",
                importance: "Essas ações ajudam a construir um produto com os clientes e a recrutar manualmente os primeiros clientes.",
                difficulty: "Intermediário",
                example: "Os fundadores da Airbnb visitaram pessoalmente os anfitriões para entender suas necessidades e melhorar o produto.",
                tip: "Leia o ensaio 'Fazer coisas que não escalam' de Paul Graham."
              },
              {
                title: "Vendas",
                description: "Processo de persuadir um cliente em potencial a comprar seu produto ou serviço.",
                importance: "As vendas são cruciais para o crescimento e a sobrevivência de uma startup.",
                difficulty: "Intermediário",
                example: "Os fundadores da Brex recrutaram seus primeiros 10 clientes diretamente de outras startups no Y Combinator.",
                tip: "Pratique vendas com clientes em potencial e peça feedback."
              }
            ],
            
            mainPoints: [
              {
                title: "Fazer coisas que não escalam",
                description: "As startups não decolam por si só, os fundadores precisam fazer isso acontecer. Isso muitas vezes envolve fazer coisas que não escalam, como recrutar manualmente os primeiros clientes.",
                context: "Estágio inicial de uma startup",
                application: "Identifique ações que podem ajudar sua startup a crescer, mesmo que não sejam escaláveis.",
                memoryTechnique: "Lembre-se do exemplo da Airbnb"
              },
              {
                title: "Vendas",
                description: "Os fundadores precisam aprender a fazer vendas para entender seus clientes e ter controle total sobre o destino de sua startup.",
                context: "Estágio inicial de uma startup",
                application: "Pratique vendas com clientes em potencial e peça feedback.",
                memoryTechnique: "Lembre-se do exemplo da Brex"
              }
            ],
            
            importantContexts: {
              title: "Startups",
              description: "Empresas em estágio inicial que buscam resolver um problema com uma solução inovadora.",
              relevance: "Este conteúdo é especialmente relevante para fundadores de startups que estão no estágio inicial de construção de seu produto e recrutamento de seus primeiros clientes.",
              examples: ["Airbnb", "Brex"]
            },
            
            learningStructure: {
              prerequisites: [
                "Conhecimento básico de startups",
                "Conhecimento básico de vendas"
              ],
              learningSequence: [
                "Entenda o conceito de fazer coisas que não escalam",
                "Aprenda a importância das vendas e como fazê-las",
                "Pratique vendas com clientes em potencial"
              ]
            },
            
            studyTechniques: [
              {
                name: "Estudo de caso",
                whenToUse: "Quando quiser entender como os conceitos são aplicados na prática.",
                effectiveness: "Alta"
              }
            ],
            
            studyQuestions: [
              {
                question: "Por que é importante fazer coisas que não escalam no início de uma startup?",
                answer: "Fazer coisas que não escalam ajuda a construir um produto com os clientes e a recrutar manualmente os primeiros clientes.",
                level: "Intermediário",
                tip: "Pense no exemplo da Airbnb"
              },
              {
                question: "Por que os fundadores de uma startup devem aprender a fazer vendas?",
                answer: "As vendas são cruciais para o crescimento e a sobrevivência de uma startup. Os fundadores precisam aprender a fazer vendas para entender seus clientes e ter controle total sobre o destino de sua startup.",
                level: "Intermediário",
                tip: "Pense no exemplo da Brex"
              }
            ],
            
            metadata: {
              date: new Date().toLocaleDateString('pt-BR'),
              wordCount: 4702,
              segments: 30,
              source: "OpenAI"
            }
          }
        };
        
        resolve(mockResult);
      }, 3000);
    });
  };

  const handleAnalyze = async () => {
    if (!youtubeUrl) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma URL do YouTube válida.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // In a real app, you would fetch the transcript from your backend
      // const response = await fetch(`/api/transcript?url=${encodeURIComponent(youtubeUrl)}`);
      // const transcript = await response.json();
      
      // For now, we'll use a mock transcript
      const mockTranscript = "Esta é uma transcrição de exemplo do vídeo. Ela conteria o texto completo do vídeo do YouTube.";
      
      // Analyze the content
      const result = await analyzeContent(mockTranscript);
      setAnalysisResult(result);
      setHasResults(true);
      setActiveTab('analise');
      
      toast({
        title: "Análise concluída!",
        description: "O relatório foi gerado com sucesso.",
      });
    } catch (error) {
      console.error("Error analyzing content:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao analisar o conteúdo. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = useCallback((format: 'text' | 'json' | 'pdf' | 'docx') => {
    if (!analysisResult) return;
    
    if (format === 'text') {
      const text = generateTextExport(analysisResult);
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analise-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (format === 'json') {
      const json = JSON.stringify(analysisResult, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analise-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    // PDF and DOCX are handled by the ReportSection component
  }, [analysisResult]);

  const generateTextExport = (data: AnalysisResult) => {
    let text = "=== RESUMO EXECUTIVO ===\n\n";
    text += `${data.summary.executiveSummary}\n\n`;

    // Add key concepts
    text += "=== CONCEITOS CHAVE ===\n\n";
    data.summary.keyConcepts.forEach((concept, index) => {
      text += `${concept.title}\n`;
      text += `${concept.description}\n`;
      text += `Importância: ${concept.importance}\n`;
      text += `Dificuldade: ${concept.difficulty}\n`;
      text += `Exemplo: ${concept.example}\n\n`;
      if (concept.tip) {
        text += `💡 Dica: ${concept.tip}\n\n`;
      }
    });

    // Add main points
    text += "=== PONTOS PRINCIPAIS ===\n\n";
    data.summary.mainPoints.forEach((point, index) => {
      text += `${point.title}\n`;
      text += `${point.description}\n`;
      text += `📌 Contexto: ${point.context}\n`;
      text += `📌 Aplicação: ${point.application}\n`;
      text += `🧠 Técnica de Memória: ${point.memoryTechnique}\n\n`;
    });

    // Add important contexts
    const ctx = data.summary.importantContexts;
    text += `=== ${ctx.title.toUpperCase()} ===\n\n`;
    text += `${ctx.description}\n`;
    text += `Relevância: ${ctx.relevance}\n`;
    text += `Exemplos: ${ctx.examples.join(', ')}\n\n`;

    // Add learning structure
    text += "=== ESTRUTURA DE APRENDIZADO ===\n\n";
    text += "Pré-requisitos:\n";
    data.summary.learningStructure.prerequisites.forEach((prereq, i) => {
      text += `- ${prereq}\n`;
    });
    text += "\nSequência de Aprendizado:\n";
    data.summary.learningStructure.learningSequence.forEach((step, i) => {
      text += `${i + 1}. ${step}\n`;
    });
    text += "\n";

    // Add study techniques
    text += "=== TÉCNICAS DE ESTUDO ===\n\n";
    data.summary.studyTechniques.forEach((tech, i) => {
      text += `🔧 ${tech.name}\n`;
      text += `Quando usar: ${tech.whenToUse}\n`;
      text += `Efetividade: ${tech.effectiveness}\n\n`;
    });

    // Add study questions
    text += "=== PERGUNTAS DE ESTUDO ===\n\n";
    data.summary.studyQuestions.forEach((q, i) => {
      text += `❓ ${q.question}\n`;
      text += `💡 Resposta: ${q.answer}\n`;
      text += `📊 Nível: ${q.level}\n`;
      if (q.tip) {
        text += `💡 Dica: ${q.tip}\n`;
      }
      text += "\n";
    });

    // Add metadata
    const meta = data.summary.metadata;
    text += `=== METADADOS ===\n\n`;
    text += `Data: ${meta.date}\n`;
    text += `Contagem de palavras: ${meta.wordCount}\n`;
    text += `Segmentos: ${meta.segments}\n`;
    text += `Fonte: ${meta.source}\n`;

    return text;
  };

  return (
    <div className="min-h-screen bg-background"> 
      <main className="container py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">
              <span className="bg-gradient-youtube bg-clip-text text-transparent">
                Análise de Transcrição
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cole o link do YouTube e deixe nossa IA transformar o conteúdo em conhecimento estruturado.
            </p>
          </div>

          {/* URL Input */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">URL do Vídeo</CardTitle>
              <CardDescription>
                Insira o link do vídeo do YouTube que deseja analisar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  disabled={isProcessing}
                  className="flex-1"
                />
                <Button 
                  onClick={handleAnalyze}
                  disabled={isProcessing || !youtubeUrl}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Analisar
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {hasResults && analysisResult && (
            <div className="space-y-6">
              {/* Tabs */}
              <div className="border-b">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('transcricao')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'transcricao'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:border-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Transcrição
                  </button>
                  <button
                    onClick={() => setActiveTab('analise')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'analise'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:border-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Análise Completa
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="mt-4">
                {activeTab === 'transcricao' ? (
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Transcrição</CardTitle>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4 mr-2" />
                            Copiar
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Baixar
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <p>Esta é uma transcrição de exemplo do vídeo. Em uma implementação real, aqui estaria o texto completo da transcrição do vídeo do YouTube.</p>
                        <p>O vídeo começa com uma introdução sobre o tópico principal, seguido por explicações detalhadas e exemplos práticos.</p>
                        <p>Você pode navegar pela transcrição usando os timestamps fornecidos na seção de análise.</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <ReportSection 
                    analysisResult={analysisResult} 
                    onExport={handleExport} 
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TranscricaoAnalise;