import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Languages, 
  Search, 
  Download, 
  BarChart3, 
  BookOpen,
  Clock,
  Shield,
  Sparkles 
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: FileText,
      title: "Transcrição Inteligente",
      description: "Converta áudio em texto com precisão usando IA avançada. Timestamps automáticos e formatação profissional.",
      badge: "Core"
    },
    {
      icon: Languages,
      title: "Tradução Multi-idioma",
      description: "Traduza conteúdo para múltiplos idiomas em tempo real. Suporte a mais de 50 idiomas.",
      badge: "Premium"
    },
    {
      icon: Search,
      title: "Busca Contextual",
      description: "Encontre informações específicas dentro do conteúdo com busca semântica alimentada por IA.",
      badge: "AI"
    },
    {
      icon: Download,
      title: "Exportação Versátil",
      description: "Exporte em PDF, Word, texto simples ou JSON estruturado para suas necessidades.",
      badge: "Pro"
    },
    {
      icon: BarChart3,
      title: "Análise de Insights",
      description: "Gere relatórios automáticos com principais pontos, estatísticas e resumos executivos.",
      badge: "Analytics"
    },
    {
      icon: BookOpen,
      title: "Recomendações",
      description: "Receba sugestões de livros e recursos relacionados baseados no conteúdo analisado.",
      badge: "Smart"
    },
    {
      icon: Clock,
      title: "Processamento Instantâneo",
      description: "Resultados em segundos, não em horas. Processamento otimizado para máxima velocidade.",
      badge: "Fast"
    },
    {
      icon: Shield,
      title: "Privacidade Total",
      description: "Sem armazenamento permanente. Seus dados são processados e descartados imediatamente.",
      badge: "Security"
    },
    {
      icon: Sparkles,
      title: "Correção Inteligente",
      description: "Sistema de correção inline com sugestões automáticas e melhorias contextuais.",
      badge: "AI"
    }
  ];

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "AI": return "bg-gradient-youtube text-white";
      case "Premium": return "bg-purple-500 text-white";
      case "Pro": return "bg-blue-500 text-white";
      case "Security": return "bg-green-500 text-white";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <section id="features" className="py-20 lg:py-32 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Funcionalidades Poderosas para
            <span className="bg-gradient-youtube bg-clip-text text-transparent ml-2">
              Máxima Produtividade
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tudo que você precisa para transformar vídeos do YouTube em conhecimento estruturado e acionável.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 bg-background shadow-md hover:shadow-lg transition-smooth group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-gradient-subtle rounded-lg flex items-center justify-center group-hover:bg-gradient-youtube group-hover:shadow-glow transition-smooth">
                    <feature.icon className="w-6 h-6 text-primary group-hover:text-white transition-smooth" />
                  </div>
                  <Badge className={getBadgeVariant(feature.badge)}>
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;