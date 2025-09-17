import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Teste Gratuito",
      price: "R$ 0",
      period: "7 dias",
      description: "Perfeito para experimentar a plataforma",
      badge: "Grátis",
      badgeStyle: "bg-green-500 text-white",
      features: [
        "3 análises de vídeo",
        "Transcrição básica",
        "Exportação em PDF",
        "Suporte por email",
        "Análises até 10 minutos"
      ],
      cta: "Começar Teste",
      variant: "youtube-outline" as const,
      popular: false
    },
    {
      name: "Plano Mensal",
      price: "R$ 49",
      period: "mês",
      description: "Ideal para criadores de conteúdo e estudantes",
      badge: "Mais Popular",
      badgeStyle: "bg-gradient-youtube text-white",
      features: [
        "Análises ilimitadas",
        "Todos os idiomas disponíveis",
        "Exportação em todos os formatos",
        "Busca contextual com IA",
        "Correção inteligente",
        "Suporte prioritário",
        "Vídeos até 3 horas"
      ],
      cta: "Assinar Agora",
      variant: "youtube" as const,
      popular: true
    },
    {
      name: "Plano Anual",
      price: "R$ 39",
      period: "mês",
      originalPrice: "R$ 49",
      description: "Melhor custo-benefício para uso profissional",
      badge: "20% OFF",
      badgeStyle: "bg-purple-500 text-white",
      features: [
        "Tudo do plano mensal",
        "Análise em lote",
        "API de integração",
        "Recomendações premium",
        "Suporte VIP 24/7",
        "Vídeos ilimitados",
        "Backup automático",
        "Recursos experimentais"
      ],
      cta: "Assinar Anual",
      variant: "cta" as const,
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 lg:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Planos Transparentes para
            <span className="bg-gradient-youtube bg-clip-text text-transparent ml-2">
              Todos os Perfis
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para suas necessidades. Cancele a qualquer momento, sem compromisso.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-0 shadow-lg hover:shadow-xl transition-smooth ${
                plan.popular 
                  ? 'bg-gradient-to-b from-background to-muted/50 shadow-glow ring-2 ring-primary/20' 
                  : 'bg-background'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className={plan.badgeStyle}>
                    <Star className="w-3 h-3 mr-1" />
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                {!plan.popular && (
                  <Badge className={plan.badgeStyle} variant="secondary">
                    {plan.badge}
                  </Badge>
                )}
                
                <CardTitle className="text-2xl font-bold mt-4">{plan.name}</CardTitle>
                <CardDescription className="text-sm">{plan.description}</CardDescription>
                
                <div className="mt-6">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="text-sm text-muted-foreground mt-1">
                      <span className="line-through">{plan.originalPrice}/mês</span>
                      <span className="text-primary font-semibold ml-2">Economize R$ 120/ano</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-sm">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.variant} 
                  size="lg" 
                  className="w-full mt-6"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Todos os planos incluem garantia de 30 dias. 
            <a href="#" className="text-primary hover:underline ml-1">
              Ver termos completos
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;