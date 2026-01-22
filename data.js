// WealthArmor AI - Data Module

// Investment Profiles
const investmentProfiles = {
    defensive: {
        name: 'Defensivo (Bonos)',
        annualReturn: 4.5,
        volatility: 'Baja',
        description: 'Inversión conservadora en bonos del tesoro y corporativos de alta calificación',
        risk: 'Bajo',
        color: '#3b82f6',
        allocation: {
            'Bonos del Tesoro': 50,
            'Bonos Corporativos': 30,
            'Efectivo': 20
        }
    },
    moderate: {
        name: 'Moderado (S&P 500)',
        annualReturn: 10.0,
        volatility: 'Media',
        description: 'Cartera balanceada siguiendo el índice S&P 500 con diversificación global',
        risk: 'Medio',
        color: '#10b981',
        allocation: {
            'S&P 500 ETF': 60,
            'Bonos': 25,
            'Internacional': 10,
            'Efectivo': 5
        }
    },
    aggressive: {
        name: 'Agresivo (Tech/Cripto)',
        annualReturn: 18.0,
        volatility: 'Alta',
        description: 'Exposición a tecnología emergente, criptomonedas y mercados de alto crecimiento',
        risk: 'Alto',
        color: '#f59e0b',
        allocation: {
            'Tech Stocks': 40,
            'Criptomonedas': 25,
            'Growth ETFs': 20,
            'Startups': 10,
            'Efectivo': 5
        }
    }
};

// Wealth Status Thresholds (in USD)
const wealthThresholds = {
    survival: {
        min: 0,
        max: 10000,
        label: 'Supervivencia',
        description: 'Fondo de emergencia básico (3 meses de gastos)',
        color: '#ef4444',
        advice: 'Prioridad: Construir colchón de emergencia'
    },
    security: {
        min: 10000,
        max: 50000,
        label: 'Seguridad',
        description: 'Fondo de emergencia sólido (6-12 meses)',
        color: '#f59e0b',
        advice: 'Bien! Ahora enfócate en eliminar deudas'
    },
    independence: {
        min: 50000,
        max: 250000,
        label: 'Independencia',
        description: 'Capital que genera ingresos pasivos',
        color: '#eab308',
        advice: 'Excelente! Diversifica tus inversiones'
    },
    freedom: {
        min: 250000,
        max: 1000000,
        label: 'Libertad Financiera',
        description: 'Patrimonio que sostiene tu estilo de vida',
        color: '#10b981',
        advice: 'Impresionante! Optimiza tu estrategia fiscal'
    },
    legacy: {
        min: 1000000,
        max: Infinity,
        label: 'Riqueza Generacional',
        description: 'Patrimonio que trasciende generaciones',
        color: '#fbbf24',
        advice: '¡Elite! Enfócate en protección y legado'
    }
};

// Global Currencies (Top 30)
const globalCurrencies = [
    { code: 'USD', name: 'Dólar Estadounidense', symbol: '$', country: 'Estados Unidos' },
    { code: 'EUR', name: 'Euro', symbol: '€', country: 'Eurozona' },
    { code: 'GBP', name: 'Libra Esterlina', symbol: '£', country: 'Reino Unido' },
    { code: 'JPY', name: 'Yen Japonés', symbol: '¥', country: 'Japón' },
    { code: 'CAD', name: 'Dólar Canadiense', symbol: 'C$', country: 'Canadá' },
    { code: 'AUD', name: 'Dólar Australiano', symbol: 'A$', country: 'Australia' },
    { code: 'CHF', name: 'Franco Suizo', symbol: 'CHF', country: 'Suiza' },
    { code: 'CNY', name: 'Yuan Chino', symbol: '¥', country: 'China' },
    { code: 'SEK', name: 'Corona Sueca', symbol: 'kr', country: 'Suecia' },
    { code: 'NZD', name: 'Dólar Neozelandés', symbol: 'NZ$', country: 'Nueva Zelanda' },
    { code: 'MXN', name: 'Peso Mexicano', symbol: '$', country: 'México' },
    { code: 'SGD', name: 'Dólar de Singapur', symbol: 'S$', country: 'Singapur' },
    { code: 'HKD', name: 'Dólar de Hong Kong', symbol: 'HK$', country: 'Hong Kong' },
    { code: 'NOK', name: 'Corona Noruega', symbol: 'kr', country: 'Noruega' },
    { code: 'KRW', name: 'Won Surcoreano', symbol: '₩', country: 'Corea del Sur' },
    { code: 'TRY', name: 'Lira Turca', symbol: '₺', country: 'Turquía' },
    { code: 'RUB', name: 'Rublo Ruso', symbol: '₽', country: 'Rusia' },
    { code: 'INR', name: 'Rupia India', symbol: '₹', country: 'India' },
    { code: 'BRL', name: 'Real Brasileño', symbol: 'R$', country: 'Brasil' },
    { code: 'ZAR', name: 'Rand Sudafricano', symbol: 'R', country: 'Sudáfrica' },
    { code: 'DKK', name: 'Corona Danesa', symbol: 'kr', country: 'Dinamarca' },
    { code: 'PLN', name: 'Złoty Polaco', symbol: 'zł', country: 'Polonia' },
    { code: 'THB', name: 'Baht Tailandés', symbol: '฿', country: 'Tailandia' },
    { code: 'IDR', name: 'Rupia Indonesia', symbol: 'Rp', country: 'Indonesia' },
    { code: 'HUF', name: 'Florín Húngaro', symbol: 'Ft', country: 'Hungría' },
    { code: 'CZK', name: 'Corona Checa', symbol: 'Kč', country: 'República Checa' },
    { code: 'ILS', name: 'Nuevo Séquel', symbol: '₪', country: 'Israel' },
    { code: 'CLP', name: 'Peso Chileno', symbol: '$', country: 'Chile' },
    { code: 'PHP', name: 'Peso Filipino', symbol: '₱', country: 'Filipinas' },
    { code: 'AED', name: 'Dírham de EAU', symbol: 'د.إ', country: 'Emiratos Árabes' }
];

// Crisis Scenarios
const crisisScenarios = {
    marketCrash: {
        name: 'Crash de Mercado',
        impact: -0.20,
        description: 'Caída del 20% en mercados bursátiles',
        duration: '6-12 meses',
        advice: [
            '✅ NO vendas en pánico - las pérdidas solo se materializan al vender',
            '✅ Mantén tu fondo de emergencia intacto (mínimo 6 meses)',
            '✅ Si tienes liquidez, considera comprar activos en descuento',
            '✅ Rebalancea tu cartera hacia activos defensivos',
            '✅ Diversifica: no tengas más del 60% en acciones'
        ],
        recoveryTime: 'Históricamente, los mercados se recuperan en 18-24 meses'
    },
    inflation: {
        name: 'Crisis Inflacionaria',
        impact: -0.15,
        description: 'Inflación del 15% anual',
        duration: '12-24 meses',
        advice: [
            '✅ Invierte en activos que suban con inflación (real estate, commodities)',
            '✅ Evita mantener mucho efectivo - pierde poder adquisitivo',
            '✅ Considera bonos indexados a inflación (TIPS)',
            '✅ Renegocia tus ingresos para compensar inflación',
            '✅ Protege tu margen aumentando precios estratégicamente'
        ],
        recoveryTime: 'La inflación se controla cuando los bancos centrales actúan'
    }
};

// Profit Allocation Rules (Fortress)
const profitAllocation = {
    taxes: {
        percentage: 0.30,
        name: 'Bóveda de Impuestos',
        description: 'Reserva sagrada e intocable para obligaciones fiscales',
        priority: 1,
        color: '#ef4444'
    },
    reinvestment: {
        percentage: 0.30,
        name: 'Bóveda de Reinversión',
        description: 'Capital para escalar el negocio y aumentar ingresos',
        priority: 2,
        color: '#3b82f6'
    },
    peace: {
        percentage: 0.20,
        name: 'Bóveda de Paz',
        description: 'Fondo de emergencia líquido para imprevistos',
        priority: 3,
        color: '#eab308'
    },
    freedom: {
        percentage: 0.20,
        name: 'Bóveda de Libertad',
        description: 'Inversiones de alto rendimiento para riqueza pasiva',
        priority: 4,
        color: '#10b981'
    }
};

// Compound Interest Calculator Settings
const compoundDefaults = {
    timeframes: [10, 20, 30], // years
    monthsPerYear: 12,
    contributionFrequency: 'monthly'
};

// Export all data
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        investmentProfiles,
        wealthThresholds,
        globalCurrencies,
        crisisScenarios,
        profitAllocation,
        compoundDefaults
    };
}