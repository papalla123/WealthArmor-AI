// ============================================
// WEALTHARMOR AI - DATA MODULE
// Financial Intelligence & Market Benchmarks Perú 2026
// ============================================

// === SUNAT TAX RATES 2026 ===
const SUNAT_RATES = {
    capitalGains: {
        rate: 0.05, // 5% - Segunda Categoría
        name: 'Impuesto a la Renta de 2da Categoría',
        description: 'Ganancias de capital por venta de acciones, bonos, fondos mutuos',
        paymentDeadline: 'Abril del año siguiente',
        formPDT: 'PDT 681 - Renta Anual',
        minTaxableAmount: 5000 // Mínimo para declarar
    },
    dividends: {
        rate: 0.05,
        name: 'Retención de Dividendos',
        withholding: true
    },
    crypto: {
        rate: 0.05,
        name: 'Ganancias por Criptomonedas',
        notes: 'Considerado ganancia de capital según SUNAT 2026'
    }
};

// === AI SENTINEL INSIGHTS ===
const SENTINEL_INSIGHTS = {
    levels: [
        {
            minWealth: 0,
            maxWealth: 10000,
            greeting: 'Socio, tu fortaleza patrimonial está en construcción. Es momento de levantar los cimientos.',
            armor: 15,
            threats: [
                { icon: '⚠️', text: 'Fondo de emergencia inexistente - Tu primer blindaje debe ser 3 meses de gastos' },
                { icon: '📉', text: 'Dependencia total del ingreso activo - Necesitas diversificar fuentes' }
            ],
            tactics: [
                { icon: '🎯', text: 'PRIORIDAD 1: Construir fondo de emergencia de S/ 10,000' },
                { icon: '💡', text: 'Considera depósitos en Caja con TREA 9.5% para iniciar' },
                { icon: '📚', text: 'Educación financiera: Invierte en ti antes que en mercados' }
            ]
        },
        {
            minWealth: 10000,
            maxWealth: 50000,
            greeting: 'Socio, tienes un perímetro defensivo básico. Hora de fortificar.',
            armor: 35,
            threats: [
                { icon: '⚠️', text: 'Inflación erosionando poder adquisitivo - 8% anual en 2026' },
                { icon: '📊', text: 'Portfolio no diversificado - Riesgo de concentración detectado' }
            ],
            tactics: [
                { icon: '🎯', text: 'Expande fondo a 6 meses (S/ 20,000 mínimo)' },
                { icon: '💰', text: 'Comienza inversión en Bonos del Tesoro (6.2% TREA)' },
                { icon: '🪙', text: 'Considera 10% en oro físico como cobertura anti-inflación' }
            ]
        },
        {
            minWealth: 50000,
            maxWealth: 150000,
            greeting: 'Socio, tu blindaje está al 60%. Las murallas están levantadas.',
            armor: 60,
            threats: [
                { icon: '📉', text: 'Volatilidad de mercado - BVL puede corregir 15-20%' },
                { icon: '💱', text: 'Riesgo cambiario - Dólar puede llegar a S/ 4.20' }
            ],
            tactics: [
                { icon: '🎯', text: 'Diversifica: 40% Renta Fija, 30% Renta Variable, 20% Dólares, 10% Oro' },
                { icon: '📊', text: 'Ingresa a factoring (12% TREA) con capital excedente' },
                { icon: '🛡️', text: 'Activa ESCUDO SUNAT: Separa 5% de ganancias para impuestos' }
            ]
        },
        {
            minWealth: 150000,
            maxWealth: 500000,
            greeting: 'Socio, tu fortaleza es impenetrable al 85%. Estás en la élite financiera.',
            armor: 85,
            threats: [
                { icon: '💼', text: 'Riesgo de complacencia - Los mercados nunca duermen' },
                { icon: '🎯', text: 'Optimización fiscal pendiente - Puedes ahorrar más en impuestos' }
            ],
            tactics: [
                { icon: '🏦', text: 'Considera ETFs internacionales en BVL (S&P 500)' },
                { icon: '💎', text: 'Explora real estate comercial para renta pasiva' },
                { icon: '📋', text: 'Consulta con CFA para planificación patrimonial avanzada' }
            ]
        },
        {
            minWealth: 500000,
            maxWealth: Infinity,
            greeting: 'Socio, tu blindaje es del 95%. Eres una fortaleza financiera generacional.',
            armor: 95,
            threats: [
                { icon: '👑', text: 'Preservación de legado - Necesitas planificación sucesoria' },
                { icon: '⚖️', text: 'Complejidad tributaria - Requiere asesoría CPA especializada' }
            ],
            tactics: [
                { icon: '🏰', text: 'Estructura familiar patrimonial (sociedad/fideicomiso)' },
                { icon: '🌎', text: 'Diversificación internacional (offshore legal)' },
                { icon: '📜', text: 'Testamento y sucesión planificada con abogado especialista' }
            ]
        }
    ]
};

// === INVESTMENT OPPORTUNITIES PERÚ 2026 ===
const INVESTMENT_RADAR = [
    {
        id: 'dpf-caja-arequipa',
        title: 'Depósito a Plazo Fijo - Caja Arequipa',
        category: 'Renta Fija',
        institution: 'Caja Municipal de Arequipa',
        roi: 9.5,
        period: 'anual',
        minInvestment: 1000,
        currency: 'PEN',
        risk: 'Bajo',
        badge: 'VERIFICADO 2026',
        icon: '🏦',
        details: {
            liquidity: '360 días',
            insurance: 'Fondo de Seguro hasta S/ 118,185',
            trea: '9.50%',
            notes: 'Renovación automática, intereses mensuales o al vencimiento'
        },
        link: 'https://www.cajaarequipa.pe'
    },
    {
        id: 'bonos-tesoro',
        title: 'Bonos del Tesoro Público',
        category: 'Deuda Soberana',
        institution: 'MEF - República del Perú',
        roi: 6.2,
        period: 'anual',
        minInvestment: 5000,
        currency: 'PEN',
        risk: 'Muy Bajo',
        badge: 'GOBIERNO',
        icon: '🏛️',
        details: {
            liquidity: 'Mercado secundario disponible',
            insurance: 'Respaldo del Estado Peruano',
            trea: '6.20%',
            notes: 'Exención IR para personas naturales'
        },
        link: 'https://www.mef.gob.pe'
    },
    {
        id: 'factoring-facturedo',
        title: 'Factoring Empresarial',
        category: 'Alternativo',
        institution: 'Facturedo Perú',
        roi: 12.0,
        period: 'anual',
        minInvestment: 10000,
        currency: 'PEN',
        risk: 'Medio',
        badge: 'FINTECH',
        icon: '💼',
        details: {
            liquidity: '30-90 días según factura',
            insurance: 'Evaluación crediticia de deudores',
            trea: '12.00%',
            notes: 'Rendimientos mensuales, capital al vencimiento'
        },
        link: 'https://facturedo.pe'
    },
    {
        id: 'fondos-credicorp',
        title: 'Fondo Mutuo Balanceado',
        category: 'Fondos de Inversión',
        institution: 'Credicorp Capital',
        roi: 8.5,
        period: 'anual esperado',
        minInvestment: 500,
        currency: 'PEN',
        risk: 'Medio',
        badge: 'DIVERSIFICADO',
        icon: '📊',
        details: {
            liquidity: 'Rescate T+2 días hábiles',
            insurance: 'Regulado por SMV',
            trea: '8.50%',
            notes: 'Mix 60% acciones, 40% renta fija'
        },
        link: 'https://www.credicorpcapital.com'
    },
    {
        id: 'oro-bcr',
        title: 'Oro de Inversión BCR',
        category: 'Commodities',
        institution: 'Banco Central de Reserva',
        roi: 7.0,
        period: 'proyección anual',
        minInvestment: 3000,
        currency: 'USD',
        risk: 'Medio',
        badge: 'REFUGIO',
        icon: '🪙',
        details: {
            liquidity: 'Venta inmediata al BCR',
            insurance: 'Certificación de autenticidad',
            trea: '7.00%',
            notes: 'Cobertura contra inflación'
        },
        link: 'https://www.bcrp.gob.pe'
    },
    {
        id: 'etf-sp500',
        title: 'ETF S&P 500 (BVL)',
        category: 'Internacional',
        institution: 'Bolsa de Valores de Lima',
        roi: 10.5,
        period: 'proyección anual',
        minInvestment: 1000,
        currency: 'USD',
        risk: 'Medio-Alto',
        badge: 'GLOBAL',
        icon: '🌎',
        details: {
            liquidity: 'Trading diario en BVL',
            insurance: 'Cavali como custodio',
            trea: '10.50%',
            notes: 'Exposición a 500 empresas USA'
        },
        link: 'https://www.bvl.com.pe'
    }
];

// === CURRENCY DATA GENERATOR ===
function generateCurrencyHistory(baseRate, volatility, points = 30) {
    const history = [];
    let currentRate = baseRate;
    const now = new Date();
    
    for (let i = points; i >= 0; i--) {
        const change = (Math.random() - 0.5) * volatility;
        currentRate = Math.max(baseRate * 0.97, Math.min(baseRate * 1.03, currentRate + change));
        
        const timestamp = new Date(now);
        timestamp.setHours(now.getHours() - i);
        
        history.push({
            timestamp: timestamp.toISOString(),
            rate: parseFloat(currentRate.toFixed(4)),
            high: parseFloat((currentRate + Math.random() * volatility * 0.5).toFixed(4)),
            low: parseFloat((currentRate - Math.random() * volatility * 0.5).toFixed(4))
        });
    }
    
    return history;
}

const CURRENCY_DATA = {
    PENUSD: {
        pair: 'PEN/USD',
        name: 'Sol Peruano / Dólar',
        baseRate: 3.765,
        buyRate: 3.750,
        sellRate: 3.780,
        spread: 0.030,
        change24h: 0.015,
        changePercent: 0.40,
        volatility: 0.015,
        history: generateCurrencyHistory(3.765, 0.015),
        lastUpdate: new Date().toISOString()
    },
    BTCUSD: {
        pair: 'BTC/USD',
        name: 'Bitcoin / Dólar',
        baseRate: 94520,
        change24h: 1250,
        changePercent: 1.34,
        volatility: 1500,
        history: generateCurrencyHistory(94520, 1500),
        lastUpdate: new Date().toISOString()
    }
};

// === PORTFOLIO ASSET TYPES ===
const ASSET_TYPES = {
    fondos: {
        name: 'Fondos Mutuos',
        color: '#3b82f6',
        icon: '📈',
        risk: 'Medio',
        expectedReturn: 8.5,
        taxable: true
    },
    factoring: {
        name: 'Factoring',
        color: '#8b5cf6',
        icon: '💼',
        risk: 'Medio',
        expectedReturn: 12.0,
        taxable: true
    },
    oro: {
        name: 'Oro Físico',
        color: '#d4af37',
        icon: '🪙',
        risk: 'Bajo-Medio',
        expectedReturn: 7.0,
        taxable: true
    },
    dolares: {
        name: 'Dólares USD',
        color: '#10b981',
        icon: '💵',
        risk: 'Bajo',
        expectedReturn: 3.5,
        taxable: false
    },
    caja: {
        name: 'Caja Líquida',
        color: '#6b7280',
        icon: '💰',
        risk: 'Muy Bajo',
        expectedReturn: 1.5,
        taxable: false
    }
};

// === PENTAGON APP LINKS ===
const PENTAGON_APPS = {
    sueldopro: {
        url: 'https://sueldopro-2026.vercel.app',
        name: 'SueldoPro',
        storageKey: 'sueldopro_data',
        metrics: ['nomina_mensual', 'empleados_activos']
    },
    marginmaster: {
        url: 'https://margin-master-pro-pboy.vercel.app',
        name: 'MarginMaster',
        storageKey: 'marginmaster_data',
        metrics: ['margen_neto', 'margen_bruto']
    },
    liquidez: {
        url: 'https://liquidez-force.vercel.app',
        name: 'LiquidezForce',
        storageKey: 'liquidez_data',
        metrics: ['flujo_caja', 'liquidez_disponible']
    },
    leadtarget: {
        url: 'https://lead-target.vercel.app',
        name: 'LeadTarget',
        storageKey: 'leadtarget_data',
        metrics: ['leads_activos', 'tasa_conversion']
    }
};

// === TAX CALCULATION LOGIC ===
function calculateCapitalGainsTax(grossGain, investmentType) {
    const rate = SUNAT_RATES.capitalGains.rate;
    const taxAmount = grossGain * rate;
    const netGain = grossGain - taxAmount;
    
    const advice = [
        'Declara tus ganancias en el PDT 681 (Renta Anual)',
        'El pago se realiza en abril del año siguiente',
        'Conserva toda la documentación por 4 años',
        'Puedes compensar pérdidas con ganancias del mismo año'
    ];
    
    if (investmentType === 'cripto') {
        advice.push('SUNAT considera criptomonedas como ganancia de capital desde 2024');
    }
    
    if (grossGain >= 50000) {
        advice.push('⚠️ Monto significativo: Considera consultar con un CPA');
    }
    
    return {
        grossGain,
        taxRate: rate * 100,
        taxAmount,
        netGain,
        advice,
        investmentType
    };
}

// === UTILITY FUNCTIONS ===
const Utils = {
    formatCurrency: (amount, currency = 'PEN') => {
        const symbols = { PEN: 'S/ ', USD: '$', EUR: '€' };
        return `${symbols[currency]}${amount.toLocaleString('es-PE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    },
    
    formatPercent: (value) => {
        return `${value.toFixed(2)}%`;
    },
    
    getSentinelLevel: (wealth) => {
        return SENTINEL_INSIGHTS.levels.find(
            level => wealth >= level.minWealth && wealth < level.maxWealth
        ) || SENTINEL_INSIGHTS.levels[SENTINEL_INSIGHTS.levels.length - 1];
    },
    
    calculatePortfolioMetrics: (assets) => {
        const total = Object.values(assets).reduce((sum, val) => sum + val, 0);
        const percentages = {};
        
        Object.keys(assets).forEach(key => {
            percentages[key] = total > 0 ? (assets[key] / total) * 100 : 0;
        });
        
        return { total, percentages };
    },
    
    getTimeAgo: (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        
        if (seconds < 60) return `Hace ${seconds} seg`;
        if (seconds < 3600) return `Hace ${Math.floor(seconds / 60)} min`;
        if (seconds < 86400) return `Hace ${Math.floor(seconds / 3600)} hrs`;
        return `Hace ${Math.floor(seconds / 86400)} días`;
    }
};

// === EXPORT FOR GLOBAL ACCESS ===
if (typeof window !== 'undefined') {
    window.WealthData = {
        SUNAT_RATES,
        SENTINEL_INSIGHTS,
        INVESTMENT_RADAR,
        CURRENCY_DATA,
        ASSET_TYPES,
        PENTAGON_APPS,
        calculateCapitalGainsTax,
        Utils
    };
}
