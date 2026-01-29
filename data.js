// ============================================
// WEALTHARMOR AI - DATA ORACLE 2026
// El cerebro financiero del Pentágono
// ============================================

// === PENTAGON ECOSYSTEM LINKS ===
const pentagonLinks = {
    sueldopro: {
        url: 'https://sueldopro-2026.vercel.app',
        name: 'SueldoPro',
        description: 'Gestión Salarial Inteligente',
        icon: '💼',
        status: 'active'
    },
    marginmaster: {
        url: 'https://margin-master-pro-pboy.vercel.app',
        name: 'MarginMaster',
        description: 'Optimización de Márgenes',
        icon: '📊',
        status: 'active'
    },
    liquidez: {
        url: 'https://liquidez-force.vercel.app',
        name: 'LiquidezForce',
        description: 'Control de Flujo de Caja',
        icon: '💧',
        status: 'active'
    },
    leadtarget: {
        url: 'https://lead-target-rpvx.vercel.app',
        name: 'LeadTarget',
        description: 'Captación de Clientes',
        icon: '🎯',
        status: 'active'
    },
    wealtharmor: {
        url: '#',
        name: 'WealthArmor',
        description: 'Blindaje Patrimonial',
        icon: '🛡️',
        status: 'current'
    }
};

// === WEALTH THRESHOLDS (ADAPTED FOR PERÚ 2026) ===
const wealthLevels = [
    {
        level: 0,
        name: 'Iniciando Camino',
        min: 0,
        max: 5000,
        icon: '🌱',
        color: '#666',
        message: 'Comienza tu viaje hacia la libertad financiera',
        advice: 'Prioriza crear un fondo de emergencia básico (S/ 5,000)'
    },
    {
        level: 1,
        name: 'Supervivencia',
        min: 5000,
        max: 20000,
        icon: '🛡️',
        color: '#d4af37',
        message: 'Tienes un colchón de emergencia básico',
        advice: 'Expande tu fondo a 6 meses de gastos (S/ 20,000)'
    },
    {
        level: 2,
        name: 'Seguridad',
        min: 20000,
        max: 50000,
        icon: '🏰',
        color: '#ffd700',
        message: 'Tu base financiera es sólida',
        advice: 'Comienza a invertir el excedente en instrumentos de bajo riesgo'
    },
    {
        level: 3,
        name: 'Independencia',
        min: 50000,
        max: 150000,
        icon: '🚀',
        color: '#10b981',
        message: 'Generas ingresos pasivos consistentes',
        advice: 'Diversifica en fondos mutuos y depósitos a plazo'
    },
    {
        level: 4,
        name: 'Libertad Financiera',
        min: 150000,
        max: 500000,
        icon: '👑',
        color: '#10b981',
        message: 'Tu patrimonio sostiene tu estilo de vida',
        advice: 'Optimiza tu estrategia fiscal y explora inversiones alternativas'
    },
    {
        level: 5,
        name: 'Riqueza Generacional',
        min: 500000,
        max: Infinity,
        icon: '💎',
        color: '#ffd700',
        message: 'Tu legado trasciende generaciones',
        advice: 'Enfócate en protección patrimonial y planificación sucesoria'
    }
];

// === INVESTMENT OPPORTUNITIES PERÚ 2026 ===
const investmentRadar = [
    {
        id: 'dpf-caja',
        title: 'Depósito a Plazo Fijo',
        category: 'Renta Fija',
        institution: 'Caja Arequipa',
        roi: 9.5,
        period: 'anual',
        minInvestment: 1000,
        currency: 'PEN',
        risk: 'Bajo',
        badge: 'VERIFICADO',
        details: {
            liquidity: '360 días',
            insurance: 'Fondo de Seguro de Depósitos (hasta S/ 118,185)',
            notes: 'TREA garantizada, renovación automática opcional'
        },
        affiliateLink: 'https://www.cajaarequipa.pe/personas/ahorro-e-inversion/deposito-a-plazo'
    },
    {
        id: 'bonos-tesoro',
        title: 'Bonos del Tesoro Público',
        category: 'Deuda Soberana',
        institution: 'MEF - Gobierno del Perú',
        roi: 6.2,
        period: 'anual',
        minInvestment: 5000,
        currency: 'PEN',
        risk: 'Muy Bajo',
        badge: 'GOBIERNO',
        details: {
            liquidity: 'Mercado secundario disponible',
            insurance: 'Respaldado por Estado Peruano',
            notes: 'Exención de impuesto a la renta para personas naturales'
        },
        affiliateLink: 'https://www.mef.gob.pe/es/?option=com_content&view=article&id=2183'
    },
    {
        id: 'factoring',
        title: 'Factoring Empresarial',
        category: 'Alternativo',
        institution: 'Facturedo',
        roi: 12.0,
        period: 'anual',
        minInvestment: 10000,
        currency: 'PEN',
        risk: 'Medio',
        badge: 'FINTECH',
        details: {
            liquidity: '30-90 días (según factura)',
            insurance: 'Evaluación crediticia de deudores',
            notes: 'Rendimientos mensuales, capital + intereses al vencimiento'
        },
        affiliateLink: 'https://facturedo.pe'
    },
    {
        id: 'fondos-mutuos',
        title: 'Fondo Mutuo Balanceado',
        category: 'Fondos',
        institution: 'Credicorp Capital',
        roi: 8.5,
        period: 'anual',
        minInvestment: 500,
        currency: 'PEN',
        risk: 'Medio',
        badge: 'DIVERSIFICADO',
        details: {
            liquidity: 'Rescate en T+2 días hábiles',
            insurance: 'Regulado por SMV',
            notes: 'Portafolio 60% renta variable, 40% renta fija'
        },
        affiliateLink: 'https://www.credicorpcapital.com/Personas/Productos/Fondos-Mutuos.aspx'
    },
    {
        id: 'oro-fisico',
        title: 'Oro de Inversión',
        category: 'Commodities',
        institution: 'Banco Central de Reserva',
        roi: 7.0,
        period: 'proyección anual',
        minInvestment: 3000,
        currency: 'USD',
        risk: 'Medio',
        badge: 'REFUGIO',
        details: {
            liquidity: 'Venta inmediata al BCR o mercado',
            insurance: 'Certificación de autenticidad',
            notes: 'Cobertura ante inflación y volatilidad cambiaria'
        },
        affiliateLink: 'https://www.bcrp.gob.pe/sistema-financiero/emision-de-oro.html'
    },
    {
        id: 'etf-sp500',
        title: 'ETF S&P 500',
        category: 'Internacional',
        institution: 'BVL - Cavali',
        roi: 10.5,
        period: 'proyección anual',
        minInvestment: 1000,
        currency: 'USD',
        risk: 'Medio-Alto',
        badge: 'GLOBAL',
        details: {
            liquidity: 'Trading diario en BVL',
            insurance: 'Cavali como custodio',
            notes: 'Exposición a las 500 empresas más grandes de USA'
        },
        affiliateLink: 'https://www.bvl.com.pe'
    }
];

// === CURRENCY DATA (SIMULATED 30-DAY HISTORY) ===
function generateCurrencyHistory(baseRate, volatility, days = 30) {
    const history = [];
    let currentRate = baseRate;
    
    for (let i = 0; i < days; i++) {
        const change = (Math.random() - 0.5) * volatility;
        currentRate = Math.max(baseRate * 0.95, Math.min(baseRate * 1.05, currentRate + change));
        history.push({
            date: new Date(2026, 0, 28 - (days - i - 1)),
            rate: parseFloat(currentRate.toFixed(4))
        });
    }
    
    return history;
}

const currencyData = {
    PENUSD: {
        name: 'Sol Peruano → Dólar',
        symbol: 'PEN/USD',
        currentBuy: 3.75,
        currentSell: 3.78,
        spread: 0.03,
        history: generateCurrencyHistory(3.765, 0.02),
        lastUpdate: new Date(2026, 0, 28, 14, 30)
    },
    EURUSD: {
        name: 'Euro → Dólar',
        symbol: 'EUR/USD',
        currentRate: 1.0845,
        history: generateCurrencyHistory(1.0845, 0.005),
        lastUpdate: new Date(2026, 0, 28, 14, 30)
    },
    BTCUSD: {
        name: 'Bitcoin → Dólar',
        symbol: 'BTC/USD',
        currentRate: 94520,
        history: generateCurrencyHistory(94520, 2000),
        lastUpdate: new Date(2026, 0, 28, 14, 30)
    }
};

// === CRISIS SCENARIOS (PERÚ CONTEXT) ===
const crisisScenarios = {
    crash: {
        name: 'Crash Bursátil',
        impact: -0.20,
        description: 'Caída del 20% en índice IGBVL',
        color: '#ef4444',
        advice: [
            '✅ NO vendas en pánico - las pérdidas solo se materializan al vender',
            '✅ Mantén tu fondo de emergencia intacto (mínimo 6 meses)',
            '✅ Si tienes liquidez, es oportunidad de compra',
            '✅ Rebalancea hacia bonos del tesoro (6.2% TREA)',
            '✅ Históricamente, mercados se recuperan en 18-24 meses'
        ]
    },
    inflation: {
        name: 'Inflación Alta',
        impact: -0.15,
        description: 'Inflación sostenida del 8-10% anual',
        color: '#f59e0b',
        advice: [
            '✅ Invierte en activos que suban con inflación (oro, real estate)',
            '✅ Evita mantener mucho efectivo en soles',
            '✅ Considera dolarizar parte de tu patrimonio',
            '✅ Bonos indexados a inflación (VAC del BCR)',
            '✅ Renegocia tus ingresos para compensar inflación'
        ]
    },
    recession: {
        name: 'Recesión Económica',
        impact: -0.30,
        description: 'Contracción del PBI por 2 trimestres consecutivos',
        color: '#dc2626',
        advice: [
            '✅ Prioriza liquidez sobre rentabilidad',
            '✅ Reduce deudas de alto interés',
            '✅ Mantén empleabilidad y múltiples fuentes de ingreso',
            '✅ Busca activos defensivos (utilities, consumo básico)',
            '✅ Aprovecha para formación y upskilling'
        ]
    },
    devaluation: {
        name: 'Devaluación del Sol',
        impact: -0.25,
        description: 'Tipo de cambio PEN/USD sube a 4.70',
        color: '#f97316',
        advice: [
            '✅ Aumenta exposición a dólares (hasta 40% del portfolio)',
            '✅ Invierte en empresas exportadoras peruanas',
            '✅ Considera ETFs internacionales en BVL',
            '✅ Protege importaciones con forwards cambiarios',
            '✅ Evita deudas en dólares si tus ingresos son en soles'
        ]
    }
};

// === PORTFOLIO ASSET TYPES ===
const assetTypes = {
    fondos: {
        name: 'Fondos Mutuos',
        color: '#3b82f6',
        icon: '📈',
        risk: 'Medio',
        expectedReturn: 8.5
    },
    factoring: {
        name: 'Factoring',
        color: '#8b5cf6',
        icon: '💼',
        risk: 'Medio',
        expectedReturn: 12.0
    },
    oro: {
        name: 'Oro Físico',
        color: '#d4af37',
        icon: '🪙',
        risk: 'Bajo-Medio',
        expectedReturn: 7.0
    },
    dolares: {
        name: 'Dólares USD',
        color: '#10b981',
        icon: '💵',
        risk: 'Bajo',
        expectedReturn: 3.5
    },
    caja: {
        name: 'Caja Líquida',
        color: '#6b7280',
        icon: '💰',
        risk: 'Muy Bajo',
        expectedReturn: 1.5
    }
};

// === AI ADVISOR RULES ===
const advisorRules = {
    highLiquidity: {
        threshold: 50000,
        message: '🚨 OPORTUNIDAD DETECTADA: Tienes alta liquidez en caja (>S/ 50,000). Considera invertir en Depósitos a Plazo Fijo (9.5% TREA) para no perder poder adquisitivo.',
        priority: 'high'
    },
    lowDiversification: {
        threshold: 0.6,
        message: '⚠️ RIESGO DE CONCENTRACIÓN: Más del 60% de tu portfolio está en un solo activo. Diversifica para reducir riesgo.',
        priority: 'medium'
    },
    noEmergencyFund: {
        threshold: 20000,
        message: '🛡️ PRIORIDAD CRÍTICA: Aún no tienes un fondo de emergencia completo (6 meses). Antes de invertir, construye tu colchón de seguridad.',
        priority: 'critical'
    },
    excellentBalance: {
        message: '✅ PORTFOLIO ÉLITE: Tu diversificación es excepcional. Mantén el balance y considera rebalancear cada trimestre.',
        priority: 'low'
    }
};

// === COMPOUND INTEREST CALCULATOR PRESETS ===
const compoundPresets = {
    conservative: {
        name: 'Conservador',
        rate: 6.5,
        description: 'Bonos + DPF mixto'
    },
    moderate: {
        name: 'Moderado',
        rate: 9.0,
        description: 'Fondos balanceados'
    },
    aggressive: {
        name: 'Agresivo',
        rate: 12.5,
        description: 'Factoring + ETFs'
    }
};

// === BVL NEWS (SIMULATED REAL-TIME) ===
const bvlNews = [
    '⬆️ IGBVL +1.24% | S/ 24,567.89',
    '🏦 Credicorp (BAP) alcanza máximo histórico: $185.40',
    '⚡ Engie Energía Perú declara dividendos: S/ 0.15 por acción',
    '🏗️ Graña y Montero gana licitación por $120M',
    '💎 Southern Copper reporta utilidades récord en Q1 2026',
    '📈 Intercorp Financial Services supera expectativas: ROE 18.2%',
    '🏭 Alicorp anuncia expansión a Colombia: inversión de $50M',
    '⚡ Enel Generación Perú inicia construcción de planta solar',
    '🏦 Banco de Crédito del Perú (BCP) incrementa límites de crédito',
    '📊 Backus reporta crecimiento del 8% en volumen de ventas'
];

// === UTILITY FUNCTIONS ===
const utils = {
    formatCurrency: (amount, currency = 'PEN') => {
        const symbols = { PEN: 'S/ ', USD: '$', EUR: '€' };
        return `${symbols[currency] || ''}${amount.toLocaleString('es-PE', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        })}`;
    },
    
    formatPercent: (value) => {
        return `${value.toFixed(2)}%`;
    },
    
    calculateCompoundInterest: (principal, monthlyContribution, annualRate, years) => {
        const monthlyRate = annualRate / 100 / 12;
        const months = years * 12;
        
        let total = principal;
        const breakdown = [];
        
        for (let month = 1; month <= months; month++) {
            total = total * (1 + monthlyRate) + monthlyContribution;
            
            if (month % 12 === 0) {
                breakdown.push({
                    year: month / 12,
                    total: total,
                    invested: principal + (monthlyContribution * month),
                    earnings: total - (principal + monthlyContribution * month)
                });
            }
        }
        
        return {
            finalAmount: total,
            totalInvested: principal + (monthlyContribution * months),
            totalEarnings: total - (principal + monthlyContribution * months),
            breakdown
        };
    },
    
    getWealthLevel: (amount) => {
        return wealthLevels.find(level => amount >= level.min && amount < level.max) || wealthLevels[wealthLevels.length - 1];
    },
    
    calculatePortfolioMetrics: (assets) => {
        const total = Object.values(assets).reduce((sum, val) => sum + val, 0);
        const percentages = {};
        
        Object.keys(assets).forEach(key => {
            percentages[key] = total > 0 ? (assets[key] / total) * 100 : 0;
        });
        
        return { total, percentages };
    }
};

// === EXPORT FOR GLOBAL ACCESS ===
if (typeof window !== 'undefined') {
    window.WealthData = {
        pentagonLinks,
        wealthLevels,
        investmentRadar,
        currencyData,
        crisisScenarios,
        assetTypes,
        advisorRules,
        compoundPresets,
        bvlNews,
        utils
    };
}
