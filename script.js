// WealthArmor AI - Main Script Module

// Global State
let state = {
    netWorth: 0,
    baseCurrency: 'USD',
    exchangeRate: 1.0,
    currentChart: null,
    monthlyProfit: 0,
    fortressAllocations: {}
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeVault();
    setupEventListeners();
    fetchExchangeRates();
    animateNetWorth();
});

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('baseCurrency').addEventListener('change', fetchExchangeRates);
}

// Initialize Vault with Animation
function initializeVault() {
    const netWorthElement = document.getElementById('netWorth');
    let currentValue = 0;
    const targetValue = state.netWorth;
    
    const duration = 2000;
    const steps = 60;
    const increment = targetValue / steps;
    const stepTime = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
        if (step >= steps) {
            clearInterval(timer);
            netWorthElement.textContent = formatCurrency(targetValue);
            return;
        }
        
        currentValue += increment;
        netWorthElement.textContent = formatCurrency(currentValue);
        step++;
    }, stepTime);
}

// Animate Net Worth Counter
function animateNetWorth() {
    const element = document.getElementById('netWorth');
    element.classList.add('animate-count');
}

// Fetch Exchange Rates from API
async function fetchExchangeRates() {
    const currency = document.getElementById('baseCurrency').value;
    const rateElement = document.getElementById('exchangeRate');
    
    try {
        rateElement.textContent = 'Cargando...';
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
        const data = await response.json();
        
        if (data && data.rates && data.rates[currency]) {
            const rate = data.rates[currency];
            state.exchangeRate = rate;
            state.baseCurrency = currency;
            rateElement.textContent = rate.toFixed(4);
            
            // Update net worth display
            updateNetWorthDisplay();
        } else {
            rateElement.textContent = 'Error';
        }
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        rateElement.textContent = '1.00';
    }
}

// Update Net Worth Display
function updateNetWorthDisplay() {
    const netWorthElement = document.getElementById('netWorth');
    const convertedValue = state.netWorth * state.exchangeRate;
    
    const currencySymbol = globalCurrencies.find(c => c.code === state.baseCurrency)?.symbol || '$';
    netWorthElement.textContent = `${currencySymbol}${formatNumber(convertedValue)}`;
    
    updateWealthThermometer(state.netWorth);
}

// Update Wealth Thermometer
function updateWealthThermometer(netWorth) {
    const progress = document.getElementById('wealthProgress');
    const status = document.getElementById('wealthStatus');
    
    let currentStatus = wealthThresholds.survival;
    let percentage = 0;
    
    // Determine status
    for (const [key, threshold] of Object.entries(wealthThresholds)) {
        if (netWorth >= threshold.min && netWorth < threshold.max) {
            currentStatus = threshold;
            percentage = ((netWorth - threshold.min) / (threshold.max - threshold.min)) * 100;
            break;
        } else if (netWorth >= threshold.min) {
            currentStatus = threshold;
            percentage = 100;
        }
    }
    
    // Update progress bar
    progress.style.width = `${Math.min(percentage, 100)}%`;
    status.textContent = currentStatus.label;
    status.style.color = currentStatus.color;
}

// Calculate Profit Fortress
function calculateFortress() {
    const profitInput = document.getElementById('monthlyProfit');
    const profit = parseFloat(profitInput.value);
    
    if (!profit || profit <= 0) {
        alert('⚠️ Por favor ingresa una utilidad mensual válida');
        return;
    }
    
    state.monthlyProfit = profit;
    
    // Calculate allocations
    const allocations = {
        taxes: profit * profitAllocation.taxes.percentage,
        reinvestment: profit * profitAllocation.reinvestment.percentage,
        peace: profit * profitAllocation.peace.percentage,
        freedom: profit * profitAllocation.freedom.percentage
    };
    
    state.fortressAllocations = allocations;
    
    // Display results
    document.getElementById('taxVault').textContent = formatCurrency(allocations.taxes);
    document.getElementById('reinvestVault').textContent = formatCurrency(allocations.reinvestment);
    document.getElementById('peaceVault').textContent = formatCurrency(allocations.peace);
    document.getElementById('freedomVault').textContent = formatCurrency(allocations.freedom);
    
    // Show results container
    const resultDiv = document.getElementById('fortressResult');
    resultDiv.classList.remove('hidden');
    resultDiv.classList.add('animate-count');
    
    // Update net worth (add freedom vault to investments)
    state.netWorth += allocations.freedom;
    updateNetWorthDisplay();
}

// Generate Compound Interest Chart
function generateCompoundChart() {
    const initialCapital = parseFloat(document.getElementById('initialCapital').value) || 0;
    const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value) || 0;
    const annualReturn = parseFloat(document.getElementById('annualReturn').value) / 100 || 0;
    
    if (initialCapital <= 0) {
        alert('⚠️ Por favor ingresa un capital inicial válido');
        return;
    }
    
    const monthlyRate = annualReturn / 12;
    const timeframes = [10, 20, 30]; // years
    
    const datasets = [];
    const labels = [];
    
    // Generate data for each timeframe
    timeframes.forEach((years, index) => {
        const months = years * 12;
        const data = [];
        
        for (let month = 0; month <= months; month++) {
            let value;
            if (monthlyContribution > 0) {
                // FV = P(1+r)^n + PMT * [((1+r)^n - 1) / r]
                const compoundedInitial = initialCapital * Math.pow(1 + monthlyRate, month);
                const compoundedContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, month) - 1) / monthlyRate);
                value = compoundedInitial + compoundedContributions;
            } else {
                value = initialCapital * Math.pow(1 + monthlyRate, month);
            }
            
            data.push(value);
            
            if (index === 0 && month % 12 === 0) {
                labels.push(`Año ${month / 12}`);
            }
        }
        
        const colors = ['#10b981', '#3b82f6', '#fbbf24'];
        datasets.push({
            label: `${years} años: ${formatCurrency(data[data.length - 1])}`,
            data: data.filter((_, i) => i % 12 === 0), // Show yearly data
            borderColor: colors[index],
            backgroundColor: colors[index] + '33',
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 6
        });
    });
    
    // Destroy previous chart if exists
    if (state.currentChart) {
        state.currentChart.destroy();
    }
    
    // Create new chart
    const ctx = document.getElementById('compoundChart').getContext('2d');
    state.currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#9ca3af',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                },
                title: {
                    display: true,
                    text: '🚀 Proyección de Crecimiento Compuesto',
                    color: '#fbbf24',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#9ca3af',
                        callback: function(value) {
                            return '$' + (value / 1000).toFixed(0) + 'K';
                        }
                    },
                    grid: {
                        color: 'rgba(251, 191, 36, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#9ca3af'
                    },
                    grid: {
                        color: 'rgba(251, 191, 36, 0.1)'
                    }
                }
            }
        }
    });
}

// Simulate Market Crash
function simulateCrash() {
    const investmentInput = document.getElementById('currentInvestment');
    const investment = parseFloat(investmentInput.value);
    
    if (!investment || investment <= 0) {
        alert('⚠️ Por favor ingresa el valor actual de tu inversión');
        return;
    }
    
    const scenario = crisisScenarios.marketCrash;
    const newValue = investment * (1 + scenario.impact);
    const loss = investment - newValue;
    
    // Display results
    const resultDiv = document.getElementById('crisisResult');
    const valueElement = document.getElementById('crisisValue');
    const adviceElement = document.getElementById('crisisAdvice');
    
    valueElement.textContent = formatCurrency(newValue);
    
    let adviceHTML = `<div class="mb-4">
        <p class="font-bold mb-2">📊 ${scenario.name}</p>
        <p class="text-sm mb-2">${scenario.description}</p>
        <p class="text-sm mb-2">Pérdida temporal: <span class="text-red-400 font-bold">${formatCurrency(loss)}</span></p>
        <p class="text-sm mb-3">Tiempo de recuperación: ${scenario.recoveryTime}</p>
    </div>
    <div class="space-y-2">`;
    
    scenario.advice.forEach(tip => {
        adviceHTML += `<p class="text-sm">${tip}</p>`;
    });
    
    adviceHTML += `</div>`;
    adviceElement.innerHTML = adviceHTML;
    
    resultDiv.classList.remove('hidden');
    resultDiv.classList.add('animate-count');
}

// Simulate Inflation Crisis
function simulateInflation() {
    const investmentInput = document.getElementById('currentInvestment');
    const investment = parseFloat(investmentInput.value);
    
    if (!investment || investment <= 0) {
        alert('⚠️ Por favor ingresa el valor actual de tu inversión');
        return;
    }
    
    const scenario = crisisScenarios.inflation;
    const newValue = investment * (1 + scenario.impact);
    const loss = investment - newValue;
    
    // Display results
    const resultDiv = document.getElementById('crisisResult');
    const valueElement = document.getElementById('crisisValue');
    const adviceElement = document.getElementById('crisisAdvice');
    
    valueElement.textContent = formatCurrency(newValue);
    
    let adviceHTML = `<div class="mb-4">
        <p class="font-bold mb-2">🔥 ${scenario.name}</p>
        <p class="text-sm mb-2">${scenario.description}</p>
        <p class="text-sm mb-2">Pérdida de poder adquisitivo: <span class="text-orange-400 font-bold">${formatCurrency(loss)}</span></p>
        <p class="text-sm mb-3">Duración: ${scenario.duration}</p>
    </div>
    <div class="space-y-2">`;
    
    scenario.advice.forEach(tip => {
        adviceHTML += `<p class="text-sm">${tip}</p>`;
    });
    
    adviceHTML += `</div>`;
    adviceElement.innerHTML = adviceHTML;
    
    resultDiv.classList.remove('hidden');
    resultDiv.classList.add('animate-count');
}

// Export Wealth Report
function exportWealthReport() {
    const date = new Date().toLocaleDateString('es-ES');
    
    let report = `
═══════════════════════════════════════════════════════
    WEALTHARMOR AI - PASAPORTE DE RIQUEZA
═══════════════════════════════════════════════════════
Fecha: ${date}
Generado por: Pentágono de Poder Financiero

───────────────────────────────────────────────────────
📊 RESUMEN FINANCIERO
───────────────────────────────────────────────────────
Patrimonio Neto: ${formatCurrency(state.netWorth)}
Moneda Base: ${state.baseCurrency}
Tipo de Cambio: ${state.exchangeRate.toFixed(4)}

───────────────────────────────────────────────────────
🏰 FORTALEZA DE UTILIDADES
───────────────────────────────────────────────────────
Utilidad Mensual: ${formatCurrency(state.monthlyProfit)}

Asignaciones:
• Bóveda Impuestos (30%): ${formatCurrency(state.fortressAllocations.taxes || 0)}
• Bóveda Reinversión (30%): ${formatCurrency(state.fortressAllocations.reinvestment || 0)}
• Bóveda de Paz (20%): ${formatCurrency(state.fortressAllocations.peace || 0)}
• Bóveda Libertad (20%): ${formatCurrency(state.fortressAllocations.freedom || 0)}

───────────────────────────────────────────────────────
💼 PERFILES DE INVERSIÓN RECOMENDADOS
───────────────────────────────────────────────────────

1. ${investmentProfiles.defensive.name}
   Retorno Anual: ${investmentProfiles.defensive.annualReturn}%
   Riesgo: ${investmentProfiles.defensive.risk}
   ${investmentProfiles.defensive.description}

2. ${investmentProfiles.moderate.name}
   Retorno Anual: ${investmentProfiles.moderate.annualReturn}%
   Riesgo: ${investmentProfiles.moderate.risk}
   ${investmentProfiles.moderate.description}

3. ${investmentProfiles.aggressive.name}
   Retorno Anual: ${investmentProfiles.aggressive.annualReturn}%
   Riesgo: ${investmentProfiles.aggressive.risk}
   ${investmentProfiles.aggressive.description}

───────────────────────────────────────────────────────
⚠️ DISCLAIMER LEGAL
───────────────────────────────────────────────────────
WealthArmor AI es una plataforma de simulación estratégica
y educativa. No constituye asesoría financiera, legal o
contable. El uso de esta herramienta es responsabilidad
exclusiva del usuario. Los datos de mercado son 
referenciales. Consulte con profesionales certificados
antes de tomar decisiones de inversión.

───────────────────────────────────────────────────────
🔐 PENTÁGONO DE PODER FINANCIERO
───────────────────────────────────────────────────────
• SueldoPro: Gestión de Nómina
• MarginMaster: Optimización de Márgenes
• LiquidezForce: Control de Flujo de Caja
• LeadTarget: Conversión de Prospectos
• WealthArmor: Protección y Multiplicación de Riqueza

═══════════════════════════════════════════════════════
    © 2026 WealthArmor AI | Tu Libertad Financiera
═══════════════════════════════════════════════════════
`;
    
    // Create and download file
    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `WealthArmor_Report_${date.replace(/\//g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert('✅ Reporte generado exitosamente!');
}

// Utility Functions
function formatCurrency(value) {
    return '$' + formatNumber(value);
}

function formatNumber(value) {
    if (value >= 1000000) {
        return (value / 1000000).toFixed(2) + 'M';
    } else if (value >= 1000) {
        return (value / 1000).toFixed(2) + 'K';
    }
    return value.toFixed(2);
}