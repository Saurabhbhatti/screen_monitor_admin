import React from 'react'
export const Barchart = () => {
  return (
    <div><svg width="100%" height="250" viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg">a
    <line x1="40" y1="20" x2="40" y2="200" stroke="black" stroke-width="1" />
  
    <line x1="40" y1="200" x2="460" y2="200" stroke="black" stroke-width="1" />
  
    <text x="10" y="170" fill="black" font-size="12">0</text>
    <text x="10" y="130" fill="black" font-size="12">50</text>
    <text x="10" y="90" fill="black" font-size="12">100</text>
    <text x="10" y="50" fill="black" font-size="12">150</text>
    
    <rect x="60" y="60" width="40" height="140" fill="#bcdff0" style={{ animation: 'bar-animation 1s ease-in-out' }} />
    <rect x="120" y="40" width="40" height="160" fill="#dfe7e9" style={{ animation: 'bar-animation 1s ease-in-out 0.2s' }} />
    <rect x="180" y="70" width="40" height="130" fill="#bcdff0" style={{ animation: 'bar-animation 1s ease-in-out 0.4s' }} />
    <rect x="240" y="30" width="40" height="170" fill="#dfe7e9" style={{ animation: 'bar-animation 1s ease-in-out 0.6s' }} />
    <rect x="300" y="50" width="40" height="150" fill="#bcdff0" style={{ animation: 'bar-animation 1s ease-in-out 0.8s' }} />
    <rect x="360" y="70" width="40" height="130" fill="#dfe7e9" style={{ animation: 'bar-animation 1s ease-in-out 0.8s' }} />
    <rect x="420" y="80" width="40" height="120" fill="#bcdff0" style={{ animation: 'bar-animation 1s ease-in-out 0.8s' }} />
  
    <text x="70" y="220" fill="black" font-size="12">1-Sep</text>
    <text x="130" y="220" fill="black" font-size="12">2-Sep</text>
    <text x="190" y="220" fill="black" font-size="12">3-Sep</text>
    <text x="250" y="220" fill="black" font-size="12">4-Sep</text>
    <text x="310" y="220" fill="black" font-size="12">5-Sep</text>
    <text x="370" y="220" fill="black" font-size="12">6-Sep</text>
    <text x="430" y="220" fill="black" font-size="12">7-Sep</text>
  </svg></div>
  )
}
